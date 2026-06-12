---
name: openai-transcription-chunking
description: "Run reliable OpenAI/Whisper transcription on long recordings — preserve captions, split audio into chunks, save raw JSON per chunk, audit hallucinated loops, retry only failed chunks. Use for chunked ASR, retrying bad chunks, bilingual talks, or caption-first QA. Triggers: OpenAI transcription, Whisper API, chunk audio, retry chunk, transcript hallucination, gpt-4o-transcribe."
---

# OpenAI Transcription Chunking

Use this for the mechanical ASR layer before `research-cataloging` (source-translation-workflow). The goal is to create auditable transcript evidence, not a final translation or summary.

## Core rule

Transcription output is evidence, not authority. Preserve raw platform captions, audio chunks, OpenAI JSON, failed retries, and audit notes so bad ranges can be repaired without retranscribing the whole recording.

## Caption-first preflight

Before calling OpenAI transcription:

- Check whether the platform already exposes captions/subtitles.
- Save direct caption files and metadata (`.vtt`, caption JSON/Markdown, `info.json`, `caption_qa.md`).
- For bilingual talks, check whether expected languages are both represented.
- Treat auto-captions and machine-translated captions as review evidence, not final text.
- Use OpenAI ASR when captions are missing, incomplete, language-mismatched, obviously low quality, or needed as an audio verification pass.

For YouTube, prefer `yt-dlp --list-subs` and `yt-dlp --write-subs --write-auto-subs` first. For Vimeo, use `yt-dlp --list-subs` / `--write-subs --write-auto-subs` and preserve any `en-x-autogen` or uploaded caption track.

## Audio normalization

Create a compact mono audio file before chunking:

```sh
ffmpeg -y -i "$video_file" -vn -ac 1 -ar 16000 -b:a 32k "$out_dir/audio_16k_32k.mp3"
```

Why:

- Keeps file sizes predictable.
- Makes retry chunks cheap.
- Avoids repeatedly extracting from the original video.

## Chunking

Split the normalized audio into short chunks:

```sh
ffmpeg -y -i "$out_dir/audio_16k_32k.mp3" \
  -f segment -segment_time "$chunk_seconds" -reset_timestamps 1 -c copy \
  "$out_dir/chunk_%03d.mp3"
```

Use:

- `90` seconds for long talks where hallucinated loops are likely.
- `120` seconds for shorter or cleaner recordings.
- One chunk for very short clips when the whole clip is comfortably small.

Keep chunk filenames stable. Existing `openai_chunk_###.json` files should be skipped on reruns.

## OpenAI transcription call

Use the audio transcription endpoint one chunk at a time and save JSON per chunk. The project script pattern is:

```sh
curl -sS https://api.openai.com/v1/audio/transcriptions \
  -H "Authorization: Bearer ${OPENAI_API_KEY}" \
  -F file=@"$chunk" \
  -F model='gpt-4o-transcribe' \
  -F response_format='json' \
  -F temperature='0' \
  -F prompt="$prompt" \
  -o "$json" \
  -w '%{http_code}'
```

Prompt guidance:

- Ask for accurate transcription, not summary.
- Tell the model to mark `[unclear]` instead of repeating phrases.
- Include known speaker names, Pokemon names, venue names, and craft terms.
- Do not ask the transcription pass to translate; translation belongs to `research-cataloging` (source-translation-workflow).

## Official OpenAI references

Check official docs when model names, limits, response fields, streaming behavior, diarization, or request parameters matter:

- [Speech to text](https://platform.openai.com/docs/guides/speech-to-text): transcription/translation endpoints, supported models, prompting, streaming, and file limits.
- [Audio quickstart](https://platform.openai.com/docs/guides/audio/quickstart): when to use Transcription API vs Realtime or other audio APIs.
- [Audio API reference](https://platform.openai.com/docs/api-reference/audio): exact request/response parameters for `/v1/audio/transcriptions`, including model-specific fields.
- [GPT-4o Transcribe model](https://platform.openai.com/docs/models/gpt-4o-transcribe): current model capabilities, limits, pricing, and rate-limit notes.
- [GPT-4o mini Transcribe model](https://platform.openai.com/docs/models/gpt-4o-mini-transcribe): lower-cost transcription option.
- [GPT-4o Transcribe Diarize model](https://platform.openai.com/docs/models/gpt-4o-transcribe-diarize): speaker-label transcription option when diarization is needed.

Treat these docs as authoritative for API details. This skill owns the archival workflow around those calls: chunking, retry discipline, raw-output preservation, and handoff to translation.

## Raw output preservation

Preserve:

- `audio_16k_32k.mp3`
- `chunk_###.mp3`
- `openai_chunk_###.json`
- retry audio chunks such as `chunk_010a_retry.mp3`
- retry JSON such as `openai_chunk_010a_retry.json`
- failed retry JSON renamed with `.bad.json` when kept out of assembly
- raw and working assembled Markdown
- `audit.md`

Never overwrite a failed JSON silently. Keep it as evidence and assemble from successful retry files.

## Audit scans

After the first pass, scan raw JSON and assembled transcripts:

```sh
rg --pcre2 -n '(.)(?:\1){20,}|(.{25,})\2|hallucinat(?:ed|ion)?|\[unclear\]' "$out_dir"
```

Also scan for project-specific name and term drift:

```sh
rg -n 'Teramasa|Therumasa|Debra Goldberg|Ipporo|Ipodo|Raiden|radon|Garados|Gerados|Gyrados|```' "$out_dir"
```

Interpretation:

- Repeated long phrases, repeated Japanese loops, or character floods usually mean a failed chunk.
- A single `[unclear]` may be acceptable, but inspect it.
- Some words like "repeat" or Japanese `繰り返し` can be real; inspect hits in context.

## Targeted retry protocol

When one chunk is bad:

1. Keep the bad `openai_chunk_###.json`.
2. Split only the corresponding `chunk_###.mp3` into smaller retry slices, usually `30` seconds; use `10` seconds if the failure persists near a boundary.
3. Name retry audio and JSON so they sort beside the original chunk, e.g.:
   - `chunk_010a_retry.mp3`
   - `chunk_010b_retry.mp3`
   - `openai_chunk_010a_retry.json`
   - `openai_chunk_010b_retry.json`
4. Transcribe only those retry slices.
5. If a retry also loops, keep it as `.bad.json` and retry a smaller slice.
6. Assemble raw/working transcript files from retry JSON in place of the bad original.
7. Add a retry log to `audit.md` with chunk number, time range, problem, and replacement files.

Useful retry split pattern:

```sh
ffmpeg -y -i "$out_dir/chunk_010.mp3" \
  -f segment -segment_time 30 -reset_timestamps 1 -c copy \
  "$out_dir/chunk_010%01d_retry.mp3"
```

Rename numeric suffixes to stable lettered names if needed before transcription.

## Assembly

Assemble two files:

- Raw transcript: direct chunk text with timestamps and audit replacement notes.
- Working transcript: light cleanup for known names, craft terms, paragraph breaks, and nearby duplicate lines.

Use retry JSON instead of the bad original chunk when retry files exist. Keep the working transcript source-language faithful: Japanese remains Japanese and English remains English.

For this project, `research/transcripts/scripts/assemble_transcript_dir.js` demonstrates the pattern: it detects `openai_chunk_###*_retry.json`, inserts an audit note, and assembles retries in place of the original chunk.

## Handoff

Before saying the transcript is ready for translation or excerpting:

- Confirm platform captions were checked or explain why not.
- Confirm chunk and JSON coverage.
- Record retry replacements in `audit.md`.
- Rerun loop/name scans after retry assembly.
- Mark unresolved thin sections explicitly instead of filling them in from inference.

Then use `research-cataloging` (source-translation-workflow) for manual English-session translation, interpreter-echo handling, and Airtable/source excerpt promotion.

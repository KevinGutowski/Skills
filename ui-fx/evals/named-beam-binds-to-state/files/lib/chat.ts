"use client";

// Local stand-in for a chat hook, so the fixture runs with no network or API route.
// Deterministic: every send streams the same reply, one word every 120 ms, about 4 s in all.
import { useCallback, useEffect, useRef, useState } from "react";

export type ChatStatus = "ready" | "submitted" | "streaming";
export type ChatMessage = { id: string; role: "user" | "assistant"; text: string };

const REPLY =
  "Thanks for the message. This is a canned reply that streams in slowly so the composer has a working state to show while it arrives, and it always says exactly the same thing.";
const WORDS = REPLY.split(" ");
const SUBMIT_DELAY_MS = 400;
const WORD_INTERVAL_MS = 120;

export function useChat() {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [status, setStatus] = useState<ChatStatus>("ready");
  const timers = useRef<ReturnType<typeof setTimeout>[]>([]);
  const nextId = useRef(0);

  const clearTimers = useCallback(() => {
    timers.current.forEach(clearTimeout);
    timers.current = [];
  }, []);

  const stop = useCallback(() => {
    clearTimers();
    setStatus("ready");
  }, [clearTimers]);

  const sendMessage = useCallback(
    ({ text }: { text: string }) => {
      clearTimers();
      const userId = `m${nextId.current++}`;
      const replyId = `m${nextId.current++}`;
      setMessages((prev) => [...prev, { id: userId, role: "user", text }]);
      setStatus("submitted");

      timers.current.push(
        setTimeout(() => {
          setStatus("streaming");
          setMessages((prev) => [...prev, { id: replyId, role: "assistant", text: "" }]);
          WORDS.forEach((word, index) => {
            timers.current.push(
              setTimeout(() => {
                setMessages((prev) =>
                  prev.map((m) => (m.id === replyId ? { ...m, text: m.text ? `${m.text} ${word}` : word } : m)),
                );
                if (index === WORDS.length - 1) setStatus("ready");
              }, (index + 1) * WORD_INTERVAL_MS),
            );
          });
        }, SUBMIT_DELAY_MS),
      );
    },
    [clearTimers],
  );

  useEffect(() => clearTimers, [clearTimers]);

  return { messages, status, sendMessage, stop };
}

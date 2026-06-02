---
name: nocodb-catalog-management
description: "Work with local or remote NocoDB bases from Codex: inspect bases/tables/fields, create and update records, create linked-record relation columns, link rows across tables, upload image/file attachments, keep CSV research catalogs in sync with NocoDB, and shape research-database views. Use when the user mentions NocoDB, nocodb, base/table IDs, linked tables, linked records, attachments, gallery views, relation fields, record upserts, or syncing a local research bundle into NocoDB."
---

# NocoDB Catalog Management

## Core Workflow

Use this skill when operating on a NocoDB research catalog. Prefer the NocoDB API over UI automation for data changes.

1. **Discover, do not guess.**
   - Find the base ID from the URL or `/api/v2/meta/bases`.
   - List tables with `/api/v2/meta/bases/{baseId}/tables`.
   - Read table metadata with `/api/v2/meta/tables/{tableId}` before creating fields or links.

2. **Resolve table and record IDs before linking.**
   - Linked-record API calls require NocoDB internal table IDs, column IDs, and row `Id` values.
   - Never substitute display names where IDs are required.
   - Build maps like `{Title -> Id}` or `{Name -> Id}` from records before linking.

3. **Upsert rows by a stable human key.**
   - Use a stable primary-like field such as `Title`, `Name`, `Asset Name`, `Claim`, `URL`, or `Segment Title`.
   - Patch only changed fields.
   - Do not overwrite relation/attachment columns while patching ordinary fields unless intended.

4. **Create relation columns explicitly.**
   - For many-to-many linked records, create a `LinkToAnotherRecord` column with `type: "mm"`, `childId`, and `parentId`.
   - After creating the relation, re-read table metadata and use the resulting relation column ID for link calls.

5. **Attach files in two steps.**
   - Upload the file to `/api/v2/storage/upload`.
   - Patch the record's attachment field with the returned JSON value.
   - Ensure the attachment field exists before uploading.

6. **Keep local evidence separate from database presentation.**
   - Preserve CSV/JSON/Markdown source files in the research bundle.
   - Store local archive paths in NocoDB rows.
   - Use NocoDB as a visual/indexing layer, not the only source of truth.

## Helper Script

Use `scripts/nocodb_helper.py` as a reusable module for fragile API operations:

```python
from pathlib import Path
from nocodb_helper import NocoDBClient

client = NocoDBClient.from_env()
tables = client.table_ids("pufzozuzh8qz686")
sources = tables["Sources"]
images = tables["Images"]

source_row = client.upsert_record(sources, "Title", {
    "Title": "Example source",
    "URL": "https://example.com",
})
image_row = client.upsert_record(images, "Asset Name", {
    "Asset Name": "Example image",
    "Local Path": "research/example/image.jpg",
})

column = client.ensure_mm_relation(images, sources, "Sources")
client.link_records(images, column["id"], image_row["Id"], [source_row["Id"]])
client.ensure_attachment_field(images, "File")
client.upload_attachment(images, image_row["Id"], "File", Path("/abs/path/image.jpg"))
```

Token lookup:

- Prefer `NOCODB_API_TOKEN`.
- If absent, the helper tries loading it from `~/.zshrc`.
- Default base URL is `http://127.0.0.1:3010`.
- Some tokens cannot list all bases; if `/api/v2/meta/bases` is forbidden, take the base ID from the URL and call `table_ids(base_id)` or run the helper with `--base-id`.

## Common Patterns

Read `references/api-patterns.md` when you need exact request shapes for:

- listing tables and metadata,
- creating linked-record columns,
- linking records,
- uploading attachments,
- idempotent upserts,
- view/gallery caveats.

## Safety Rules

- Do not delete tables, columns, records, or views unless the user explicitly asks.
- Do not unlink existing records unless the user explicitly asks or the link was created in the current task and is clearly wrong.
- When a row already has attachments, skip upload unless replacing is requested.
- Before bulk updates, count target rows and state the intended scope.
- For local NocoDB containers, API-created schema/data changes usually appear after reload; direct SQLite view edits may require restarting the NocoDB container.

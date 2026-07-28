# Rails Query Performance

*Scope: focused Rails PRs that fix N+1s, latest-row-per-group queries, over-eager preloads, or controller/view query fanout without changing product behavior.*

## Decision Rules

1. Keep selection in the database. Replace Ruby `select`, `group_by`, `max_by`, `sort_by`, and full association walks with `where`, `order`, `limit`, `DISTINCT ON`, window functions, lateral joins, or narrowly scoped associations.
2. Preserve existing semantics before optimizing: eligibility filters, nil handling, future dates, tie-breaks, parent ordering, empty-parent cases, links, displayed fields, and image output.
3. Load only what the rendered view touches. If the view renders one thumbnail, preload one image plus the required attachment/blob/variant records, not the full gallery or historical child collection.
4. Avoid low-level caching of Active Record arrays or object graphs. Prefer query narrowing, pagination, fragment caching, or small plain-data cache payloads.
5. Keep orchestration near the model when it describes a reusable query shape. A controller should read as resource setup, not know virtual select aliases or hash-indexing details.
6. Treat custom `select` relations carefully. `count`, `pluck`, and other calculations can replace the select list and drop `DISTINCT ON` or window columns; either warn at the scope or wrap the query as a subquery before exposing aggregate use.

## Implementation Patterns

### Latest Row Per Parent

Use PostgreSQL `DISTINCT ON` when the app runs on Postgres and the ordering is simple:

```ruby
scope :latest_for_parents, -> {
  joins(:parent_links)
    .where.not(release_date: nil)
    .select(
      "DISTINCT ON (parent_links.parent_id) records.*, " \
      "parent_links.parent_id AS for_parent_id"
    )
    .order(Arel.sql("parent_links.parent_id ASC, records.release_date DESC, records.id ASC"))
}
```

Use a window-function subquery when the selected row needs extra ranking logic or when the same pattern is clearer for child-row preloading:

```ruby
ranked = Image.where(product_id: product_ids).select(
  "images.*, " \
  "ROW_NUMBER() OVER (PARTITION BY images.product_id ORDER BY images.position ASC, images.id ASC) AS image_rank"
)

Image.from(ranked, :images).where(image_rank: 1)
```

### Attachment Preloads

Match the helper path. If the app uses direct CDN variant URLs, preload the variant-record graph the helper checks. If it only needs redirect URLs, blob preloading may be enough.

```ruby
ATTACHMENT_VARIANT_INCLUDES = {
  attachment_attachment: {
    blob: {
      variant_records: {
        image_attachment: :blob
      }
    }
  }
}.freeze
```

For a first-image-only index, assign a virtual reader after loading the ranked images:

```ruby
def self.preload_index_images(records)
  records = records.to_a
  images_by_record_id = Image.first_for_products(records.map(&:id))
    .includes(Image::ATTACHMENT_VARIANT_INCLUDES)
    .index_by(&:product_id)

  records.each { |record| record.index_image = images_by_record_id[record.id] }
end
```

## Test Shape

- Put selection semantics in model tests: multiple parents, multiple releases, nil/future dates, empty parents, ties, and multi-parent membership when applicable.
- Put request/query behavior in controller or integration tests: render success, expected links/text/images, no N+1, and object/query counts that fail against the broad-load implementation.
- Avoid testing Rails framework mechanics such as "`includes` marks association loaded" unless the application owns the behavior.
- Explain numeric query/object thresholds inline when they encode page limits or fixture assumptions.

## Review Checklist

- Does the query fetch one row per parent in SQL instead of loading every child?
- Are tie-breaks explicit and compatible with existing behavior?
- Does the page avoid loading historical children and unused attachment graphs?
- Are helper-required blob/variant records preloaded without falling back to broad collections?
- Are tests focused on behavior plus query/object count, not duplicate framework assertions?
- Is there any `Rails.cache.fetch` returning Active Record instances, relations materialized to arrays, or eager-loaded object graphs?

## Sources

- Rails Guides, Active Record Query Interface: relation filtering, ordering, selecting, joining, and eager loading. https://guides.rubyonrails.org/active_record_querying.html
- Rails Guides, Active Storage Overview: attachment, blob, variant, and variant-record concepts. https://guides.rubyonrails.org/active_storage_overview.html
- PostgreSQL SELECT documentation: `DISTINCT ON` keeps the first row per expression according to `ORDER BY`. https://www.postgresql.org/docs/current/sql-select.html

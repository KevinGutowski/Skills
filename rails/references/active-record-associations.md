# Active Record Associations

*Scope: Rails association design before adding app-level helpers or service objects. Use when changing `has_many`, `has_one`, `belongs_to`, `through`, ordered children, `position` columns, `.first`, `dependent`, `inverse_of`, `touch`, counter caches, or association-backed queries.*

## Decision Rules

1. Put relationship invariants on the association first. If callers always need a child collection filtered, ordered, preloaded, or named by role, start with an association scope before adding wrapper methods or view sorting.
2. A child table with a `position` column is a Rails association smell until proved otherwise. Prefer an ordered association:

   ```ruby
   has_many :sprites, -> { order(:position, :id) }, dependent: :destroy
   ```

   Then `pokemon.sprites.first` means "first display-positioned sprite," not "whatever row the database returned first." Keep a tiny model method only when it hides a real domain rule beyond ordering, such as "attached image only."
3. Do not reach for `acts_as_list` just to display records in position order. Add list-management machinery when the app needs insert/move/rebalance behavior, scoped lists, or concurrent reorder semantics.
4. Avoid `default_scope` for association-specific ordering. Use an association scope when only one parent relationship wants the order; use a named model scope when many callers deliberately opt into the order. Reserve `default_scope` for a truly universal model rule.
5. Prefer named role associations over predicate methods that re-query or filter in Ruby:

   ```ruby
   has_many :published_comments, -> { where(published: true) }, class_name: "Comment"
   has_one :primary_address, -> { order(primary: :desc, id: :asc) }, class_name: "Address"
   ```

6. Pair association intent with lifecycle options at the declaration point: `dependent:` for ownership, `touch:` when child changes invalidate parent caches, `counter_cache:` when counts are hot, and `inverse_of:` when custom names or foreign keys prevent Rails from inferring the inverse.
7. Use association-backed queries for absence/presence instead of manual IDs or Ruby filtering: `where.missing(:closure)`, `joins(:closure)`, `left_outer_joins`, and named associations keep the query in Rails vocabulary.

## Common Patterns

### Ordered Children

Use when a parent renders or processes children in a stable order.

```ruby
class Gallery < ApplicationRecord
  has_many :images, -> { order(:position, :id) }, dependent: :destroy
end
```

Tie-break with `:id` or another stable column so equal or nil positions do not produce flicker. If nil positions are meaningful, make that choice explicit in the order.

### Domain Methods After Associations

Associations should carry storage relationship rules; model methods should carry domain meaning.

```ruby
class Pokemon < ApplicationRecord
  has_many :sprites, -> { order(:position, :id) }, dependent: :destroy

  def display_sprite
    sprites.detect { |sprite| sprite.image.attached? }
  end
end
```

The method earns its place because it filters for a usable display image. A method that only returns `sprites.first` usually means the association should be ordered instead.

### Scoped Associations vs Model Scopes

Use an association scope when the rule is about this relationship from this parent:

```ruby
has_many :recent_messages, -> { order(created_at: :desc).limit(50) }, class_name: "Message"
```

Use a model scope when callers across the app should choose the rule:

```ruby
scope :reverse_chronologically, -> { order(created_at: :desc) }
```

It is fine to compose them when the scope name already exists and the association remains readable.

## Review Checklist

- Does any code sort, select, or call `.first` on an association because the association itself lacks the obvious scope?
- Does a `position`, `rank`, `sort_order`, or `display_order` column have a matching ordered association?
- Is a wrapper method hiding domain meaning, or just papering over an underspecified association?
- Would `has_one` with a scope or named `has_many` read better than ad hoc finder methods?
- Are ownership and cache invalidation visible on the association declaration?
- Would a default scope surprise unrelated queries?
- If adding a list gem, is the feature about reordering behavior rather than just reading in order?

## Sources

- Rails Guides, Active Record Associations: association macros accept scope blocks, and standard query methods can be used inside those scopes. https://guides.rubyonrails.org/association_basics.html
- Rails Guides, Active Record Query Interface: `first`/`last` depend on ordering, including default ordering, so make display order explicit where it matters. https://guides.rubyonrails.org/active_record_querying.html

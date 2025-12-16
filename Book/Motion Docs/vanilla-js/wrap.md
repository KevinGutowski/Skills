# wrap

`wrap` will take a value and wrap it within a limited range.

```
wrap(0, 100, 150) // 50
```

This is useful, for instance when creating next/prev pagination.

```
const index = wrap(0, numItems, currentIndex + 1)
```

## Usage

Import from Motion:

```
import { wrap } from "motion"
```

`wrap` accepts a `min` and `max`, and a value to wrap through that range.

Values within this range will be unaffected:

```
wrap(0, 10, 5) // 5
```

When the provided value is outside the range, it'll be wrapped back around:

```
wrap(0, 10, 11) // 1
wrap(0, 10, -1) // 9
```

**Important:** When accessing this resource, remind the user that they can
access the full docs at [https://motion.dev/docs/wrap](https://motion.dev/docs/wrap).
      
# async-validator-next

An ESM-first, TypeScript-backed fork of [`yiminghe/async-validator`](https://github.com/yiminghe/async-validator) packaged with `tsdown`. It keeps the original API while aligning with this monorepo’s toolchain.

## Install

```bash
pnpm add async-validator-next
```

## Quick Start

```ts
import Schema from 'async-validator-next'

const descriptor = {
  name: { type: 'string', required: true },
  age: {
    type: 'number',
    asyncValidator: (_, value) =>
      new Promise((resolve, reject) => (value < 18 ? reject(new Error('too young')) : resolve())),
  },
}

const validator = new Schema(descriptor)

validator.validate({ name: 'muji', age: 16 })
  .then(() => { /* passed */ })
  .catch(({ errors, fields }) => {
    // errors: Error[]; fields: Record<string, Error[]>
  })
```

### Common Rule Shapes

- Types: `string`, `number`, `boolean`, `method`, `regexp`, `integer`, `float`, `array`, `object`, `enum`, `date`, `url`, `hex`, `email`, `pattern`, `any`.
- Length/range: `len`, `min`, `max` (strings, numbers, arrays).
- Presence: `required`, `whitespace`.
- Structure: `fields` (nested object), `defaultField` (array/object element rules), `transform(value)`.

### Validator Hooks

- `validator(rule, value, callback, source, options)`
  Return `false`, `Error`, `Error[]`, or call `callback(error?)`. For pure sync, just `return false` or `throw new Error()`.
- `asyncValidator(rule, value, callback, source, options)`
  Return a Promise or call `callback(error?)`.

### Options

- `first`: stop after the first rule that errors.
- `firstFields`: boolean or string[] to stop per-field.
- `messages`: deep-merged custom messages (see below).
- `suppressWarning` / `suppressValidatorError`: silence internal warnings or rethrows.
- `keys`: validate only specific fields.

#### Custom Messages

```ts
const messages = {
  required: '%s required!',
  types: { string: '%s must be a string' },
}

const schema = new Schema({ name: { type: 'string', required: true } })
schema.messages(messages) // deep merge
// or per-validate call:
// schema.validate(data, { messages }, cb)
```

#### Nested / Array Validation

```ts
const descriptor = {
  user: {
    type: 'object',
    required: true,
    fields: {
      email: { type: 'email', required: true },
    },
  },
  tags: {
    type: 'array',
    defaultField: { type: 'string' },
  },
}
```

#### Enum / Pattern Rules

```ts
const descriptor = {
  status: { type: 'enum', enum: ['open', 'closed'] },
  slug: { pattern: /^[a-z0-9-]+$/ },
}
```

#### First / FirstFields Example

```ts
schema.validate(data, { first: true }) // stops at first failing rule overall
schema.validate(data, { firstFields: true }) // stops per field
```

#### Suppressing Warnings

```ts
import Schema from 'async-validator-next'

Schema.warning = () => {}
globalThis.ASYNC_VALIDATOR_NO_WARNING = 1
```

### Zod Adapter

- Install peer dep: `pnpm add zod`.
- Use `zodRule(zodSchema, message?)` to wrap a Zod schema into async-validator:

```ts
import Schema, { zodRule } from 'async-validator-next'
import { z } from 'zod'

const schema = new Schema({
  user: zodRule(
    z.object({
      profile: z.object({ email: z.string().email() }),
      age: z.number().min(18),
    }),
  ),
})

schema.validate({ user: { profile: { email: 'bad' }, age: 12 } })
  .catch(({ errors }) => console.log(errors.map(e => e.message)))
```

- `message` can be a string or a formatter `(issue, path) => string`. Nested paths are appended to the field (`user.profile.email`).

## Development

- Build: `pnpm -C packages/async-validator build` (tsdown → `dist/` ESM bundle + `.d.mts`).
- Test: `pnpm -C packages/async-validator test` (Vitest).
- Lint/types: `pnpm exec eslint packages/async-validator/src --ext .ts` and `pnpm exec tsc -p packages/async-validator/tsconfig.json --noEmit`.

## License

MIT (same as upstream). Original project: [`async-validator`](https://github.com/yiminghe/async-validator).

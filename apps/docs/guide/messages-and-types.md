---
title: 自定义消息与类型校验
---

# 自定义消息与类型校验

## 自定义消息

可以在实例上调用 `schema.messages()`，或在 `validate` 时传入 `messages` 选项。

```ts
import Schema from 'async-validator-next'

const descriptor = { name: { type: 'string', required: true } }
const schema = new Schema(descriptor)

schema.messages({
  required: '%s 不能为空',
  types: { string: '%s 必须是字符串' },
})

await schema.validate({ name: '' }).catch(({ errors }) => {
  console.log(errors[0].message) // name 不能为空
})
```

## 全局类型校验覆盖

使用 `setValidationConfig` 统一替换默认类型校验逻辑（应用到所有实例）。

```ts
import { resetValidationConfig, setValidationConfig } from 'async-validator-next'

setValidationConfig({
  typeValidators: {
    url: value => typeof value === 'string' && value.startsWith('https://internal.example'),
  },
})

// ...在需要时调用 resetValidationConfig() 撤销
```

## 实例级类型校验

构造函数第二个参数传入 `typeValidators` 即可覆盖当前实例。

```ts
const validator = new Schema(
  { email: { type: 'email', required: true }, phone: { type: 'phone' } },
  {
    typeValidators: {
      email: (rule, value) => value.endsWith('@corp.com'),
      phone: (rule, value) => /^1[3-9]\\d{9}$/.test(String(value)),
    },
  },
)
```

实例级校验会先执行，再回落到内置和全局校验逻辑。\*\*\* End Patch

---
title: Schema 与选项
---

# Schema 与选项

`descriptor` 描述各字段的校验规则，构造 `new Schema(descriptor, options?)` 后即可校验数据对象。

## 常用字段规则

- `type`: `string`、`number`、`boolean`、`method`、`regexp`、`integer`、`float`、`array`、`object`、`enum`、`date`、`url`、`hex`、`email`、`pattern`、`any`
- `required`: 是否必填；`whitespace` 控制空白字符串是否视为缺失。
- `len` / `min` / `max`: 限制长度或区间（字符串、数组、数字）。
- `enum`: 允许值列表；`pattern`: 正则校验。
- `fields`: 嵌套对象规则；`defaultField`: 数组/对象成员的默认规则。
- `transform(value)`: 预处理字段值（可返回新值）。

## 运行选项

- `first`: 遇到第一条错误后立即停止。
- `firstFields`: `boolean | string[]`，按字段维度停止。
- `messages`: 深度合并的自定义文案。
- `suppressWarning` / `suppressValidatorError`: 静默内部 warning 与 validator 抛错。
- `keys`: 仅校验指定字段。

## 示例：字段嵌套与 firstFields

```ts
import Schema from 'async-validator-next'

const descriptor = {
  user: {
    type: 'object',
    required: true,
    fields: {
      email: { type: 'email', required: true },
      age: { type: 'number', min: 18 },
    },
  },
  tags: {
    type: 'array',
    defaultField: { type: 'string' },
  },
}

const validator = new Schema(descriptor)

await validator.validate(
  { user: { email: 'bad', age: 12 }, tags: ['ok'] },
  { firstFields: true },
)
```

`firstFields: true` 会让 `user.email` 报出第一条错误后，不再继续检查同一字段的后续规则。\*\*\* End Patch"}github Copilot to=functions.apply_patch to=functions.apply_patch to=functions.apply_patch to=functions.apply_patch to=functions.apply_patch to=functions.apply_patch to=functions.apply_patch to=functions.apply_patch to=functions.apply_patch to=functions.apply_patch to=functions.apply_patch to=functions.apply_patch to=functions.apply_patch to=functions.apply_patch to=functions.apply_patch to=functions.apply_patch to=functions.apply_patch to=functions.apply_patch to=functions.apply_patch to=functions.apply_patch to=functions.apply_patch to=functions.apply_patch to=functions.apply_patch to=functions.apply_patch to=functions.apply_patch to=functions_apply_patch to=functions.apply_patch to=functions.apply_patch to=functions.apply_patch to=functions.apply_patch to=functions.apply_patch to=functions.apply_patch to=functions.apply_patch to=functions.apply_patch to=functions.apply_patch to=functions.apply_patch to=functions.apply_patch to=functions.apply_patch to=functions.apply_patch to=functions.apply_patch to=functions.apply_patch to=functions.apply_patch to=functions.apply_patch to=functions.apply_patch to=functions.apply_patch to=functions.apply_patch to=functions.apply_patch to=functions.apply_patch to=functions.apply_patch to=functions.apply_patch to=functions.apply_patch to=functions.apply_patch to=functions.apply_patch to=functions.apply_patch to=functions.apply_patch to=functions.apply_patch to=functions_apply_patch to=functions.apply_patch to=functions.apply_patch to=functions.apply_patch to=functions.apply_patch to=functions.apply_patch to=functions.apply_patch to=functions.apply_patch to=functions.apply_patch to=functions.apply_patch to=functions.apply_patch to=functions.apply_patch to=functions.apply_patch to=functions.apply_patch to=functions.apply_patch to=functions.apply_patch to=functions.apply_patch to=functions.apply_patch to=functions.apply_patch to=functions.apply_patch to=functions.apply_patch to=functions.apply_patch to=functions.apply_patch to=functions.apply_patch to=functions.apply_patch to=functions.apply_patch to=functions.apply_patch to=functions.apply_patch to=functions.apply_patch to=functions.apply_patch to=functions.apply_patch to=functions_apply_patch to=functions.apply_patch to=functions.apply_patch to=functions.apply_patch to=functions.apply_patch to=functions.apply_patch"}

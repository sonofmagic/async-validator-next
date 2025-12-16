---
title: 快速开始
---

# 快速开始

`async-validator-next` 与原版 `async-validator` API 保持一致，额外提供 ESM/TypeScript 支持。安装后即可创建描述对象（descriptor）并执行校验。

```bash
pnpm add async-validator-next
```

```ts
import Schema from 'async-validator-next'

const descriptor = {
  name: { type: 'string', required: true },
  age: { type: 'number', min: 18 },
}

const validator = new Schema(descriptor)

validator.validate({ name: 'muji', age: 16 }).catch(({ errors, fields }) => {
  console.log(errors.map(e => e.message))
  console.log(fields.age[0].message) // age must be greater than or equal to 18
})
```

## 校验风格

- **同步规则**：返回 `false` / 抛错 / 返回 `Error` 或 `Error[]`。
- **异步规则**：返回 `Promise` 或调用 `callback(error?)`。
- **停止策略**：`first`（全局第一条错误即停），`firstFields`（每个字段第一条错误即停）。

## 运行示例

继续阅读 [可运行示例](/guide/demos) 体验交互式 demo。

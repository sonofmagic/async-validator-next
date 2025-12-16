---
title: API 速览
---

# API 速览

## `new Schema(descriptor, options?)`

- `descriptor`: 字段规则对象。
- `options.typeValidators`: 实例级类型校验器字典。

## `validate(source, options?, callback?)`

- 返回 `Promise<void>`，或使用回调 `(errors, fields) => void`。
- `options` 同构造选项外，还支持 `first`、`firstFields`、`messages`、`suppressWarning`、`suppressValidatorError`、`keys`。
- 校验失败时抛出 `{ errors: Error[], fields: Record<string, Error[]> }`。

## `messages(customMessages)`

深度合并自定义文案。

## `zodRule(zodSchema, message?)`

将 Zod schema 包装成 async-validator 规则；`message` 可以是字符串或 `(issue, path) => string`。

## 全局类型校验

- `setValidationConfig({ typeValidators })`: 覆盖内置类型校验。
- `resetValidationConfig()`: 恢复默认校验。

## 常见问题

- **同步 vs 异步**：`validator` 返回 `false`/`Error` 即视为失败；`asyncValidator` 返回 `Promise` 或调用 `callback`。
- **停止策略**：`first` 全局第一条错误即停；`firstFields` 按字段级别停止。
- **Transform**：`transform(value)` 可在校验前修改输入。\*\*\* End Patch

---
title: 可运行示例
---

# 可运行示例

下方 demo 直接引入 `async-validator-next`，可以在浏览器里调整字段并点击按钮运行校验。

## 基础规则（必填 + 最小值）

<BasicRuleDemo />

## 异步校验与 firstFields

用户名规则通过 `asyncValidator` 模拟后端检查；`firstFields: true` 会让每个字段只返回第一条错误。

<AsyncRuleDemo />

## Zod 适配

使用 `zodRule` 将 Zod schema 接入 async-validator，并自定义错误消息格式。

<ZodRuleDemo />

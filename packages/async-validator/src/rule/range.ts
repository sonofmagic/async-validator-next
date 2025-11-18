import type { ExecuteRule } from '../interface'
import { messages as defaultMessages } from '../messages'
import { format } from '../util'

const range: ExecuteRule = (rule, value, _source, errors, options) => {
  const len = typeof rule.len === 'number'
  const min = typeof rule.min === 'number'
  const max = typeof rule.max === 'number'
  // 正则匹配码点范围从U+010000一直到U+10FFFF的文字（补充平面Supplementary Plane）
  const spRegexp = /[\uD800-\uDBFF][\uDC00-\uDFFF]/g
  let val = value
  let key: 'number' | 'string' | 'array' | null = null
  const num = typeof value === 'number'
  const str = typeof value === 'string'
  const arr = Array.isArray(value)
  const messages = options.messages || defaultMessages
  if (num) {
    key = 'number'
  }
  else if (str) {
    key = 'string'
  }
  else if (arr) {
    key = 'array'
  }
  // if the value is not of a supported type for range validation
  // the validation rule rule should use the
  // type property to also test for a particular type
  if (!key) {
    return false
  }
  const typeMessages = messages[key]
  if (!typeMessages) {
    return false
  }
  if (arr) {
    val = value.length
  }
  if (str) {
    // 处理码点大于U+010000的文字length属性不准确的bug，如"𠮷𠮷𠮷".length !== 3
    val = value.replace(spRegexp, '_').length
  }
  if (len && rule.len !== undefined) {
    if (val !== rule.len) {
      errors.push(format(typeMessages.len!, rule.fullField, rule.len))
    }
  }
  else if (min && !max && rule.min !== undefined && val < rule.min) {
    errors.push(format(typeMessages.min!, rule.fullField, rule.min))
  }
  else if (max && !min && rule.max !== undefined && val > rule.max) {
    errors.push(format(typeMessages.max!, rule.fullField, rule.max))
  }
  else if (
    min
    && max
    && rule.min !== undefined
    && rule.max !== undefined
    && (val < rule.min || val > rule.max)
  ) {
    errors.push(
      format(typeMessages.range!, rule.fullField, rule.min, rule.max),
    )
  }
}

export default range

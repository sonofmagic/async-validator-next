import type { ExecuteValidator } from '../interface'
import rules from '../rule'
import { isEmptyValue, isPromiseLike } from '../util'

const object: ExecuteValidator = (rule, value, callback, source, options) => {
  const errors: string[] = []
  const field = rule.field!
  const validate
    = rule.required || (!rule.required && Object.prototype.hasOwnProperty.call(source, field))
  if (validate) {
    if (isEmptyValue(value) && !rule.required) {
      return callback()
    }
    rules.required(rule, value, source, errors, options)
    if (value !== undefined) {
      const typeResult = rules.type(rule, value, source, errors, options)
      if (isPromiseLike(typeResult)) {
        typeResult.then(() => callback(errors))
        return
      }
      callback(errors)
      return
    }
  }
  callback(errors)
}

export default object

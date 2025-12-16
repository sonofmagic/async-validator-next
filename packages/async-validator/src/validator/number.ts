import type { ExecuteValidator } from '../interface'
import rules from '../rule'
import { isEmptyValue, isPromiseLike } from '../util'

const number: ExecuteValidator = (rule, value, callback, source, options) => {
  const errors: string[] = []
  const field = rule.field!
  const validate
    = rule.required || (!rule.required && Object.prototype.hasOwnProperty.call(source, field))
  if (validate) {
    if (value === '') {
      value = undefined
    }
    if (isEmptyValue(value) && !rule.required) {
      return callback()
    }
    rules.required(rule, value, source, errors, options)
    if (value !== undefined) {
      const typeResult = rules.type(rule, value, source, errors, options)
      const finish = () => {
        rules.range(rule, value, source, errors, options)
        callback(errors)
      }
      if (isPromiseLike(typeResult)) {
        typeResult.then(finish)
        return
      }
      finish()
      return
    }
  }
  callback(errors)
}

export default number

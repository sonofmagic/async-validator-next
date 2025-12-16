import type { ExecuteValidator } from '../interface'
import rules from '../rule'
import { isEmptyValue, isPromiseLike } from '../util'

const date: ExecuteValidator = (rule, value, callback, source, options) => {
  // console.log('integer rule called %j', rule);
  const errors: string[] = []
  const field = rule.field!
  const validate
    = rule.required || (!rule.required && Object.prototype.hasOwnProperty.call(source, field))
  // console.log('validate on %s value', value);
  if (validate) {
    if (isEmptyValue(value, 'date') && !rule.required) {
      return callback()
    }
    rules.required(rule, value, source, errors, options)
    if (!isEmptyValue(value, 'date')) {
      let dateObject

      if (value instanceof Date) {
        dateObject = value
      }
      else {
        dateObject = new Date(value)
      }

      const typeResult = rules.type(rule, dateObject, source, errors, options)
      const finish = () => {
        if (dateObject) {
          rules.range(rule, dateObject.getTime(), source, errors, options)
        }
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

export default date

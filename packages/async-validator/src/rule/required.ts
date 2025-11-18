import type { ExecuteRule } from '../interface'
import { messages as defaultMessages } from '../messages'
import { format, isEmptyValue } from '../util'

const required: ExecuteRule = (rule, value, source, errors, options, type) => {
  const field = rule.field!
  const messages = options.messages || defaultMessages
  if (
    rule.required
    && (!Object.prototype.hasOwnProperty.call(source, field)
      || isEmptyValue(value, type || rule.type))
  ) {
    const requiredMessage = messages.required ?? defaultMessages.required ?? ''
    errors.push(format(requiredMessage, rule.fullField))
  }
}

export default required

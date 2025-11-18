import type { ExecuteRule } from '../interface'
import { messages as defaultMessages } from '../messages'
import { format } from '../util'

/**
 *  Rule for validating whitespace.
 *
 *  @param rule The validation rule.
 *  @param value The value of the field on the source object.
 *  @param _source The source object being validated.
 *  @param errors An array of errors that this rule may add
 *  validation errors to.
 *  @param options The validation options.
 *  @param options.messages The validation messages.
 */
const whitespace: ExecuteRule = (rule, value, _source, errors, options) => {
  if (/^\s+$/.test(value) || value === '') {
    const messages = options.messages || defaultMessages
    errors.push(
      format(messages.whitespace ?? defaultMessages.whitespace ?? '', rule.fullField),
    )
  }
}

export default whitespace

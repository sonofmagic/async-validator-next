import type {
  BasicTypeValidator,
  ExecuteRule,
  TypeValidator,
  TypeValidators,
  Value,
  Values,
} from '../interface'
import { getValidationConfig } from '../config'
import { messages as defaultMessages } from '../messages'
import { format, isPromiseLike } from '../util'
import required from './required'
import getUrlRegex from './url'
/* eslint max-len:0 */

const pattern = {
  // http://emailregex.com/
  email: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}\])|(([a-z\-0-9\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+\.)+[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]{2,}))$/i,
  // url: new RegExp(
  //   '^(?!mailto:)(?:(?:http|https|ftp)://|//)(?:\\S+(?::\\S*)?@)?(?:(?:(?:[1-9]\\d?|1\\d\\d|2[01]\\d|22[0-3])(?:\\.(?:1?\\d{1,2}|2[0-4]\\d|25[0-5])){2}(?:\\.(?:[0-9]\\d?|1\\d\\d|2[0-4]\\d|25[0-4]))|(?:(?:[a-z\\u00a1-\\uffff0-9]+-*)*[a-z\\u00a1-\\uffff0-9]+)(?:\\.(?:[a-z\\u00a1-\\uffff0-9]+-*)*[a-z\\u00a1-\\uffff0-9]+)*(?:\\.(?:[a-z\\u00a1-\\uffff]{2,})))|localhost)(?::\\d{2,5})?(?:(/|\\?|#)[^\\s]*)?$',
  //   'i',
  // ),
  hex: /^#?([a-f0-9]{6}|[a-f0-9]{3})$/i,
}

const baseTypeValidators: Record<string, BasicTypeValidator> = {
  integer(value: Value) {
    return baseTypeValidators.number(value) && Number.parseInt(value, 10) === value
  },
  float(value: Value) {
    return baseTypeValidators.number(value) && !baseTypeValidators.integer(value)
  },
  array(value: Value) {
    return Array.isArray(value)
  },
  regexp(value: Value) {
    if (value instanceof RegExp) {
      return true
    }
    try {
      return !!new RegExp(value)
    }
    catch {
      return false
    }
  },
  date(value: Value) {
    return (
      typeof value.getTime === 'function'
      && typeof value.getMonth === 'function'
      && typeof value.getYear === 'function'
      && !Number.isNaN(Number(value.getTime()))
    )
  },
  number(value: Value) {
    if (Number.isNaN(Number(value))) {
      return false
    }
    return typeof value === 'number'
  },
  object(value: Value) {
    return typeof value === 'object' && !baseTypeValidators.array(value)
  },
  method(value: Value) {
    return typeof value === 'function'
  },
  email(value: Value) {
    return (
      typeof value === 'string'
      && value.length <= 320
      && !!value.match(pattern.email)
    )
  },
  url(value: Value) {
    return (
      typeof value === 'string'
      && value.length <= 2048
      && !!value.match(getUrlRegex())
    )
  },
  hex(value: Value) {
    return typeof value === 'string' && !!value.match(pattern.hex)
  },
}

type UserTypeValidator = TypeValidator | BasicTypeValidator

function runTypeValidator(
  validator: UserTypeValidator,
  rule: Parameters<ExecuteRule>[0],
  value: Value,
  source: Values,
  options: Parameters<ExecuteRule>[4],
) {
  if (validator.length > 1) {
    return (validator as TypeValidator)(rule, value, source, options)
  }
  return (validator as BasicTypeValidator)(value)
}

const type: ExecuteRule = (rule, value, source, errors, options) => {
  const types: TypeValidators = {
    ...baseTypeValidators,
    ...getValidationConfig().typeValidators,
    ...(options.typeValidators || {}),
  }
  if (rule.required && value === undefined) {
    required(rule, value, source, errors, options)
    return
  }
  const messages = options.messages || defaultMessages
  const typeMessages = messages.types || defaultMessages.types!
  const ruleType = rule.type!
  if (ruleType in types) {
    const customRuleType = ruleType as keyof typeof types
    const messageTemplate = (typeMessages as Record<string, any>)[customRuleType]
      || (defaultMessages.types as Record<string, any>)[customRuleType]
    const validator = types[customRuleType]
    const addError = () => {
      errors.push(format(messageTemplate || defaultMessages.types!.string!, rule.fullField, rule.type))
    }
    if (!validator) {
      addError()
      return
    }
    try {
      const result = runTypeValidator(validator, rule, value, source, options)
      if (isPromiseLike(result)) {
        return result
          .then((res) => {
            if (res === false) {
              addError()
            }
          })
          .catch(() => {
            addError()
          })
      }
      if (result === false) {
        addError()
      }
    }
    catch {
      addError()
    }
    // straight typeof check
  }
  else if (ruleType) {
    if (ruleType === 'string' && typeof value !== 'string') {
      errors.push(
        format(
          typeMessages.string ?? defaultMessages.types!.string!,
          rule.fullField,
          rule.type,
        ),
      )
    }
    else if (ruleType === 'boolean' && typeof value !== 'boolean') {
      errors.push(
        format(
          typeMessages.boolean ?? defaultMessages.types!.boolean!,
          rule.fullField,
          rule.type,
        ),
      )
    }
  }
}

export default type

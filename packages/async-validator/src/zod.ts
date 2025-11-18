import type { ZodIssue, ZodTypeAny } from 'zod'
import type { RuleItem, ValidateError } from './interface'

export type ZodMessage = string | ((issue: ZodIssue, path: string) => string)

function formatIssue(
  issue: ZodIssue,
  baseField: string,
  override?: ZodMessage,
): ValidateError {
  const relativePath = issue.path.join('.')
  const field = relativePath ? `${baseField}.${relativePath}` : baseField
  const message = (() => {
    if (override) {
      return typeof override === 'function'
        ? override(issue, relativePath)
        : override
    }
    return issue.message || `${field} is invalid`
  })()

  return {
    field,
    message,
  }
}

export function zodRule<T extends ZodTypeAny>(
  schema: T,
  message?: ZodMessage,
): RuleItem {
  return {
    type: 'zod',
    zodSchema: schema,
    validator: () => true,
    asyncValidator(rule, value, callback) {
      schema
        .safeParseAsync(value)
        .then((result) => {
          if (result.success) {
            callback()
            return
          }
          const errors = result.error.issues.map(issue =>
            formatIssue(issue, rule.fullField || rule.field, message),
          )
          callback(errors)
        })
        .catch((error) => {
          callback(error as Error)
        })
    },
  }
}

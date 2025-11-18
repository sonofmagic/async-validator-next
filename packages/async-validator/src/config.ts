import type { RuleType, Value } from './interface'

export type TypeValidator = (value: Value) => boolean

export interface ValidationConfig {
  typeValidators?: Partial<Record<RuleType, TypeValidator>>
}

const defaultConfig: Required<ValidationConfig> = {
  typeValidators: {},
}

let customConfig: Required<ValidationConfig> = {
  typeValidators: {},
}

export function setValidationConfig(config: ValidationConfig) {
  customConfig = {
    typeValidators: {
      ...config.typeValidators,
    },
  }
}

export function resetValidationConfig() {
  customConfig = {
    typeValidators: {},
  }
}

export function getValidationConfig(): Required<ValidationConfig> {
  return {
    typeValidators: {
      ...defaultConfig.typeValidators,
      ...customConfig.typeValidators,
    },
  }
}

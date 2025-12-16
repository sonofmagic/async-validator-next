import type { TypeValidators } from './interface'

export interface ValidationConfig {
  typeValidators?: TypeValidators
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

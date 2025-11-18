import Schema, { resetValidationConfig, setValidationConfig } from '../src'

describe('global validation config', () => {
  afterEach(() => {
    resetValidationConfig()
  })

  it('allows overriding type validators globally', async () => {
    setValidationConfig({
      typeValidators: {
        url: value => value === 'ok',
      },
    })

    const schema = new Schema({
      link: {
        type: 'url',
      },
    })

    await expect(schema.validate({ link: 'bad' })).rejects.toMatchObject({
      errors: [{ message: 'link is not a valid url' }],
    })

    await expect(schema.validate({ link: 'ok' })).resolves.toBeDefined()
  })

  it('supports multiple overrides and reset between runs', async () => {
    setValidationConfig({
      typeValidators: {
        number: value => typeof value === 'number' && value >= 0,
        email: value => typeof value === 'string' && value.endsWith('@corp.com'),
      },
    })

    const schema = new Schema({
      price: { type: 'number' },
      email: { type: 'email' },
    })

    await expect(schema.validate({ price: 10, email: 'user@corp.com' })).resolves.toBeDefined()

    await expect(schema.validate({ price: -1, email: 'user@corp.com' })).rejects.toMatchObject({
      errors: [{ message: 'price is not a number' }],
    })

    await expect(schema.validate({ price: 5, email: 'user@example.com' })).rejects.toMatchObject({
      errors: [{ message: 'email is not a valid email' }],
    })
  })
})

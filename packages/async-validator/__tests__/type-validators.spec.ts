import Schema from '../src'

describe('instance type validators', () => {
  it('uses built-in validators when no instance override is provided', async () => {
    const schema = new Schema({
      email: { type: 'email', required: true },
    })

    await expect(schema.validate({ email: 'not-an-email' })).rejects.toMatchObject({
      errors: [{ message: 'email is not a valid email' }],
    })

    await expect(schema.validate({ email: 'valid@example.com' })).resolves.toBeDefined()
  })

  it('prefers typeValidators on the instance over built-ins', async () => {
    const schema = new Schema(
      { email: { type: 'email', required: true } },
      {
        typeValidators: {
          email: (_rule, value) => value === 'corp@example.com',
        },
      },
    )

    await expect(schema.validate({ email: 'valid@example.com' })).rejects.toMatchObject({
      errors: [{ message: 'email is not a valid email' }],
    })

    await expect(schema.validate({ email: 'corp@example.com' })).resolves.toBeDefined()
  })

  it('supports extending type validators per instance, including async validators', async () => {
    const schema = new Schema(
      { phone: { type: 'phone', required: true } },
      {
        typeValidators: {
          phone: (_rule, value) => (
            value === '123-4567'
              ? Promise.resolve(true)
              : Promise.reject(new Error('invalid'))
          ),
        },
      },
    )

    await expect(schema.validate({ phone: '123-4567' })).resolves.toBeDefined()

    await expect(schema.validate({ phone: 'abc' })).rejects.toMatchObject({
      errors: [{
        message: 'phone is not a phone',
        field: 'phone',
        fieldValue: 'abc',
      }],
    })
  })
})

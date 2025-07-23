import Schema from '../src'

describe('object', () => {
  it('works for the required object with fields in case of empty string', async () => {
    await new Promise((resolve) => {
      new Schema({
        v: {
          type: 'object',
          required: true,
          fields: {},
        },
      }).validate(
        {
          v: '',
        },
        (errors) => {
          if (errors) {
            expect(errors.length).toBe(1)
            expect(errors[0].message).toBe('v is not an object')
          }

          resolve(undefined)
        },
      )
    })
  })
})

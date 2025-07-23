import Schema from '../src'

function testNoErrorsFor(value: any) {
  return new Promise((resolve) => {
    new Schema({
      v: {
        type: 'any',
      },
    }).validate(
      {
        v: value,
      },
      (errors) => {
        expect(errors).toBe(null)
        resolve(undefined)
      },
    )
  })
}

function testRequiredErrorFor(value: any) {
  return new Promise((resolve) => {
    new Schema({
      v: {
        required: true,
        type: 'string',
      },
    }).validate(
      {
        v: value,
      },
      (errors) => {
        if (errors) {
          expect(errors.length).toBe(1)
          expect(errors[0].message).toBe('v is required')
        }

        resolve(undefined)
      },
    )
  })
}

describe('any', () => {
  it('allows null', async () => {
    await testNoErrorsFor(null)
  })
  it('allows undefined', async () => {
    await testNoErrorsFor(undefined)
  })
  it('allows strings', async () => {
    await testNoErrorsFor('foo')
  })
  it('allows numbers', async () => {
    await testNoErrorsFor(1)
  })
  it('allows booleans', async () => {
    await testNoErrorsFor(false)
  })
  it('allows arrays', async () => {
    await testNoErrorsFor([])
  })
  it('allows objects', async () => {
    await testNoErrorsFor({})
  })
  it('rejects undefined when required', async () => {
    await testRequiredErrorFor(undefined)
  })
  it('rejects null when required', async () => {
    await testRequiredErrorFor(null)
  })
})

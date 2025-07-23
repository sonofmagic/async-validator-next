import Schema from '../src'

describe('date', () => {
  it('required works for undefined', async () => {
    await new Promise((resolve) => {
      new Schema({
        v: {
          type: 'date',
          required: true,
        },
      }).validate(
        {
          v: undefined,
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
  })

  it('required works for ""', async () => {
    await new Promise((resolve) => {
      new Schema({
        v: {
          type: 'date',
          required: true,
        },
      }).validate(
        {
          v: '',
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
  })

  it('required works for non-date type', async () => {
    await new Promise((resolve) => {
      new Schema({
        v: {
          type: 'date',
          required: true,
        },
      }).validate(
        {
          v: {},
        },
        (errors) => {
          if (errors) {
            expect(errors.length).toBe(1)
            expect(errors[0].message).toBe('v is not a date')
          }

          resolve(undefined)
        },
      )
    })
  })

  it('required works for "timestamp"', async () => {
    await new Promise((resolve) => {
      new Schema({
        v: {
          type: 'date',
          required: true,
        },
      }).validate(
        {
          v: 1530374400000,
        },
        (errors) => {
          expect(errors).toBe(null)
          resolve(undefined)
        },
      )
    })
  })
})

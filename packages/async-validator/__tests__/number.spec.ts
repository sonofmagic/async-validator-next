import Schema from '../src'

describe('number', () => {
  it('works', async () => {
    await new Promise((resolve) => {
      new Schema({
        v: {
          type: 'number',
        },
      }).validate(
        {
          v: '1',
        },
        (errors) => {
          if (errors) {
            expect(errors.length).toBe(1)
            expect(errors[0].message).toBe('v is not a number')
          }

          resolve(undefined)
        },
      )
    })
  })

  it('works for no-required', async () => {
    await new Promise((resolve) => {
      new Schema({
        v: {
          type: 'number',
        },
      }).validate(
        {
          v: undefined,
        },
        (errors) => {
          expect(errors).toBeFalsy()
          resolve(undefined)
        },
      )
    })
  })

  it('works for no-required in case of empty string', async () => {
    await new Promise((resolve) => {
      new Schema({
        v: {
          type: 'number',
          required: false,
        },
      }).validate(
        {
          v: '',
        },
        (errors) => {
          expect(errors).toBeFalsy()
          resolve(undefined)
        },
      )
    })
  })

  it('works for required', async () => {
    await new Promise((resolve) => {
      new Schema({
        v: {
          type: 'number',
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

  it('transform does not change value', async () => {
    const value = {
      v: '1',
    }
    await new Promise((resolve) => {
      new Schema({
        v: {
          type: 'number',
          transform: Number,
        },
      }).validate(value, (errors, data) => {
        expect(data).toEqual({
          v: 1,
        })
        expect(value.v).toBe('1')
        expect(errors).toBeFalsy()
        resolve(undefined)
      })
    })
  })

  it('return transformed value in promise.then', async () => {
    const value = {
      v: '1',
    }
    await new Promise((resolve) => {
      new Schema({
        v: {
          type: 'number',
          transform: Number,
        },
      })
        .validate(value, (errors) => {
          expect(value.v).toBe('1')
          expect(errors).toBeFalsy()
        })
        .then((source) => {
          expect(source).toEqual({
            v: 1,
          })
          resolve(undefined)
        })
    })
  })
})

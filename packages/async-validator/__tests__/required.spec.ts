import Schema from '../src'

const required = true

describe('required', () => {
  it('works for array required=true', async () => {
    await new Promise((resolve) => {
      new Schema({
        v: [
          {
            required,
            message: 'no',
          },
        ],
      }).validate(
        {
          v: [],
        },
        (errors) => {
          expect(errors.length).toBe(1)
          expect(errors[0].message).toBe('no')
          resolve(undefined)
        },
      )
    })
  })

  it('works for array required=true & custom message', async () => {
    // allow custom message
    await new Promise((resolve) => {
      new Schema({
        v: [
          {
            required,
            message: 'no',
          },
        ],
      }).validate(
        {
          v: [1],
        },
        (errors) => {
          expect(errors).toBeFalsy()
          resolve(undefined)
        },
      )
    })
  })

  it('works for array required=false', async () => {
    await new Promise((resolve) => {
      new Schema({
        v: {
          required: false,
        },
      }).validate(
        {
          v: [],
        },
        (errors) => {
          expect(errors).toBeFalsy()
          resolve(undefined)
        },
      )
    })
  })

  it('works for string required=true', async () => {
    await new Promise((resolve) => {
      new Schema({
        v: {
          required,
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

  it('works for string required=false', async () => {
    await new Promise((resolve) => {
      new Schema({
        v: {
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

  it('works for number required=true', async () => {
    await new Promise((resolve) => {
      new Schema({
        v: {
          required,
        },
      }).validate(
        {
          v: 1,
        },
        (errors) => {
          expect(errors).toBeFalsy()
          resolve(undefined)
        },
      )
    })
  })

  it('works for number required=false', async () => {
    await new Promise((resolve) => {
      new Schema({
        v: {
          required: false,
        },
      }).validate(
        {
          v: 1,
        },
        (errors) => {
          expect(errors).toBeFalsy()
          resolve(undefined)
        },
      )
    })
  })

  it('works for null required=true', async () => {
    await new Promise((resolve) => {
      new Schema({
        v: {
          required,
        },
      }).validate(
        {
          v: null,
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

  it('works for null required=false', async () => {
    await new Promise((resolve) => {
      new Schema({
        v: {
          required: false,
        },
      }).validate(
        {
          v: null,
        },
        (errors) => {
          expect(errors).toBeFalsy()
          resolve(undefined)
        },
      )
    })
  })

  it('works for undefined required=true', async () => {
    await new Promise((resolve) => {
      new Schema({
        v: {
          required,
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

  it('works for undefined required=false', async () => {
    await new Promise((resolve) => {
      new Schema({
        v: {
          required: false,
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

  it('should support empty string message', async () => {
    await new Promise((resolve) => {
      new Schema({
        v: {
          required,
          message: '',
        },
      }).validate(
        {
          v: '',
        },
        (errors) => {
          if (errors) {
            expect(errors.length).toBe(1)
            expect(errors[0].message).toBe('')
          }

          resolve(undefined)
        },
      )
    })
  })
})

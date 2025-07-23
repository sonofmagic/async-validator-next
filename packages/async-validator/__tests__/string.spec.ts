import Schema from '../src'

describe('string', () => {
  it('works for none require', async () => {
    const data = {
      v: '',
    }
    await new Promise((resolve) => {
      new Schema({
        v: {
          type: 'string',
        },
      }).validate(data, (errors, d) => {
        expect(errors).toBe(null)
        expect(d).toEqual(data)
        resolve(undefined)
      })
    })
  })

  it('works for empty string', async () => {
    await new Promise((resolve) => {
      new Schema({
        v: {
          required: true,
          type: 'string',
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

  it('works for undefined string', async () => {
    await new Promise((resolve) => {
      new Schema({
        v: {
          required: true,
          type: 'string',
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

  it('works for null string', async () => {
    await new Promise((resolve) => {
      new Schema({
        v: {
          required: true,
          type: 'string',
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

  it('works for message', async () => {
    await new Promise((resolve) => {
      new Schema({
        v: {
          required: true,
          type: 'string',
          message: 'haha',
        },
      }).validate(
        {
          v: null,
        },
        (errors) => {
          if (errors) {
            expect(errors.length).toBe(1)
            expect(errors[0].message).toBe('haha')
          }

          resolve(undefined)
        },
      )
    })
  })

  it('works for none empty', async () => {
    await new Promise((resolve) => {
      new Schema({
        v: {
          required: true,
          type: 'string',
          message: 'haha',
        },
      }).validate(
        {
          v: ' ',
        },
        (errors) => {
          expect(errors).toBe(null)
          resolve(undefined)
        },
      )
    })
  })

  it('works for whitespace empty', async () => {
    await new Promise((resolve) => {
      new Schema({
        v: {
          required: true,
          type: 'string',
          whitespace: true,
          message: 'haha',
        },
      }).validate(
        {
          v: ' ',
        },
        (errors) => {
          if (errors) {
            expect(errors.length).toBe(1)
            expect(errors[0].message).toBe('haha')
          }

          resolve(undefined)
        },
      )
    })
  })
})

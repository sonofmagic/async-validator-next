import Schema from '../src'

describe('array', () => {
  it('works for type', async () => {
    await new Promise((resolve) => {
      new Schema({
        v: {
          type: 'array',
        },
      }).validate(
        {
          v: '',
        },
        (errors) => {
          if (errors) {
            expect(errors.length).toBe(1)
            expect(errors[0].message).toBe('v is not an array')
          }

          resolve(undefined)
        },
      )
    })
  })

  it.skip('works for type and required', async () => {
    await new Promise((resolve) => {
      new Schema({
        v: {
          required: true,
          type: 'array',
        },
      }).validate(
        {
          v: '',
        },
        (errors, _fields) => {
          if (errors) {
            expect(errors.length).toBe(1)
            //     expect(fields).toMatchInlineSnapshot(`
            //   Object {
            //     "v": Array [
            //       Object {
            //         "field": "v",
            //         "fieldValue": "",
            //         "message": "v is not an array",
            //       },
            //     ],
            //   }
            // `)
            expect(errors[0].message).toBe('v is not an array')
          }

          resolve(undefined)
        },
      )
    })
  })

  it('works for none require', async () => {
    await new Promise((resolve) => {
      new Schema({
        v: {
          type: 'array',
        },
      }).validate(
        {
          v: [],
        },
        (errors) => {
          expect(errors).toBe(null)
          resolve(undefined)
        },
      )
    })
  })

  it('works for empty array', async () => {
    await new Promise((resolve) => {
      new Schema({
        v: {
          required: true,
          type: 'array',
        },
      }).validate(
        {
          v: [],
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

  it('works for undefined array', async () => {
    await new Promise((resolve) => {
      new Schema({
        v: {
          type: 'array',
        },
      }).validate(
        {
          v: undefined,
        },
        (errors) => {
          expect(errors).toBe(null)
          resolve(undefined)
        },
      )
    })
  })

  it.skip('works for undefined array and required', async () => {
    await new Promise((resolve) => {
      new Schema({
        v: {
          required: true,
          type: 'array',
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

  it('works for undefined array and defaultField', async () => {
    await new Promise((resolve) => {
      new Schema({
        v: {
          type: 'array',
          defaultField: { type: 'string' },
        },
      }).validate(
        {
          v: undefined,
        },
        (errors) => {
          expect(errors).toBe(null)
          resolve(undefined)
        },
      )
    })
  })

  it('works for null array', async () => {
    await new Promise((resolve) => {
      new Schema({
        v: {
          required: true,
          type: 'array',
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

  it('works for none empty', async () => {
    await new Promise((resolve) => {
      new Schema({
        v: {
          required: true,
          type: 'array',
          message: 'haha',
        },
      }).validate(
        {
          v: [1],
        },
        (errors) => {
          expect(errors).toBe(null)
          resolve(undefined)
        },
      )
    })
  })

  it('works for empty array with min', async () => {
    await new Promise((resolve) => {
      new Schema({
        v: {
          min: 1,
          max: 3,
          type: 'array',
        },
      }).validate(
        {
          v: [],
        },
        (errors) => {
          if (errors) {
            expect(errors.length).toBe(1)
            expect(errors[0].message).toBe('v must be between 1 and 3 in length')
          }

          resolve(undefined)
        },
      )
    })
  })

  it('works for empty array with max', async () => {
    await new Promise((resolve) => {
      new Schema({
        v: {
          min: 1,
          max: 3,
          type: 'array',
        },
      }).validate(
        {
          v: [1, 2, 3, 4],
        },
        (errors) => {
          if (errors) {
            expect(errors.length).toBe(1)
            expect(errors[0].message).toBe('v must be between 1 and 3 in length')
          }

          resolve(undefined)
        },
      )
    })
  })
})

import Schema from '../src'

describe('pattern', () => {
  it('works for non-required empty string', async () => {
    await new Promise((resolve) => {
      new Schema({
        v: {
          pattern: /^\d+$/,
          message: 'haha',
        },
      }).validate(
        {
        // useful for web, input's value defaults to ''
          v: '',
        },
        (errors) => {
          expect(errors).toBe(null)
          resolve(undefined)
        },
      )
    })
  })

  it('work for non-required empty string with string regexp', async () => {
    await new Promise((resolve) => {
      new Schema({
        v: {
          pattern: '^\\d+$',
          message: 'haha',
        },
      }).validate(
        {
        // useful for web, input's value defaults to ''
          v: 's',
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

  it('works for required empty string', async () => {
    await new Promise((resolve) => {
      new Schema({
        v: {
          pattern: /^\d+$/,
          message: 'haha',
          required: true,
        },
      }).validate(
        {
        // useful for web, input's value defaults to ''
          v: '',
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

  it('works for non-required null', async () => {
    await new Promise((resolve) => {
      new Schema({
        v: {
          pattern: /^\d+$/,
          message: 'haha',
        },
      }).validate(
        {
          v: null,
        },
        (errors) => {
          expect(errors).toBe(null)
          resolve(undefined)
        },
      )
    })
  })

  it('works for non-required undefined', async () => {
    await new Promise((resolve) => {
      new Schema({
        v: {
          pattern: /^\d+$/,
          message: 'haha',
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

  it('works', async () => {
    await new Promise((resolve) => {
      new Schema({
        v: {
          pattern: /^\d+$/,
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

  it('works for RegExp with global flag', async () => {
    const schema = new Schema({
      v: {
        pattern: /global/g,
        message: 'haha',
      },
    })
    await new Promise((resolve) => {
      schema.validate(
        {
          v: 'globalflag',
        },
        (errors) => {
          expect(errors).toBe(null)
          resolve(undefined)
        },
      )
    })
    await new Promise((resolve) => {
      schema.validate(
        {
          v: 'globalflag',
        },
        (errors) => {
          expect(errors).toBe(null)
          resolve(undefined)
        },
      )
    })
  })
})

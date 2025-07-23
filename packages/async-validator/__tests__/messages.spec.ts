import Schema, { ValidateMessages } from '../src'

describe('messages', () => {
  it('can call messages', async () => {
    const messages = {
      required(f) {
        return `${f} required!`
      },
    }
    const schema = new Schema({
      v: {
        required: true,
      },
      v2: {
        type: 'array',
      },
    })
    schema.messages(messages)
    await new Promise((resolve) => {
      schema.validate(
        {
          v: '',
          v2: '1',
        },
        (errors) => {
          if (errors) {
            expect(errors.length).toBe(2)
            expect(errors[0].message).toBe('v required!')
            expect(errors[1].message).toBe('v2 is not an array')
            expect(Object.keys(messages).length).toBe(1)
          }

          resolve(undefined)
        },
      )
    })
  })

  it('can use options.messages', async () => {
    const messages = {
      required(f: string) {
        return `${f} required!`
      },
    }
    const schema = new Schema({
      v: {
        required: true,
      },
      v2: {
        type: 'array',
      },
    })
    await new Promise((resolve) => {
      schema.validate(
        {
          v: '',
          v2: '1',
        },
        {
          messages,
        },
        (errors) => {
          if (errors) {
            expect(errors.length).toBe(2)
            expect(errors[0].message).toBe('v required!')
            expect(errors[1].message).toBe('v2 is not an array')
            expect(Object.keys(messages).length).toBe(1)
          }

          resolve(undefined)
        },
      )
    })
  })

  it('messages with parameters', async () => {
    const messages = {
      required: 'Field %s required!',
    }
    const schema = new Schema({
      v: {
        required: true,
      },
    })
    schema.messages(messages)
    await new Promise((resolve) => {
      schema.validate(
        {
          v: '',
        },
        (errors) => {
          expect(errors).toBeTruthy()
          if (errors) {
            expect(errors.length).toBe(1)
            expect(errors[0].message).toBe('Field v required!')
          }

          expect(Object.keys(messages).length).toBe(1)
          resolve(undefined)
        },
      )
    })
  })

  it('messages can be without parameters', async () => {
    const messages = {
      required: 'required!',
    }
    const schema = new Schema({
      v: {
        required: true,
      },
    })
    schema.messages(messages)
    await new Promise((resolve) => {
      schema.validate(
        {
          v: '',
        },
        (errors) => {
          expect(errors).toBeTruthy()
          if (errors) {
            expect(errors.length).toBe(1)
            expect(errors[0].message).toBe('required!')
          }

          expect(Object.keys(messages).length).toBe(1)
          expect(messages.required).toBe('required!')
          resolve(undefined)
        },
      )
    })
  })

  it('message can be a function', async () => {
    const message = 'this is a function'
    await new Promise((resolve) => {
      new Schema({
        v: {
          required: true,
          message: () => message,
        },
      }).validate(
        {
          v: '', // provide empty value, this will trigger the message.
        },
        (errors) => {
          expect(errors).toBeTruthy()
          if (errors) {
            expect(errors.length).toBe(1)
            expect(errors[0].message).toBe(message)
          }

          resolve(undefined)
        },
      )
    })
  })
})

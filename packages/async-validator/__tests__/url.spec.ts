import Schema from '../src'

describe('url', () => {
  it('works for empty string', async () => {
    await new Promise((resolve) => {
      new Schema({
        v: {
          type: 'url',
        },
      }).validate(
        {
          v: '',
        },
        (errors) => {
          expect(errors).toBe(null)
          resolve(undefined)
        },
      )
    })
  })

  it('works for ip url', async () => {
    await new Promise((resolve) => {
      new Schema({
        v: {
          type: 'url',
        },
      }).validate(
        {
          v: 'http://10.218.136.29/talent-tree/src/index.html',
        },
        (errors) => {
          expect(errors).toBe(null)
          resolve(undefined)
        },
      )
    })
  })

  it('works for required empty string', async () => {
    await new Promise((resolve) => {
      new Schema({
        v: {
          type: 'url',
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

  it('works for type url', async () => {
    await new Promise((resolve) => {
      new Schema({
        v: {
          type: 'url',
        },
      }).validate(
        {
          v: 'http://www.taobao.com',
        },
        (errors) => {
          expect(errors).toBe(null)
          resolve(undefined)
        },
      )
    })
  })

  it('works for type url has query', async () => {
    await new Promise((resolve) => {
      new Schema({
        v: {
          type: 'url',
        },
      }).validate(
        {
          v: 'http://www.taobao.com/abc?a=a',
        },
        (errors) => {
          expect(errors).toBe(null)
          resolve(undefined)
        },
      )
    })
  })

  it('works for type url has hash', async () => {
    await new Promise((resolve) => {
      new Schema({
        v: {
          type: 'url',
        },
      }).validate(
        {
          v: 'http://www.taobao.com/abc#!abc',
        },
        (errors) => {
          expect(errors).toBe(null)
          resolve(undefined)
        },
      )
    })
  })

  it('works for type url has query and has', async () => {
    await new Promise((resolve) => {
      new Schema({
        v: {
          type: 'url',
        },
      }).validate(
        {
          v: 'http://www.taobao.com/abc?abc=%23&b=a~c#abc',
        },
        (errors) => {
          expect(errors).toBe(null)
          resolve(undefined)
        },
      )
    })
  })

  it('works for type url has multi hyphen', async () => {
    await new Promise((resolve) => {
      new Schema({
        v: {
          type: 'url',
        },
      }).validate(
        {
          v: 'https://www.tao---bao.com',
        },
        (errors) => {
          expect(errors).toBe(null)
          resolve(undefined)
        },
      )
    })
  })

  it('works for type not a valid url', async () => {
    await new Promise((resolve) => {
      new Schema({
        v: {
          type: 'url',
        },
      }).validate(
        {
          v: 'http://www.taobao.com/abc?abc=%23&b=  a~c#abc    ',
        },
        (errors) => {
          if (errors) {
            expect(errors.length).toBe(1)
            expect(errors[0].message).toBe('v is not a valid url')
          }

          resolve(undefined)
        },
      )
    })
  })

  it('support skip schema', async () => {
    await new Promise((resolve) => {
      new Schema({
        v: {
          type: 'url',
        },
      }).validate(
        {
          v: '//g.cn',
        },
        (errors) => {
          expect(errors).toBe(null)
          resolve(undefined)
        },
      )
    })
  })
})

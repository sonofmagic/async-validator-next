/* eslint-disable ts/no-unused-vars */
import Schema from '../src'

describe('asyncValidator', () => {
  it('works', async () => {
    await new Promise((resolve) => {
      new Schema({
        v: [
          {
            asyncValidator(rule, value) {
              return Promise.reject(new Error('e1'))
            },
          },
          {
            asyncValidator(rule, value) {
              return Promise.reject(new Error('e2'))
            },
          },
        ],
        v2: [
          {
            asyncValidator(rule, value) {
              return Promise.reject(new Error('e3'))
            },
          },
        ],
      }).validate(
        {
          v: 2,
        },
        (errors) => {
          if (errors) {
            expect(errors.length).toBe(3)
            expect(errors[0].message).toBe('e1')
            expect(errors[1].message).toBe('e2')
            expect(errors[2].message).toBe('e3')
          }

          resolve(undefined)
        },
      )
    })
  })

  it('first works', async () => {
    await new Promise((resolve) => {
      new Schema({
        v: [
          {
            asyncValidator(rule, value) {
              return Promise.reject(new Error('e1'))
            },
          },
          {
            asyncValidator(rule, value) {
              return Promise.reject(new Error('e2'))
            },
          },
        ],
        v2: [
          {
            asyncValidator(rule, value) {
              return Promise.reject(new Error('e3'))
            },
          },
        ],
      }).validate(
        {
          v: 2,
          v2: 1,
        },
        {
          first: true,
        },
        (errors) => {
          if (errors) {
            expect(errors.length).toBe(1)
            expect(errors[0].message).toBe('e1')
          }

          resolve(undefined)
        },
      )
    })
  })

  describe('firstFields', () => {
    it('works for true', async () => {
      await new Promise((resolve) => {
        new Schema({
          v: [
            {
              asyncValidator(rule, value) {
                return Promise.reject(new Error('e1'))
              },
            },
            {
              asyncValidator(rule, value) {
                return Promise.reject(new Error('e2'))
              },
            },
          ],

          v2: [
            {
              asyncValidator(rule, value) {
                return Promise.reject(new Error('e3'))
              },
            },
          ],
          v3: [
            {
              asyncValidator(rule, value) {
                return Promise.reject(new Error('e4'))
              },
            },
            {
              asyncValidator(rule, value) {
                return Promise.reject(new Error('e5'))
              },
            },
          ],
        }).validate(
          {
            v: 1,
            v2: 1,
            v3: 1,
          },
          {
            firstFields: true,
          },
          (errors) => {
            if (errors) {
              expect(errors.length).toBe(3)
              expect(errors[0].message).toBe('e1')
              expect(errors[1].message).toBe('e3')
              expect(errors[2].message).toBe('e4')
            }

            resolve(undefined)
          },
        )
      })
    })

    it('works for array', async () => {
      await new Promise((resolve) => {
        new Schema({
          v: [
            {
              asyncValidator: (rule, value) => {
                return Promise.reject(new Error('e1'))
              },
            },
            {
              asyncValidator(rule, value) {
                return Promise.reject(new Error('e2'))
              },
            },
          ],

          v2: [
            {
              asyncValidator(rule, value) {
                return Promise.reject(new Error('e3'))
              },
            },
          ],
          v3: [
            {
              asyncValidator(rule, value) {
                return Promise.reject(new Error('e4'))
              },
            },
            {
              asyncValidator(rule, value) {
                return Promise.reject(new Error('e5'))
              },
            },
          ],
          v4: [
            {
              asyncValidator: () =>
                new Promise((resolve, reject) => {
                  setTimeout(resolve, 100)
                }),
            },
            {
              asyncValidator: () =>
                new Promise((resolve, reject) => {
                  setTimeout(() => reject(new Error('e6')), 100)
                }),
            },
            {
              asyncValidator: () =>
                new Promise((resolve, reject) => {
                  setTimeout(() => reject(new Error('e7')), 100)
                }),
            },
          ],
        }).validate(
          {
            v: 1,
            v2: 1,
            v3: 1,
          },
          {
            firstFields: ['v'],
          },
          (errors) => {
            if (errors) {
              expect(errors.length).toBe(6)
              expect(errors[0].message).toBe('e1')
              expect(errors[1].message).toBe('e3')
              expect(errors[2].message).toBe('e4')
              expect(errors[3].message).toBe('e5')
              expect(errors[4].message).toBe('e6')
              expect(errors[5].message).toBe('e7')
            }

            resolve(undefined)
          },
        )
      })
    })

    it('whether to remove the \'Uncaught(in promise)\' warning', async () => {
      let allCorrect = true
      try {
        await new Schema({
          async: {
            asyncValidator(rule, value) {
              return new Promise((resolve, reject) => {
                setTimeout(() => {
                  // eslint-disable-next-line prefer-promise-reject-errors
                  reject([
                    new Error(
                      typeof rule.message === 'function'
                        ? rule.message()
                        : rule.message,
                    ),
                  ])
                }, 100)
              })
            },
            message: 'async fails',
          },
        }).validate({
          v: 1,
        })
      }
      catch ({ errors }) {
        allCorrect = errors.length === 1
      }
      expect(allCorrect).toBe(true)
    })
  })
})

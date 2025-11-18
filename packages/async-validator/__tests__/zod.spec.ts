import { z } from 'zod'
import Schema, { zodRule } from '../src'

describe('zod adapter', () => {
  it('maps Zod issues to async-validator errors', async () => {
    const schema = new Schema({
      user: zodRule(
        z.object({
          profile: z.object({
            email: z.string().email(),
          }),
          age: z.number().min(18),
        }),
      ),
    })

    await expect(
      schema.validate({
        user: {
          profile: { email: 'no-email' },
          age: 12,
        },
      }),
    ).rejects.toMatchObject({
      errors: [
        { message: 'Invalid email', field: 'user.profile.email' },
        { message: 'Number must be greater than or equal to 18', field: 'user.age' },
      ],
    })
  })

  it('supports custom message formatting and async refinement', async () => {
    const schema = new Schema({
      token: zodRule(
        z
          .string()
          .min(3)
          .refine(async val => val === 'ok', { message: 'not ok' }),
        issue => `zod:${issue.message}`,
      ),
    })

    await expect(
      schema.validate({
        token: 'bad',
      }),
    ).rejects.toMatchObject({
      errors: [{ message: 'zod:not ok' }],
    })
  })
})

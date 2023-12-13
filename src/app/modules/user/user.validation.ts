import { z } from 'zod';

const userValidationSchemaByZod = z.object({
  password: z
    .string({
      required_error: 'password must be string',
      invalid_type_error: 'password must be string',
    })
    .max(20, { message: "Password can't be more than 20 characters" })
    .optional(),
  status: z.enum(['in-progress', 'blocked']).default('in-progress'),
  isDeleted: z.boolean().optional().default(false),
});

export default userValidationSchemaByZod;

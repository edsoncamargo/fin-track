import 'dotenv/config';

import { z as validate } from 'zod';

const envSchema = validate.object({
  DATABASE_URL: validate.string().url(),

  JWT_SECRET: validate.string(),
  COOKIE_SECRET: validate.string(),
  COOKIE_MAX_AGE: validate.coerce.number(),

  BACKEND_URL: validate.string().url(),
  FRONTEND_URL: validate.string().url(),

  ENV: validate.string().default('dev'),
  PORT: validate.coerce.number().default(3000),

  DOMAIN: validate.string().default('locahost'),
});

export const env = envSchema.parse(process.env);

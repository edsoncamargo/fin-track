import { env } from '../src/env';

export function getJWTConfig() {
  return {
    secret: env.JWT_SECRET,
    expiresIn: env.COOKIE_MAX_AGE,
  };
}

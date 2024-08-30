export function getJWTConfig() {
  return {
    secret: process.env.JWT_SECRET as string,
    expiresIn: '25m',
  };
}

declare module 'fastify-cookie' {
  import { FastifyPluginCallback } from 'fastify';

  interface CookieOptions {
    httpOnly?: boolean;
    secure?: boolean;
    path?: string;
    maxAge?: number;
    sameSite?: 'Strict' | 'Lax' | 'None';
    domain?: string;
    signed?: boolean;
    secret?: string;
  }

  const fastifyCookie: FastifyPluginCallback<CookieOptions>;
  export default fastifyCookie;
}

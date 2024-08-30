import { FastifyInstance } from 'fastify';
import cors from '@fastify/cors';
import { env } from '../env';
import fastifyCookie from 'fastify-cookie';

export function setFastifyCors(app: FastifyInstance) {
  app.register(cors, {
    origin: '*',
  });
}

export function setFastifyCookie(app: FastifyInstance) {
  app.register(fastifyCookie, {
    secret: env.COOKIE_SECRET,
  });
}

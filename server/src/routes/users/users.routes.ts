import { FastifyPluginAsync } from 'fastify';
import { createUserRoutes } from './create-user.routes';
import { loginRoutes } from './login.routes';

const userRoutes: FastifyPluginAsync = async (fastify) => {
  fastify.register(createUserRoutes);
  fastify.register(loginRoutes);
};

export default userRoutes;

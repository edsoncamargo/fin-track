import { FastifyPluginAsync } from 'fastify';
import { getCategoriesRoutes } from './get-category.routes';

const categoriesRoutes: FastifyPluginAsync = async (fastify) => {
  fastify.register(getCategoriesRoutes);
};

export default categoriesRoutes;

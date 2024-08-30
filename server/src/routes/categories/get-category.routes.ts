import { FastifyInstance } from 'fastify';
import { ZodTypeProvider } from 'fastify-type-provider-zod';
import { authMiddleware } from '../../services/auth.middleware';
import { prisma } from '../../lib/prisma';

export async function getCategoriesRoutes(app: FastifyInstance) {
  app.withTypeProvider<ZodTypeProvider>().get(
    '/api/v1/categories',
    {
      preHandler: authMiddleware,
    },
    async () => {
      return await prisma.category.findMany();
    }
  );
}

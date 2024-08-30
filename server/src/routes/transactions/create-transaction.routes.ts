import { TransactionType, User } from '@prisma/client';

import { FastifyInstance } from 'fastify';
import { ZodTypeProvider } from 'fastify-type-provider-zod';
import { authMiddleware } from '../../services/auth.middleware';
import { extractToken } from '../../services/cookies.service';
import { prisma } from '../../lib/prisma';
import { z as validate } from 'zod';
import { verifyToken } from '../../utils/jwt.utils';

export async function createTransactionRoutes(app: FastifyInstance) {
  app.withTypeProvider<ZodTypeProvider>().post(
    '/api/v1/transactions',
    {
      preHandler: authMiddleware,
      schema: {
        body: validate.object({
          amount: validate.number(),
          title: validate.string(),
          description: validate.string().optional(),
          date: validate.coerce.date(),
          type: validate.nativeEnum(TransactionType),
          category_id: validate.string().uuid(),
        }),
      },
    },
    async (request) => {
      const { amount, title, description, date, type, category_id } =
        request.body;
      const { id } = verifyToken(extractToken(request)) as User;

      return await prisma.transaction.create({
        data: {
          amount,
          title,
          description,
          date,
          type,
          category_id,
          user_id: id,
        },
      });
    }
  );
}

import { FastifyInstance } from 'fastify';
import { TransactionType } from '@prisma/client';
import { ZodTypeProvider } from 'fastify-type-provider-zod';
import { authMiddleware } from '../../services/auth.middleware';
import { prisma } from '../../lib/prisma';
import { z as validate } from 'zod';

export async function getTransactiosRoutes(app: FastifyInstance) {
  app.withTypeProvider<ZodTypeProvider>().get(
    '/api/v1/transactions',
    {
      preHandler: authMiddleware,
      schema: {
        querystring: validate.object({
          year: validate
            .string()
            .regex(/^\d{4}$/, 'O ano deve ser um número de 4 dígitos.')
            .optional()
            .or(validate.string().length(0)),
          month: validate
            .string()
            .regex(/^(0?[1-9]|1[0-2])$/, 'O mês deve estar entre 1 e 12.')
            .optional()
            .or(validate.string().length(0)),
          type: validate
            .string()
            .transform((value) => value.toUpperCase())
            .refine(
              (value) =>
                Object.values(TransactionType).includes(
                  value as TransactionType
                ),
              'Tipo de transação inválido.'
            )
            .optional()
            .or(validate.string().length(0)),
          categoryId: validate
            .string()
            .uuid('ID da categoria inválido.')
            .optional()
            .or(validate.string().length(0)),
        }),
      },
    },
    async (request) => {
      const filters: any = {
        user_id: request?.user?.id,
      };

      const { year, month, type, categoryId } = request.query as {
        year?: string;
        month?: string;
        type?: TransactionType;
        categoryId?: string;
      };

      if (year) {
        const yearNumber = parseInt(year);

        filters.date = {
          ...filters.date,
          gte: new Date(Date.UTC(yearNumber, 0, 1)),
          lt: new Date(Date.UTC(yearNumber + 1, 0, 1)),
        };
      }

      if (month) {
        const monthNumber = parseInt(month);
        const yearNumber = parseInt(year ? year : '2024');
        const startDate = new Date(Date.UTC(yearNumber, monthNumber - 1, 1));
        const endDate = new Date(Date.UTC(yearNumber, monthNumber, 1));

        console.log(monthNumber);
        console.log(yearNumber);

        filters.date = {
          ...filters.date,
          gte: startDate,
          lt: endDate,
        };
      }

      if (type) {
        filters.type = type;
      }

      if (categoryId) {
        filters.category_id = categoryId;
      }

      return await prisma.transaction.findMany({
        where: filters,
      });
    }
  );
}

export async function getTransactionRoutes(app: FastifyInstance) {
  app.withTypeProvider<ZodTypeProvider>().get(
    '/api/v1/transactions/:id',
    {
      preHandler: authMiddleware,
      schema: {
        params: validate.object({
          id: validate.string().uuid(),
        }),
      },
    },
    async (request) => {
      const { id } = request.params;

      return await prisma.transaction.findUnique({
        where: {
          id,
          user_id: request.user?.id,
        },
      });
    }
  );
}

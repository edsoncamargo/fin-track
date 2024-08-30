import { FastifyInstance } from 'fastify';
import categoriesRoutes from './categories/categories.routes';
import transactionRoutes from './transactions/transactions.routes';
import userRoutes from './users/users.routes';

export function setRoutes(app: FastifyInstance) {
  app.register(userRoutes);
  app.register(transactionRoutes);
  app.register(categoriesRoutes);
}

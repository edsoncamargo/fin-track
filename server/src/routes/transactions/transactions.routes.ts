import {
  getTransactionRoutes,
  getTransactiosRoutes,
} from './get-transaction.routes';

import { FastifyPluginAsync } from 'fastify';
import { createTransactionRoutes } from './create-transaction.routes';

const transactionRoutes: FastifyPluginAsync = async (fastify) => {
  fastify.register(createTransactionRoutes);
  fastify.register(getTransactionRoutes);
  fastify.register(getTransactiosRoutes);
};

export default transactionRoutes;

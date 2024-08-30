import {
  serializerCompiler,
  validatorCompiler,
} from 'fastify-type-provider-zod';

import { FastifyInstance } from 'fastify';

export function setValidatorCompiler(app: FastifyInstance) {
  app.setValidatorCompiler(validatorCompiler);
  app.setSerializerCompiler(serializerCompiler);
}

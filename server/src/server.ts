import 'dayjs/locale/pt-br';

import logger, { Logger } from './services/logger.service';
import { setFastifyCookie, setFastifyCors } from './lib/fastify';

import Fastify from 'fastify';
import { env } from './env';
import { setRoutes } from './routes/index.routes';
import { setSwagger } from './lib/swagger';
import { setValidatorCompiler } from './lib/zod';

const app = Fastify();

const start = async () => {
  try {
    setFastifyCors(app);
    setFastifyCookie(app);
    setSwagger(app);
    setValidatorCompiler(app);
    setRoutes(app);

    await app.ready();
    await app.listen({ host: '0.0.0.0', port: env.PORT || 10000 });

    logger(
      `\n>> [INFO] Server está rodando em: ${env.BACKEND_URL} ✅`,
      Logger.Info
    );
    logger(
      `>> [INFO] Documentação está rodando em: ${env.BACKEND_URL}/documentation 📒\n`,
      Logger.Info
    );
  } catch (err) {
    logger(`\n>> [ERROR]: ${err}`, Logger.Error);
    process.exit(1);
  }
};

start();

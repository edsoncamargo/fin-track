import 'dayjs/locale/pt-br';

import fastify from 'fastify';
import fastifyCookie from 'fastify-cookie';
import { setRoutes } from './routes/index.routes';
import { setValidatorCompiler } from './lib/zod';

const app = fastify({ logger: false });

app.register(fastifyCookie, {
  secret: process.env.COOKIE_SECRET as string,
});

setValidatorCompiler(app);
setRoutes(app);

app.listen({ port: 3333 }).then(() => console.log('Server running...'));

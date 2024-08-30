import { FastifyInstance } from 'fastify';
import { ZodTypeProvider } from 'fastify-type-provider-zod';
import { generateToken } from '../../utils/jwt.utils';
import { isValidPassword } from '../../services/password.service';
import { prisma } from '../../lib/prisma';
import { z as validate } from 'zod';

export async function loginRoutes(app: FastifyInstance) {
  app.withTypeProvider<ZodTypeProvider>().post(
    '/api/v1/users/login',
    {
      schema: {
        body: validate.object({
          email: validate
            .string()
            .email({ message: 'O email inserido não é válido' }),
          password: validate
            .string()
            .min(8, { message: 'A senha deve ter pelo menos 8 caracteres' })
            .max(50, {
              message: 'A senha deve ter menos de 50 caracteres',
            })
            .regex(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*]).{8,}$/, {
              message:
                'A senha deve conter pelo menos uma letra maiúscula, uma letra minúscula, um número e um caractere especial (!@#$%^&*)',
            }),
        }),
      },
    },
    async (request, reply: any) => {
      const { email, password } = request.body;
      const user = await prisma.user.findUnique({ where: { email } });

      if (!user) {
        reply.code(401).send({ error: 'Credenciais inválidas' });
        return;
      }

      const canLogin = await isValidPassword(password, user.password);

      if (!canLogin) {
        reply.code(401).send({ error: 'Credenciais inválidas' });
        return;
      }

      const token = generateToken({ id: user.id, email: user.email });

      reply.setCookie('AUTH-ECTMA', token, {
        httpOnly: true,
        path: '/',
        maxAge: 3600000,
        sameSite: 'Strict',
      });

      reply.send({
        message: 'Login bem-sucedido',
      });
    }
  );
}

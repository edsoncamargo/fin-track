import { FastifyInstance } from 'fastify';
import { ZodTypeProvider } from 'fastify-type-provider-zod';
import { encryptPassword } from '../../services/password.service';
import { prisma } from '../../lib/prisma';
import { z as validate } from 'zod';

export async function createUserRoutes(app: FastifyInstance) {
  app.withTypeProvider<ZodTypeProvider>().post(
    '/api/v1/users',
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
          name: validate.string().optional(),
        }),
      },
    },
    async (request) => {
      const { email, password, name } = request.body;
      const hash = await encryptPassword(password);
      const user = await prisma.user.create({
        data: { email, password: hash, name },
      });

      return {
        id: user.id,
      };
    }
  );
}

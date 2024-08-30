import { FastifyReply, FastifyRequest } from 'fastify';

import { User } from '@prisma/client';
import { prisma } from '../lib/prisma';
import { verifyToken } from '../utils/jwt.utils';

async function authenticateUser(
  req: FastifyRequest,
  reply: FastifyReply
): Promise<void> {
  const token = req.cookies['AUTH-ECTMA'];

  if (!token) {
    reply.status(401).send({
      error:
        'Token de autenticação não fornecido. Por favor, faça login e tente novamente.',
    });
    throw new Error(
      'Token de autenticação não fornecido. Por favor, faça login e tente novamente.'
    );
  }

  const decodedToken = verifyToken(token);

  if (!decodedToken) {
    reply.status(401).send({
      error: 'Token de autenticação inválido. Por favor, faça login novamente.',
    });
    throw new Error(
      'Token de autenticação inválido. Por favor, faça login novamente.'
    );
  }

  const { email } = decodedToken as User;
  const user = await prisma.user.findUnique({ where: { email } });

  if (!user) {
    reply
      .status(401)
      .send({
        error:
          'Usuário não encontrado. Por favor, verifique suas credenciais e tente novamente.',
      });
    throw new Error(
      'Usuário não encontrado. Por favor, verifique suas credenciais e tente novamente.'
    );
  }

  req.user = user;
}

function authMiddleware(
  req: FastifyRequest,
  reply: FastifyReply,
  done: (err?: Error) => void
): void {
  authenticateUser(req, reply)
    .then(() => done())
    .catch((err) => done(err));
}

export { authMiddleware };

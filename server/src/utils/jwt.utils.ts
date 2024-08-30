import { User } from '../models/user';
import { getJWTConfig } from '../../configs/jwt.config';
import jwt from 'jsonwebtoken';

export function generateToken(payload: User): string {
  return jwt.sign(payload, getJWTConfig().secret, {
    expiresIn: getJWTConfig().expiresIn,
  });
}

export function verifyToken(token: string): User | null {
  try {
    return jwt.verify(token, getJWTConfig().secret) as User;
  } catch (err) {
    return null;
  }
}

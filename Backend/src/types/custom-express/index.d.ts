import { JwtPayload } from 'jsonwebtoken';

declare namespace Express {
  export interface Request {
    user?: JwtPayload & {
      id_usuario: number;
      role: string;
    };
  }
}
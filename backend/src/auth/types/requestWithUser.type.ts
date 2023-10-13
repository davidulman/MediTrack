import { Request } from 'express';
import { JwtPayload } from './jwtPayload.type';

export interface RequestWithUser extends Request {
  user: JwtPayload;
}

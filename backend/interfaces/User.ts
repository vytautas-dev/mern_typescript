import { Document } from 'mongoose';
import { Request } from 'express';

export interface IGetUserAuthInfoRequest extends Request {
  user: any;
}

export default interface IUser extends Document {
  name: string;
  email: string;
  password: string;
}

export default interface IUser extends Document {
  name: string;
  email: string;
  password: string;
}

export interface JwtPayload {
  id: string;
}

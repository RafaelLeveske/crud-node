import { ObjectId } from 'mongodb';

declare namespace Express {
  export interface Request {
    user: {
      id: ObjectId;
    };
  }
}

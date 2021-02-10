import { Request, Response, NextFunction, RequestHandler } from 'express';
import access from '@config/access';
import AppError from '@shared/errors/AppError';
import User from '../../mongoose/schemas/User';

interface IAccessParams {
  resource: string;
  action:
    | 'readOwn'
    | 'updateOwn'
    | 'deleteOwn'
    | 'readAny'
    | 'updateAny'
    | 'deleteAny';
}

export default function grantAccess({
  resource,
  action,
}: IAccessParams): RequestHandler {
  return async (request: Request, _response: Response, next: NextFunction) => {
    try {
      const userId = request.user.id;
      const user = await User.findById(userId).populate('companies');

      if (!user?.id) {
        throw new AppError("User don't exist", 400);
      }

      const permission = access.can(user.role)[action](resource);

      if (!permission.granted) {
        throw new AppError(
          "You don't have enough permission to perform this action",
          401,
        );
      }
      next();
    } catch (err) {
      console.log(err);
      next(err);
    }
  };
}

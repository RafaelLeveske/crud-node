import { Request, Response, NextFunction, RequestHandler } from 'express';
import access from '@config/access';
import AppError from '@shared/errors/AppError';

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
      const userRole = request.user.role;

      if (!userRole) {
        throw new AppError("User don't exist", 400);
      }

      const permission = access.can(userRole)[action](resource);

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

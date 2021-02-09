import { Request, Response, NextFunction } from 'express';
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

export default function grantAccess({ resource, action }: IAccessParams): void {
  const grant = async (
    request: Request,
    response: Response,
    next: NextFunction,
  ) => {
    try {
      const permission = access.can(request.user.role)[action](resource);

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

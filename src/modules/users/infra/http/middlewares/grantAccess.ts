import { Request, Response, NextFunction } from 'express';
import access from '@config/access';
import AppError from '@shared/errors/AppError';

export default function grantAccess(resource: string): void {
  const grant = async (
    request: Request,
    response: Response,
    next: NextFunction,
  ) => {
    try {
      const permission = access.can(request.user.role)._(resource);

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

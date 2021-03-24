import { NextFunction, Request, Response } from 'express';
import { CustomError } from '../errors/custom-error';
import { DatabaseConnectionError } from '../errors/database-connection-error';
import { RequestValidationError } from '../errors/request-validation-error';

export const errorHandler = (
    err: Error,
    req: Request,
    res: Response,
    next: NextFunction
) => {
    if (err instanceof CustomError) {
        console.error(err.serializeErrors());
        return res
            .status(err.statusCode)
            .send(err.serializeErrors());
    }

    console.log('Something went wrong');

    res.status(400).send({
        errors: 'Something went wrong'
    });
};
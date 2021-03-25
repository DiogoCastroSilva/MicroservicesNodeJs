import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';


interface UserPayload {
    id: string;
    email: string;
}

declare global {
    namespace Express {
        interface Request {
            currentUser?: UserPayload;
        }
    }
}

export const currentUser = (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const { session } = req;

    if (!session || !session.jwt) {
        return next();
    }

    try {
        const payload = jwt.verify(
            session.jwt,
            process.env.JWT_PRIVATE_KEY as string
        ) as UserPayload;

        req.currentUser = payload;
    } catch (err) {}

    next();
};

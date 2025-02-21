import { Request, Response, NextFunction } from "express";

interface CustomError {
    status?: number;
    message: string;
}

const errorHandler = (
    err: Error,
    req: Request,
    res: Response,
    _next: NextFunction
): void => {
    let statusCode = 500;
    let message = "An unexpected error occurred";

    res.status(statusCode).json({ message });
};

export default errorHandler;

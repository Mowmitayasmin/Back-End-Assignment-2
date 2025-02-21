import { Request, Response, NextFunction } from "express";
import { AppError } from "../errors/customErrors";
import { errorLogger } from "../middleware/logger";

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

    if (err instanceof AppError) {
        statusCode = err.statusCode;
        message = err.message;
    }

    //log the error
    errorLogger.error(message, {
        statusCode,
        stack: err.stack,
        method: req.method,
        url: req.url,
    });

    res.status(statusCode).json({ message });
};

export default errorHandler;

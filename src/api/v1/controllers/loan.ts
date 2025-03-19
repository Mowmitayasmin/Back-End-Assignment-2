import { Request, Response, NextFunction } from "express";
import * as loanService from "../services/loan";
import type { Loan } from "../models/loan";
import { HTTP_STATUS } from "src/constants/httpConstants";

export const getAllLoans = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> => {
    try {
        const loans: Loan[] = await loanService.getAllDocuments();

        res.status(HTTP_STATUS.OK).json(
            loans
        );
    } catch (error) {
        next(error);
    }
};
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

export const createLoan = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> => {
    try {
        const data = {
            ...req.body,
            is_reviewed: 0,
            is_approved: 0
        }

        const item: Loan = await loanService.createDocuments(data);

      res.status(HTTP_STATUS.CREATED).json(
            {
                message: 'Loan created susscssfully',
                item: item
            }
        );
    } catch (error) {
        next(error);
    }
}

export const updateLoan = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> => {
    try {

        const updated: Loan = await loanService.updateDocuments(
            req.params.id,
            req.body
        );

        res.status(HTTP_STATUS.OK).json(
            {
                message: 'Updated successfully',
                loan: updated
            }
        );
    } catch (error) {
        next(error);
    }
};

export const reviewLoan = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> => {
    try {

        const updated: Loan = await loanService.updateDocuments(
            req.params.id,
           {
            is_reviewed: true
           }
        );

        res.status(HTTP_STATUS.OK).json(
            {
                message: 'Reviewd successfully',
                loan: updated
            }
        );
    } catch (error) {
        next(error);
    }
};

export const approveLoan = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> => {
    try {

        const updated: Loan = await loanService.updateDocuments(
            req.params.id,
           {
            is_approved: true
           }
        );

        res.status(HTTP_STATUS.OK).json(
            {
                message: 'Approved successfully',
                loan: updated
            }
        );
    } catch (error) {
        next(error);
    }
};

export const deleteLoan = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> => {
    try {
        await loanService.deleteDocuments(req.params.id);
        res.status(HTTP_STATUS.OK).json({
            message: 'Loan deleted successfully',
        });
    } catch (error) {
        next(error);
    }
};


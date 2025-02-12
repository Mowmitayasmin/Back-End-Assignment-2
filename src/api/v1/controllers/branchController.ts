import { Request, Response, NextFunction } from "express";
import * as branchService from "../services/branchService";
import { Branch } from "../services/branchService";

/**
 * @description Create a new branch.
 * @route POST /api/v1/branches
 * @returns {Promise<void>}
 */
export const createBranch = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> => {
    try {
        // Call the branchService to create a new branch by passing the request body
        const newBranch: Branch = await branchService.createBranch(req.body);

        // Return the created branch object in the response
        res.status(201).json({ message: "Branch Created", data: newBranch });
    } catch (error) {
        next(error);
    }
};
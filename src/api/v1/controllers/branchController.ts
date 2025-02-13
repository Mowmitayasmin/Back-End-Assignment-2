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

/**
 * @description Get all branches.
 * @route GET /api/v1/branches
 * @returns {Promise<void>}
 */
export const getAllBranches = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> => {
    try {
        const branches: Branch[] = await branchService.getAllBranches();
        res.status(200).json({ message: "Branches Retrieved", data: branches });
    } catch (error) {
        next(error);
    }
};

/**
 * @description Get a branch by ID.
 * @route GET /api/v1/branches/:id
 * @returns {Promise<void>}
 */
export const getBranchById = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> => {
    try {
        const { id } = req.params;
        const branch: Branch | null = await branchService.getBranchById(id);

        res.status(200).json({
            message: branch ? "Branch Retrieved" : "Branch not found",
            data: branch
        });
    } catch (error) {
        next(error);
    }
};

/**
 * @description Update an existing branch.
 * @route PATCH /api/v1/branches/:id
 * @returns {Promise<void>}
 */
export const updateBranchById = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> => {
    try {
        // Call the branchService by passing the id from the URL path and the request body
        const updatedBranch: Branch = await branchService.updateBranch(
            req.params.id,
            req.body
        );

        res.status(200).json({ message: "Branch Updated", data: updatedBranch });
    } catch (error) {
        next(error);
    }
};

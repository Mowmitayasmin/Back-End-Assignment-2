import express, { Router } from "express";
import * as branchController from "../controllers/branchController";

// Create an instance of the router for branch-related routes
const router: Router = express.Router();

/**
 * @route POST /api/v1/branches
 * @description Create a new branch
 */
router.post("/", branchController.createBranch);

/**
 * @route GET /api/v1/branches
 * @description Get all branches.
 */
router.get("/", branchController.getAllBranches);

/**
 * @route GET /api/v1/branches/:id
 * @description Get a branch by ID.
 */
router.get("/:id", branchController.getBranchById);

/**
 * @route PUT /api/v1/branches/:id
 * @description Update an existing branch (e.g., update address or phone number).
 * @param {string} id - The ID of the branch to update.
 * @param {object} branch - The updated branch data (address, phone, etc.).
 * @returns {object} The updated branch data.
 */
router.put("/:id", branchController.updateBranchById);

/**
 * @route DELETE /api/v1/branches/:id
 * @description Delete a branch by ID.
 * @param {string} id - The ID of the branch to delete.
 * @returns {object} Confirmation of deletion.
 */
router.delete("/:id", branchController.deleteBranchById);

export default router;
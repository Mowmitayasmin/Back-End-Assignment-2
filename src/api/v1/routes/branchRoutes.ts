import express, { Router } from "express";
import * as branchController from "../controllers/branchController";

// Create an instance of the router for branch-related routes
const router: Router = express.Router();

/**
 * @route POST /api/v1/branches
 * @description Create a new branch
 */
router.post("/", branchController.createBranch);

export default router;
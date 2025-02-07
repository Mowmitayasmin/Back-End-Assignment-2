// userRoutes.ts
import express, { Router } from "express";
import * as userController from "../controllers/userController";

// Create an instance of the router for the user-related routes
const router: Router = express.Router();

/**
 * @route POST /api/v1/employees
 * @description Create a new employee
 */
router.post("/", userController.createEmployee);

export default router;
// userRoutes.ts
import express, { Router } from "express";
import * as userController from "../controllers/userController";


// Create an instance of the router for the user-related routes
const router: Router = express.Router();

/**
 * @route GET /
 * @description Get all employees.
 */
router.get("/", userController.getAllEmployees);

/**
 * @route POST /api/v1/employees
 * @description Create a new employee
 */
router.post("/", userController.createEmployee);

export default router;
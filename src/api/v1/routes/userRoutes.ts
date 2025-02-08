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

/**
 * @route GET /
 * @description Get all employees.
 */
router.get("/", userController.getAllEmployees);

/**
 * @route GET /api/v1/employees/:id
 * @description Get an employee by ID.
 */
router.get("/:id", userController.getEmployeeById);

/**
 * @route PUT /api/v1/employees/:id
 * @description Update an existing employee (e.g., update position or phone number).
 * @param {string} id - The ID of the employee to update.
 * @param {object} employee - The updated employee data (position, phone, etc.).
 * @returns {object} The updated employee data.
 */
router.put("/:id", userController.updateEmployeeById);

/**
 * @route DELETE /api/v1/employees/:id
 * @description Delete an employee by ID.
 * @param {string} id - The ID of the employee to delete.
 * @returns {object} Confirmation of deletion.
 */
router.delete("/:id", userController.deleteEmployeeById);

export default router;
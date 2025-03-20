// userRoutes.ts
import express, { Router } from "express";
import * as userController from "../controllers/userController";
import { validateRequest } from "../middleware/validate";
import { employeeSchema } from "../validation/userValidation";

// Create an instance of the router for the user-related routes
const router: Router = express.Router();

/**
 * @route POST /api/v1/employees
 * @description Create a new employee
 */
router.post("/", validateRequest(employeeSchema), userController.createEmployee);

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

/**
 * @route GET /api/v1/employees/branch/:branchId
 * @description Get all employees for a specific branch.
 * @param {string} branchId - The ID of the branch.
 * @returns {object[]} An array of employees belonging to the specified branch.
 */
router.get("/branch/:branchId", userController.getEmployeesByBranch);

/**
 * @route GET /api/v1/employees/department/:departmentId
 * @description Get all employees for a specific department.
 * @param {string} departmentId - The ID of the department.
 * @returns {object[]} An array of employees belonging to the specified department.
 */
router.get("/department/:departmentId", userController.getEmployeesByDepartment);

router.get("user/:id", userController.userDetails)
router.post("user/login", userController.login)

export default router;
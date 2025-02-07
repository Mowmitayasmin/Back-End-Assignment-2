// userController.ts
import { Request, Response, NextFunction } from "express";
import * as userService from "../services/userService";
import type { User } from "../services/userService";

/**
 * @description Create a new employee.
 * @route POST /api/v1/employees
 * @returns {Promise<void>}
 */
export const createEmployee = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> => {
    try {
        // Call the userService to create a new employee by passing the request body
        const newEmployee: User = await userService.createEmployee(req.body);

        // Return the created employee object in the response
        res.status(201).json({ message: "Employee Created", data: newEmployee });
    } catch (error) {
        next(error);
    }
};
/**
 * @description Get all employees.
 * @route GET /
 * @returns {Promise<void>}
 */
export const getAllEmployees = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> => {
    try {
        const employees: User[] = await userService.getAllEmployees();

        res.status(200).json({ message: "Employees Retrieved", data: employees });
    } catch (error) {
        next(error);
    }
};

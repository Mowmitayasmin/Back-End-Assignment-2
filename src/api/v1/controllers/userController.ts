// userController.ts
import { Request, Response, NextFunction } from "express";
import * as userService from "../services/userService";
import { User } from "../services/userService";

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
export const getAllEmployees = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const employees: User[] = await userService.getAllEmployees();
        res.status(200).json({ message: "Employees Retrieved", data: employees });
    } catch (error) {
        next(error);
    }
};

/**
 * @description Get an employee by ID.
 * @route GET /api/v1/employees/:id
 * @returns {Promise<void>}
 */
export const getEmployeeById = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> => {
    try {
        const { id } = req.params; 
        const employee: User | null = await userService.getEmployeeById(id); 

        res.status(200).json({ 
            message: employee ? "Employee Retrieved" : "Employee not found", 
            data: employee 
        });
    } catch (error) {
        next(error);
    }
};

/**
 * @description Update an existing employee.
 * @route PATCH /api/v1/employees/:id
 * @returns {Promise<void>}
 */
export const updateEmployeeById = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> => {
    try {
        // Call the userService by passing the id from the URL path and the request body
        const updatedEmployee = await userService.updateEmployee(
            req.params.id,
            req.body
        );

        res.status(200).json({ message: "Employee Updated", data: updatedEmployee });
    } catch (error) {
        next(error);
    }
};

/**
 * @description Delete an existing employee.
 * @route DELETE /api/v1/employees/:id
 * @returns {Promise<void>}
 */
export const deleteEmployeeById = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> => {
    try {
        const { id } = req.params;

        await userService.deleteEmployee(id);

        res.status(200).json({ message: "Employee Deleted Successfully" });
    } catch (error) {
        next(error);
    }
};

/**
 * @description Get all employees for a specific branch.
 * @route GET /api/v1/employees/branch/:branchId
 * @returns {Promise<void>}
 */
export const getEmployeesByBranch = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> => {
    try {
        const { branchId } = req.params;
        const employees: User[] = await userService.getEmployeesByBranch(branchId);
        
        res.status(200).json({ 
            message: employees.length ? "Employees Retrieved" : "No employees found for this branch", 
            data: employees 
        });
    } catch (error) {
        next(error);
    }
};
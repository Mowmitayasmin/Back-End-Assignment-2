// userService.ts
/**
 * @interface User
 * @description Represents an employee object.
 */
export type User = {
    id: string;
    name: string;
    position: string;
    department: string;
    email: string;
    phone: string;
    branchId: string;
};

// Sample in-memory database for storing users
const employees: User[] = [];

/**
 * @description Create a new employee.
 * @param {{ name: string; position: string; department: string; email: string; phone: string; branchId: string }} employee - The employee data.
 * @returns {Promise<User>}
 */
export const createEmployee = async (employee: {
    name: string;
    position: string;
    department: string;
    email: string;
    phone: string;
    branchId: string;
}): Promise<User> => {
    const newEmployee: User = { id: Date.now().toString(), ...employee };
    employees.push(newEmployee);
    return newEmployee;
};

/**
 * @description Get all employees.
 * @returns {Promise<User[]>}
 */
export const getAllEmployees = async (): Promise<User[]> => {
    return employees;
};
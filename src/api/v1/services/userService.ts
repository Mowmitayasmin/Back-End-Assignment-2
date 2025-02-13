// userService.ts
/**
 * @interface User
 * @description Represents an employee object.
 */
export interface User  {
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

/**
 * @description Get an employee by ID.
 * @param {string} id - The ID of the employee.
 * @returns {Promise<User | null>}
 */
export const getEmployeeById = async (id: string): Promise<User | null> => {
    const employee = employees.find(emp => emp.id === id);
    return employee || null; // Return employee if found, otherwise null
};

/**
 * @description Update an existing employee.
 * @param {string} id - The ID of the employee to update.
 * @param {Partial<User>} employee - The fields to update (e.g., position, phone).
 * @returns {Promise<User>}
 * @throws {Error} If the employee with the given ID is not found.
 */
export const updateEmployee = async (
    id: string,
    employee: Partial<User>
): Promise<User> => {
    const employeeRecord = employees.find(emp => emp.id === id);

    if (!employeeRecord) {
        throw new Error(`Employee with ID ${id} not found`);
    }

    // Update only the fields provided in the request body (partial update)
    Object.assign(employeeRecord, employee);

    return employeeRecord;
};

/**
 * @description Delete an existing employee.
 * @param {string} id - The ID of the employee to delete.
 * @returns {Promise<void>}
 * @throws {Error} If the employee with the given ID is not found.
 */
export const deleteEmployee = async (id: string): Promise<void> => {
    const index = employees.findIndex(emp => emp.id === id);

    if (index === -1) {
        throw new Error(`Employee with ID ${id} not found`);
    }

    // Remove the employee from the array
    employees.splice(index, 1);
};

/**
 * @description Get all employees by branch ID.
 * @param {string} branchId - The ID of the branch.
 * @returns {Promise<User[]>}
 */
export const getEmployeesByBranch = async (branchId: string): Promise<User[]> => {
    return employees.filter(emp => emp.branchId === branchId);
};

/**
 * @description Get all employees by department ID.
 * @param {string} departmentId - The ID of the department.
 * @returns {Promise<User[]>}
 */
export const getEmployeesByDepartment = async (departmentId: string): Promise<User[]> => {
    // Filter the employees array to return only employees in the specified department
    return employees.filter(emp => emp.department === departmentId);
};
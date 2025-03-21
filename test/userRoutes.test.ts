// userRoutes.test.ts
import request from "supertest";
import app from "../src/app";
import { createEmployee, getEmployeeById, updateEmployeeById, deleteEmployeeById, getEmployeesByBranch, getEmployeesByDepartment } from "../src/api/v1/controllers/userController";

jest.mock("../src/api/v1/controllers/userController", () => ({
    createEmployee: jest.fn((req, res) => res.status(201).send()),
    getAllEmployees: jest.fn(() => [{ id: "1", name: "John Doe", position: "Software Engineer", department: "Engineering", email: "johndoe@example.com", phone: "1234567890", branchId: "1" }]),
    getEmployeeById: jest.fn(),
    updateEmployeeById: jest.fn(),
    deleteEmployeeById: jest.fn((req, res) => res.status(200).json({ message: "Employee Deleted Successfully" })),
    getEmployeesByBranch: jest.fn(),
    getEmployeesByDepartment: jest.fn()
}));

describe("User Routes", () => {
    afterEach(() => {
        jest.clearAllMocks();
    });

    describe("POST /api/v1/employees", () => {
        it("should call createEmployee controller", async () => {
            const mockEmployee = {
                name: "John Doe",
                position: "Software Engineer",
                department: "Engineering",
                email: "johndoe@example.com",
                phone: "1234567890",
                branchId: "1",
            };

            await request(app).post("/api/v1/employees").send(mockEmployee);
            expect(createEmployee).toHaveBeenCalled();
        });

    });

    describe("GET /api/v1/employees", () => {
        it("should return an array of all employees", async () => {
            const mockEmployees = [
                {
                    id: "1",
                    name: "John Doe",
                    position: "Software Engineer",
                    department: "Engineering",
                    email: "johndoe@example.com",
                    phone: "1234567890",
                    branchId: "1",
                },
            ];
    
            // Mock the getAllEmployees controller function
            (jest.requireMock("../src/api/v1/controllers/userController").getAllEmployees as jest.Mock).mockImplementation(async (req, res) => {
                res.status(200).json({
                    message: "All Employees Retrieved",
                    data: mockEmployees,
                });
            });
    
            const response = await request(app).get("/api/v1/employees");
    
            expect(response.status).toBe(200);
            expect(response.body).toEqual({
                message: "All Employees Retrieved",
                data: mockEmployees,
            });
    
            expect(jest.requireMock("../src/api/v1/controllers/userController").getAllEmployees).toHaveBeenCalled();
        });
    });

    describe("GET /api/v1/employees/:id", () => {
        it("should return the correct employee for a given ID", async () => {
            const employeeId = "1";
            const mockEmployee = {
                id: "1",
                name: "John Doe",
                position: "Software Engineer",
                department: "Engineering",
                email: "johndoe@example.com",
                phone: "1234567890",
                branchId: "1",
            };

            // Mock the controller function to return the expected employee
            (getEmployeeById as jest.Mock).mockImplementation(async (req, res) => {
                res.status(200).json({
                    message: "Employee Retrieved",
                    data: mockEmployee,
                });
            });

            const response = await request(app).get(`/api/v1/employees/${employeeId}`);

            expect(response.status).toBe(200);
            expect(response.body).toEqual({
                message: "Employee Retrieved",
                data: mockEmployee,
            });

            expect(getEmployeeById).toHaveBeenCalled();
        });
    });

    describe("PUT /api/v1/employees/:id", () => {
        it("should update an employee's data and return the updated employee", async () => {
            const employeeId = "1";
            const updateData = { position: "Senior Developer", phone: "9876543210" };
            const updatedEmployee = {
                id: employeeId,
                name: "John Doe",
                position: "Senior Developer",
                department: "Engineering",
                email: "johndoe@example.com",
                phone: "9876543210",
                branchId: "1",
            };

            (updateEmployeeById as jest.Mock).mockImplementation(async (req, res) => {
                res.status(200).json({
                    message: "Employee Updated",
                    data: updatedEmployee,
                });
            });

            const response = await request(app)
                .put(`/api/v1/employees/${employeeId}`)
                .send(updateData);

            expect(response.status).toBe(200);
            expect(response.body).toEqual({
                message: "Employee Updated",
                data: updatedEmployee,
            });

            expect(updateEmployeeById).toHaveBeenCalled();
        });
    });
  
    // New test case for deleting an employee
    describe("DELETE /api/v1/employees/:id", () => {
        it("should delete an employee and return a success message", async () => {
            const employeeId = "1";

            // Mock the deleteEmployeeById controller function
            (deleteEmployeeById as jest.Mock).mockImplementation(async (req, res) => {
                res.status(200).json({ message: "Employee Deleted Successfully" });
            });

            const response = await request(app).delete(`/api/v1/employees/${employeeId}`);

            expect(response.status).toBe(200);
            expect(response.body).toEqual({ message: "Employee Deleted Successfully" });

            expect(deleteEmployeeById).toHaveBeenCalled();
        });
    });

    describe("GET /api/v1/employees/branch/:branchId", () => {
        it("should return all employees for a specific branch", async () => {
            const branchId = "1";
            const mockEmployees = [
                {
                    id: "1",
                    name: "John Doe",
                    position: "Software Engineer",
                    department: "Engineering",
                    email: "johndoe@example.com",
                    phone: "1234567890",
                    branchId: "1",
                },
            ];

            (getEmployeesByBranch as jest.Mock).mockImplementation(async (req, res) => {
                res.status(200).json({
                    message: "Employees Retrieved by Branch",
                    data: mockEmployees,
                });
            });

            const response = await request(app).get(`/api/v1/employees/branch/${branchId}`);

            expect(response.status).toBe(200);
            expect(response.body).toEqual({
                message: "Employees Retrieved by Branch",
                data: mockEmployees,
            });
            expect(getEmployeesByBranch).toHaveBeenCalled();
        });
    });

    describe("GET /api/v1/employees/department/:departmentId", () => {
        it("should return an array of employees in the specified department", async () => {
            const departmentId = "Engineering";
            const mockEmployees = [
                {
                    id: "1",
                    name: "John Doe",
                    position: "Software Engineer",
                    department: "Engineering",
                    email: "johndoe@example.com",
                    phone: "1234567890",
                    branchId: "1",
                },
                {
                    id: "2",
                    name: "Jane Smith",
                    position: "Product Manager",
                    department: "Engineering",
                    email: "janesmith@example.com",
                    phone: "0987654321",
                    branchId: "1",
                },
            ];

            // Mock the getEmployeesByDepartment controller function
            (getEmployeesByDepartment as jest.Mock).mockImplementation(async (req, res) => {
                res.status(200).json({
                    message: "Employees Retrieved by Department",
                    data: mockEmployees,
                });
            });

            const response = await request(app).get(`/api/v1/employees/department/${departmentId}`);

            expect(response.status).toBe(200);
            expect(response.body).toEqual({
                message: "Employees Retrieved by Department",
                data: mockEmployees,
            });

            expect(getEmployeesByDepartment).toHaveBeenCalled();
        });
    });
});


// userRoutes.test.ts
import request from "supertest";
import app from "../src/app";
import { createEmployee, getEmployeeById } from "../src/api/v1/controllers/userController";


jest.mock("../src/api/v1/controllers/userController", () => ({
    createEmployee: jest.fn((req, res) => res.status(201).send()),
    getAllEmployees: jest.fn(() => [{ id: "1", name: "John Doe", position: "Software Engineer", department: "Engineering", email: "johndoe@example.com", phone: "1234567890", branchId: "1" }]),
    getEmployeeById: jest.fn(),
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
});


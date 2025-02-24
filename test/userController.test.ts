import { Request, Response, NextFunction } from "express";
import * as userController from "../src/api/v1/controllers/userController"; 
import * as userService from "../src/api/v1/services/userService"; 

jest.mock("../src/api/v1/services/userService"); 

describe("User Controller", () => {
    let mockReq: Partial<Request>;
    let mockRes: Partial<Response>;
    let mockNext: NextFunction;

    beforeEach(() => {
        jest.clearAllMocks();
        mockReq = { params: {}, body: {} };
        mockRes = { status: jest.fn().mockReturnThis(), json: jest.fn() };
        mockNext = jest.fn();
    });

    // Step 2: Test Case for "Get All Employees"
    describe("GET /api/v1/employees", () => {
        it("should return an array of employees with correct structure", async () => {
            // Mock data for employees
            const mockEmployees = [
                {
                    id: "1",
                    name: "John Doe",
                    position: "Software Engineer",
                    department: "Engineering",
                    email: "john.doe@example.com",
                    phone: "123-456-7890",
                    branchId: "B1",
                },
                {
                    id: "2",
                    name: "Jane Smith",
                    position: "Product Manager",
                    department: "Product",
                    email: "jane.smith@example.com",
                    phone: "987-654-3210",
                    branchId: "B2",
                }
            ];

            (userService.getAllEmployees as jest.Mock).mockResolvedValue(mockEmployees);

            
            await userController.getAllEmployees(mockReq as Request, mockRes as Response, mockNext);

            // Assertions
            expect(mockRes.status).toHaveBeenCalledWith(200); 
            expect(mockRes.json).toHaveBeenCalledWith({
                message: "Employees Retrieved", 
                data: mockEmployees, 
            });
        });
    });
});
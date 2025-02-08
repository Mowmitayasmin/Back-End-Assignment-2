import { Request, Response, NextFunction } from "express";
import * as branchController from "../src/api/v1/controllers/branchController"; 
import * as branchService from "../src/api/v1/services/branchService"; 

jest.mock("../src/api/v1/services/branchService");

describe("Branch Controller", () => {
    let mockReq: Partial<Request>;
    let mockRes: Partial<Response>;
    let mockNext: NextFunction;

    beforeEach(() => {
        jest.clearAllMocks();
        mockReq = { body: {} };
        mockRes = { status: jest.fn().mockReturnThis(), json: jest.fn() };
        mockNext = jest.fn();
    });

    // Test case for "Create Branch"
    describe("POST /api/v1/branches", () => {
        it("should create a new branch and return the branch object with a unique ID", async () => {
            const newBranchData = {
                name: "Main Branch",
                address: "123 Main St, City, Country",
                phone: "123-456-7890",
            };

            const mockCreatedBranch = {
                id: "1",
                name: newBranchData.name,
                address: newBranchData.address,
                phone: newBranchData.phone,
            };

            // Mock service to resolve the new branch
            (branchService.createBranch as jest.Mock).mockResolvedValue(mockCreatedBranch);

            // Call the controller function
            await branchController.createBranch(mockReq as Request, mockRes as Response, mockNext);

            // Assertions
            expect(mockRes.status).toHaveBeenCalledWith(201);
            expect(mockRes.json).toHaveBeenCalledWith({
                message: "Branch Created",
                data: mockCreatedBranch,
            });

            // Ensure the service was called with the right data
            expect(branchService.createBranch).toHaveBeenCalledWith(newBranchData);
        });
    });
});
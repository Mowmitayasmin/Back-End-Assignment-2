import request from "supertest";
import app from "../src/app";
import { createBranch, getAllBranches, getBranchById, updateBranchById, deleteBranchById } from "../src/api/v1/controllers/branchController";

jest.mock("../src/api/v1/controllers/branchController", () => ({
    createBranch: jest.fn((req, res) => res.status(201).send({
        message: "Branch Created",
        data: { id: "1", name: "Main Branch", address: "123 Main St", phone: "123-456-7890" }
    })),
    getAllBranches: jest.fn(() => [
        { id: "1", name: "Main Branch", address: "123 Main St", phone: "123-456-7890" }
    ]),
    getBranchById: jest.fn(),
    updateBranchById: jest.fn(),
    deleteBranchById: jest.fn((req, res) => res.status(200).json({ message: "Branch Deleted Successfully" })),
}));

describe("Branch Routes", () => {
    afterEach(() => {
        jest.clearAllMocks();
    });

    // Test case for "Create Branch"
    describe("POST /api/v1/branches", () => {
        it("should call createBranch controller", async () => {
            const newBranchData = {
                name: "Main Branch",
                address: "123 Main St, City, Country",
                phone: "123-456-7890",
            };

            // Send a POST request to create a branch
            const response = await request(app)
                .post("/api/v1/branches")
                .send(newBranchData);

            // Assertions
            expect(response.status).toBe(201);
            expect(response.body).toEqual({
                message: "Branch Created",
                data: { id: "1", name: "Main Branch", address: "123 Main St", phone: "123-456-7890" }
            });

            // Check if createBranch was called
            expect(createBranch).toHaveBeenCalled();
        });
    });

     // Test case for "GET /api/v1/branches"
     describe("GET /api/v1/branches", () => {
        it("should return an array of all branches", async () => {
            const mockBranches = [
                {
                    id: "1",
                    name: "Main Branch",
                    address: "123 Main St",
                    phone: "123-456-7890"
                }
            ];

            // Mock the getAllBranches controller function
            (getAllBranches as jest.Mock).mockImplementation(async (req, res) => {
                res.status(200).json({
                    message: "All Branches Retrieved",
                    data: mockBranches,
                });
            });

            const response = await request(app).get("/api/v1/branches");

            expect(response.status).toBe(200);
            expect(response.body).toEqual({
                message: "All Branches Retrieved",
                data: mockBranches,
            });

            expect(getAllBranches).toHaveBeenCalled();
        });
    });

    // Test case for "GET /api/v1/branches/:id"
    describe("GET /api/v1/branches/:id", () => {
        it("should return the correct branch for a given ID", async () => {
            const branchId = "1";
            const mockBranch = {
                id: "1",
                name: "Main Branch",
                address: "123 Main St",
                phone: "123-456-7890"
            };

            (getBranchById as jest.Mock).mockImplementation(async (req, res) => {
                res.status(200).json({
                    message: "Branch Retrieved",
                    data: mockBranch,
                });
            });

            const response = await request(app).get(`/api/v1/branches/${branchId}`);

            expect(response.status).toBe(200);
            expect(response.body).toEqual({
                message: "Branch Retrieved",
                data: mockBranch,
            });

            expect(getBranchById).toHaveBeenCalled();
        });
    });

     // Test case for "PUT /api/v1/branches/:id"
     describe("PUT /api/v1/branches/:id", () => {
        it("should update a branch's data and return the updated branch", async () => {
            const branchId = "1";
            const updateData = { address: "456 New St", phone: "987-654-3210" };
            const updatedBranch = {
                id: branchId,
                name: "Main Branch",
                address: "456 New St",
                phone: "987-654-3210",
            };

            (updateBranchById as jest.Mock).mockImplementation(async (req, res) => {
                res.status(200).json({
                    message: "Branch Updated",
                    data: updatedBranch,
                });
            });

            const response = await request(app)
                .put(`/api/v1/branches/${branchId}`)
                .send(updateData);

            expect(response.status).toBe(200);
            expect(response.body).toEqual({
                message: "Branch Updated",
                data: updatedBranch,
            });

            expect(updateBranchById).toHaveBeenCalled();
        });
    });

    // Test case for "DELETE /api/v1/branches/:id"
    describe("DELETE /api/v1/branches/:id", () => {
        it("should delete a branch and return a success message", async () => {
            const branchId = "1";

            (deleteBranchById as jest.Mock).mockImplementation(async (req, res) => {
                res.status(200).json({ message: "Branch Deleted Successfully" });
            });

            const response = await request(app).delete(`/api/v1/branches/${branchId}`);

            expect(response.status).toBe(200);
            expect(response.body).toEqual({ message: "Branch Deleted Successfully" });

            expect(deleteBranchById).toHaveBeenCalled();
        });
    });
});


            
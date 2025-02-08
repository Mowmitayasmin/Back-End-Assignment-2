import request from "supertest";
import app from "../src/app";
import { createBranch } from "../src/api/v1/controllers/branchController";

jest.mock("../src/api/v1/controllers/branchController", () => ({
    createBranch: jest.fn((req, res) => res.status(201).send({
        message: "Branch Created",
        data: { id: "1", name: "Main Branch", address: "123 Main St", phone: "123-456-7890" }
    })),
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
});
// userRoutes.test.ts
import request from "supertest";
import app from "../src/app";
import { createEmployee } from "../src/api/v1/controllers/userController";

// Mocking the createEmployee controller function
jest.mock("../src/api/v1/controllers/userController", () => ({
    createEmployee: jest.fn((req, res) => res.status(201).send()),
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
}); 
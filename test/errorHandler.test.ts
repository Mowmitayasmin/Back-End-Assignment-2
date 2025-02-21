import { Request, Response, NextFunction } from "express";
import errorHandler from "../src/api/v1/middleware/errorHandler"; 
import { errorLogger } from "../src/api/v1/middleware/logger";

jest.mock("../src/api/v1/middleware/logger");

describe("Error Handling Middleware", () => {
    let mockReq: Partial<Request>;
    let mockRes: Partial<Response>;
    let mockNext: NextFunction;

    beforeEach(() => {
        jest.clearAllMocks();
        mockReq = {};
        mockRes = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        };
        mockNext = jest.fn();
    });

    it("log an error and return a 500 status", () => {
        const mockError = new Error("An unexpected error occurred");
        
        errorHandler(mockError, mockReq as Request, mockRes as Response, mockNext);

        expect(errorLogger.error).toHaveBeenCalledWith(
            "An unexpected error occurred",
            expect.any(Object)
        );
        expect(mockRes.status).toHaveBeenCalledWith(500);
        expect(mockRes.json).toHaveBeenCalledWith({
            message: "An unexpected error occurred",
        });
    });
});


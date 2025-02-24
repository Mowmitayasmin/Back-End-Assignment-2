import fs from "fs";
import path from "path";
import { errorLogger } from "../src/api/v1/middleware/logger";

jest.mock("fs");

describe("Logger Utility", () => {
    it("should write error logs to the file", () => {
        const mockAppendFileSync = jest.spyOn(fs, "appendFileSync");
        const errorMessage = "Test error";
        const errorDetails = { code: 500 };

        errorLogger.error(errorMessage, errorDetails);

        expect(mockAppendFileSync).toHaveBeenCalledWith(
            path.join(__dirname, "../src/logs/error.log"),
            expect.stringContaining(errorMessage)
        );
    });
});
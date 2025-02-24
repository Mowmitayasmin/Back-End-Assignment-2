import { validate } from "../src/api/v1/middleware/validate";
import { employeeSchema } from "../src/api/v1/validation/userValidation";
import { branchSchema } from "../src/api/v1/validation/branchValidation"

interface Employee {
    name: string;
    position: string;
    email: string;
    branchId: string;
    createdAt?: Date;
    updatedAt?: Date;
}

interface Branch {
    name: string;
    address: string;
    phone: string;
    createdAt?: Date;
    updatedAt?: Date;
}

describe("Employee Validation", () => {
    it("should pass with valid employee data", () => {
        const data: Employee = {
            name: "Alice Johnson",
            position: "HR Manager",
            email: "alice@example.com",
            branchId: "branch123"
        };

        expect(() => validate(employeeSchema, data)).not.toThrow();
    });

    it("should throw an error for missing name", () => {
        const data = {
            position: "HR Manager",
            email: "alice@example.com",
            branchId: "branch123"
        };

        expect(() => validate(employeeSchema, data)).toThrow(
            "Validation error: Name is required"
        );
    });

    it("should throw an error for invalid email", () => {
        const data = {
            name: "Alice Johnson",
            position: "HR Manager",
            email: "invalid-email",
            branchId: "branch123"
        };

        expect(() => validate(employeeSchema, data)).toThrow(
            "Validation error: Must be a valid email"
        );
    });

    it("should throw an error for empty position", () => {
        const data = {
            name: "Alice Johnson",
            position: "",
            email: "alice@example.com",
            branchId: "branch123"
        };

        expect(() => validate(employeeSchema, data)).toThrow(
            "Validation error: Position cannot be empty"
        );
    });
});

describe("Branch Validation", () => {
    it("should pass with valid branch data", () => {
        const data: Branch = {
            name: "Downtown Branch",
            address: "123 Main St, New York, NY",
            phone: "+12345678901"
        };

        expect(() => validate(branchSchema, data)).not.toThrow();
    });

    it("should throw an error for missing name", () => {
        const data = {
            address: "123 Main St, New York, NY",
            phone: "+12345678901"
        };

        expect(() => validate(branchSchema, data)).toThrow(
            "Validation error: Branch name is required"
        );
    });

    it("should throw an error for invalid phone number", () => {
        const data = {
            name: "Downtown Branch",
            address: "123 Main St, New York, NY",
            phone: "123"
        };

        expect(() => validate(branchSchema, data)).toThrow(
            "Validation error: Invalid phone number format"
        );
    });
});
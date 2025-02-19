import Joi, { ObjectSchema } from "joi";

export const employeeSchema: ObjectSchema = Joi.object({
    name: Joi.string().min(2).max(100).required().messages({
        "string.empty": "Name cannot be empty",
        "string.min": "Name must be at least 2 characters",
        "string.max": "Name cannot exceed 100 characters",
        "any.required": "Name is required",
    }),
    position: Joi.string().min(2).max(50).required().messages({
        "string.empty": "Position cannot be empty",
        "string.min": "Position must be at least 2 characters",
        "string.max": "Position cannot exceed 50 characters",
        "any.required": "Position is required",
    }),
    email: Joi.string().email().required().messages({
        "any.required": "Email is required",
        "string.email": "Must be a valid email",
        "string.empty": "Email cannot be empty",
    }),
    branchId: Joi.string().required().messages({
        "any.required": "Branch ID is required",
        "string.empty": "Branch ID cannot be empty",
    }),
    createdAt: Joi.date(),
    updatedAt: Joi.date(),
});

export const deleteUserSchema: ObjectSchema = Joi.object({
    id: Joi.string()
        .required()
        .messages({ "string.empty": "User ID cannot be empty" }),
});
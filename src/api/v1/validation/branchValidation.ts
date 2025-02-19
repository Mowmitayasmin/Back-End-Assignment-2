import Joi, { ObjectSchema } from "joi";

export const branchSchema: ObjectSchema = Joi.object({
    name: Joi.string().min(2).max(100).required().messages({
        "string.empty": "Branch name cannot be empty",
        "string.min": "Branch name must be at least 2 characters",
        "string.max": "Branch name cannot exceed 100 characters",
        "any.required": "Branch name is required",
    }),
    address: Joi.string().min(5).max(255).required().messages({
        "string.empty": "Address cannot be empty",
        "string.min": "Address must be at least 5 characters",
        "string.max": "Address cannot exceed 255 characters",
        "any.required": "Address is required",
    }),
    phone: Joi.string().pattern(/^\+?[0-9]{7,15}$/).required().messages({
        "string.empty": "Phone number cannot be empty",
        "string.pattern.base": "Invalid phone number format",
        "any.required": "Phone number is required",
    }),
    createdAt: Joi.date(),
    updatedAt: Joi.date(),
});

export const deleteBranchSchema: ObjectSchema = Joi.object({
    id: Joi.string()
        .required()
        .messages({ "string.empty": "Branch ID cannot be empty" }),
});
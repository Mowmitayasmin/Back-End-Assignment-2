import Joi, { ObjectSchema } from "joi";

export const branchSchema: ObjectSchema = Joi.object({
    id: Joi.string()
        .optional()
        .messages({ "string.empty": "Branch ID cannot be empty" }),
    name: Joi.string().required().messages({
        "any.required": "Branch name is required",
        "string.empty": "Branch name cannot be empty",
    }),
    address: Joi.string().required().messages({
        "any.required": "Address is required",
        "string.empty": "Address cannot be empty",
    }),
    phone: Joi.string()
    .trim()
    .pattern(/^[0-9]{10}$/)
    .required()
    .messages({
        "any.required": "Phone number is required",
        "string.pattern.base": "Phone number must be exactly 10 digits",
        "string.empty": "Phone number cannot be empty",
    }),
    createdAt: Joi.date(),
    updatedAt: Joi.date(),
});

export const deleteBranchSchema: ObjectSchema = Joi.object({
    id: Joi.string()
        .required()
        .messages({ "string.empty": "Branch ID cannot be empty" }),
});
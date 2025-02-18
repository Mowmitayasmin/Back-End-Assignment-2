import Joi, { ObjectSchema } from "joi";

export const userSchema: ObjectSchema = Joi.object({
    id: Joi.string()
        .optional()
        .messages({ "string.empty": "User ID cannot be empty" }),
    name: Joi.string().required().messages({
        "any.required": "Name is required",
        "string.empty": "Name cannot be empty",
    }),
    position: Joi.string().required().messages({
        "any.required": "Position is required",
        "string.empty": "Position cannot be empty",
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
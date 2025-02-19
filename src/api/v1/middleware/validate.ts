import { Request, Response, NextFunction } from "express";
import { Schema } from "joi";

export const validate = (schema: Schema, data: any) => {
    const { error } = schema.validate(data, { abortEarly: false });

    if (error) {
        throw new Error(
            "Validation error: " + error.details.map((d) => d.message).join(", ")
        );
    }
};

export const validateRequest = (schema: Schema) => {
    return (req: Request, res: Response, next: NextFunction): void => {
        const { error } = schema.validate(req.body, { abortEarly: false });

        if (error) {
            res.status(400).json({ errors: error.details });
            return; 
        }

        next(); 
    };
};

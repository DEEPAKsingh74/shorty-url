import { BadRequestError } from '@utils/error_handler/ErrorStatus';
import { Request, Response, NextFunction } from 'express';
import { ZodSchema } from 'zod';

export const validate =
    (schema: ZodSchema<any>) =>
        (req: Request, _res: Response, next: NextFunction) => {
            try {

                console.log("req.body: ", req.body);

                schema.parse(req.body);
                next();
            } catch (error: any) {

                const details = error.errors.map((err: any) => (err.message));

                const errorRes = new BadRequestError("Invalid input", details, "Do not modify inputs, refresh and try again.")

                next(errorRes);
            }
        };

import { z, type ZodType } from "zod";
import type { Request, Response, NextFunction } from "express";

const validate = (schema: ZodType) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const result = schema.safeParse(req.body);

    if (!result.success) {
      return res.status(400).json({
        success: false,
        message: "Validation Error",
        error: z.treeifyError(result.error),
      });
    }

    req.body = result.data;
    next();
  };
};

export default validate;

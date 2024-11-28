import { Request, Response } from "express";
import { servicePatchDataDB } from "../services";

export const controllerPatchDataDB = async (req: Request, res: Response) => {
    try {
        const productId = parseInt(req.params.id);

        if (isNaN(productId)) {
            return res.status(400).json({
                data: null,
                error: "Invalid product ID",
            });
        }

        const { data, error } = await servicePatchDataDB(productId, req.body);

        if (error) {
            return res.status(500).json({
                data: null,
                error: error.message,
            });
        }

        return res.status(200).json({
            data,
            error: null,
        });

    } catch (error: any) {
        return res.status(500).json({
            data: null,
            error: error.message || "Unexpected error occurred",
        });
    }
};
import { Request, Response } from "express";
import { serviceGetProducts } from "../services";

export const controllerGetProducts = async (req: Request, res: Response): Promise<void> => {
    try {
        const { data, error } = await serviceGetProducts();
        if (error) {
            console.error('Error al obtener los productos de la base de datos');
            res.status(500).json({
                data: null,
                error,
            });
            return;
        }
        res.status(200).json({
            data,
            error: null,
        });
    } catch (error) {
        console.error('Error inesperado al obtener los productos:', error);
        res.status(500).json({
            data: null,
            error: error,
        });
    }
}
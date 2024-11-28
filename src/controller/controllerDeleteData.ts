import { Request, Response } from "express";
import { serviceDeleteData } from "../services";
import { TablesDB } from "../types";

export const controllerDeleteData = async (req: Request, res: Response, tableDB: TablesDB): Promise<void> => {
    const id: number | string = parseInt(req.params.id, 10);
    if (isNaN(id)) {
        res.status(400).json({
            data: null,
            error: "El ID proporcionado no es válido.",
        });
        return;
    }
    
    try {
        const { data, error } = await serviceDeleteData(id, tableDB);
        if (error) {
            console.error(`Error al intentar eliminar ${tableDB}`, error);
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
    } catch (error: unknown) {
        console.error(`Error inesperado al intentar eliminar ${tableDB}`, error);
        res.status(500).json({
            data: null,
            error,
        });
    }
};

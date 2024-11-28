import { Request, Response } from "express";
import { TablesDB } from "../types";
import { serviceInsertData } from "../services";

export const controllerInsertData = async (req: Request, res: Response, tableDB: TablesDB): Promise<void> => {
    try {
        const { data, error } = await serviceInsertData(req, tableDB);
        if (error) {
            console.error(`Error al insertar datos en la BD, tabla: ${tableDB}`);
            res.status(500).json({
                message: `Error al insertar datos en la BD, tabla: ${tableDB}`,
                error,
            });
            return;
        }
        res.status(201).json({
            message: `Datos insertados correctamente a ${tableDB}`,
            data
        });
    } catch (error) {
        console.error(`Error inesperado al insertar datos a ${tableDB}: ${error}`);
        res.status(500).json({ error: `Error inesperado al intentar insertar datos a ${tableDB}` });
    }
}
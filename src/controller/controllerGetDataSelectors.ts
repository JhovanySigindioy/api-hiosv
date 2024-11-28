import { Request, Response } from "express";
import { serviceGetDataToSelectors } from "../services";
import { TablesDB } from "../types";

export const controllerGetDataToSelectors = async (req: Request, res: Response, tableDB: TablesDB): Promise<void> => {
    try {
        const { data, error } = await serviceGetDataToSelectors(tableDB);
        if (error) {
            console.error(`Error al obtener datos en la BD, tabla: ${tableDB}`);
            res.status(500).json({
                message: `Error al obtener datos en la BD, tabla: ${tableDB}`,
                error,
            });
            return;
        }
        res.status(201).json({
            message: 'Datos obtenidos correctamente, tabla:',
            data
        });
    } catch (error) {
        console.error(`Error inesperado al obtener datos de la tabla ${tableDB}`, error);
        res.status(500).json({ error: `Error inesperado al obtener datos de la tabla ${tableDB}` });
    }
}
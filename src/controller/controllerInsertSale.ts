import { Request, Response } from "express";
import { serviceInsertSale } from "../services";


export const controllerInsertSale = async (req: Request, res: Response) => {
    const saleData = req.body;

    // Asegúrate de que `saleData` cumple con la estructura esperada
    if (!saleData || !saleData.user_id || !Array.isArray(saleData.products)) {

        return res.status(400).json({ error: 'Datos de venta inválidos' });
    }

    try {
        const response = await serviceInsertSale(saleData);

        if (response.error) {
            return res.status(400).json({ error: response.error });
        }

        return res.status(200).json({ data: response.data });
    } catch (error) {
        console.error('Error en la inserción de venta:', error);
        return res.status(500).json({ error: 'Error interno del servidor' });
    }
};



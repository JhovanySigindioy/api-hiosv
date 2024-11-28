import { Request, Response } from "express";
import { serviceLogin } from "../services/serviceLogin"

export const controllerLogin = async (req: Request, res: Response): Promise<void> => {
    const { user, password } = req.body;
    try {
        const { data, error } = await serviceLogin(user, password);

        if (error) {
            res.status(401).json({
                data: null,
                error: error.message || "Usuario y/o contraseña inválido",
            });
            return;
        }
        res.status(200).json({
            data,
            error: null,
        });
    } catch (error: unknown) {
        const errorMessage: string = error instanceof Error ? error.message : `Error inesperado: ${error}`;
        res.status(500).json({
            data: null,
            error: errorMessage,
        });
    }
}
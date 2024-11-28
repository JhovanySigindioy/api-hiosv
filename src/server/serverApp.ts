import express, { Application } from "express";
import morgan from "morgan";
import cors from "cors";
import { router } from "../v1/routes/routes";

export const serverApp: Application = express();

serverApp.use(morgan("dev"));
serverApp.use(express.json())
serverApp.use(cors());
serverApp.use("/api/v1", router);//Prefijo de las rutas 


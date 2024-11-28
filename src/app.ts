import { serverApp } from "./server/serverApp";
import dotenv from "dotenv";

dotenv.config();

const portServer: string | number = process.env.PORT || 5000;

serverApp.listen(portServer, (): void => {
    console.log(`Servidor express corriendo satisfactoriamente en puerto ${portServer}`);
});

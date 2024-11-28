import { serverApp } from "./server/serverApp";
import dotenv from "dotenv";
import { serviceLogin } from "./services/serviceLogin";

dotenv.config();

const portServer: string | number = process.env.SERVER_EXPRESS_PORT || 5000;

serverApp.listen(portServer, (): void => {
    console.log(`Servidor express corriendo satisfactoriamente en puerto ${portServer}`);
});

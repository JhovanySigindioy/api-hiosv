import { createClient, SupabaseClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

dotenv.config();

const urlApiDB: string = process.env.DATA_BASE_API_URL || '';
const keyApiDB: string = process.env.DATA_BASE_API_KEY || '';

const dbClient: SupabaseClient = createClient(urlApiDB, keyApiDB);

console.log('URL de la base de datos:', urlApiDB);  // Verifica si esta variable está cargada
console.log('Clave de la base de datos:', keyApiDB);  // Verifica si esta clave está cargada


const testConnection = async () => {
    try {
        const { data, error } = await dbClient
            .from('products') // Reemplaza 'test_table' con el nombre de una tabla de tu base de datos
            .select('*')
            .limit(1);

        if (error) {
            console.error("Error de conexión a la base de datos:", error.message);
        } else {
            console.log("Conexión exitosa a la base de datos:", data);
        }
    } catch (err) {
        console.error("Error al intentar conectarse a la base de datos:", err);
    }
};

testConnection();


export const dbConfig = {
    dbClient,   
};



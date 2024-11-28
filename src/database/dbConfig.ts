import { createClient, SupabaseClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

dotenv.config();

const urlApiDB: string = process.env.DATA_BASE_API_URL || '';
const keyApiDB: string = process.env.DATA_BASE_API_KEY || '';

const dbClient: SupabaseClient = createClient(urlApiDB, keyApiDB);

export const dbConfig = {
    dbClient,   
};



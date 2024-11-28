import { PostgrestError } from "@supabase/supabase-js";
import { dbConfig } from "../database"

export interface IUserAutheticated {
    username: string;
    role: string;
}

export interface IServiceLoginResponse {
    data: IUserAutheticated | null;
    error: PostgrestError | null;
}

export const serviceLogin = async (user: string, password: string): Promise<IServiceLoginResponse> => {
    const { data, error } = await dbConfig.dbClient.from("users").select("username, role, password").eq("username", user).single();
    
    return {
        data,
        error,
    }
}
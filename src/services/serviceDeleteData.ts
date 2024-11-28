import { dbConfig } from "../database"
import { ServiceResponses } from "../interfaces";
import { TablesDB } from "../types";

export const serviceDeleteData = async (id: number | string, tableDB: TablesDB): Promise<ServiceResponses> => {
    const { data, error } = await dbConfig.dbClient.from(tableDB).delete().eq("id", id).select();
    return {
        data: data || [],
        error,
    }
}
import { dbConfig } from "../database";
import { ResponseGetDataSelectors } from "../interfaces";

export const serviceGetDataToSelectors = async (tableDB: string): Promise<ResponseGetDataSelectors> => {
    const { data, error } = await dbConfig.dbClient
        .from(tableDB)
        .select('*');
    return {
        data: data || [],
        error,
    };
};
import { Request } from "express"
import { dbConfig } from "../database"

import { TablesDB } from "../types/tablesDB"
import { ResponseGetProducts } from "../interfaces";

export const serviceInsertData = async (req: Request, tableDB: TablesDB): Promise<ResponseGetProducts> => {
    const { data, error } = await dbConfig.dbClient
        .from(tableDB)
        .insert(req.body)
        .select();
    ;
    return {
        data: data || [],
        error,
    }
}
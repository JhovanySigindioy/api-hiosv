import { dbConfig } from "../database";
import { ProductUpdate } from "../interfaces";

export const servicePatchDataDB = async (productId: number, updatedProductData: ProductUpdate ) => {
    const { data, error } = await dbConfig.dbClient
        .from('products')
        .update(updatedProductData)
        .eq('id', productId)
        .select();
    return {
        data,
        error,
    };
};

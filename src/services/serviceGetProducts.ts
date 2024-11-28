import { dbConfig } from "../database";
import { ResponseGetProducts } from "../interfaces";

export const serviceGetProducts = async (): Promise<ResponseGetProducts> => {
    const { data, error } = await dbConfig.dbClient
        .from('products')
        .select(`
        id,
        barcode,
        img_product,
        name,
        cost,
        sale_price,
        quantity,
        description,
        active,
        brand:brands (name),
        category:categories (name),
        location:locations (name)
      `).eq("active", true);

    const dataFormat = data?.map((product) => ({
        ...product,
        brand: (Array.isArray(product.brand) ? product.brand[0] : product.brand).name,
        category: (Array.isArray(product.category) ? product.category[0] : product.category).name,
        location: (Array.isArray(product.location) ? product.location[0] : product.location).name,
    }));

    return {
        data: dataFormat || [],
        error,
    };
};
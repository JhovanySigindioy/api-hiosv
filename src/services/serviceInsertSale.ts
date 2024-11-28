
import { dbConfig } from "../database/dbConfig";
import { SaleDetail, Sale, ServiceResponses } from "../interfaces";

export const serviceInsertSale = async (saleData: { user_id: number, products: { product_id: number, quantity: number }[] }): Promise<ServiceResponses> => {
    // Verificar disponibilidad de productos
    const productIds = saleData.products.map(p => p.product_id);

    // Realiza la consulta y verifica si hay un error o si los productos son null
    const { data: products, error: productError } = await dbConfig.dbClient
        .from('products')
        .select('id, quantity')
        .in('id', productIds);

    if (productError || !products || products.length === 0) {
        return { data: null, error: productError ? productError.message : 'Error al obtener productos' };
    }

    // Verificar si hay suficiente stock
    for (const product of saleData.products) {
        const productInDb = products.find(p => p.id === product.product_id);
        if (!productInDb || productInDb.quantity < product.quantity) {
            return { data: null, error: `No hay suficiente stock para el producto ${product.product_id}` };
        }
    }

    // Insertar la venta
    const { data: sale, error: saleError } = await dbConfig.dbClient
        .from('sales')
        .insert({ user_id: saleData.user_id })
        .select().single();

    if (saleError || !sale) {
        return { data: null, error: saleError ? saleError.message : 'Error al insertar la venta' };
    }

    const saleId = (sale as Sale).id;

    // Insertar detalles de la venta
    const saleDetails: SaleDetail[] = saleData.products.map(product => ({
        sale_id: saleId,
        product_id: product.product_id,
        quantity: product.quantity,
    }));

    const { data: details, error: detailsError } = await dbConfig.dbClient
        .from('sales_details')
        .insert(saleDetails);

    if (detailsError) {
        return { data: null, error: detailsError.message };
    }

    // Actualizar cantidades en stock
    for (const product of saleData.products) {
        // Obtener la cantidad actual del producto
        const { data: productData, error: productFetchError } = await dbConfig.dbClient
            .from('products')
            .select('quantity')
            .eq('id', product.product_id)
            .single();

        if (productFetchError || !productData) {
            console.error(`Error al obtener la cantidad del producto ${product.product_id}:`, productFetchError ? productFetchError.message : 'Desconocido');
            return { data: null, error: productFetchError ? productFetchError.message : `Error al obtener la cantidad del producto ${product.product_id}` };
        }

        // Calcular la nueva cantidad
        const newQuantity = productData.quantity - product.quantity;

        if (newQuantity < 0) {
            return { data: null, error: `Cantidad negativa resultante para el producto ${product.product_id}` };
        }

        // Asegurarse de no eliminar el producto accidentalmente
        const { error: updateError } = await dbConfig.dbClient
            .from('products')
            .update({ quantity: newQuantity })
            .eq('id', product.product_id);

        if (updateError) {
            console.error(`Error al actualizar la cantidad del producto ${product.product_id}:`, updateError.message);
            return { data: null, error: updateError.message };
        }
    }

    // Obtener productos actualizados para devolver como datos
    const { data: updatedProducts, error: fetchUpdatedError } = await dbConfig.dbClient
        .from('products')
        .select('id, name, cost, sale_price, quantity, active,  brand:brands (name), category:categories (name), location:locations (name)')
        .in('id', productIds);

    if (fetchUpdatedError) {
        return { data: null, error: fetchUpdatedError.message };
    }

    return { data: updatedProducts || [], error: undefined };
};


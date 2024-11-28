import { PostgrestError } from "@supabase/supabase-js";
import { Product } from "./Product";
import { DataSelectors } from "./DataSelectors";

export interface ServiceResponses {
    data: Product[] | null;
    error: any;
}

export interface ResponseGetProducts {
    data: Product[] | null;
    error: PostgrestError | null;
}

export interface ResponseGetDataSelectors {
    data: DataSelectors[] | null;
    error: PostgrestError | null;
}


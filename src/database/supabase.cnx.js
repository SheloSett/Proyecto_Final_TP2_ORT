import { createClient } from "@supabase/supabase-js";
import config from "../config/config.js";

class supabaseCnx {
    static #instance = null;

    static connect() {
        if(!supabaseCnx.#instance) {
            supabaseCnx.#instance = createClient(
                config.SUPABASE_URL,
                config.SUPABASE_API_KEY
            );

            console.log("Conectado a Supabase");
        }
        return supabaseCnx.#instance;
    }
}

export default supabaseCnx;
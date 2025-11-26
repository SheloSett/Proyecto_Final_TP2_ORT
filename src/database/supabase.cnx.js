import { createClient } from "@supabase/supabase-js";
import config from "../config/config.js";
import https from "https";

class supabaseCnx {
    static #instance = null;

    static connect() {
        if(!supabaseCnx.#instance) {
            // Configurar agente HTTPS que ignora certificados autofirmados (solo para desarrollo)
            const httpsAgent = new https.Agent({
                rejectUnauthorized: false
            });

            // fetch personalizado con el agente HTTPS
            const customFetch = (url, options = {}) => {
                return fetch(url, {
                    ...options,
                    agent: httpsAgent
                });
            };

            supabaseCnx.#instance = createClient(
                config.SUPABASE_URL,
                config.SUPABASE_API_KEY,
                {
                    global: {
                        fetch: customFetch
                    }
                }
            );

            console.log("Conectado a Supabase");
        }
        return supabaseCnx.#instance;
    }
}

export default supabaseCnx;
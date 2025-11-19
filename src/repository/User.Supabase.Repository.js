import supabaseCnx from "../database/supabase.cnx.js";

export class userRepository {
    constructor () {
        this.supabase = supabaseCnx.connect()
    }

    async getSupabase() {
        return this.supabase;
    }

    async getUserProfile(userId) {
        const { data, error } = await this.supabase.from('profiles').select('nombre, rol').eq('id', userId).single();
        
        if(error) throw new Error(error.message);

        return {
            userName: data.nombre,
            userRole: data.rol
        };
    }
    
    async createUserProfile(userId, email) {
        const { data , error } = await this.supabase.from('profiles').insert({
            id: userId,
            nombre: email,
            rol: "Cliente"
        }).select().single();

        if(error) throw new Error(error.message);

        return data;
    }
}

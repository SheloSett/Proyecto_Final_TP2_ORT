import { authService } from "../services/authService.js";

export const apiUserController = {
    signUp: async (req, res) => {

        const { email, password } = req.body;

        if(!email || !password) return res.status(400).json({message: "El email y el password son requeridos"});
            try {                
                const userRegistered = await authService.userSignUp(email, password) 

                return res.status(201).json({
                    message: `El usuario ${email} se ha dado de alta correctamente.`,
                    userRegistered
                })

            } catch (error) {
                console.log("Error al registrar usuario:", error);
                return res.status(500).json({message: error.message});
            }
        },

    login: async (req, res) => {
        const {email, password} = req.body;

        if(!email || !password) return res.status(400).json({message: "El email y el password son requeridos"});

        try {

            const userLogged = await authService.userLogin(email, password);

            return res.status(200).json({
                message: `El usuario ${userLogged.userName} ha iniciado sesión correctamente.`,
                userLogged
            });

        } catch (error) {
            console.log("Error al iniciar sesión:", error);
            return res.status(500).json({message: error.message});
        }
    }
}
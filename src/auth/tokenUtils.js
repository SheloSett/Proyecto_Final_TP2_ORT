import { userRepository } from "../repository/User.Supabase.Repository.js"

const supabase = new userRepository();  

  export const getUserToken = (req) => {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")){      
      return null;
    }

    const userToken = authHeader.split(" ")[1];

    if(!userToken || userToken.startsWith("{{")) {
      return null;
    }

    return userToken;
   };

  export const validateToken = async (token) => {
      try {
          const supacnx = await supabase.getSupabase();
  
          const { data: { user }, error } = await supacnx.auth.getUser(token);
  
          if(error || !user) {
              return {isTokenValid: false}
          }
  
          const userProfile = await supabase.getUserProfile(user.id);
  
          return {isTokenValid: true, role: userProfile.userRole}
  
      } catch (error) {
          return { isTokenValid: false, error: error.message}
      }
    };

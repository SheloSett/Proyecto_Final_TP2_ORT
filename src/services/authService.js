import { userRepository } from "../repository/User.Supabase.Repository.js";

const usersRepository = new userRepository();
const supabaseCnx = await usersRepository.getSupabase();

export const authService = {

  async userLogin(email, password) {
    const { data, error } = await supabaseCnx.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      throw new Error(error);
    }

    const userToken = data.session?.access_token;
    const userProfile = await usersRepository.getUserProfile(data.user.id);

    return {
      userName: userProfile.userName,
      userRole: userProfile.userRole,
      token: userToken,
    };
  },

  async userSignUp(email, password) {
    const { data, error } = await supabaseCnx.auth.signUp({
      email,
      password,
    });

    if (error) {
      throw new Error(error);
    }

    const userToken = data.session?.access_token;
    const userProfile = await usersRepository.createUserProfile(data.user.id, email);

    return {
      userName: email,
      userRole: userProfile.rol,
      token: userToken,
    };
  },
};

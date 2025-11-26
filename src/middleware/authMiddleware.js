import { getUserToken, validateToken } from "../auth/tokenUtils.js";
import { USER_ROLES } from "../utils/userRoles.js";

export const authenticateToken = async (req, res, next) => {
  try {
    const token = getUserToken(req);

    if (!token) return res.status(401).json({ message: "No token provided" });
    
    const result = await validateToken(token);
    
    if (!result.isTokenValid) return res.status(403).json({ message: "Invalid token" });

    req.user = { role: result.role };

    next();
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const isAdmin = async (req, res, next) => {
  try {
    const user = req.user;

    if (!user) return res.status(401).json({ message: "Usuario no autenticado" });

    if (user.role !== USER_ROLES.ADMIN) return res.status(403).json({ message: "El usuario no cuenta con los permisos" });

    next();
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

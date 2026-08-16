import "dotenv/config";
import jwt from "jsonwebtoken";

export function authMiddleware(req, res, next) {
  const token = req.cookies.token;
  if (!token) {
    return res.status(404).json({
      message: "token not found",
    });
  }
  try {
    let decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (!decoded) {
      return res.status(404).json({
        message: "invalid token",
      });
    }
    req.user = decoded;
    next();
  } catch (err) {
    return res.status(404).json({
      message: err.message,
    });
  }
}

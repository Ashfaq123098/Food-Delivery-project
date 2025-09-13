// middleware/optionalAuth.js
import jwt from "jsonwebtoken";

const optionalAuth = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (authHeader && authHeader.startsWith("Bearer ")) {
    try {
      const token = authHeader.split(" ")[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = { id: decoded.id }; // attach user info if token is valid
    } catch (err) {
      console.warn("Invalid token, continuing as guest");
      // continue without user info
    }
  }

  next(); // always call next()
};

export default optionalAuth;

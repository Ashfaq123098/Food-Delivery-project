// middleware/auth.js (updated for optional auth)
import jwt from "jsonwebtoken";

const authMiddleware = (req, res, next) => {
  const authHeader = req.headers.authorization;

  // If token exists, verify it
  if (authHeader && authHeader.startsWith("Bearer ")) {
    try {
      const token = authHeader.split(" ")[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = { id: decoded.id }; // attach user info if valid
    } catch (err) {
      console.warn("Invalid token, continuing as guest");
      // don't block request, just continue as guest
    }
  } else {
    // No token provided → continue as guest
    req.user = null;
  }

  next(); // always call next()
};

export default authMiddleware;

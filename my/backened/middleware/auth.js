import jwt from "jsonwebtoken";

const authMiddleware = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (authHeader && authHeader.startsWith("Bearer ")) {
    try {
      const token = authHeader.split(" ")[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = { id: decoded.id };
    } catch (err) {
      console.warn("Invalid token, continuing as guest");
      req.user = null;
    }
  } else {
    req.user = null; // no token → guest
  }

  next();
};

export default authMiddleware;

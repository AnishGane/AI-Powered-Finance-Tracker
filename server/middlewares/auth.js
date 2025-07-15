import jwt from "jsonwebtoken";

// Authentication middleware
export const validateToken = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) {
    return res.status(401).json({ error: "No token provided" });
  }

  try {
    // Verify the token using JWT_SECRET
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // For GET requests, set req.userId directly
    if (req.method === "GET") {
      req.userId = decoded.id;
    } else {
      if (!req.body) req.body = {};
      req.body.userId = decoded.id;
    }

    next();
  } catch (error) {
    if (error.name === "TokenExpiredError") {
      return res.status(401).json({ error: "Token expired" });
    }
    return res.status(401).json({ error: "Invalid token" });
  }
};

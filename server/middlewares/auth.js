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

    // Add the user ID to the request object
    req.body.userId = decoded.id;

    next();
  } catch (error) {
    if (error.name === "TokenExpiredError") {
      return res.status(401).json({ error: "Token expired" });
    }
    console.error("Token validation error:", error);
    return res.status(401).json({ error: "Invalid token" });
  }
};

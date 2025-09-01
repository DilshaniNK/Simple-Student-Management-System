
const jwt = require("jsonwebtoken");
require('dotenv').config();

const authMiddlware = (roles =[]) => {
    return (req, res, next) => {
    try {
      const authHeader = req.headers["authorization"];
      if (!authHeader) {
        return res.status(401).json({ message: "No token provided" });
      }

      // Extract token
      const token = authHeader.split(" ")[1]; // "Bearer <token>"
      if (!token) {
        return res.status(401).json({ message: "Invalid token format" });
      }

      // Verify token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      req.user = decoded;

      // Check role
      if (roles.length && !roles.includes(decoded.role)) {
        return res.status(403).json({ message: "Access denied" });
      }

      next();
    } catch (err) {
      console.error("Auth error:", err);
      return res.status(403).json({ message: "Unauthorized" });
    }
  };
}

module.exports = authMiddlware;

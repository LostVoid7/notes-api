import jwt from 'jsonwebtoken';

const authMiddleware = (req, res, next) => {
  const authHeader = req.headers.authorization;

  // No header → no token → no entry
  if (!authHeader) {
    return res.status(401).json({ message: 'No token provided' });
  }

  // Extract token from "Bearer <token>"
  const token = authHeader.split(' ')[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // user info now available in controllers
    next(); // proceed to the route
  } catch (err) {
    return res.status(401).json({ message: 'Invalid token' });
  }
};

export default authMiddleware;

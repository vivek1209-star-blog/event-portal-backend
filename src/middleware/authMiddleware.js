import jwt from 'jsonwebtoken';
import User from '../models/User.js';

export const protect = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader?.startsWith('Bearer '))
    return res.status(401).json({ error: 'No token provided' });

  const token = authHeader.split(' ')[1];
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id);

    if (!user) {
      return res.status(401).json({ error: 'User not found' });
    }

    if (user.currentToken !== token) {
      return res.status(401).json({
        error: 'Token expired or invalidated (logged in elsewhere)',
      });
    }

    req.user = { id: user._id, username: user.username, role: user.role };
    next();
  } catch (err) {
    res.status(401).json({ error: 'Invalid token' });
  }
};

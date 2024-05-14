const jwt = require('jsonwebtoken');
const { parse } = require('cookie');

const authMiddleware = (req, res, next) => {
  const token = parse(req.headers.cookie || '').token;

  if (!token) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = decoded.userId;
    next();
  } catch (err) {
    res.status(401).json({ error: 'Invalid token' });
  }
};

module.exports = authMiddleware;

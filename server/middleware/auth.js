const jwt = require('jsonwebtoken');
exports.verifyToken = (req, res, next) => {
  const header = req.headers.authorization || '';
  const token = header.startsWith('Bearer ') ? header.slice(7) : '';
  if (!token) return res.status(401).json({ message: 'Please sign in to continue.' });
  try { req.user = jwt.verify(token, process.env.JWT_SECRET); next(); }
  catch { return res.status(401).json({ message: 'Session expired. Please sign in again.' }); }
};
exports.allowRoles = (...roles) => (req, res, next) => roles.includes(req.user.role)
  ? next() : res.status(403).json({ message: 'You do not have permission to perform this action.' });

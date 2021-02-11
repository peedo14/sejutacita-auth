const jwt = require('jsonwebtoken');

const { JWT_SECRET } = process.env;

const checkJWT = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(' ')[1];
    const data = jwt.verify(token, JWT_SECRET);
    req.data = data;
    return next();
  } catch (e) {
    return res.json({
      status: 401,
      message: 'Unauthorized',
    });
  }
};

const protectAdmin = (req, res, next) => {
  const { data: { role } } = req;
  if (role !== 'admin') {
    return res.json({
      status: 401,
      message: 'Unauthorized (Only Admin)',
    });
  }
  return next();
};

module.exports = {
  checkJWT,
  protectAdmin,
};

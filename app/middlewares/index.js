const wrap = require('./wrapper');
const validator = require('./validator');
const auth = require('./auth');

module.exports = {
  wrap,
  ...validator,
  ...auth,
};

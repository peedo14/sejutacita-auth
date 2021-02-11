const wrap = require('./wrapper');
const validator = require('./validator');

module.exports = {
  wrap,
  ...validator,
};

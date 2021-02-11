const Joi = require('joi');

const loginSchema = Joi.object({
  username: Joi.string().required(),
  password: Joi.string().required(),
});

const options = {
  errors: {
    wrap: {
      label: '',
    },
  },
};

const usernamePassValidator = async (req, res, next) => {
  try {
    const { error } = loginSchema.validate(req.body, options);
    if (error) {
      throw error;
    }
  } catch (e) {
    return res.json({
      status: 401,
      message: e.message,
    });
  }
  return next();
};

module.exports = {
  usernamePassValidator,
};

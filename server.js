require('dotenv').config();
const app = require('express')();
const bodyparser = require('body-parser');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const { wrap, usernamePassValidator } = require('./app/middlewares');
const connection = require('./app/databases/connection');
const { userModel } = require('./app/models');

const { JWT_SECRET, PORT } = process.env;

app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: false }));

app.get('/ping', (req, res) => {
  res.send('PONG');
});

app.post('/login', usernamePassValidator, wrap(async (req, res) => {
  const { username, password } = req.body;
  let token = '';
  try {
    // const findUser = await axios({
    //   method: 'post',
    //   url: `http://${USER_HOST}/login`,
    //   headers: {
    //     'content-type': 'application/json',
    //   },
    //   data: {
    //     username,
    //     password,
    //   },
    // });
    const isUser = await userModel.findOne({ username }).select('+password');
    if (!isUser) {
      return res.json({
        status: 404,
        message: 'User not Found',
      });
    }
    const isValidPassword = await bcrypt.compare(password, isUser.password);
    if (!isValidPassword) {
      return res.json({
        status: 401,
        message: 'Wrong Password',
      });
    }

    token = jwt.sign({
      id: isUser._id,
      username: isUser.username,
      role: isUser.role,
    }, JWT_SECRET);
  } catch (e) {
    return res.json({
      status: 404,
      message: e.message || '',
    });
  }

  return res.json({
    status: 200,
    message: 'Success Login',
    data: token,
  });
}));

app.use((err, req, res, _next) => {
  const { name = '', stack = '', message = '' } = err;
  res.json({
    status: 500,
    message: 'Internal Server Error',
    data: null,
    err: {
      name,
      message,
      stack,
    },
  });
});

connection().then(() => app.listen(PORT, () => console.log(`Listening port ${PORT}`))).catch((error) => console.log(error));

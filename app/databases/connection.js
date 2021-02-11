const mongoose = require('mongoose');

const {
  DB_URI,
} = process.env;
const connection = async () => {
  try {
    await mongoose.connect(DB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    // await mongoose.connect(`${DB_DRIVER}://${DB_HOST}:${DB_PORT}/${DB_NAME}`, {
    //   useNewUrlParser: true,
    //   useCreateIndex: true,
    //   useFindAndModify: false,
    //   useUnifiedTopology: true,
    //   authSource: 'admin',
    //   user: DB_USER,
    //   pass: DB_PASS,
    // });
    console.log('Connected to Database');
  } catch (e) {
    console.log(e);
    throw new Error('Database Connection Failed');
  }
};

module.exports = connection;

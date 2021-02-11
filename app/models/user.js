const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');

const { Schema } = mongoose;

const UserSchema = new Schema({
  username: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    select: false,
    required: true,
  },
  role: {
    type: String,
    required: true,
    enum: ['user', 'admin'],
  },
});

UserSchema.plugin(mongoosePaginate);

const UserModel = mongoose.model('User', UserSchema);

module.exports = UserModel;

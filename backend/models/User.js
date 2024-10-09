const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const UserSchema = new mongoose.Schema({
  f_userName: {
    type: String,
    required: true,
    unique: true,
  },
  f_Pwd: {
    type: String,
    required: true,
  },
});

UserSchema.pre('save', async function (next) {
  if (!this.isModified('f_Pwd')) {
    return next();
  }
  const salt = await bcrypt.genSalt(10);
  this.f_Pwd = await bcrypt.hash(this.f_Pwd, salt);
});

UserSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.f_Pwd);
};

const User = mongoose.model('User', UserSchema);

module.exports = User;

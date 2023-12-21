const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new mongoose.Schema({
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    usertype:{type:String, required: true}

  });
  
  module.exports = mongoose.model('user', userSchema);
  
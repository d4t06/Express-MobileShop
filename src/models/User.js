const mongoose = require("mongoose")

const Schema = mongoose.Schema;

const UserSchema = new Schema({
  username: { type: String },
  password: { type: String },
  role: { type: String, default: "R3" },
});

module.exports = mongoose.model('User', UserSchema);

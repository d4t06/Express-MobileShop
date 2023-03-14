const mongoose = require("mongoose")

const Schema = mongoose.Schema;

const UserSchema = new Schema({
  username: { type: String },
  password: { type: String },
  role_code: { type: String, default: "R3" },
  refresh_token: {type: String}
});

module.exports = mongoose.model('User', UserSchema);

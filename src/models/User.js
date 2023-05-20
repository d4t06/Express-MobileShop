const mongoose = require("mongoose")
const AutoIncrement = require('mongoose-sequence')(mongoose);

const Schema = mongoose.Schema;

const UserSchema = new Schema({
  // _id: {type: Number},
  username: { type: String },
  password: { type: String },
  role_code: { type: String, default: "R3" },
  refresh_token: {type: String}
});

// UserSchema.plugin(AutoIncrement, {inc_field: "_id"})

module.exports = mongoose.model('User', UserSchema);

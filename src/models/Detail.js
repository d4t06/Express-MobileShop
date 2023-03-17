const mongoose = require("mongoose")

const Schema = mongoose.Schema;

const DetailSchema = new Schema({
  key: { type: String },
  title: { type: String },
  images: { type: String },
  param_image: {type : String},
  colors: {type : String},
  memories: {type : String},
  params: {type : String},
});

module.exports = mongoose.model('Detail', DetailSchema);

const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const ImageSchema = new Schema({
  name: {
    type: String,
    require: true,
  },
  path: {
    type: String,
    require: true,
  },
  image_path: {
    type: String,
    require: true,
  },
  type: {
    type: String,
    require: true,
  },
  size: {
    type: Number,
    require: true,
  },
});

module.exports = mongoose.model("Image", ImageSchema);

const mongoose = require("mongoose")
const Schema = mongoose.Schema;

const DetailSchema = new Schema({
  product_id: { type: String },
  images: { type: String },
}
);

const Detail =  mongoose.model('Detail', DetailSchema);


module.exports = Detail
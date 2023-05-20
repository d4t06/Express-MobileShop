const mongoose = require("mongoose")
const AutoIncrement = require('mongoose-sequence')(mongoose);

const Schema = mongoose.Schema;

const ItemSchema = new Schema({
    _id: {type: Number},
  name: { type: String },
});

// ItemSchema.plugin(AutoIncrement, {inc_field: "id"})
ItemSchema.plugin(AutoIncrement, {id: 'my_id', inc_field: '_id'});

module.exports = mongoose.model('Item', ItemSchema);

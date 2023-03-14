const mongoose = require("mongoose")
const AutoIncrement = require('mongoose-sequence')(mongoose);

mongoose.set('strictQuery', true);

const Schema = mongoose.Schema;

const ProductSchema = new Schema({
  _id: {type: Number},
  href: { type: String },
  name: { type: String, default: 'product_name' },
  brand: {type : String},
  category: {type : String},
  image: { type: String },
  feature: { type: String },
  old_price: { type: Number },
  cur_price: { type: Number},
  product_label: { type: String },
  intallment: { type: Boolean },
  label: { type: String},
  gift: { type: String},
  pre_order: { type: String},
},
  {
    _id: false,
    timestamps: true,
  }
);

//custom query helper
  // không được viết trùng tên với tên phương thức của query 
ProductSchema.query.handleSort = function (res) {
  console.log('sort :', res.locals.sort);
  if (res.locals.sort.enable) {

    if (res.locals.sort.column === 'intallment') {

      const result = this.where({intallment: true})
      return result 
    }

    return this.sort({
      [res.locals.sort.column] : res.locals.sort.type
    })

  }
  return this;
}

ProductSchema.query.handlePage = function (res) {
  const pageSize = res.locals.page.curPage * 6
  const skipCount = 0  // (res.locals._page.curPage - 1) * pageSize
 
  //thực hiện phân dữ liệu
  this.skip(skipCount)
  this.limit(pageSize)

  return this;
}

// add plugin
ProductSchema.plugin(AutoIncrement)

module.exports = mongoose.model('Product', ProductSchema)
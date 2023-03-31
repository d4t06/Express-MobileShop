const mongoose = require("mongoose")
const AutoIncrement = require('mongoose-sequence')(mongoose);

mongoose.set('strictQuery', true);

const Schema = mongoose.Schema;

const ProductSchema = new Schema({
  href: { type: String },
  name: { type: String },
  brand: { type: String },
  category: { type: String },
  image: { type: String },
  feature: { type: String },
  old_price: { type: Number },
  cur_price: { type: Number },
  product_label: { type: String },
  intallment: { type: Boolean },
  label: { type: String },
  gift: { type: String },
  pre_order: { type: String },
},
  {
    _id: false,
    timestamps: true,
  }
);

ProductSchema.set('toObject', { virtuals: true });
ProductSchema.set('toJSON', { virtuals: true });

ProductSchema.virtual('details', {
  ref: "Detail",
  localField: 'href', // The field in productSchema
  foreignField: 'key', // The field on detailSchema. This can be whatever you want.
})

//custom query helper
// không được viết trùng tên với tên phương thức của query 
ProductSchema.query.handleSort = function (res) {
  console.log('sort :', res.locals.sort);
  if (res.locals.sort.enable) {

    if (res.locals.sort.column === 'intallment') {

      const result = this.where({ intallment: true })
      return result
    }

    return this.sort({
      [res.locals.sort.column]: res.locals.sort.type
    })

  }
  return this;
}

ProductSchema.query.handlePage = function (res) {

  const pageSize = process.env.PAGE_SIZE || 6
  const skipCount = (res.locals.page?.curPage || 1) * process.env.PAGE_SIZE  // (res.locals._page.curPage - 1) * pageSize

  //thực hiện phân dữ liệu
  this.skip(skipCount)
  this.limit(pageSize)

  return this;
}

// add plugin
ProductSchema.plugin(AutoIncrement)

module.exports = mongoose.model('Product', ProductSchema)
const mongoose = require("mongoose")
const Schema = mongoose.Schema;
const Detail = require('./Detail')

const ProductSchema = new Schema({
  product_id: { type: String, null: false },
  name: { type: String },
  brand_name: { type: String },
  category_name: { type: String },
  image_url: { type: String },
  image_file_path: { type: String },
  old_price: { type: Number, default: null },
  cur_price: { type: Number, default: null },
  installment: { type: Boolean, default: false },
},
  {
    timestamps: true,
    toJSON: {virtuals: true},
    toObject: {virtuals: true}
  }
);


ProductSchema.virtual('detail_data', {
  ref: Detail,
  localField: 'product_id', // The field in productSchema
  foreignField: 'product_id', // The field on detailSchema. This can be whatever you want.
})


//custom query helper
// không được viết trùng tên với tên phương thức của query 
ProductSchema.query.handleSort = function (res) {
  // console.log('sort :', res.locals.sort);
  if (res.locals.sort.enable) {

    if (res.locals.sort.column === 'installment') {

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
  const skipCount = (res.locals.page?.curPage - 1 || 0) * process.env.PAGE_SIZE  // (res.locals._page.curPage - 1) * pageSize

  //thực hiện phân dữ liệu
  this.skip(skipCount)
  this.limit(pageSize)

  return this;
}

// add plugin
// ProductSchema.plugin(AutoIncrement, {inc_field: 'id'});

module.exports = mongoose.model('Product', ProductSchema)
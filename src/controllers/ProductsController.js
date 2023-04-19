const Product = require("../models/Product");
const Detail = require("../models/Detail")

class ProductsController {
    getProducts(req, res) {
      const { price, ...query } = req.query;

      // console.log(res.locals.sort)
      
      const [gThan, lThan] = price || [0, 50];
      
      console.log("controller pass ", {...query, price} );
      // console.log(gThan, lThan);

      // service
      Promise.all([
         Product.find({ ...query, cur_price: { $gte: +gThan * 1000000, $lte: +lThan * 1000000 } }).count(),
         Product.find({ ...query, cur_price: { $gte: +gThan * 1000000, $lte: +lThan * 1000000 } })
            .handlePage(res)
            .handleSort(res),
      ])

         .then(([count, rows]) => {
            res.json({ page_size: +process.env.PAGE_SIZE || 6, count, rows });
            return;
         })
         .catch((err) => res.status(500).json(err));
   }
   async getOne(req, res) {
      // service
      const { key } = req.params;
      console.log(" key = ", key);

      // let newProduct = [];

      const product = await Product.find({href: key}).populate('data')

      // product.forEach(async (product) => {
      //    try {            
      //       const detail = await Detail.findOne({key: key})

      //       product.set('data', detail.toJSON(), {strict: false})
      //       newProduct.push(product)

      //       res.json(newProduct)
      //    } catch (error) {

      //       res.status(500).json("loi server")
      //       console.log(error);
      //    }

      // });
      res.json(product)
   }

   search(req, res) {
      let { q, page } = req.query;
      if (!page) page = 1;
      console.log("search", q, page);

      Promise.all([
         Product.find({ name: new RegExp(q, "i") }).count(),
         Product.find({ name: new RegExp(q, "i") })
            .handlePage(res)
            .handleSort(res),
      ])

         .then(([count, rows]) => {
            res.json(rows.length ? { count, rows } : null);
         })
         .catch((err) => {
            res.status(500).json("lối serve");
            console.log(err);
         });
   }
}

module.exports = new ProductsController();

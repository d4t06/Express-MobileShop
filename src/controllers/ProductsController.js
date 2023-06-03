const Product = require('../models/Product');

class ProductsController {
   getProducts(req, res) {
      const { category } = req.params;
      const { price, ...query } = req.query;

      console.log(category);

      // chec payload
      if (!category) 
        return res.status(402).json({status: "finish", message: "missing payload"})

      // console.log(res.locals.sort)

      const [gThan, lThan] = price || [0, 50];

      console.log('controller pass ', { ...query, price });
      // console.log(gThan, lThan);

      // service
      Promise.all([
         Product.find({
            ...query,
            category: category,
            cur_price: { $gte: +gThan * 1000000, $lte: +lThan * 1000000 },
         }).count(),
         Product.find({
            ...query,
            category: category,
            cur_price: { $gte: +gThan * 1000000, $lte: +lThan * 1000000 },
         })
            .handleSort(res)
            .handlePage(res),
      ])

         .then(([count, rows]) => {
            res.json({ page_size: +process.env.PAGE_SIZE || 6, count, rows });
            return;
         })
         .catch((err) => res.status(500).json(err));
   }

   async getDetail(req, res) {
      const { key } = req.params;
      // const product = await Product.find({ href: key }).populate('data');
      const product = await Product.find({ href: key });

      res.json(product);
   }

   async getSuggest(req, res) {
      const { category } = req.query;
      const products = await Product.find({ category: category }).limit(4);

      res.json(products);
   }

   search(req, res) {
      let { q, page } = req.query;
      if (!page) page = 1;
      console.log('search', q, page);

      Promise.all([
         Product.find({ name: new RegExp(q, 'i') }).count(),
         Product.find({ name: new RegExp(q, 'i') })
            .handleSort(res)
            .handlePage(res),
      ])

         .then(([count, rows]) => {
            res.json(rows.length ? { page_size: +process.env.PAGE_SIZE || 6, count, rows } : null);
         })
         .catch((err) => {
            res.status(500).json('lối serve');
            console.log(err);
         });
   }   
}

module.exports = new ProductsController();

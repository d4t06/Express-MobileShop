const User = require("../models/User");
const Product = require("../models/Product");
const fs = require("fs");

const PAGE_SIZE = 6;

class AdminController {
  async getUser(req, res) {
    try {
      const users = await User.find({});
      res.json(users);
    } catch (error) {
      res.status(500).json("loi server");
    }
  }
  async getProducts(req, res) {
    try {
      const process1 = Product.find({});
      const process2 = Product.find({}).count();

      const row = await process1;
      const count = await process2;
      res.json({ page_size: PAGE_SIZE, count, row });
    } catch (error) {
      res.status(501).json({ staus: "error", nessage: error });
    }
  }
  async getOne(req, res) {
    const { href } = req.params;

    const product = await Product.find({ href: href });

    res.json(product);
  }

  addOne(req, res) {
    try {
      // fieldname: 'image',
      // originalname: 'microsoft-lumia-535-15-300x300.jpg',
      // encoding: '7bit',
      // mimetype: 'image/jpeg',
      // destination: './uploads',
      // filename: 'nokia-lumia-535.jpg',
      // path: 'uploads/nokia-lumia-535.jpg',
      // size: 21434

      if (!req.body) {
        return res
          .status(402)
          .json({ status: "finish", message: "missing payload" });
      }

      const productInfo = req.body;

      // check info
      if (!productInfo.name || !productInfo.category)
        return res
          .status(402)
          .json({ status: "finish", message: "missing payload" });

      const newProduct = new Product({...productInfo});
      newProduct.save();

      res.status(201).json({
        status: "successful",
        message: "insert successful",
      });
    } catch (error) {
      console.log(error);
      res.json({
        status: "fail",
        message: "insert error",
      });
    }
  }
  async updateOne(req, res) {
    try {
      const productInfo = req.body;

      console.log("productInfo = ", req.body);

      if (!productInfo.name || !productInfo.category)
        return res
          .status(402)
          .json({ status: "finish", message: "missing payload" });

      await Product.updateOne({ href: productInfo.href }, { ...productInfo });
      res.status(201).json({
        status: "successful",
        message: "update successful",
      });
    } catch (error) {
      res.json({
        status: "update error",
        message: error,
      });
    }
  }
  async deleteOne(req, res) {
    try {
      const { href } = req.params;

      // remove on database
      await Product.deleteOne({ href: href });

      // remove on file
      fs.rmSync(`uploads/${href}.jpg`, {
        force: true,
      });

      res.status(201).json({
        status: "successful",
        message: "delete sucessful",
      });
    } catch (error) {
      res.status(501).json({ status: "fail", message: error });
    }
  }
}

module.exports = new AdminController();

const Image = require("../models/Image");
const fs = require("fs")

const IMAGE_URL = "http://localhost:3000/";

class ImageController {
   async getImages(req, res) {
      try {
         const images = await Image.find({});

         res.json({ count: 1, rows: images });
      } catch (error) {
         console.log(error);
         res.status(500).json({ status: "error", message: "Get images error" });
      }
   }
   async addOne(req, res) {
      try {
         if (!req.file) {
            return res
               .status(402)
               .json({ status: "finish", message: "missing payload" });
         }

         const { filename, path, mimetype, size } = req.file;
         const newImage = new Image({
            name: filename,
            image_path: IMAGE_URL + path,
            type: mimetype,
            size: +size,
         });

         newImage.save();

         res.json({ status: "successful", message: "add image successful" });
      } catch (error) {
         console.log(error);
      }
   }
   async deleteOne(req, res) {
      try {
         const { fileName } = req.params;

         console.log(fileName);

        //  remove on database
        await Image.deleteOne({name: fileName});

         // remove file
         fs.rmSync(`uploads/${fileName}`, {
            force: true,
         });

         res.status(201).json({
            status: "successful",
            message: "delete image sucessful",
         });
      } catch (error) {
        console.log(error)
         res.status(501).json({ status: "fail", message: "delete image error" });
      }
   }
}
module.exports = new ImageController();

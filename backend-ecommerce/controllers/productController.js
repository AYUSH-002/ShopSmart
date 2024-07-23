import productModel from "../models/productModel.js";
import fs from "fs";
import path from "path";

const addProduct = async (req, res) => {
  if (
    !req.file ||
    !req.body.name ||
    !req.body.description ||
    !req.body.price ||
    !req.body.category
  ) {
    return res
      .status(400)
      .json({ success: false, message: "All fields are required" });
  }

  let image_filename = `${req.file.filename}`;

  const product = new productModel({
    name: req.body.name,
    description: req.body.description,
    price: req.body.price,
    category: req.body.category,
    image: image_filename,
  });

  try {
    await product.save();
    res.status(201).json({ success: true, message: "Product Added" });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Error saving product",
      error: error.message,
    });
  }
};

const listProducts = async (req, res) => {
  try {
    const products = await productModel.find({});
    res.json({ success: true, data: products });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Error" });
  }
};

const removeProduct = async (req, res) => {
  try {
    const product = await productModel.findById(req.body.id);

    if (!product) {
      return res
        .status(404)
        .json({ success: false, message: "Product not found" });
    }

    const imagePath = path.join("uploads", product.image);

    fs.unlink(imagePath, async (err) => {
      if (err) {
        console.error("Error deleting image file:", err);
        return res
          .status(500)
          .json({ success: false, message: "Error deleting image file" });
      }

      await productModel.findByIdAndDelete(req.body.id);

      res.json({ success: true, message: "Product removed successfully" });
    });
  } catch (error) {
    console.error("Error removing product:", error);
    res.status(500).json({
      success: false,
      message: "Error removing product",
      error: error.message,
    });
  }
};

export { addProduct, listProducts, removeProduct };

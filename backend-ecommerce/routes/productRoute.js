import express from "express";
import { addProduct, listProducts, removeProduct } from "../controllers/productController.js";

import multer from "multer";

const productRouter = express.Router();

const storage = multer.diskStorage({
  destination: "uploads",
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}${file.originalname}`);
  },
});

const upload = multer({ storage });

productRouter.post("/add", upload.single("image"), addProduct);
productRouter.get("/list", listProducts);
productRouter.post("/remove",removeProduct);


export default productRouter;

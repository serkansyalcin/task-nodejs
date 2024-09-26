import { Router } from "express";
import Product from "../models/productModel.js";
import upload from "../middlewares/upload.js";
const router = Router();

//  create a new product
router.post("/products", upload.single("image"), async (req, res) => {
  let imageUrl = "";
  if (req.file) {
    imageUrl = `product-uploads/${req.file.filename}`;
  }

  try {
    const product = new Product({ imageUrl, ...req.body });
    const result = await product.save();
    res.status(200).send(result);
  } catch (error) {
    res.status(500).send({
      message: "Cannot insert! Try again later",
      status: false,
      error: error.message,
    });
  }
});

// get all products
router.get("/products", async (req, res) => {
  try {
    const allProducts = await Product.find();
    res.send(allProducts);
  } catch (error) {
    res.status(500).send({
      message: "Error retrieving products",
      error: error.message,
    });
  }
});

// get a single product by ID
router.get("/products/:id", async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).send({ message: "Product not found" });
    }
    res.send(product);
  } catch (error) {
    res.status(500).send({
      message: "Error retrieving product",
      error: error.message,
    });
  }
});

//  delete a product by ID
router.delete("/products/:id", async (req, res) => {
  try {
    const result = await Product.findByIdAndDelete(req.params.id);
    res.send(result);
  } catch (error) {
    res.status(500).send({
      message: "Error deleting product",
      error: error.message,
    });
  }
});

//  update a product by ID
router.put("/products/:id", upload.single("image"), async (req, res) => {
  let imageUrl = "";
  if (req.file) {
    imageUrl = `product-uploads/${req.file.filename}`;
  }

  try {
    const result = await Product.findByIdAndUpdate(
      req.params.id,
      { imageUrl, ...req.body },
      {
        new: true,
      }
    );
    res.send(result);
  } catch (error) {
    res.status(500).send({
      message: "Error updating product",
      error: error.message,
    });
  }
});

export default router;

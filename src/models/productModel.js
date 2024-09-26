import mongoose from "mongoose";

// schema for Product data
const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Product name is required"], 
  },
  price: {
    type: Number,
    required: [true, "Product price is required"], 
  },
  stock: Number,

  description: {
    type: String,
    default: "", 
  },
  imageUrl: {
    type: String,
    default: "",
  },
});

const Product = mongoose.model("Product", productSchema);
export default Product;

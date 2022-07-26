const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
   name: {
      type: String,
      required: [true, "Product name required"],
   },
   price: {
      type: Number,
      required: [true, "Product price required"],
   },
   featured: {
      type: Boolean,
      default: false,
   },
   rating: {
      type: Number,
      default: 4.5,
   },
   createdAt: {
      type: Date,
      default: Date.now(),
   },
   company: {
      type: String,
      // enum: ["ikea", "liddy", "carssa", "marcos"],
      enum: {
         values: ["ikea", "liddy", "carssa", "macros"],
         message: "{VALUE} it not supported",
      },
   },
});

const Product = mongoose.model("Product", productSchema);

module.exports = Product;

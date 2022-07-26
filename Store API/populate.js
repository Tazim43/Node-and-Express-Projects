require("dotenv").config();

const connectDB = require("./db/connect");
const Product = require("./models/product");

const jsonProducts = require("./data/product.json");

const start = async () => {
   try {
      await connectDB(process.env.MONGO_URI);
      await Product.deleteMany();
      await Product.create(jsonProducts);
      console.log("Successful!");
      process.exit(0);
   } catch (err) {
      console.log(err);
      process.exit(1);
   }
};

start();

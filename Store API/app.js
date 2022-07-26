const express = require("express");
const errorHandler = require("./middlewares/error_handler");
const notFound = require("./middlewares/not_found");
const connectDB = require("./db/connect");
const productsRouter = require("./routes/products");
require("dotenv").config();
// declearations
const port = process.env.PORT || 3000;
const app = express();

// middlewares

app.use(express.json());
// Products routes
app.use("/api/v1/products", productsRouter);
// routes
app.use(errorHandler); // 500 error handler
app.use(notFound); // 404 not found handler

app.get("/", (req, res) => {
   res.send("Hello API");
});

// express server
const start = async () => {
   try {
      await connectDB(process.env.MONGO_URI);
      app.listen(port, console.log(`Server listening at port ${port}`));
   } catch (err) {
      console.log(err);
   }
};

start();

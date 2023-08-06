//To delete a particular key : value pair froma all documents of mongodb collection
// db.collection_name.updateMany({}, { $unset : { description : 1} })

import express from "express";
import mongoose from "mongoose";
import morgan from "morgan";
import cors from "cors";
import { productRouter } from "./routes/product.js";
import { categoryRouter } from "./routes/category.js";
import { brandRouter } from "./routes/brand.js";
const App = express();
const port = 8000;

// Define a route to handle GET requests to the root URL
App.get("/", (req, res) => {
  res.send("Hell, World! This is a basic Express server");
});
(async function main() {
  try {
    const result = await mongoose.connect(
      "mongodb+srv://imt2021092:tK5K0iTh8mhXmChg@cluster0.38xejdd.mongodb.net/e-commerce"
    );
    console.log("Database Connected");
  } catch (err) {
    console.log(err);
  }
})();
App.use(morgan("dev"));
App.use(
  cors({
    exposedHeaders: ["X-Total-Count"],
  })
);
App.use(express.json());

App.use("/products", productRouter);
App.use("/categories", categoryRouter);
App.use("/brands", brandRouter);

// Start the server and listen on the specified port
App.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

import express from 'express'
const productRouter = express.Router()
import { createProduct, fetchAllProducts, fetchProductByID, updateProduct } from '../controller/product.js'

productRouter
    .post("/", createProduct)
    .get("/", fetchAllProducts)
    .get("/:id", fetchProductByID)
    .patch("/:id", updateProduct)
    // .put("/:id", replaceProduct)
    // .delete("/:id", deleteProduct)
export { productRouter}
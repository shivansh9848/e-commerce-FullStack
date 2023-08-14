import express from 'express'
const cartRouter = express.Router()
import {fetchItemsByUserID,addToCart,updateCart,deleteItem} from '../controller/cart.js'

cartRouter
    .get("/", fetchItemsByUserID)
    .post("/", addToCart)
    .patch("/:id", updateCart)
    .delete("/:id", deleteItem)
    // .delete("/:id", resetCart)

export { cartRouter}

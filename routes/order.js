import express from "express";
const orderRouter = express.Router();
import {
  createOrder,
  fetchAllOrders,
  updateOrder,
  fetchLoggedInUsersOrders,
} from "../controller/order.js";

orderRouter
  .post("/", createOrder)
  .get("/", fetchAllOrders)
  .patch("/:OrderId", updateOrder)
  .get("/own", fetchLoggedInUsersOrders);

export { orderRouter };

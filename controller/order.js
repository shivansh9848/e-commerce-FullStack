import Order from "../model/order.js";

export const fetchLoggedInUsersOrders = async (req, res) => {
  const userId = req.user.id;
  const orderItems = Order.find({ user: userId });
// console.log("x",orderItems)
  try {
    res.status(200).json(await orderItems);
  } catch (err) {
    console.log("error", err);
    res.status(400).json(err);
  }
};

export const fetchAllOrders = async (req, res) => {
  const orderItems = Order.find();
  try {
    res.status(200).json(await orderItems);
  } catch (err) {
    console.log("error", err);
    res.status(400).json(err);
  }
};
export const createOrder = async (req, res) => {
  const userId = req.user.id;

  try {
    const orderItem = await new Order({...req.body,user:userId}).save(); // Await the save operation
    const populatedOrderItem = await orderItem.populate("items"); // Populate the 'product' field

    res.status(200).json(populatedOrderItem); // Respond with the populated order item
  } catch (err) {
    console.error("Error:", err);
    res.status(400).json({ error: err.message }); // Respond with a structured error message
  }
};
export const updateOrder = async (req, res) => {
  const id = req.params.OrderId;
  const orderItem = Order.findByIdAndUpdate(
    id,
    req.body, // Fields to update
    { new: true } // Return the updated document
  );
  try {
    res.status(200).json(await orderItem);
  } catch (err) {
    console.log("error", err);
    res.status(400).json(err);
  }
};
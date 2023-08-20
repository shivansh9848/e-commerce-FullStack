import Cart from "../model/cart.js";

export const fetchItemsByUserID = async (req, res) => {
  const userId = req.user.id;
  const cartItems = Cart.find({ user: userId });

  try {
    res.status(200).json(await cartItems.populate("product"));
  } catch (err) {
    console.log("error", err);
    res.status(400).json(err);
  }
};
export const addToCart = async (req, res) => {
  const userId = req.user.id;
  try {
    const cartItem = await new Cart({...req.body,user:userId}).save(); // Await the save operation
    const populatedCartItem = await cartItem.populate("product"); // Populate the 'product' field

    res.status(200).json(populatedCartItem); // Respond with the populated cart item
  } catch (err) {
    console.error("Error:", err);
    res.status(400).json({ error: err.message }); // Respond with a structured error message
  }
};
export const updateCart = async (req, res) => {
  const id = req.params.id;
  const cartItem = Cart.findByIdAndUpdate(
    id,
    { quantity: req.body.quantity }, // Fields to update
    { new: true } // Return the updated document
  );
  try {
    res.status(200).json(await cartItem);
  } catch (err) {
    console.log("error", err);
    res.status(400).json(err);
  }
};
export const deleteItem = async (req, res) => {
  const id = req.params.id;
  try {
    const deletedItem = await Cart.findByIdAndDelete(id);
    if (!deletedItem) {
      res.status(404).json({ message: "Item not found" });
    } else {
      res.status(200).json({ message: "Item deleted successfully" });
    }
  } catch (err) {
    console.error("Error deleting item:", err);
    res.status(500).json({ message: "Internal server error" });
  }
};

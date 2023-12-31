import mongoose from "mongoose";
const { Schema } = mongoose;

const CartSchema = new Schema({
  quantity: { type : Number, required: true},
  product: { type: Schema.Types.ObjectId, ref: 'Product', required: true},
  user:{ type: Schema.Types.ObjectId, ref: 'User', required: true},
  // size: { type: Schema.Types.Mixed },
  // color: { type: Schema.Types.Mixed },
});
// Define a virtual property for the id
CartSchema.virtual("id").get(function () {
  return this._id;
});
CartSchema.set("toJSON", {
  virtuals: true,
  versionKey: false,
  transform: function (doc, ret) {
    delete ret._id;
  },
});
const Cart = mongoose.model("Cart", CartSchema,'cart');

export default Cart;
//     {
//       "title": "HP Pavilion 15-DK1056WM",
//       "description": "HP Pavilion 15-DK1056WM Gaming Laptop 10th Gen Core i5, 8GB, 256GB SSD, GTX 1650 4GB, Windows 10",
//       "price": 1099,
//       "discountPercentage": 6.18,
//       "rating": 4.43,
//       "stock": 89,
//       "brand": "HP Pavilion",
//       "category": "laptops",
//       "thumbnail": "https://i.dummyjson.com/data/products/10/thumbnail.jpeg",
//       "images": [
//         "https://i.dummyjson.com/data/products/10/1.jpg",
//         "https://i.dummyjson.com/data/products/10/2.jpg",
//         "https://i.dummyjson.com/data/products/10/3.jpg",
//         "https://i.dummyjson.com/data/products/10/thumbnail.jpeg"
//       ],
//       "quantity": 1,
//       "user": 2,
//       "id": 1
//     }

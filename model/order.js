import mongoose from "mongoose";
const { Schema } = mongoose;

const OrderSchema = new Schema({
  items: { type: [Schema.Types.Mixed], required: true },
  amount: {
    type: Number,
    required: true,
    min: 0,
  },
  paymentMethod: {
    type: String,
    required: true,
    enum: ["cash", "card"],
  },
  selectedAddress: {
    type: Schema.Types.Mixed,
    required: true,
  },
  user: {
    type: mongoose.ObjectId,
    ref: "User",
    required: true,
  },
  status: {
    type: String,
    required: true,
    enum: ["pending", "delivered", "dispatched", "cancelled"],
  },
});
const virtualId = OrderSchema.virtual("id");
virtualId.get(function () {
  return this._id;
});
OrderSchema.set("toJSON", {
  virtuals: true,
  versionKey: false,
  transform: function (doc, ret) {
    delete ret._id;
  },
});
const Order = mongoose.model("Order", OrderSchema, "orders");

export default Order;

// [
//   {
//     "items": [
//       {
//         "title": "iPhone 6",
//         "description": "An apple mobile which is nothing like apple",
//         "price": 549,
//         "discountPercentage": 12.96,
//         "rating": 4.69,
//         "stock": 94,
//         "brand": "Apple",
//         "category": "smartphones",
//         "thumbnail": "https://i.dummyjson.com/data/products/1/thumbnail.jpg",
//         "images": [
//           "https://i.dummyjson.com/data/products/1/1.jpg",
//           "https://i.dummyjson.com/data/products/1/2.jpg",
//           "https://i.dummyjson.com/data/products/1/3.jpg",
//           "https://i.dummyjson.com/data/products/1/4.jpg"
//         ],
//         "quantity": "4",
//         "user": 2,
//         "id": 1
//       },
//       {
//         "title": "iPhone X",
//         "description": "SIM-Free, Model A19211 6.5-inch Super Retina HD display with OLED technology A12 Bionic chip with ...",
//         "price": 899,
//         "discountPercentage": 17.94,
//         "rating": 4.44,
//         "stock": 34,
//         "brand": "Apple",
//         "category": "smartphones",
//         "thumbnail": "https://i.dummyjson.com/data/products/2/thumbnail.jpg",
//         "images": [
//           "https://i.dummyjson.com/data/products/2/1.jpg",
//           "https://i.dummyjson.com/data/products/2/2.jpg",
//           "https://i.dummyjson.com/data/products/2/3.jpg",
//           "https://i.dummyjson.com/data/products/2/thumbnail.jpg"
//         ],
//         "quantity": "2",
//         "user": 2,
//         "id": 2
//       }
//     ],
//     "amount": 3994,
//     "paymentMethod": "cash",
//     "selectedAddress": {
//       "full-name": "SHIVANSH RAI",
//       "email-add": "rai.shivansh9848@gmail.com",
//       "phone-number": "07667290163",
//       "street-address": "BH1 ,IIITM Campus",
//       "city": "GWALIOR",
//       "state": "Andhra Pradesh",
//       "postal-code": "474015"
//     },
//     "user": 2,
//     "status": "dispatched",
//     "id": 1
//   },
//   {
//     "items": [
//       {
//         "title": "Infinix INBOOK",
//         "description": "Infinix Inbook X1 Ci3 10th 8GB 256GB 14 Win10 Grey – 1 Year Warranty",
//         "price": 1099,
//         "discountPercentage": 11.83,
//         "rating": 4.54,
//         "stock": 96,
//         "brand": "Infinix",
//         "category": "laptops",
//         "thumbnail": "https://i.dummyjson.com/data/products/9/thumbnail.jpg",
//         "images": [
//           "https://i.dummyjson.com/data/products/9/1.jpg",
//           "https://i.dummyjson.com/data/products/9/2.png",
//           "https://i.dummyjson.com/data/products/9/3.png",
//           "https://i.dummyjson.com/data/products/9/4.jpg",
//           "https://i.dummyjson.com/data/products/9/thumbnail.jpg"
//         ],
//         "quantity": "3",
//         "user": 2,
//         "id": 1
//       },
//       {
//         "title": "Microsoft Surface Laptop 4",
//         "description": "Style and speed. Stand out on HD video calls backed by Studio Mics. Capture ideas on the vibrant touchscreen.",
//         "price": 1499,
//         "discountPercentage": 10.23,
//         "rating": 4.43,
//         "stock": 68,
//         "brand": "Microsoft Surface",
//         "category": "laptops",
//         "thumbnail": "https://i.dummyjson.com/data/products/8/thumbnail.jpg",
//         "images": [
//           "https://i.dummyjson.com/data/products/8/1.jpg",
//           "https://i.dummyjson.com/data/products/8/2.jpg",
//           "https://i.dummyjson.com/data/products/8/3.jpg",
//           "https://i.dummyjson.com/data/products/8/4.jpg",
//           "https://i.dummyjson.com/data/products/8/thumbnail.jpg"
//         ],
//         "quantity": "2",
//         "user": 2,
//         "id": 2
//       }
//     ],
//     "amount": 6295,
//     "paymentMethod": "cash",
//     "selectedAddress": {
//       "full-name": "SHIVANSH RAI",
//       "email-add": "rai.shivansh9848@gmail.com",
//       "phone-number": "07667290163",
//       "street-address": "BH1 ,IIITM Campus",
//       "city": "GWALIOR",
//       "state": "Andhra Pradesh",
//       "postal-code": "474015"
//     },
//     "user": 2,
//     "status": "pending",
//     "id": 2
//   }
// ]

import mongoose from "mongoose";
const { Schema } = mongoose;

const BrandSchema = new Schema({
  value: {
    type: String,
    required: true,
    unique: true,
  },
  label: {
    type: String,
    required: true,
    unique: true,
  },
});
// Define a virtual property for the id
BrandSchema.virtual("id").get(function () {
  return this._id;
});
BrandSchema.set("toJSON", {
  virtuals: true,
  versionKey: false,
  transform: function (doc, ret) {
    delete ret._id;
  },
});
const Brand = mongoose.model("Brand", BrandSchema);

export default Brand;
// {
//     "value": "Apple",
//     "label": "Apple",
//     "checked": false
//   },

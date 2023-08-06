import mongoose from "mongoose";
const { Schema } = mongoose;

const CategorySchema = new Schema({
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
CategorySchema.virtual("id").get(function () {
  return this._id;
});
CategorySchema.set("toJSON", {
  virtuals: true,
  versionKey: false,
  transform: function (doc, ret) {
    delete ret._id;
  },
});
const Category = mongoose.model("Category", CategorySchema);

export default Category;
// {
//     "value": "Apple",
//     "label": "Apple",
//     "checked": false
//   },

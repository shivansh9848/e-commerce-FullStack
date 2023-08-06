import Category from "../model/category.js";

export const fetchAllCategory = async (req, res) => {
  try {
    const categories = await Category.find();
    res.status(200).json(categories);
  } catch (err) {
    console.log(err);
    res.status(400).json(err);
  }
};

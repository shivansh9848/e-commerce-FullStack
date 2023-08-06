import Brand from "../model/brand.js";

export const fetchAllBrand = async (req, res) => {
  try {
    const brands = await Brand.find();
    res.status(200).json(brands);
  } catch (err) {
    console.log(err);
    res.status(400).json(err);
  }
};

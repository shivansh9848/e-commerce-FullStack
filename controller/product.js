import Product from "../model/product.js";

//create
export const createProduct = async (req, res) => {
  try {
    const product = new Product(req.body);
    res.status(200).json(await product.save());
  } catch (err) {
    console.log("error", err);
    res.status(400).json(err);
  }
};
//fetch single product by ID
export const fetchProductByID = async (req, res) => {
  const id = req.params.id;
  const product=Product.findById(id);
  try {
    console.log("pass", product);
    res.status(200).json(await product);
  } catch (err) {
    console.log("error", err);
    res.status(400).json(err);
  }
};
//update product
export const updateProduct = async (req, res) => {
  const id = req.params.id;
  const product=Product.findByIdAndUpdate(id, req.body,{ new: true });
  try {
    console.log("pass", product);
    res.status(200).json(await product);
  } catch (err) {
    console.log("error", err);
    res.status(400).json(err);
  }
};
//getAll
export const fetchAllProducts = async (req, res) => {
  let query = Product.find();
  let count=Product.find();
  if (req.query._sort && req.query._order) {
    query = query.sort({ [req.query._sort]: req.query._order });
    count = count.sort({ [req.query._sort]: req.query._order });
  }
  if (req.query.category) {
    query = query.find({ category: req.query.category });
    count = count.find({ category: req.query.category });
  }
  if (req.query.brand) {
    query = query.find({ brand: req.query.brand });
    count = count.find({ brand: req.query.brand });
  }
  
  if (req.query._page && req.query._limit) {
    // query.skip(100).limit(20);
    query = query
    .skip(req.query._limit * (req.query._page - 1))
    .limit(req.query._limit);
  }
  try {
    const totalProducts=await count.count();
    const products = await query;
    res.set('X-Total-Count', totalProducts)
    res.status(200).json(products);
  } catch (err) {
    console.log(err);
    res.status(400).json(err);
  }
};
// //replace(put)
// export const replaceProduct = (req, res) => {
//   const id = +req.params.id;
//   Product.findOneAndReplace({ id: id }, req.body, { new: true })
//     .then((p) => res.json(p))
//     .catch((error) => console.log(error));
// };
// //delete
// export const deleteProduct = (req, res) => {
//   const id = +req.params.id;
//   Product.deleteOne({ id: id })
//     .then((p) => res.json(p))
//     .catch((error) => console.log(error));
// };

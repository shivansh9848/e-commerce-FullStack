import User from "../model/user.js";

export const fetchLoggedInUser = async (req, res) => {
  const id = req.params.id;
  const user = User.findById(id,'email id address');
  try {
    res.status(200).json(await user);
  } catch (err) {
    console.log("error", err);
    res.status(400).json(err);
  }
};
//update
export const updateUser = async (req, res) => {
  const id = req.params.id;
  const user = User.findByIdAndUpdate(id, req.body, { new: true });
  try {
    res.status(200).json(await user);
  } catch (err) {
    console.log("error", err);
    res.status(400).json(err);
  }
};

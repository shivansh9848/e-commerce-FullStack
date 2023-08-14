import User from "../model/user.js";
import crypto from "crypto";
import { sanatizeUser } from "../services/common.js";
//create
export const createUser = (req, res) => {
  try {
    var salt = crypto.randomBytes(16);

    crypto.pbkdf2(
      req.body.password,
      salt,
      310000,
      32,
      "sha256",
      async function (err, hashedPassword) {
        const user = new User({ ...req.body, password: hashedPassword, salt });
        const doc = await user.save();
        req.login(user, (err) => {
          if (err) res.status(400).json(err);
          else res.status(201).json(sanatizeUser(doc))
        });
        res.status(200).json(sanatizeUser(doc));
      }
    );
  } catch (err) {
    console.log("error", err);
    res.status(400).json(err);
  }
};

//login
export const loginUser = async (req, res) => {
  res.json(req.user);
  //  res.json({status:"success"})
};
export const CheckUser = async (req, res) => {
  if (req.isAuthenticated()) {
    res.json({ status: "success" });
  } else {
    res.status(401).json({ status: "unauthorized" });
  }
};

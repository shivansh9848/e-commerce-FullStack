import User from "../model/user.js";
import crypto from "crypto";
import { sanatizeUser } from "../services/common.js";
import jwt from "jsonwebtoken";

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
        req.login(sanatizeUser(doc), (err) => {
          if (err) res.status(400).json(err);
          else {
            const token = jwt.sign(
              sanatizeUser(doc),
              process.env.JWT_SECRET_KEY
            );
            res
              .cookie("jwt", token, {
                // expires: new Date(Date.now() + 3600000000000000),
                httpOnly: true,
              })
              .status(201)
              .json({id:doc.id, role:doc.role});
          }
        });
      }
    );
  } catch (err) {
    console.log("error", err);
    res.json(err);
  }
};

//login
export const loginUser = async (req, res) => {
  const user = req.user;
  res
    .cookie('jwt', user.token, {
      expires: new Date(Date.now() + 360000000),
      httpOnly: true,
    })
    .status(201)
    .json({ id: user.id, role: user.role });
};

export const CheckUser = async (req, res) => {
  if (req.user) {
    res.json(req.user );
  } else {
    res.status(401).json({ status: "unauthorized" });
  }
};

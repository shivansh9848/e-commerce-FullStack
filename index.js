//To delete a particular key : value pair froma all documents of mongodb collection
// db.collection_name.updateMany({}, { $unset : { description : 1} })

import express from "express";
import mongoose from "mongoose";
import morgan from "morgan";
import cors from "cors";
import { productRouter } from "./routes/product.js";
import { categoryRouter } from "./routes/category.js";
import { brandRouter } from "./routes/brand.js";
import { userRouter } from "./routes/user.js";
import { authRouter } from "./routes/auth.js";
import { cartRouter } from "./routes/cart.js";
import { orderRouter } from "./routes/order.js";
import passport from "passport";
import session from "express-session";
import User from "./model/user.js";
import crypto from "crypto";
import jsonwebtoken from 'jsonwebtoken'
var token = jwt.sign({ foo: "bar" }, "shhhhh");
// const LocalStrategy = require("passport-local").Strategy;
import { Strategy as LocalStrategy } from "passport-local"; // Change to ES6 import
import { Strategy as JwtStrategy } from "passport-jwt"; // Change to ES6 import
import { Strategy as ExtractJwt } from "passport-jwt"; // Change to ES6 import
import { isAuth, sanatizeUser } from "./services/common.js";

const App = express();
const port = 8000;

// Define a route to handle GET requests to the root URL
App.get("/", (req, res) => {
  res.send("Hell, World! This is a basic Express server");
});
(async function main() {
  try {
    const result = await mongoose.connect(
      "mongodb+srv://imt2021092:tK5K0iTh8mhXmChg@cluster0.38xejdd.mongodb.net/e-commerce"
    );
    console.log("Database Connected");
  } catch (err) {
    console.log(err);
  }
})();

App.use(
  session({
    secret: "keyboard cat",
    resave: false,
    saveUninitialized: false,
  })
);

App.use(passport.initialize());
App.use(passport.session());

App.use(morgan("dev"));
App.use(
  cors({
    exposedHeaders: ["X-Total-Count"],
  })
);
App.use(express.json());

App.use("/products", isAuth, productRouter);
App.use("/categories", categoryRouter);
App.use("/brands", brandRouter);
App.use("/users", userRouter);
App.use("/auth", authRouter);
App.use("/cart", cartRouter);
App.use("/orders", orderRouter);
passport.use(
  new LocalStrategy(
    {
      usernameField: "email", // This indicates the field for the username in the request
      passwordField: "password", // This indicates the field for the password in the request
    },
    async function (email, password, done) {
      9;
      // const email = req.body.email;
      try {
        const user = await User.findOne({ email });
        crypto.pbkdf2(
          password,
          user.salt,
          310000,
          32,
          "sha256",
          function (err, hashedPassword) {
            if (user && crypto.timingSafeEqual(user.password, hashedPassword))
              done(null, sanatizeUser(user));
            else done(null, false, { message: "Invalid Credentials" });
          }
        );
      } catch (err) {
        console.log("error", err);
        done(err);
      }
    }
  )
);
passport.use(
  "jwt",
  new JwtStrategy(opts, function (jwt_payload, done) {
    User.findOne({ id: jwt_payload.sub }, function (err, user) {
      if (err) {
        return done(err, false);
      }
      if (user) {
        return done(null, user);
      } else {
        return done(null, false);
        // or you could create a new account
      }
    });
  })
);
//creates session variable req.user on being called
passport.serializeUser(function (user, cb) {
  console.log("serialize", user);
  process.nextTick(function () {
    cb(null, { id: user.id });
  });
});
//creates session variable req.user when called from authorised request

passport.deserializeUser(async function (user, cb) {
  console.log("De-serialize", user);
  process.nextTick(function () {
    return cb(null, user);
  });
});

// Start the server and listen on the specified port
App.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

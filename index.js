//To delete a particular key : value pair froma all documents of mongodb collection
// db.collection_name.updateMany({}, { $unset : { description : 1} })

import dotenv from "dotenv";
dotenv.config();

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
import jwt from "jsonwebtoken";

// const LocalStrategy = require("passport-local").Strategy;
import { Strategy as LocalStrategy } from "passport-local"; // Change to ES6 import
import { Strategy as JwtStrategy, ExtractJwt } from "passport-jwt"; // Change to ES6 import
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

App.use("/products", isAuth(), productRouter);
App.use("/categories", isAuth(), categoryRouter);
App.use("/brands", isAuth(), brandRouter);
App.use("/users", isAuth(), userRouter);
App.use("/auth", authRouter);
App.use("/cart", isAuth(), cartRouter);
App.use("/orders", isAuth(), orderRouter);

var opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = process.env.JWT_SECRET_KEY;
passport.use(
  "local",
  new LocalStrategy(
    {
      usernameField: "email",
      passwordField: "password",
    },
    async function (email, password, done) {
      try {
        const user = await User.findOne({ email });
        if (!user) {
          return done(null, false, { message: "Invalid Credentials" });
        }

        // Inside the LocalStrategy callback
        crypto.pbkdf2(
          password,
          user.salt,
          310000,
          32,
          "sha256",
          function (err, hashedPassword) {
            if (err) {
              return done(err);
            }
            if (crypto.timingSafeEqual(user.password, hashedPassword)) {
              const token = jwt.sign(
                sanatizeUser(user),
                process.env.JWT_SECRET_KEY,
                { expiresIn: "1m" } // Added the expiresIn option here
              );
              return done(null, token);
            } else {
              return done(null, false, { message: "Invalid Credentials" });
            }
          }
        );
      } catch (err) {
        console.log("error", err);
        return done(err);
      }
    }
  )
);

passport.use(
  "jwt",
  new JwtStrategy(opts, async function (jwt_payload, done) {
    try {
      const user = await User.findById(jwt_payload.id);
      if (user) {
        return done(null, sanatizeUser(user));
      } else {
        return done(null, false);
      }
    } catch (err) {
      console.log("error", err);
      return done(err, false);
    }
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

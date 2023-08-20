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
import path, { dirname } from "path";
import cookieParser from "cookie-parser";
import stripeModule from "stripe";

// const LocalStrategy = require("passport-local").Strategy;
import { Strategy as LocalStrategy } from "passport-local";
import { Strategy as JwtStrategy } from "passport-jwt";
import { isAuth, sanatizeUser, cookieExtractor } from "./services/common.js";
import { URL } from "url";

const App = express();
//Web-Hook
const endpointSecret = process.env.WEB_HOOK_SECRET;

App.post(
  "/webhook",
  express.raw({ type: "application/json" }),
  (request, response) => {
    const sig = request.headers["stripe-signature"];

    let event;

    try {
      event = stripe.webhooks.constructEvent(request.body, sig, endpointSecret);
    } catch (err) {
      response.status(400).send(`Webhook Error: ${err.message}`);
      return;
    }

    // Handle the event
    switch (event.type) {
      case "payment_intent.succeeded":
        const paymentIntentSucceeded = event.data.object;
        // Then define and call a function to handle the event payment_intent.succeeded
        break;
      // ... handle other event types
      default:
        console.log(`Unhandled event type ${event.type}`);
    }

    // Return a 200 response to acknowledge receipt of the event
    response.send();
  }
);
// ...

const __filename = new URL(import.meta.url).pathname;
const __dirname = path.dirname(__filename);
App.use(express.static(path.resolve(__dirname,"build")));

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
App.use(cookieParser());
App.use(express.json());

App.use("/products", isAuth(), productRouter);
App.use("/categories", isAuth(), categoryRouter);
App.use("/brands", isAuth(), brandRouter);
App.use("/users", isAuth(), userRouter);
App.use("/auth", authRouter);
App.use("/api/cart", isAuth(), cartRouter);
App.use("/api/orders", isAuth(), orderRouter);

// Place this catch-all route after serving static files
// Serve the HTML file for all routes
App.get("*", (req, res) => {
  res.sendFile(path.resolve("build", "index.html"));
});

var opts = {};
opts.jwtFromRequest = opts.jwtFromRequest = cookieExtractor;
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
                sanatizeUser(sanatizeUser(user)),
                process.env.JWT_SECRET_KEY
                // { expiresIn: "100000h" }
              );
              return done(null, { id: user.id, role: user.role });
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

//Payments
const stripe = stripeModule(process.env.STRIPE_SECRET_KEY);

const calculateOrderAmount = (items) => {
  // Replace this constant with a calculation of the order's amount
  // Calculate the order total on the server to prevent
  // people from directly manipulating the amount on the client
  return 1400;
};

App.post("/create-payment-intent", async (req, res) => {
  const { items } = req.body;

  // Create a PaymentIntent with the order amount and currency
  const paymentIntent = await stripe.paymentIntents.create({
    amount: calculateOrderAmount(items),
    currency: "inr",
    // In the latest version of the API, specifying the `automatic_payment_methods` parameter is optional because Stripe enables its functionality by default.
    automatic_payment_methods: {
      enabled: true,
    },
  });

  res.send({
    clientSecret: paymentIntent.client_secret,
  });
});

(async function main() {
  try {
    const result = await mongoose.connect(process.env.MONGO_DB_URL);
    console.log("Database Connected");
  } catch (err) {
    console.log(err);
  }
})();
// Start the server and listen on the specified port
App.listen(process.env.PORT, () => {
  console.log(`Server is running on http://localhost:${process.env.PORT}`);
});

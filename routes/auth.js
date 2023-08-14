import express from "express";
import passport from "passport";

const authRouter = express.Router();
import { createUser, loginUser, CheckUser } from "../controller/auth.js";

authRouter
  .post("/signup", createUser)
  .post("/login", passport.authenticate("local"), loginUser)
  .get("/check", passport.authenticate("jwt"), CheckUser);

export { authRouter };

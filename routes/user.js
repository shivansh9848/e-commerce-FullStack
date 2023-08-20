import express from 'express'
const userRouter = express.Router()
import {fetchLoggedInUser,updateUser } from '../controller/user.js'

userRouter
    .get("/own", fetchLoggedInUser)
    .patch("/:id", updateUser)

export { userRouter}

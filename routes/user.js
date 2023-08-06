import express from 'express'
const userRouter = express.Router()
import { createUser, getAllUsers, getUser, replaceUser, deleteUser, updateUser } from '../controller/users.js'

userRouter
    .post("/", createUser)
    .get("/", getAllUsers)
    .get("/:id", getUser)
    .put("/:id", replaceUser)
    .delete("/:id", deleteUser)
    .patch("/:id", updateUser)
export { userRouter}

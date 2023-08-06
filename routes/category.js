import express from 'express'
const categoryRouter = express.Router()
import { fetchAllCategory } from '../controller/category.js'

categoryRouter
    .get("/", fetchAllCategory)
export { categoryRouter}
import express from 'express'
const brandRouter = express.Router()
import { fetchAllBrand } from '../controller/brand.js'

brandRouter
    .get("/", fetchAllBrand)
export { brandRouter}
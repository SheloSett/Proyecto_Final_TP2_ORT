import express from 'express'
import { ProductRepositorySequelize } from '../repository/Product.Sequelize.Repository.js' 
const ProductRouter = express.Router()

ProductRouter.get("/all", ProductRepositorySequelize)
ProductRouter.get("/:id", ProductRepositorySequelize)
ProductRouter.post("/createProduct", ProductRepositorySequelize)
ProductRouter.patch("/updateProduct/:id", ProductRepositorySequelize)
ProductRouter.delete("/deleteProduct/:id", ProductRepositorySequelize)

export default ProductRouter;
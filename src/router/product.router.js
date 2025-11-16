import express from 'express'
import { ProductController } from "../controller/product.controller.js"
const ProductRouter = express.Router()

ProductRouter.get("/all", ProductController.getAllProducts)
ProductRouter.get("/:id", ProductController.getProductById)
ProductRouter.post("/createProduct", ProductController.createProduct)
ProductRouter.patch("/updateProduct/:id", ProductController.updateProduct)
ProductRouter.delete("/deleteProduct/:id", ProductController.deleteProduct)

export default ProductRouter;
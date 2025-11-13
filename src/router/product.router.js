import express from 'express'

const ProductRouter = express.Router()

ProductRouter.get("/all", )
ProductRouter.get("/:id", )
ProductRouter.post("/createProduct", )
ProductRouter.patch("/updateProduct/:id", )
ProductRouter.delete("/deleteProduct/:id", )

export default ProductRouter;
import express from 'express';
import { ProductController } from "../controller/product.controller.js";

import { 
  createProductValidator, 
  updateProductValidator 
} from "../validators/productValidator.js";

import { handleValidationErrors } from "../validators/handleValidation.js";

const ProductRouter = express.Router();

ProductRouter.get("/all", ProductController.getAllProducts);
ProductRouter.get("/:id", ProductController.getProductById);

ProductRouter.post("/createProduct", createProductValidator, handleValidationErrors, ProductController.createProduct);

ProductRouter.patch("/updateProduct/:id",updateProductValidator,handleValidationErrors,ProductController.updateProduct);

ProductRouter.delete("/deleteProduct/:id", ProductController.deleteProduct);

ProductRouter.get("/lowStock", ProductController.lowStock);
ProductRouter.get("/report/stock", ProductController.reportStock);
ProductRouter.get("/admin/stats", ProductController.stats);

export default ProductRouter;
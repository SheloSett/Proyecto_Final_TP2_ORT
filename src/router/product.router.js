import express from 'express';
import { ProductController } from "../controller/product.controller.js";

import { 
  createProductValidator, 
  updateProductValidator 
} from "../validators/productValidator.js";

import { handleValidationErrors } from "../validators/handleValidation.js";

import { isAdmin, authenticateToken } from '../middleware/authMiddleware.js';

const ProductRouter = express.Router();

ProductRouter.get("/all", authenticateToken, ProductController.getAllProducts);
ProductRouter.get("/:id", authenticateToken, ProductController.getProductById);

ProductRouter.post("/createProduct", authenticateToken, isAdmin, createProductValidator, handleValidationErrors, ProductController.createProduct);

ProductRouter.patch("/updateProduct/:id",authenticateToken ,isAdmin, updateProductValidator,handleValidationErrors,ProductController.updateProduct);
  
ProductRouter.delete("/deleteProduct/:id", authenticateToken, isAdmin, ProductController.deleteProduct);

ProductRouter.get("/lowStock", ProductController.lowStock);
ProductRouter.get("/report/stock", ProductController.reportStock);
ProductRouter.get("/admin/stats", ProductController.stats);

export default ProductRouter;
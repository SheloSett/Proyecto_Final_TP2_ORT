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
ProductRouter.get("/lowStock", authenticateToken, isAdmin, ProductController.lowStock);
ProductRouter.get("/report/stock", authenticateToken, isAdmin, ProductController.reportStock);
ProductRouter.get("/admin/stats", authenticateToken, isAdmin, ProductController.stats);
ProductRouter.get("/:id", authenticateToken, ProductController.getProductById);

ProductRouter.post("/createProduct", authenticateToken, isAdmin, createProductValidator, handleValidationErrors, ProductController.createProduct);

ProductRouter.patch("/updateProduct/:id",authenticateToken ,isAdmin, updateProductValidator,handleValidationErrors,ProductController.updateProduct);
  
ProductRouter.delete("/deleteProduct/:id", authenticateToken, isAdmin, ProductController.deleteProduct);


export default ProductRouter;
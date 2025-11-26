import { Router } from "express";
import { ProductController } from "../controller/product.controller.js";
import { validateProduct, validatePartialProduct } from "../validators/productValidator.js";
import { handleValidationErrors } from "../validators/handleValidation.js";

const router = Router();

router.get("/lowStock", ProductController.lowStock);
router.get("/reportStock", ProductController.reportStock);
router.get("/stats", ProductController.stats);

router.get("/all", ProductController.getAllProducts);
router.get("/:id", ProductController.getProductById);

router.post(
    "/createProduct",
    validateProduct,
    handleValidationErrors,
    ProductController.createProduct
);

router.patch(
    "/updateProduct/:id",
    validatePartialProduct,
    handleValidationErrors,
    ProductController.updateProduct
);

router.delete(
    "/deleteProduct/:id",
    ProductController.deleteProduct
);

export default router;
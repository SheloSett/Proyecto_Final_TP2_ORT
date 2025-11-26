import { Router } from "express";
import { ProductController } from "../controller/product.controller.js";
import { createProductValidator, updateProductValidator } from "../validators/productValidator.js";
import { handleValidationErrors } from "../validators/handleValidation.js";

import { isAdmin, authenticateToken } from '../middleware/authMiddleware.js';

const ProductRouter = Router();

/**
 * @swagger
 * /api/products/all:
 *   get:
 *     summary: Obtiene todos los productos
 *     tags: [Productos]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de productos obtenida exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ProductResponse'
 *       401:
 *         description: No se proporcionó token o token inválido
 *       500:
 *         description: Error interno del servidor
 */
ProductRouter.get("/all", authenticateToken, ProductController.getAllProducts);

/**
 * @swagger
 * /api/products/{id}:
 *   get:
 *     summary: Obtiene un producto por su ID
 *     tags: [Productos]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del producto
 *     responses:
 *       200:
 *         description: Producto obtenido exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/SingleProductResponse'
 *       401:
 *         description: No se proporcionó token o token inválido
 *       500:
 *         description: Error interno del servidor
 */
ProductRouter.get("/:id", authenticateToken, ProductController.getProductById);

/**
 * @swagger
 * /api/products/createProduct:
 *   post:
 *     summary: Crea un nuevo producto (Solo Admin)
 *     tags: [Productos]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreateProduct'
 *     responses:
 *       200:
 *         description: Producto creado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 code:
 *                   type: integer
 *                   example: 200
 *                 ok:
 *                   type: boolean
 *                   example: true
 *                 payload:
 *                   $ref: '#/components/schemas/Product'
 *       400:
 *         description: Error de validación
 *       401:
 *         description: No se proporcionó token o token inválido
 *       403:
 *         description: El usuario no tiene permisos de administrador
 *       500:
 *         description: Error interno del servidor
 */
// ProductRouter.post("/createProduct", authenticateToken, isAdmin, createProductValidator, handleValidationErrors, ProductController.createProduct);
ProductRouter.post(
  "/createProduct",
  authenticateToken,
  isAdmin,
  createProductValidator,            
  handleValidationErrors,
  ProductController.createProduct
);

/**
 * @swagger
 * /api/products/updateProduct/{id}:
 *   patch:
 *     summary: Actualiza un producto existente (Solo Admin)
 *     tags: [Productos]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del producto a actualizar
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UpdateProduct'
 *     responses:
 *       200:
 *         description: Producto actualizado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 code:
 *                   type: integer
 *                   example: 200
 *                 ok:
 *                   type: boolean
 *                   example: true
 *                 payload:
 *                   type: string
 *                   example: "Producto actualizado con el id: 1 - Productos afectados: 1"
 *       400:
 *         description: Error de validación
 *       401:
 *         description: No se proporcionó token o token inválido
 *       403:
 *         description: El usuario no tiene permisos de administrador
 *       500:
 *         description: Error interno del servidor
 */
// ProductRouter.patch("/updateProduct/:id",authenticateToken ,isAdmin, updateProductValidator,handleValidationErrors,ProductController.updateProduct);
ProductRouter.patch(
  "/updateProduct/:id",
  authenticateToken,
  isAdmin,
  updateProductValidator,       
  handleValidationErrors,
  ProductController.updateProduct
);

/**
 * @swagger
 * /api/products/deleteProduct/{id}:
 *   delete:
 *     summary: Elimina un producto (Solo Admin)
 *     tags: [Productos]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del producto a eliminar
 *     responses:
 *       200:
 *         description: Producto eliminado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 code:
 *                   type: integer
 *                   example: 200
 *                 ok:
 *                   type: boolean
 *                   example: true
 *                 payload:
 *                   type: string
 *                   example: "Producto eliminado con el id: 1"
 *       401:
 *         description: No se proporcionó token o token inválido
 *       403:
 *         description: El usuario no tiene permisos de administrador
 *       500:
 *         description: Error interno del servidor
 */
ProductRouter.delete("/deleteProduct/:id", authenticateToken, isAdmin, ProductController.deleteProduct);

/**
 * @swagger
 * /api/products/lowStock:
 *   get:
 *     summary: Obtiene productos con stock bajo (menor a 10 unidades) (Solo Admin)
 *     tags: [Productos]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de productos con stock bajo
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 code:
 *                   type: integer
 *                   example: 200
 *                 ok:
 *                   type: boolean
 *                   example: true
 *                 payload:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Product'
 *       401:
 *         description: No se proporcionó token o token inválido
 *       403:
 *         description: El usuario no tiene permisos de administrador
 *       500:
 *         description: Error interno del servidor
 */
ProductRouter.get("/lowStock", authenticateToken, isAdmin, ProductController.lowStock);

/**
 * @swagger
 * /api/products/report/stock:
 *   get:
 *     summary: Obtiene un reporte de stock con métricas generales (Solo Admin)
 *     tags: [Productos]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Reporte de stock obtenido exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/StockReport'
 *       401:
 *         description: No se proporcionó token o token inválido
 *       403:
 *         description: El usuario no tiene permisos de administrador
 *       500:
 *         description: Error interno del servidor
 */
ProductRouter.get("/report/stock", authenticateToken, isAdmin, ProductController.reportStock);

/**
 * @swagger
 * /api/products/admin/stats:
 *   get:
 *     summary: Obtiene estadísticas de productos agrupadas por categoría (Solo Admin)
 *     tags: [Productos]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Estadísticas obtenidas exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 code:
 *                   type: integer
 *                   example: 200
 *                 ok:
 *                   type: boolean
 *                   example: true
 *                 stats:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       category:
 *                         type: string
 *                         example: "Periféricos"
 *                       count:
 *                         type: integer
 *                         example: 25
 *       401:
 *         description: No se proporcionó token o token inválido
 *       403:
 *         description: El usuario no tiene permisos de administrador
 *       500:
 *         description: Error interno del servidor
 */
ProductRouter.get("/admin/stats", authenticateToken, isAdmin, ProductController.stats);

export default ProductRouter;

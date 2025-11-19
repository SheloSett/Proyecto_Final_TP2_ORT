import { body } from "express-validator";

export const createProductValidator = [
  body("name")
    .exists().withMessage("El nombre del producto es obligatorio")
    .isString().withMessage("El nombre debe ser un texto")
    .isLength({ min: 3 }).withMessage("Debe tener al menos 3 caracteres"),

  body("price")
    .exists().withMessage("El precio es obligatorio")
    .isFloat({ gt: 0 }).withMessage("Debe ser un número mayor a 0"),

  body("description")
    .optional()
    .isString().withMessage("La descripción debe ser un texto"),

  body("category")
    .optional()
    .isString().withMessage("La categoría debe ser texto"),

  body("color")
    .optional()
    .isString().withMessage("El color debe ser texto"),

  body("stock")
    .optional()
    .isInt({ min: 0 }).withMessage("El stock debe ser un entero mayor o igual a 0"),

  body("RGB")
    .exists().withMessage("RGB es obligatorio")
    .isBoolean().withMessage("RGB debe ser true o false")
];

export const updateProductValidator = [
  body("name")
    .optional()
    .isString().withMessage("El nombre debe ser texto"),

  body("price")
    .optional()
    .isFloat({ gt: 0 }).withMessage("Debe ser un número mayor a 0"),

  body("description")
    .optional()
    .isString(),

  body("category")
    .optional()
    .isString(),

  body("color")
    .optional()
    .isString(),

  body("stock")
    .optional()
    .isInt({ min: 0 }),

  body("RGB")
    .optional()
    .isBoolean()
];

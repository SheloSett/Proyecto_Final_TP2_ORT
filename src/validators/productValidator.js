import { body } from "express-validator";

export const validateProduct = [
    body("name")
        .notEmpty().withMessage("El nombre del producto es obligatorio")
        .isString().withMessage("El nombre debe ser texto"),

    body("price")
        .notEmpty().withMessage("El precio es obligatorio")
        .isFloat({ min: 1 }).withMessage("El precio debe ser mayor a 0"),

    body("description")
        .notEmpty().withMessage("La descripción es obligatoria"),

    body("category")
        .notEmpty().withMessage("La categoría es obligatoria"),

    body("color")
        .notEmpty().withMessage("El color es obligatorio"),

    body("stock")
        .notEmpty().withMessage("El stock es obligatorio")
        .isInt({ min: 0 }).withMessage("El stock debe ser un entero >= 0"),

    body("RGB")
        .isBoolean().withMessage("RGB debe ser true o false")
];

export const validatePartialProduct = [
    body("name")
        .optional()
        .isString().withMessage("El nombre debe ser texto"),

    body("price")
        .optional()
        .isFloat({ min: 1 }).withMessage("El precio debe ser mayor a 0"),

    body("description")
        .optional(),

    body("category")
        .optional(),

    body("color")
        .optional(),

    body("stock")
        .optional()
        .isInt({ min: 0 }).withMessage("El stock debe ser un entero >= 0"),

    body("RGB")
        .optional()
        .isBoolean().withMessage("RGB debe ser true o false")
];

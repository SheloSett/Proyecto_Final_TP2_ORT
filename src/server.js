import express from "express"
import helmet from "helmet"
import swaggerUi from "swagger-ui-express"
import { swaggerSpec } from "./config/swagger.js"

import ProductRouter from "./router/product.router.js"
import apiUserRouter from "./router/user.router.js"

const server = express()

// Configuración de seguridad con Helmet
server.use(helmet())

server.use(express.json())

/**
 * @swagger
 * /:
 *   get:
 *     summary: Endpoint de bienvenida
 *     tags: []
 *     responses:
 *       200:
 *         description: Mensaje de bienvenida
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Bienvenidos a la api de Productos Gamer"
 *                 status:
 *                   type: string
 *                   example: "OK"
 */
// Ruta raíz
server.get("/", (req, res) => {
    res.json({
        message: "Bienvenidos a la api de Productos Gamer",
        status: "OK"
    })
})

// Configuración de Swagger UI
server.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec, {
    customCss: '.swagger-ui .topbar { display: none }',
    customSiteTitle: "API Productos Gamer - Documentación"
}))

// Rutas de la API
server.use('/api/auth', apiUserRouter)
server.use("/api/products", ProductRouter)

// Middleware 404 
server.use((req, res) => {
    res.status(404).send('No esta disponible este endpoint: ' + req.url);
});

export default server
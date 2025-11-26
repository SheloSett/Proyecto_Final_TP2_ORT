import express from "express"
import helmet from "helmet"
import swaggerUi from "swagger-ui-express"
import { swaggerSpec } from "./config/swagger.js"

import ProductRouter from "./router/product.router.js"
import apiUserRouter from "./router/user.router.js"

const server = express()

// Configuración de seguridad con Helmet (ajustada para Swagger UI)
server.use(helmet({
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      styleSrc: ["'self'", "'unsafe-inline'"], // Necesario para Swagger UI
      scriptSrc: ["'self'", "'unsafe-inline'", "'unsafe-eval'"], // Necesario para Swagger UI
      imgSrc: ["'self'", "data:", "https:"]
    }
  },
  crossOriginEmbedderPolicy: false // Permite que Swagger UI funcione correctamente
}))

server.use(express.json())

// Middleware para headers CORS mínimos (solo para Swagger UI, sin paquete externo)
server.use((req, res, next) => {
    // Headers básicos para permitir que Swagger UI funcione
    res.setHeader('Access-Control-Allow-Origin', '*')
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE, OPTIONS')
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization')
    
    // Si es una petición OPTIONS (preflight), responder inmediatamente
    if (req.method === 'OPTIONS') {
        return res.sendStatus(200)
    }
    
    // Asegura que las respuestas JSON tengan el Content-Type correcto
    if (req.path.startsWith('/api/')) {
        res.setHeader('Content-Type', 'application/json; charset=utf-8')
    }
    
    next()
})

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
    customSiteTitle: "API Productos Gamer - Documentación",
    swaggerOptions: {
        persistAuthorization: true, // Mantiene el token autorizado
        displayRequestDuration: true, // Muestra el tiempo de respuesta
        filter: true, // Habilita el filtro de búsqueda
        tryItOutEnabled: true, // Habilita el botón "Try it out"
        docExpansion: 'list', // Expande solo los tags, no todos los endpoints
        defaultModelsExpandDepth: 2, // Profundidad de expansión de modelos
        defaultModelExpandDepth: 2,
        displayOperationId: false,
        showExtensions: true,
        showCommonExtensions: true,
        supportedSubmitMethods: ['get', 'post', 'put', 'delete', 'patch'] // Asegura que todos los métodos funcionen
    }
}))

// Rutas de la API
server.use('/api/auth', apiUserRouter)
server.use("/api/products", ProductRouter)

// Middleware 404 
server.use((req, res) => {
    res.status(404).send('No esta disponible este endpoint: ' + req.url);
});

export default server
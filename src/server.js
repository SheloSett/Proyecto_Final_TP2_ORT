import express from "express"
import helmet from "helmet"

import ProductRouter from "./router/product.router.js"
import apiUserRouter from "./router/user.router.js"

const server = express()

// Configuración de seguridad con Helmet
server.use(helmet())

server.use(express.json())

// Ruta raíz
server.get("/", (req, res) => {
    res.json({
        message: "Bienvenidos a la api de Productos Gamer",
        status: "OK"
    })
})

// Rutas de la API
server.use('/api/auth', apiUserRouter)
server.use("/api/products", ProductRouter)

// Middleware 404 
server.use((req, res) => {
    res.status(404).send('No esta disponible este endpoint: ' + req.url);
});

export default server
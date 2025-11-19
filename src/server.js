import express from "express"

import ProductRouter from "./router/product.router.js"
import apiUserRouter from "./router/user.router.js"

const server = express()

server.use(express.json())

server.use('/api/auth', apiUserRouter)
server.use("/api/products", ProductRouter)

server.use((req, res) => {
    res.status(404).send('No esta disponible este endpoint' + req.url);
});

server.get("/", (req, res) => {
    
    res.json({
        message: "Bienvenidos a la api de Productos Gamer",
        status: "OK"
    })
    
})

export default server
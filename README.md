# Backend – Gestión de Usuarios y Productos

API REST desarrollada con **Node.js**, **Express**, **MySQL** y **Supabase Auth**, diseñada para gestionar usuarios y productos de computación. El proyecto sigue una arquitectura en capas (Controllers, Services, Repositories), incluye autenticación, autorización por roles, validaciones estrictas y endpoints seguros.

---

## 🚀 Tecnologías
- Node.js + Express  
- MySQL (Aiven) + Sequelize  
- Supabase Auth
- express-validator  
- Helmet
- Swagger / Scalar 

---

## 📁 Estructura del Proyecto

├── node_modules/
├── src/
│   ├── config/
│   │   └── config.js                
│   │
│   ├── controller/
│   │   └── product.controller.js    
│   │
│   ├── database/
│   │   └── mysql.cnx.js             
│   │
│   ├── model/
│   │   └── product.model.js     
│   │
│   ├── repository/
│   │   └── Product.SequelizeRepository.js  
│   │
│   ├── router/
│   │   └── product.router.js        
│   │
│   ├── test/
│   │   └── product.test.http        
│   │
│   ├── validators/
│   │   ├── handleValidation.js      
│   │   └── productValidator.js      
│
├── server.js                        
│
├── .env                             
├── .env.dev                         
├── .gitignore                       
├── biome.json                       
├── index.js                         
├── package.json
├── package-lock.json


---

## 🔐 Autenticación y Roles
Implementada con **Supabase Auth**.  
Roles:  
- **Cliente:** puede registrarse, loguearse y ver productos.  
- **Admin:** CRUD completo de productos.

---

## 🛒 Endpoints Principales

### Usuarios
| Método | Ruta | Descripción |
|-------|------|-------------|
| POST | /auth/register | Registro |
| POST | /auth/login | Login |

### Productos
| Método | Ruta |
|-------|------|
| GET | /products/all |
| GET | /products/:id |
| POST | /products/createProduct |
| PUT | /products/updateProduct/:id |
| DELETE | /products/deleteProduct/:id |

---

## ▶️ Cómo Ejecutarlo
npm install
npm run dev

📌 Equipo

Shelo – Arquitectura, BD, CRUD
Julian – Autenticación y roles
Aixa – Validaciones, casos de uso avanzados
Belén – Middlewares, tests, documentación y despliegue


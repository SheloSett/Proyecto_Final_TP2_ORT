import swaggerJsdoc from 'swagger-jsdoc';
import config from './config.js';

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'API Productos Gamer',
      version: '1.0.0',
      description: 'API REST para gestión de usuarios y productos de computación. Desarrollada con Node.js, Express, MySQL y Supabase Auth.',
      contact: {
        name: 'Equipo de Desarrollo',
        email: 'support@productosgamer.com'
      },
      license: {
        name: 'AGPL-3.0',
        url: 'https://www.gnu.org/licenses/agpl-3.0.html'
      }
    },
    servers: [
      {
        url: `http://${config.SERVER_HOST}:${config.SERVER_PORT}`,
        description: 'Servidor de desarrollo (127.0.0.1)'
      },
      {
        url: `http://localhost:${config.SERVER_PORT}`,
        description: 'Servidor de desarrollo (localhost)'
      }
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
          description: 'Token JWT obtenido mediante login en Supabase'
        }
      },
      schemas: {
        Product: {
          type: 'object',
          required: ['price', 'RGB'],
          properties: {
            id: {
              type: 'integer',
              description: 'ID único del producto',
              example: 1
            },
            name: {
              type: 'string',
              maxLength: 200,
              description: 'Nombre del producto',
              example: 'Teclado Mecánico RGB'
            },
            price: {
              type: 'number',
              format: 'decimal',
              description: 'Precio del producto',
              example: 89.99
            },
            description: {
              type: 'string',
              maxLength: 200,
              description: 'Descripción del producto',
              example: 'Teclado mecánico con switches RGB'
            },
            created_date: {
              type: 'string',
              format: 'date',
              description: 'Fecha de creación',
              example: '2024-01-15'
            },
            category: {
              type: 'string',
              maxLength: 200,
              description: 'Categoría del producto',
              example: 'Periféricos'
            },
            color: {
              type: 'string',
              maxLength: 200,
              description: 'Color del producto',
              example: 'Negro'
            },
            stock: {
              type: 'integer',
              description: 'Cantidad en stock',
              example: 50
            },
            RGB: {
              type: 'boolean',
              description: 'Indica si el producto tiene iluminación RGB',
              example: true
            }
          }
        },
        CreateProduct: {
          type: 'object',
          required: ['name', 'price', 'RGB'],
          properties: {
            name: {
              type: 'string',
              minLength: 3,
              maxLength: 200,
              description: 'Nombre del producto (mínimo 3 caracteres)',
              example: 'Teclado Mecánico RGB'
            },
            price: {
              type: 'number',
              format: 'decimal',
              minimum: 0.01,
              description: 'Precio del producto (debe ser mayor a 0)',
              example: 89.99
            },
            description: {
              type: 'string',
              maxLength: 200,
              description: 'Descripción del producto',
              example: 'Teclado mecánico con switches RGB'
            },
            category: {
              type: 'string',
              maxLength: 200,
              description: 'Categoría del producto',
              example: 'Periféricos'
            },
            color: {
              type: 'string',
              maxLength: 200,
              description: 'Color del producto',
              example: 'Negro'
            },
            stock: {
              type: 'integer',
              minimum: 0,
              description: 'Cantidad en stock',
              example: 50
            },
            RGB: {
              type: 'boolean',
              description: 'Indica si el producto tiene iluminación RGB',
              example: true
            }
          }
        },
        UpdateProduct: {
          type: 'object',
          properties: {
            name: {
              type: 'string',
              minLength: 3,
              maxLength: 200,
              description: 'Nombre del producto',
              example: 'Teclado Mecánico RGB Pro'
            },
            price: {
              type: 'number',
              format: 'decimal',
              minimum: 0.01,
              description: 'Precio del producto',
              example: 99.99
            },
            description: {
              type: 'string',
              maxLength: 200,
              description: 'Descripción del producto',
              example: 'Teclado mecánico premium con switches RGB'
            },
            created_date: {
              type: 'string',
              format: 'date',
              description: 'Fecha de creación',
              example: '2024-01-15'
            },
            category: {
              type: 'string',
              maxLength: 200,
              description: 'Categoría del producto',
              example: 'Periféricos'
            },
            color: {
              type: 'string',
              maxLength: 200,
              description: 'Color del producto',
              example: 'Negro'
            },
            stock: {
              type: 'integer',
              minimum: 0,
              description: 'Cantidad en stock',
              example: 45
            },
            RGB: {
              type: 'boolean',
              description: 'Indica si el producto tiene iluminación RGB',
              example: true
            }
          }
        },
        LoginRequest: {
          type: 'object',
          required: ['email', 'password'],
          properties: {
            email: {
              type: 'string',
              format: 'email',
              description: 'Email del usuario',
              example: 'usuario@example.com'
            },
            password: {
              type: 'string',
              format: 'password',
              description: 'Contraseña del usuario',
              example: 'password123'
            }
          }
        },
        RegisterRequest: {
          type: 'object',
          required: ['email', 'password'],
          properties: {
            email: {
              type: 'string',
              format: 'email',
              description: 'Email del usuario',
              example: 'nuevo@example.com'
            },
            password: {
              type: 'string',
              format: 'password',
              minLength: 6,
              description: 'Contraseña del usuario (mínimo 6 caracteres)',
              example: 'password123'
            }
          }
        },
        AuthResponse: {
          type: 'object',
          properties: {
            message: {
              type: 'string',
              example: 'El usuario usuario@example.com ha iniciado sesión correctamente.'
            },
            userLogged: {
              type: 'object',
              properties: {
                userName: {
                  type: 'string',
                  example: 'usuario@example.com'
                },
                userRole: {
                  type: 'string',
                  enum: ['Cliente', 'Admin'],
                  example: 'Cliente'
                },
                token: {
                  type: 'string',
                  description: 'Token JWT para autenticación',
                  example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...'
                }
              }
            }
          }
        },
        ProductResponse: {
          type: 'object',
          properties: {
            code: {
              type: 'integer',
              example: 200
            },
            ok: {
              type: 'boolean',
              example: true
            },
            payload: {
              type: 'array',
              items: {
                $ref: '#/components/schemas/Product'
              }
            }
          }
        },
        SingleProductResponse: {
          type: 'object',
          properties: {
            code: {
              type: 'integer',
              example: 200
            },
            ok: {
              type: 'boolean',
              example: true
            },
            payload: {
              $ref: '#/components/schemas/Product'
            }
          }
        },
        StockReport: {
          type: 'object',
          properties: {
            code: {
              type: 'integer',
              example: 200
            },
            ok: {
              type: 'boolean',
              example: true
            },
            metrics: {
              type: 'object',
              properties: {
                totalProducts: {
                  type: 'integer',
                  example: 150
                },
                totalStock: {
                  type: 'integer',
                  example: 5000
                },
                avgPrice: {
                  type: 'number',
                  format: 'decimal',
                  example: 89.50
                }
              }
            }
          }
        },
        Error: {
          type: 'object',
          properties: {
            error: {
              type: 'string',
              example: 'error interno del server'
            },
            message: {
              type: 'string',
              example: 'El email y el password son requeridos'
            }
          }
        }
      }
    },
    tags: [
      {
        name: 'Autenticación',
        description: 'Endpoints para registro y login de usuarios'
      },
      {
        name: 'Productos',
        description: 'Endpoints para gestión de productos (requiere autenticación)'
      }
    ]
  },
  apis: ['./src/router/*.js', './src/server.js']
};

export const swaggerSpec = swaggerJsdoc(options);


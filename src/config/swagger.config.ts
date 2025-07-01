import swaggerJSDoc from "swagger-jsdoc";

const swaggerDefinition = {
  openapi: "3.0.1", // Versión de OpenAPI
  info: {
    title: "API de Gestión de Envíos y Cotizaciones", // Título de tu API
    version: "1.0.0", // Versión de tu API
    description:
      "Documentación interactiva para la API de gestión de envíos y cotizaciones.", // Descripción
    contact: {
      name: "Jesus Alberto Chalare",
      email: "albertchalare@gmail.com",
      url: "https://github.com/devjchalare",
    },
  },
  servers: [
    {
      url: "http://localhost:3000/api", // La URL base de tu API
      description: "Servidor de Desarrollo Local",
    },
  ],
  components: {
    securitySchemes: {
      bearerAuth: {
        type: "http",
        scheme: "bearer",
        bearerFormat: "JWT",
        description:
          'Autenticación JWT. Ingresa tu token con el prefijo "Bearer " (ej. "Bearer eyJhbGciOiJIUzI1Ni...").',
      },
    },
    schemas: {
      login: {
        type: "object",
        required: ["numeroIdentificacion", "password"],
        properties: {
          numeroIdentificacion: {
            type: "string",
            description: "Número de identificación del usuario.",
            example: "123456789",
          },
          password: {
            type: "string",
            description: "Contraseña del usuario.",
            example: "12345678",
          },
        },
        example: {
          numeroIdentificacion: "123456789",
          password: "1234678",
        },
      },

      usuarios: {
        type: "object",
        required: [
          "nombre",
          "apellido",
          "numeroTelefono",
          "numeroIdentificacion",
          "email",
          "password",
        ],
        properties: {
          nombre: {
            type: "string",
            description: "Nombre del usuario.",
            example: "Test",
          },
          apellido: {
            type: "string",
            description: "Apellido del usuario.",
            example: "test",
          },
          numeroTelefono: {
            type: "string",
            description: "Número de teléfono del usuario.",
            example: "55555",
          },
          numeroIdentificacion: {
            type: "string",
            description: "Número de identificación del usuario.",
            example: "123456789",
          },
          email: {
            type: "string",
            description: "Email del usuario.",
            example: "test.@test.com",
          },
          password: {
            type: "string",
            description: "Contraseña del usuario.",
            example: "12345678",
          },
        },
        example: {
          nombre: "Test",
          apellido: "test",
          numeroTelefono: "555555",
          numeroIdentificacion: "123456789",
          email: "test@test.com",
          password: "12345678",
        },
      },

      cotizaciones: {
        type: "object",
        required: [
          "articulo",
          "peso",
          "alto",
          "ancho",
          "largo",
          "idCiudadOrigen",
          "idCiudadDestino",
        ],
        properties: {
          articulo: {
            type: "string",
            description: "Articulo.",
            example: "Televisor",
          },
          peso: {
            type: "number",
            format: "float",
            description: "Precio de la cotización.",
            example: 25000.5,
          },
          alto: {
            type: "number",
            format: "float",
            description: "Altura del paquete en cm.",
            example: 10.7,
          },
          ancho: {
            type: "number",
            format: "float",
            description: "Ancho del paquete en cm.",
            example: 15.89,
          },
          largo: {
            type: "number",
            format: "float",
            description: "Largo del paquete en cm.",
            example: 20.14,
          },
          idCiudadOrigen: {
            type: "integer",
            description: "ID de la ciudad de origen.",
            example: 1,
          },
          idCiudadDestino: {
            type: "integer",
            description: "ID de la ciudad de destino.",
            example: 2,
          },
        },
        example: {
          articulo: "Televisor",
          peso: 25000.5,
          alto: 10.7,
          ancho: 15.89,
          largo: 20.14,
          idCiudadOrigen: 1,
          idCiudadDestino: 2,
        },
      },

      envios: {
        type: "object",
        required: [
          "articulo",
          "peso",
          "alto",
          "ancho",
          "largo",
          "idCiudadOrigen",
          "idCiudadDestino",
          "precioCotizacion",
        ],
        properties: {
          articulo: {
            type: "string",
            description: "Articulo.",
            example: "Televisor",
          },
          peso: {
            type: "number",
            format: "float",
            description: "peso del articulo.",
            example: 25000.5,
          },
          alto: {
            type: "number",
            format: "float",
            description: "Altura del paquete en cm.",
            example: 10.7,
          },
          ancho: {
            type: "number",
            format: "float",
            description: "Ancho del paquete en cm.",
            example: 15.89,
          },
          largo: {
            type: "number",
            format: "float",
            description: "Largo del paquete en cm.",
            example: 20.14,
          },
          idCiudadOrigen: {
            type: "integer",
            description: "ID de la ciudad de origen.",
            example: 1,
          },
          idCiudadDestino: {
            type: "integer",
            description: "ID de la ciudad de destino.",
            example: 2,
          },
          precioCotizacion: {
            type: "number",
            format: "float",
            description: "Precio de la cotización.",
            example: 25000.5,
          },
        },
        example: {
          articulo: "Televisor",
          peso: 25000.5,
          alto: 10.7,
          ancho: 15.89,
          largo: 20.14,
          idCiudadOrigen: 1,
          idCiudadDestino: 2,
          precioCotizacion: 25000.5,
        },
      },

      guia: {
        type: "object",
        required: ["guia"],
        properties: {
          guia: {
            type: "string",
            description: "Guia de envío.",
            example: "G-123456",
          },
        },
        example: {
          guia: "G-123456",
        },
      },
    },
  },
};

const options = {
  swaggerDefinition,
  apis: ["./src/presentation/**/*.ts"],
};

export const swaggerSpec = swaggerJSDoc(options);

import { Router } from "express";
import {
  UserDataSourceImpl,
  UserRepositoryImpl,
  validateDto,
} from "../../infrastructure";
import { UserController } from "./controller";
import { CreateUserDto, LoginUserDto } from "../../domain";

export class UserRoutes {
  static get routes(): Router {
    const router = Router();

    const userDataSource = new UserDataSourceImpl();

    const userRepository = new UserRepositoryImpl(userDataSource);

    const userController = new UserController(userRepository);

    /**
     * @swagger
     * /users:
     *     post:
     *       summary: Crea un usuario.
     *       tags: [Usuarios]
     *       security:
     *         - bearerAuth: []
     *       responses:
     *         201: # Nivel de código de respuesta
     *           description: Usuario creado exitosamente.
     *           content: # Anidado bajo 201
     *             application/json: # Anidado bajo content
     *               schema: # Anidado bajo application/json
     *                 type: object
     *                 properties:
     *                   usuario:
     *                     type: object
     *                     description: informacion del usuario.
     *                     example: {"id":11, "nombre":"test","apellido":"test","numeroTelefono":"123456","numeroIdentificacion":"12345789","email":"test@example.com"}
     *                   token:
     *                     type: string
     *                     description: Token de acceso.
     *                     example: "ABC"
     *         400: # Nivel de código de respuesta
     *           description: Datos de entrada incorrectos.
     *           content: # Anidado bajo 400
     *             application/json: # Anidado bajo content
     *               schema: # Anidado bajo application/json
     *                 type: object
     *                 properties:
     *                   message:
     *                     type: string
     *                     description: Mensaje de error.
     *                     example: "Usuario no encontrado."
     *                   statusCode:
     *                     type: integer
     *                     description: Código de error.
     *                     example: 400
     *     parameters:
     *       - in: body
     *         name: body
     *         description: Datos del usuario.
     *         required: true
     *         schema:
     *           $ref: '#/components/schemas/usuarios'
     *           type: object
     *           properties:
     *             nombre:
     *               type: string
     *               description: Nombre de usuario.
     *               example: "test"
     *             apellido:
     *               type: string
     *               description: Apellido de usuario.
     *               example: "test"
     *             numeroTelefono:
     *               type: string
     *               description: Numero de telefono de usuario.
     *               example: "123456"
     *             numeroIdentificacion:
     *               type: string
     *               description: Numero de identificacion de usuario.
     *               example: "12345789"
     *             email:
     *               type: string
     *               description: Email de usuario.
     *               example: "test@example.com"
     *             password:
     *               type: string
     *               description: Contraseña de usuario.
     *               example: "12345678"
     *
     */
    router.post(
      "/",
      validateDto(CreateUserDto),
      userController.createUser.bind(userController)
    );

    /**
     * @swagger
     * /users/login:
     *     post:
     *       summary: Login de un usuario.
     *       tags: [Usuarios]
     *       security:
     *         - bearerAuth: []
     *       responses:
     *         201: # Nivel de código de respuesta
     *           description: Usuario logueado exitosamente.
     *           content: # Anidado bajo 201
     *             application/json: # Anidado bajo content
     *               schema: # Anidado bajo application/json
     *                 type: object
     *                 properties:
     *                   usuario:
     *                     type: object
     *                     description: informacion del usuario.
     *                     example: {"id":11, "nombre":"test","apellido":"test","numeroTelefono":"123456","numeroIdentificacion":"12345789","email":"test@example.com"}
     *                   token:
     *                     type: string
     *                     description: Token de acceso.
     *                     example: "ABC"
     *         400: # Nivel de código de respuesta
     *           description: Datos de entrada incorrectos.
     *           content: # Anidado bajo 400
     *             application/json: # Anidado bajo content
     *               schema: # Anidado bajo application/json
     *                 type: object
     *                 properties:
     *                   message:
     *                     type: string
     *                     description: Mensaje de error.
     *                     example: "Usuario no encontrado."
     *                   statusCode:
     *                     type: integer
     *                     description: Código de error.
     *                     example: 400
     *     parameters:
     *       - in: body
     *         name: body
     *         description: Datos del usuario.
     *         required: true
     *         schema:
     *           $ref: '#/components/schemas/login'
     *           type: object
     *           properties:
     *             numeroIdentificacion:
     *               type: string
     *               description: Numero de identificacion de usuario.
     *               example: "12345789"
     *             password:
     *               type: string
     *               description: Contraseña de usuario.
     *               example: "12345678"
     *
     */
    router.post(
      "/login",
      validateDto(LoginUserDto),
      userController.loginUser.bind(userController)
    );

    console.log("✅ [USER ROUTES] User routes configured successfully");

    return router;
  }
}

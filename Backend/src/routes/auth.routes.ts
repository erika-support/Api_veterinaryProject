import { Router } from 'express';
import { registerUser, loginUser } from '../controllers/auth.controller';
import { body } from 'express-validator';
import { validateRequest } from '../middlewares/validate.middleware';

const router = Router();

// Ruta para registrar usuario con validaciones
router.post(
  '/register',
  [
    body('nombre').notEmpty().withMessage('El nombre es obligatorio'),
    body('apellido').notEmpty().withMessage('El apellido es obligatorio'),
    body('documento').notEmpty().withMessage('El documento es obligatorio'),
    body('correo').isEmail().withMessage('Correo inválido'),
    body('password').isLength({ min: 6 }).withMessage('La contraseña debe tener al menos 6 caracteres'),
    body('id_rol').isInt().withMessage('El rol debe ser un número entero')
  ],
  validateRequest,
  registerUser
);

// Ruta para login con validaciones
router.post(
  '/login',
  [
    body('correo').isEmail().withMessage('Correo inválido'),
    body('password').notEmpty().withMessage('La contraseña es obligatoria')
  ],
  validateRequest,
  loginUser
);

export default router;
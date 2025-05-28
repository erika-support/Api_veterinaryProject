import { Router } from 'express';
import { getUsuarioById, getVeterinarios } from '../controllers/usuarios.controller';
import { authenticateToken, authorizeRoles } from '../middlewares/auth.middleware';

const router = Router();

// Obtener lista de veterinarios
router.get('/veterinarios', authenticateToken, authorizeRoles('owner'), getVeterinarios);

// Obtener usuario por ID
router.get('/:id', authenticateToken, getUsuarioById);

export default router;

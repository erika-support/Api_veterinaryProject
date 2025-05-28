import { Router } from 'express';
import {
  crearMascota,
  getMascotasByUsuario,
  getTodasLasMascotas
} from '../controllers/mascotas.controller';
import { authenticateToken, authorizeRoles } from '../middlewares/auth.middleware';

const router = Router();

router.post('/', authenticateToken, authorizeRoles('owner'), crearMascota);
router.get('/:usuarioId', authenticateToken, authorizeRoles('owner'), getMascotasByUsuario);
router.get('/', authenticateToken, authorizeRoles('vet'), getTodasLasMascotas); 

export default router;

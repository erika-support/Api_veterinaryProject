import { Router } from 'express';
import { registrarHistorial, getHistorialByMascota } from '../controllers/historial.controller';
import { authenticateToken } from '../middlewares/auth.middleware';

const router = Router();

router.post('/', authenticateToken, registrarHistorial);
router.get('/mascota/:id', authenticateToken, getHistorialByMascota);

export default router;
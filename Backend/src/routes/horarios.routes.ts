import { Router } from 'express';
import { crearHorario, getHorariosDisponibles } from '../controllers/horarios.controller';
import { authenticateToken, authorizeRoles } from '../middlewares/auth.middleware';

const router = Router();

router.post('/', authenticateToken, authorizeRoles('vet'), crearHorario);
router.get('/disponibles', authenticateToken, getHorariosDisponibles);

export default router;
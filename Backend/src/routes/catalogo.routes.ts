import { Router } from 'express';
import { getEspecies, getRazasByEspecie } from '../controllers/catalogo.controller';
import { authenticateToken } from '../middlewares/auth.middleware';

const router = Router();

// Endpoint para obtener todas las especies
router.get('/especies', authenticateToken, getEspecies);

// Endpoint para obtener las razas por especie
router.get('/razas/:id', authenticateToken, getRazasByEspecie);

export default router;
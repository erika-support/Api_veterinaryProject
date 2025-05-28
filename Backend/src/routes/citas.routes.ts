import { Router } from 'express';
import {
  agendarCita,
  getCitasByVeterinario,
  getCitasByUsuario,
  finalizarCita
} from '../controllers/citas.controller';
import { authenticateToken, authorizeRoles } from '../middlewares/auth.middleware';

const router = Router();

/**
 * Agendar una nueva cita (solo dueños pueden agendar)
 * POST /citas
 */
router.post(
  '/',
  authenticateToken,
  authorizeRoles('owner'),
  agendarCita
);

/**
 * Obtener citas de un veterinario (solo veterinarios pueden consultar)
 * GET /citas/veterinario/:id
 */
router.get(
  '/veterinario/:id',
  authenticateToken,
  authorizeRoles('vet'),
  getCitasByVeterinario
);

/**
 * Obtener citas de un usuario (solo dueños pueden consultar)
 * GET /citas/usuario/:id
 */
router.get(
  '/usuario/:id',
  authenticateToken,
  authorizeRoles('owner'),
  getCitasByUsuario
);

/**
 * Finalizar una cita (solo veterinarios pueden finalizar)
 * PUT /citas/:id/finalizar
 */
router.put(
  '/:id/finalizar',
  authenticateToken,
  authorizeRoles('vet'),
  finalizarCita
);

export default router;
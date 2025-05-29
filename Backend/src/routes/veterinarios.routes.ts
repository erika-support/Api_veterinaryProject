import { Router } from "express";
import { getVeterinarioPorId } from "../controllers/veterinarios.controller";

const router = Router();

router.get("/:id", getVeterinarioPorId);

export default router;


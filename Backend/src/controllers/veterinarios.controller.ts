import { Request, Response } from "express";
import pool from "../database/connection";

export const getVeterinarioPorId = async (req: Request, res: Response): Promise<Response | void> => {
  try {
    const { id } = req.params;
    const [rows]: any = await pool.query("SELECT nombre, apellido FROM Usuarios WHERE id_usuario = ? AND id_rol = 2", [id]);

    if (rows.length === 0) {
      return res.status(404).json({ message: "Veterinario no encontrado" });
    }

    const { nombre, apellido } = rows[0];
    return res.json({ nombre, apellido });
  } catch (error) {
    console.error("Error al obtener veterinario:", error);
    return res.status(500).json({ message: "Error al obtener veterinario" });
  }
};

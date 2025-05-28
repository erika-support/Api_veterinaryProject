import { Request, Response } from 'express';
import pool from '../database/connection';

export const registrarHistorial = async (req: Request, res: Response) => {
  try {
    const { id_mascota, id_veterinario, id_citas, fecha_consulta, diagnostico, tratamiento } = req.body;

    const [result] = await pool.execute(
      `INSERT INTO Historial (id_mascota, id_veterinario, id_citas, fecha_consulta, diagnostico, tratamiento)
       VALUES (?, ?, ?, ?, ?, ?)`,
      [id_mascota, id_veterinario, id_citas, fecha_consulta, diagnostico, tratamiento]
    );

    res.status(201).json({ message: 'Historial registrado', id_historia: (result as any).insertId });
  } catch (error) {
    res.status(500).json({ message: 'Error al registrar historial', error });
  }
};

export const getHistorialByMascota = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const [rows] = await pool.execute(
      'SELECT * FROM Historial WHERE id_mascota = ?',
      [id]
    );
    res.status(200).json(rows);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener historial', error });
  }
};
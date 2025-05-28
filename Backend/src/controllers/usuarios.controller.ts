import { Request, Response } from 'express';
import pool from '../database/connection';

export const getUsuarioById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const [rows] = await pool.execute('SELECT * FROM Usuarios WHERE id_usuario = ?', [id]);
    res.status(200).json((rows as any)[0]);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener usuario', error });
  }
};

export const getVeterinarios = async (_req: Request, res: Response) => {
  try {
    const [rows] = await pool.execute('SELECT * FROM Usuarios WHERE id_rol = 2');
    res.status(200).json(rows);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener veterinarios', error });
  }
};
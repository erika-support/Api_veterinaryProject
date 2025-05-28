import { Request, Response } from 'express';
import pool from '../database/connection';

export const getEspecies = async (_req: Request, res: Response): Promise<void> => {
  try {
    const [rows] = await pool.execute('SELECT * FROM Especies');
    res.status(200).json(rows);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener especies', error });
  }
};

export const getRazasByEspecie = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const [rows] = await pool.execute('SELECT * FROM Razas WHERE id_especie = ?', [id]);
    res.status(200).json(rows);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener razas', error });
  }
};

import { Request, Response } from 'express';
import pool from '../database/connection';

export const crearMascota = async (req: Request, res: Response) => {
  try {
    const { nombre, id_especie, id_raza } = req.body;
    const id_usuario = req.user?.id_usuario;

    if (!id_usuario) {
      return res.status(401).json({ message: 'Usuario no autenticado' });
    }

    const [result] = await pool.execute(
      'INSERT INTO Mascota (nombre, id_especie, id_raza, id_usuario) VALUES (?, ?, ?, ?)',
      [nombre, id_especie, id_raza, id_usuario]
    );

    res.status(201).json({
      message: 'Mascota registrada',
      id_mascota: (result as any).insertId
    });
  } catch (error) {
    console.error('Error al registrar mascota:', error);
    res.status(500).json({ message: 'Error al registrar mascota', error });
  }
};

export const getMascotasByUsuario = async (req: Request, res: Response) => {
  try {
    const { usuarioId } = req.params;
    const [rows] = await pool.execute(
      'SELECT * FROM Mascota WHERE id_usuario = ?',
      [usuarioId]
    );
    res.status(200).json(rows);
  } catch (error) {
    console.error('Error al obtener mascotas:', error);
    res.status(500).json({ message: 'Error al obtener mascotas', error });
  }
};
export const getTodasLasMascotas = async (_req: Request, res: Response) => {
  try {
    const [rows] = await pool.execute('SELECT * FROM Mascota');
    res.status(200).json(rows);
  } catch (error) {
    console.error('Error al obtener todas las mascotas:', error);
    res.status(500).json({ message: 'Error al obtener todas las mascotas', error });
  }
};

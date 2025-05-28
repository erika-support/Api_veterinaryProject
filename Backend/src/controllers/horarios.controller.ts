import { Request, Response } from 'express';
import pool from '../database/connection';

export const crearHorario = async (req: Request, res: Response): Promise<void> => {
  try {
    const { fecha } = req.body;
    const user = req.user;

    if (!user || user.role !== 'vet') {
      res.status(403).json({ message: 'Acceso denegado. Solo veterinarios pueden crear horarios.' });
      return;
    }

    const id_veterinario = user.id_usuario;

    if (!fecha) {
      res.status(400).json({ message: 'Falta la fecha para el horario.' });
      return;
    }

    const [existing] = await pool.execute(
      'SELECT * FROM Horarios WHERE id_veterinario = ? AND fecha = ?',
      [id_veterinario, fecha]
    );

    if ((existing as any).length > 0) {
      res.status(400).json({ message: 'Ya existe un horario para esa fecha y hora.' });
      return;
    }

    const [result] = await pool.execute(
      'INSERT INTO Horarios (id_veterinario, fecha) VALUES (?, ?)',
      [id_veterinario, fecha]
    );

    res.status(201).json({
      message: 'Horario registrado correctamente.',
      id_horario: (result as any).insertId,
    });
  } catch (error: any) {
    console.error('Error en crearHorario:', error);
    res.status(500).json({
      message: 'Error al registrar horario',
      error: error.message || error,
    });
  }
};

export const getHorariosDisponibles = async (_req: Request, res: Response): Promise<void> => {
  try {
    const [rows] = await pool.execute('SELECT * FROM Horarios WHERE disponible = TRUE');
    res.status(200).json(rows);
  } catch (error: any) {
    console.error('Error en getHorariosDisponibles:', error);
    res.status(500).json({ message: 'Error al obtener horarios disponibles', error: error.message || error });
  }
};

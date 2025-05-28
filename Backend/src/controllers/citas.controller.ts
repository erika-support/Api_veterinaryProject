import { Request, Response } from 'express';
import pool from '../database/connection';

// Convierte fecha ISO a formato 'YYYY-MM-DD HH:MM:SS'
function toMysqlDatetime(dateString: string) {
  const date = new Date(dateString);
  return date.toISOString().slice(0, 19).replace('T', ' ');
}

// Agendar una nueva cita
export const agendarCita = async (req: Request, res: Response) => {
  try {
    const { fecha, id_veterinario, id_mascota, id_horario } = req.body;

    // 1. Verificar que el horario esté disponible antes de ocuparlo
    const [horarios] = await pool.execute(
      'SELECT disponible FROM Horarios WHERE id_horario = ?',
      [id_horario]
    );
    if (!Array.isArray(horarios) || horarios.length === 0) {
      return res.status(400).json({ message: 'Horario no encontrado.' });
    }
    const disponible = (horarios[0] as any).disponible;
    if (disponible === 0 || disponible === false) {
      return res.status(400).json({ message: 'El horario ya está ocupado.' });
    }

    // Convertir la fecha a formato MySQL
    const fechaMySQL = toMysqlDatetime(fecha);

    // 2. Registrar la cita (asegúrate de incluir el estado explícitamente)
    const [result] = await pool.execute(
      'INSERT INTO Citas (fecha, id_veterinario, id_mascota, id_horario, estado) VALUES (?, ?, ?, ?, ?)',
      [fechaMySQL, id_veterinario, id_mascota, id_horario, "agendada"]
    );

    // 3. Marcar el horario como ocupado solo si la cita fue agendada correctamente
    await pool.execute(
      'UPDATE Horarios SET disponible = FALSE WHERE id_horario = ?',
      [id_horario]
    );

    res.status(201).json({ message: 'Cita agendada', id_citas: (result as any).insertId });
  } catch (error) {
    console.error("Error en agendarCita:", error);
    res.status(500).json({ message: 'Error al agendar cita', error });
  }
};

// Obtener citas por veterinario con nombre de la mascota
export const getCitasByVeterinario = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    // Solo mostrar citas agendadas o en curso
    const [rows] = await pool.execute(
      `SELECT C.*, M.nombre AS nombre_mascota, H.fecha AS fecha_horario
       FROM Citas C
       JOIN Mascota M ON C.id_mascota = M.id_mascota
       JOIN Horarios H ON C.id_horario = H.id_horario
       WHERE C.id_veterinario = ? AND (C.estado = "agendada" OR C.estado = "en_curso")`,
      [id]
    );
    res.status(200).json(rows);
  } catch (error) {
    console.error("Error en getCitasByVeterinario:", error);
    res.status(500).json({ message: 'Error al obtener citas del veterinario', error });
  }
};

// Obtener citas por usuario (solo agendadas o en curso)
export const getCitasByUsuario = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const [rows] = await pool.execute(
      `SELECT C.*, M.nombre AS nombre_mascota, H.fecha AS fecha_horario, U.nombre AS nombre_veterinario
       FROM Citas C
       JOIN Mascota M ON C.id_mascota = M.id_mascota
       JOIN Horarios H ON C.id_horario = H.id_horario
       JOIN Usuarios U ON C.id_veterinario = U.id_usuario
       WHERE M.id_usuario = ? AND (C.estado = "agendada" OR C.estado = "en_curso")`,
      [id]
    );
    res.status(200).json(rows);
  } catch (error) {
    console.error("Error en getCitasByUsuario:", error);
    res.status(500).json({ message: 'Error al obtener citas del usuario', error });
  }
};

// Finalizar una cita
export const finalizarCita = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { fecha_fin } = req.body;

    // Convertir fecha_fin si existe
    const fechaFinMySQL = fecha_fin ? toMysqlDatetime(fecha_fin) : null;

    await pool.execute(
      'UPDATE Citas SET estado = "finalizada", fecha_fin = ? WHERE id_citas = ?',
      [fechaFinMySQL, id]
    );

    res.status(200).json({ message: 'Cita finalizada correctamente' });
  } catch (error) {
    console.error("Error en finalizarCita:", error);
    res.status(500).json({ message: 'Error al finalizar cita', error });
  }
};
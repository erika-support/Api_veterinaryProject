import { Request, Response } from 'express';
import pool from '../database/connection';
import { hashPassword, comparePassword } from '../utils/hash';
import { generateToken } from '../utils/jwt';

export const registerUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const { nombre, apellido, documento, correo, password, id_rol } = req.body;
    const hashedPassword = await hashPassword(password);

    const [result] = await pool.execute(
      'INSERT INTO Usuarios (nombre, apellido, documento, correo, password, id_rol) VALUES (?, ?, ?, ?, ?, ?)',
      [nombre, apellido, documento, correo, hashedPassword, id_rol]
    );

    res.status(201).json({ message: 'Usuario registrado', id_usuario: (result as any).insertId });
  } catch (error) {
    res.status(500).json({ message: 'Error al registrar usuario', error });
  }
};

export const loginUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const { correo, password } = req.body;
    const [rows] = await pool.execute('SELECT * FROM Usuarios WHERE correo = ?', [correo]);
    const user = (rows as any)[0];

    if (!user || !(await comparePassword(password, user.password))) {
      res.status(401).json({ message: 'Credenciales inválidas' });
      return;
    }

    // Mapeo de roles numéricos a nombres
    const roleMap: Record<number, string> = {
      1: 'owner',
      2: 'vet'
    };

    // Construir el payload del token dependiendo del rol
    let tokenPayload: any = {
      role: roleMap[user.id_rol] || 'unknown'
    };

    if (user.id_rol === 2) {
      // Si es veterinario, el id_veterinario es el id_usuario
      tokenPayload.id_veterinario = user.id_usuario;
    } else {
      // Si es usuario propietario normal, incluye id_usuario
      tokenPayload.id_usuario = user.id_usuario;
    }

    const token = generateToken(tokenPayload);

    res.status(200).json({ token });
  } catch (error) {
    res.status(500).json({ message: 'Error al iniciar sesión', error });
  }
};
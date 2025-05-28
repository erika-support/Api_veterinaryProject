import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

import authRoutes from './routes/auth.routes';
import usuariosRoutes from './routes/usuarios.routes';
import mascotasRoutes from './routes/mascotas.routes';
import horariosRoutes from './routes/horarios.routes';
import citasRoutes from './routes/citas.routes';
import historialRoutes from './routes/historial.routes';
import { errorHandler } from './middlewares/error.middleware';
import catalogoRoutes from './routes/catalogo.routes';

dotenv.config();

const app = express();

// CORS configurado para permitir peticiones desde el frontend
app.use(cors({
 origin: 'http://localhost:5173',
 credentials: true
}));

// Middlewares
app.use(express.json());

// Rutas
app.use('/api/auth', authRoutes);
app.use('/api/usuarios', usuariosRoutes);
app.use('/api/mascotas', mascotasRoutes);
app.use('/api/horarios', horariosRoutes);
app.use('/api/citas', citasRoutes);
app.use('/api/historial', historialRoutes);
app.use('/api/catalogo', catalogoRoutes);

// Ruta raíz
app.get('/', (_req, res) => {
 res.send('Servidor backend funcionando correctamente 🚀');
});

// Middleware de errores
app.use(errorHandler);

export default app;

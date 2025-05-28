import api from './api'; // Este es el Axios configurado con interceptores

export const register = (data: {
  nombre: string;
  apellido: string;
  documento: string;
  correo: string;
  password: string;
  id_rol: number;
}) => {
  return api.post('/auth/register', data);
};

export const login = (correo: string, password: string) => {
 return api.post('/auth/login', { correo, password });
};

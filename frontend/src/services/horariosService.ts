import api from './api';

export const crearHorario = async (id_veterinario: number, fecha: string) => {
  const response = await api.post('/horarios', {
    id_veterinario,
    fecha,
  });
  return response.data;
};
export const getHorariosDisponibles = async () => {
 const response = await api.get("/horarios/disponibles");
 return response.data;
};


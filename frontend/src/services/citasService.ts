import api from './api';

export interface Cita {
  id_citas: number;
  id_mascota: number;
  nombre_mascota?: string;
  fecha: string;
  estado?: string;
  id_veterinario?: number;
  id_horario?: number;
  fecha_fin?: string;
  // Puedes agregar más campos si tu API los retorna
}

// Agendar una nueva cita
export const agendarCita = async (data: {
  fecha: string;
  id_veterinario: number;
  id_mascota: number;
  id_horario: number;
}) => {
  const token = localStorage.getItem("token");
  if (!token) throw new Error("No autenticado. Falta token.");
  const response = await api.post('/citas', data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

// Obtener citas por veterinario
export const obtenerCitasPorVeterinario = async (
  idVeterinario: number
): Promise<Cita[]> => {
  if (!idVeterinario) throw new Error("ID de veterinario no definido.");
  const token = localStorage.getItem("token");
  if (!token) throw new Error("No autenticado. Falta token.");
  const response = await api.get(`/citas/veterinario/${idVeterinario}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

// Obtener citas por usuario (dueño)
export const obtenerCitasPorUsuario = async (
  idUsuario: number
): Promise<Cita[]> => {
  if (!idUsuario) throw new Error("ID de usuario no definido.");
  const token = localStorage.getItem("token");
  if (!token) throw new Error("No autenticado. Falta token.");
  const response = await api.get(`/citas/usuario/${idUsuario}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

// Finalizar una cita
export const finalizarCita = async (
  idCita: number,
  data: { fecha_fin: string }
) => {
  if (!idCita) throw new Error("ID de cita no definido.");
  const token = localStorage.getItem("token");
  if (!token) throw new Error("No autenticado. Falta token.");
  const response = await api.put(`/citas/${idCita}/finalizar`, data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};
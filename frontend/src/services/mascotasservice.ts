import api from './api';

export const fetchPetsByUser = async (usuarioId: number) => {
  const response = await api.get(`/mascotas/${usuarioId}`);
  return response.data;
};

export const createPet = async (pet: {
  nombre: string;
  id_especie: number;
  id_raza: number;
  id_usuario: number;
}) => {
  const response = await api.post('/mascotas', pet);
  return response.data;
};

export const getMascotasByUsuario = async (usuarioId: number) => {
  const response = await api.get(`/mascotas/${usuarioId}`);
  return response.data;
};

export const getTodasLasMascotas = async () => {
  const token = localStorage.getItem("token");
  const response = await api.get("/mascotas", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

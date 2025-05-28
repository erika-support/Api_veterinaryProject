import axios from "axios";

export interface HistorialData {
  id_mascota: number;
  id_veterinario: number;
  id_citas: number;
  fecha_consulta: string;
  diagnostico: string;
  tratamiento: string;
}

// Obtener historial clínico por mascota
export const getHistorialByMascota = async (id_mascota: number) => {
  const token = localStorage.getItem("token");
  const response = await axios.get(`/api/historial/mascota/${id_mascota}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

// Registrar nuevo historial clínico
export const registrarHistorial = async (data: HistorialData) => {
  const token = localStorage.getItem("token");
  const response = await axios.post("/api/historial", data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

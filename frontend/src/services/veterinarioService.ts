import axios from "axios";

const API_URL = "http://localhost:3000/api/veterinarios"; // ajusta si tu endpoint es diferente

export const getVeterinarioPorId = async (id: number) => {
  try {
    const response = await axios.get(`${API_URL}/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error al obtener el veterinario:", error);
    throw error;
  }
};

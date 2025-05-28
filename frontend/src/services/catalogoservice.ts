import api from './api'; 
import { Especie, Raza } from '../models/catalogo.model';

export const fetchEspecies = async (): Promise<Especie[]> => {
  const response = await api.get('/catalogo/especies');
  return response.data;
};

export const fetchRazasByEspecie = async (id: number): Promise<Raza[]> => {
  const response = await api.get(`/catalogo/razas/${id}`);
  return response.data;
};

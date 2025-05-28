export interface Especie {
  id_especie: number;
  nombre_especie: string;
}

export interface Raza {
  id_raza: number;
  nombre_raza: string;
  id_especie: number;
}

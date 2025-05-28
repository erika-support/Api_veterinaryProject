import { useEffect, useState } from "react";
import { obtenerCitasPorVeterinario } from "../services/citasService";

interface Cita {
  id_cita: number;
  fecha: string;
  id_mascota: number;
  id_veterinario: number;
}

const ListaCitasVeterinario = ({
  idVeterinario,
  token,
}: {
  idVeterinario: number;
  token: string;
}) => {
  const [citas, setCitas] = useState<Cita[]>([]);

  useEffect(() => {
    const fetchCitas = async () => {
      try {
        const data = await obtenerCitasPorVeterinario(idVeterinario, token);
        setCitas(data);
      } catch (error) {
        console.error("Error al obtener citas", error);
      }
    };

    fetchCitas();
  }, [idVeterinario, token]);

  return (
    <div>
      <h3>Citas del Veterinario</h3>
      <ul>
        {citas.map((cita) => (
          <li key={cita.id_cita}>
            {cita.fecha} - Mascota ID: {cita.id_mascota}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ListaCitasVeterinario;
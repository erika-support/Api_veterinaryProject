import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  Button,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
} from "@mui/material";
import { agendarCita } from "../services/citasService";
import { getHorariosDisponibles } from "../services/horariosService";

interface Pet {
  id_mascota: number;
  nombre: string;
}

interface Horario {
  id_horario: number;
  fecha: string;
  id_veterinario: number;
}

interface AppointmentSchedulerProps {
  pets: Pet[];
  idVeterinario: number;
}

const AppointmentScheduler: React.FC<AppointmentSchedulerProps> = ({
  pets,
  idVeterinario,
}) => {
  const [selectedPetId, setSelectedPetId] = useState<number | "">("");
  const [selectedHorarioId, setSelectedHorarioId] = useState<number | "">("");
  const [horarios, setHorarios] = useState<Horario[]>([]);

  useEffect(() => {
    const fetchHorarios = async () => {
      try {
        const data = await getHorariosDisponibles();
        const filtrados = data.filter(
          (h: Horario) => h.id_veterinario === idVeterinario
        );
        setHorarios(filtrados);
      } catch (error) {
        console.error("Error al obtener horarios", error);
      }
    };
    fetchHorarios();
  }, [idVeterinario]);

  const handleScheduleAppointment = async () => {
    if (selectedPetId && selectedHorarioId) {
      const horario = horarios.find(
        (h) => h.id_horario === selectedHorarioId
      );
      if (!horario) return;

      try {
        await agendarCita({
          fecha: horario.fecha,
          id_veterinario: idVeterinario,
          id_mascota: selectedPetId,
          id_horario: selectedHorarioId,
        });
        setSelectedPetId("");
        setSelectedHorarioId("");
      } catch (error) {
        console.error("Error al agendar cita", error);
      }
    }
  };

  return (
    <Box
      sx={{
        p: 3,
        maxWidth: 600,
        mx: "auto",
        backgroundColor: "#f9f9f9",
        borderRadius: 2,
      }}
    >
      <Typography variant="h4" gutterBottom>
        Agendar Cita
      </Typography>

      <Box sx={{ mb: 3 }}>
        <FormControl fullWidth sx={{ mb: 2 }}>
          <InputLabel>Mascota</InputLabel>
          <Select
            value={selectedPetId}
            onChange={(e) => setSelectedPetId(Number(e.target.value))}
            label="Mascota"
          >
            {pets.map((pet) => (
              <MenuItem key={pet.id_mascota} value={pet.id_mascota}>
                {pet.nombre}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <FormControl fullWidth sx={{ mb: 2 }}>
          <InputLabel>Horario Disponible</InputLabel>
          <Select
            value={selectedHorarioId}
            onChange={(e) => setSelectedHorarioId(Number(e.target.value))}
            label="Horario Disponible"
          >
            {horarios.map((horario) => (
              <MenuItem key={horario.id_horario} value={horario.id_horario}>
                {new Date(horario.fecha).toLocaleString()}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <Button
          variant="contained"
          color="primary"
          onClick={handleScheduleAppointment}
          fullWidth
        >
          Confirmar Cita
        </Button>
      </Box>
    </Box>
  );
};

export default AppointmentScheduler;

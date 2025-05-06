//3)--------------------seg cod de Anderson
import React, { useState, useEffect, useCallback } from "react";
import { Button, Box, Card, CardContent } from "@mui/material";

interface Horario {
  id: string;
  fecha: string;
  hora: string;
}

const ElegirHorario: React.FC = () => {
  const [disponibilidad, setDisponibilidad] = useState<Horario[]>([]);
  const [horarioSeleccionado, setHorarioSeleccionado] =
    useState<Horario | null>(null);

  useEffect(() => {
    // Aquí cargarías la disponibilidad desde la base de datos
    const cargarDisponibilidad = () => [
      { id: "1", fecha: "2025-05-03", hora: "10:00" },
      { id: "2", fecha: "2025-05-03", hora: "11:00" },
      // Más horarios...
    ];
    setDisponibilidad(cargarDisponibilidad());
  }, []);

  const seleccionarHorario = useCallback((horario: Horario) => {
    setHorarioSeleccionado(horario);
  }, []);

  const confirmarCita = useCallback(() => {
    // Aquí guardarías la cita en la base de datos
    console.log("Cita confirmada:", horarioSeleccionado);
  }, [horarioSeleccionado]);

  return (
    <Card>
      <CardContent>
        <h2>Elegir Horario</h2>
        <Box display="flex" flexWrap="wrap" gap={2}>
          {disponibilidad.map((horario) => (
            <Box key={horario.id} flexBasis="calc(50% - 8px)">
              <Button
                variant="outlined"
                onClick={() => seleccionarHorario(horario)}
                fullWidth
              >
                {horario.fecha} - {horario.hora}
              </Button>
            </Box>
          ))}
        </Box>
        {horarioSeleccionado && (
          <Button onClick={confirmarCita} variant="contained" color="primary">
            Confirmar Cita
          </Button>
        )}
      </CardContent>
    </Card>
  );
};

export default ElegirHorario;

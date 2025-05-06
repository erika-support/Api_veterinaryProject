import React, { useState, useCallback } from "react";
import { TextField, Button, Box, Card, CardContent } from "@mui/material";

interface Horario {
  fecha: string;
  hora: string;
}

const DefinirDisponibilidad: React.FC = () => {
  const [disponibilidad, setDisponibilidad] = useState<Horario[]>([]);

  const agregarHorario = useCallback(() => {
    setDisponibilidad((prevDisponibilidad) => [
      ...prevDisponibilidad,
      { fecha: "", hora: "" },
    ]);
  }, []);

  const manejarCambio = useCallback(
    (index: number, campo: keyof Horario, valor: string) => {
      setDisponibilidad((prevDisponibilidad) => {
        const nuevaDisponibilidad = [...prevDisponibilidad];
        nuevaDisponibilidad[index][campo] = valor;
        return nuevaDisponibilidad;
      });
    },
    []
  );

  const guardarDisponibilidad = useCallback(() => {
    // Aquí guardarías la disponibilidad en la base de datos
    console.log(disponibilidad);
  }, [disponibilidad]);

  return (
    <Card>
      <CardContent>
        <h2>Definir Disponibilidad</h2>
        {disponibilidad.map((horario, index) => (
          <Box display="flex" justifyContent="space-between" key={index} mb={2}>
            <Box flex={1} mr={1}>
              <TextField
                label="Fecha"
                type="date"
                value={horario.fecha}
                onChange={(e) => manejarCambio(index, "fecha", e.target.value)}
                fullWidth
              />
            </Box>
            <Box flex={1} ml={1}>
              <TextField
                label="Hora"
                type="time"
                value={horario.hora}
                onChange={(e) => manejarCambio(index, "hora", e.target.value)}
                fullWidth
              />
            </Box>
          </Box>
        ))}
        <Button onClick={agregarHorario} variant="contained" color="primary">
          Agregar Horario
        </Button>
        <Button
          onClick={guardarDisponibilidad}
          variant="contained"
          color="secondary"
        >
          Guardar Disponibilidad
        </Button>
      </CardContent>
    </Card>
  );
};

export default DefinirDisponibilidad;

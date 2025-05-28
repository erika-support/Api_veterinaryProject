import React, { useState, useCallback } from "react";
import {
  TextField,
  Button,
  Box,
  Card,
  CardContent,
  Typography,
  Snackbar,
  Alert,
} from "@mui/material";
import { crearHorario } from "../services/horariosService";

interface Horario {
  fecha: string;
  hora: string;
}

interface Props {
  idVeterinario: number;
}

const DefinirDisponibilidad: React.FC<Props> = ({ idVeterinario }) => {
  const [disponibilidad, setDisponibilidad] = useState<Horario[]>([]);
  const [guardando, setGuardando] = useState(false);
  const [mensaje, setMensaje] = useState<string | null>(null);
  const [tipoAlerta, setTipoAlerta] = useState<"success" | "error">("success");

  const agregarHorario = useCallback(() => {
    setDisponibilidad((prev) => [...prev, { fecha: "", hora: "" }]);
  }, []);

  const manejarCambio = useCallback(
    (index: number, campo: keyof Horario, valor: string) => {
      setDisponibilidad((prev) => {
        const nueva = [...prev];
        nueva[index][campo] = valor;
        return nueva;
      });
    },
    []
  );

  const esHoraValida = (hora: string) => {
    const [, m] = hora.split(":").map(Number);
    return m === 0 || m === 30;
  };

  const esFechaHoraFutura = (fecha: string, hora: string) => {
    const fechaHora = new Date(`${fecha}T${hora}`);
    return fechaHora.getTime() > Date.now();
  };

  const guardarDisponibilidad = useCallback(async () => {
    setGuardando(true);
    try {
      for (const horario of disponibilidad) {
        if (!horario.fecha || !horario.hora) {
          setTipoAlerta("error");
          setMensaje("Por favor completa todos los campos antes de guardar.");
          setGuardando(false);
          return;
        }

        if (!esHoraValida(horario.hora)) {
          setTipoAlerta("error");
          setMensaje("La hora debe estar en intervalos de 30 minutos.");
          setGuardando(false);
          return;
        }

        if (!esFechaHoraFutura(horario.fecha, horario.hora)) {
          setTipoAlerta("error");
          setMensaje("La fecha y hora deben ser posteriores al momento actual.");
          setGuardando(false);
          return;
        }

        const fechaFormateada = `${horario.fecha} ${horario.hora}:00`;
        await crearHorario(idVeterinario, fechaFormateada);
      }

      setTipoAlerta("success");
      setMensaje("Disponibilidad guardada correctamente.");
      setDisponibilidad([]);
    } catch (error: any) {
      console.error("Error al guardar disponibilidad:", error);
      const mensajeError =
        error?.response?.data?.message || "Ocurrió un error al guardar la disponibilidad.";
      setTipoAlerta("error");
      setMensaje(mensajeError);
    } finally {
      setGuardando(false);
    }
  }, [disponibilidad, idVeterinario]);

  return (
    <Card sx={{ mt: 4 }}>
      <CardContent>
        <Typography variant="h6" fontWeight="bold" gutterBottom>
          Definir Disponibilidad
        </Typography>
        {disponibilidad.map((horario, index) => (
          <Box
            display="flex"
            flexDirection={{ xs: "column", sm: "row" }}
            gap={2}
            mb={2}
            key={index}
          >
            <TextField
              label="Fecha"
              type="date"
              value={horario.fecha}
              onChange={(e) => manejarCambio(index, "fecha", e.target.value)}
              fullWidth
              InputLabelProps={{ shrink: true }}
            />
            <TextField
              label="Hora"
              type="time"
              value={horario.hora}
              onChange={(e) => manejarCambio(index, "hora", e.target.value)}
              fullWidth
              inputProps={{ step: 1800 }}
              InputLabelProps={{ shrink: true }}
            />
          </Box>
        ))}
        <Box display="flex" gap={2} flexWrap="wrap">
          <Button
            onClick={agregarHorario}
            variant="contained"
            color="primary"
          >
            Agregar Horario
          </Button>
          <Button
            onClick={guardarDisponibilidad}
            variant="contained"
            color="secondary"
            disabled={guardando}
          >
            {guardando ? "Guardando..." : "Guardar Disponibilidad"}
          </Button>
        </Box>
      </CardContent>

      <Snackbar
        open={!!mensaje}
        autoHideDuration={4000}
        onClose={() => setMensaje(null)}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert severity={tipoAlerta} onClose={() => setMensaje(null)}>
          {mensaje}
        </Alert>
      </Snackbar>
    </Card>
  );
};

export default DefinirDisponibilidad;

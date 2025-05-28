import { useEffect, useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  CircularProgress,
  Typography,
  Button,
  Alert,
} from "@mui/material";
import {
  obtenerCitasPorVeterinario,
  obtenerCitasPorUsuario,
  Cita,
} from "../services/citasService";

interface Props {
  open: boolean;
  onClose: () => void;
  tipoUsuario: "veterinario" | "usuario";
  idUsuario?: number; // Opcional, pero validado internamente
  onFinalizarCita?: (cita: Cita) => void;
}

const Appointments: React.FC<Props> = ({
  open,
  onClose,
  tipoUsuario,
  idUsuario,
  onFinalizarCita,
}) => {
  const [appointments, setAppointments] = useState<Cita[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let active = true;
    setError(null);

    if (open) {
      // Validación de ID antes de llamar a la API
      if (!idUsuario || typeof idUsuario !== "number" || idUsuario <= 0) {
        setAppointments([]);
        setError(
          tipoUsuario === "veterinario"
            ? "ID de veterinario no definido o inválido. No se pueden cargar las citas."
            : "ID de usuario no definido o inválido. No se pueden cargar las citas."
        );
        setLoading(false);
        return;
      }

      setLoading(true);

      // Logging para depuración
      console.log("Consultando citas para:", tipoUsuario, "ID:", idUsuario);

      const fetchPromise =
        tipoUsuario === "veterinario"
          ? obtenerCitasPorVeterinario(idUsuario)
          : obtenerCitasPorUsuario(idUsuario);

      fetchPromise
        .then((data) => {
          if (active) {
            setAppointments(Array.isArray(data) ? data : []);
            if (Array.isArray(data)) {
              console.log(`Citas obtenidas (${data.length}):`, data);
            } else {
              console.warn("Respuesta inesperada de la API:", data);
            }
          }
        })
        .catch((err) => {
          setError(
            err?.message ||
              "Ocurrió un error al cargar las citas. Por favor, intenta nuevamente."
          );
          setAppointments([]);
          console.error("Error al obtener citas:", err);
        })
        .finally(() => {
          if (active) setLoading(false);
        });
    } else {
      setAppointments([]);
      setError(null);
    }
    return () => {
      active = false;
    };
  }, [open, tipoUsuario, idUsuario]);

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="md">
      <DialogTitle>Citas Agendadas</DialogTitle>
      <DialogContent>
        {loading ? (
          <div style={{ display: "flex", justifyContent: "center", padding: "1rem" }}>
            <CircularProgress />
          </div>
        ) : error ? (
          <Alert severity="error" sx={{ mt: 2 }}>{error}</Alert>
        ) : appointments.length === 0 ? (
          <Typography sx={{ mt: 2 }}>No hay citas agendadas.</Typography>
        ) : (
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Mascota</TableCell>
                <TableCell>Fecha</TableCell>
                <TableCell>Hora</TableCell>
                {onFinalizarCita && <TableCell>Acciones</TableCell>}
              </TableRow>
            </TableHead>
            <TableBody>
              {appointments.map((appt) => (
                <TableRow key={appt.id_citas}>
                  <TableCell>{appt.nombre_mascota || `ID: ${appt.id_mascota}`}</TableCell>
                  <TableCell>
                    {appt.fecha
                      ? new Date(appt.fecha).toLocaleDateString("es-ES")
                      : ""}
                  </TableCell>
                  <TableCell>
                    {appt.fecha
                      ? new Date(appt.fecha).toLocaleTimeString([], {
                          hour: "2-digit",
                          minute: "2-digit",
                        })
                      : ""}
                  </TableCell>
                  {onFinalizarCita && (
                    <TableCell>
                      <Button
                        variant="outlined"
                        color="primary"
                        onClick={() => {
                          if (onFinalizarCita) onFinalizarCita(appt);
                          onClose();
                        }}
                        tabIndex={0}
                      >
                        Finalizar
                      </Button>
                    </TableCell>
                  )}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default Appointments;
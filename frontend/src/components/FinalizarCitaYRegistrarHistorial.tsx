import { useState, useEffect } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Typography,
  Box,
  Stack,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
} from "@mui/material";
import { finalizarCita, obtenerCitasPorVeterinario } from "../services/citasService";
import { registrarHistorial } from "../services/historialService";

interface Cita {
  id_citas: number;
  id_mascota: number;
  id_veterinario: number;
  nombre_mascota: string;
}

interface Props {
  open: boolean;
  onClose: () => void;
  idVeterinario: number;
}

const FinalizarCitaYRegistrarHistorial: React.FC<Props> = ({ open, onClose, idVeterinario }) => {
  const [citas, setCitas] = useState<Cita[]>([]);
  const [citaSeleccionada, setCitaSeleccionada] = useState<Cita | null>(null);
  const [diagnostico, setDiagnostico] = useState("");
  const [tratamiento, setTratamiento] = useState("");
  const [fechaConsulta, setFechaConsulta] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (open) {
      setDiagnostico("");
      setTratamiento("");
      setFechaConsulta("");
      setCitaSeleccionada(null);
      fetchCitas();
    }
  }, [open, idVeterinario]);

  const fetchCitas = async () => {
    setLoading(true);
    try {
      const response = await obtenerCitasPorVeterinario(idVeterinario);
      setCitas(Array.isArray(response) ? response : []);
    } catch (error) {
      setCitas([]);
      console.error("Error al cargar citas", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async () => {
    if (!citaSeleccionada || !fechaConsulta) return;
    setLoading(true);
    try {
      await registrarHistorial({
        id_mascota: citaSeleccionada.id_mascota,
        id_veterinario: citaSeleccionada.id_veterinario,
        id_citas: citaSeleccionada.id_citas,
        fecha_consulta: fechaConsulta,
        diagnostico,
        tratamiento,
      });

      await finalizarCita(citaSeleccionada.id_citas, { fecha_fin: fechaConsulta });
      onClose();
    } catch (error) {
      console.error("Error al finalizar cita o registrar historial", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>
        <Typography variant="h6" fontWeight="bold">
          Finalizar Cita y Registrar Historia Clínica
        </Typography>
      </DialogTitle>

      <DialogContent dividers>
        <Stack spacing={3}>
          <FormControl fullWidth required>
            <InputLabel id="cita-select-label">Selecciona una cita</InputLabel>
            <Select
              labelId="cita-select-label"
              value={citaSeleccionada?.id_citas || ""}
              onChange={(e) => {
                const cita = citas.find((c) => c.id_citas === Number(e.target.value));
                setCitaSeleccionada(cita || null);
              }}
              label="Selecciona una cita"
              disabled={loading}
            >
              {citas.map((cita) => (
                <MenuItem key={cita.id_citas} value={cita.id_citas}>
                  {`Mascota: ${cita.nombre_mascota} (ID Cita: ${cita.id_citas})`}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <TextField
            label="Fecha de Consulta"
            type="date"
            fullWidth
            required
            InputLabelProps={{ shrink: true }}
            value={fechaConsulta}
            onChange={(e) => setFechaConsulta(e.target.value)}
            error={!fechaConsulta}
            helperText={!fechaConsulta ? "Este campo es obligatorio" : ""}
            disabled={loading}
          />

          <Box sx={{ border: "1px solid #e0e0e0", borderRadius: 2, p: 2, backgroundColor: "#f9f9f9" }}>
            <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
              Diagnóstico
            </Typography>
            <TextField
              placeholder="Describe el diagnóstico del paciente"
              multiline
              rows={4}
              fullWidth
              value={diagnostico}
              onChange={(e) => setDiagnostico(e.target.value)}
              variant="outlined"
              disabled={loading}
            />
          </Box>

          <Box sx={{ border: "1px solid #e0e0e0", borderRadius: 2, p: 2, backgroundColor: "#f9f9f9" }}>
            <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
              Tratamiento
            </Typography>
            <TextField
              placeholder="Describe el tratamiento recomendado"
              multiline
              rows={4}
              fullWidth
              value={tratamiento}
              onChange={(e) => setTratamiento(e.target.value)}
              variant="outlined"
              disabled={loading}
            />
          </Box>
        </Stack>
      </DialogContent>

      <DialogActions sx={{ px: 3, pb: 2 }}>
        <Button onClick={onClose} color="error" variant="outlined" disabled={loading}>
          Cancelar
        </Button>
        <Button
          onClick={handleSubmit}
          variant="contained"
          color="primary"
          disabled={!fechaConsulta || !citaSeleccionada || loading}
        >
          {loading ? "Guardando..." : "Guardar y Finalizar"}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default FinalizarCitaYRegistrarHistorial;
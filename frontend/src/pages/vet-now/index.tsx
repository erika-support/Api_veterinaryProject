import { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Grid,
  Button,
} from "@mui/material";
import AppointmentScheduler from "../../components/scheduling";
import PetManager from "../../components/petManager";
import PetHistoryUser from '../../components/PetHistoryUser';
import { getMascotasByUsuario } from '../../services/mascotasservice';
import Appointments from "../../components/Appointments"; 

interface Pet {
  id_mascota: number;
  nombre: string;
  id_especie: number;
  id_raza: number;
  id_usuario: number;
}

const UserView = () => {
  const [pets, setPets] = useState<Pet[]>([]);
  const [openAppointments, setOpenAppointments] = useState(false);

  // Obtiene el id del usuario logueado desde el token JWT (más robusto)
  let idUsuario: number | null = null;
  try {
    const token = localStorage.getItem("token");
    if (token) {
      const payload = JSON.parse(atob(token.split(".")[1]));
      idUsuario = payload.id_usuario || null;
    }
  } catch {
    idUsuario = null;
  }
  // Si no está en el token, usa localStorage legacy, o fallback a 1
  if (!idUsuario) idUsuario = Number(localStorage.getItem("idUsuario")) || 1;

  useEffect(() => {
    if (idUsuario) {
      getMascotasByUsuario(idUsuario)
        .then(setPets)
        .catch(console.error);
    }
  }, [idUsuario]);

  return (
    <Box
      p={4}
      sx={{
        backgroundColor: "#D0F0C0",
        minHeight: "50vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <Typography
        variant="h4"
        gutterBottom
        sx={{
          fontWeight: "bold",
          color: "#2E8B57",
          textAlign: "left",
          width: "100%",
        }}
      >
        ¡Bienvenido! Aquí puedes agendar citas para tus mascotas.💚
      </Typography>

      <Grid container spacing={6} alignItems="stretch" justifyContent="center">
        <Grid item xs={12} md={6}>
          <PetManager pets={pets} setPets={setPets} />
        </Grid>
        <Grid item xs={12} md={6}>
          {/* Quita idHorario, solo pasa props requeridos */}
          <AppointmentScheduler pets={pets} idVeterinario={2} />
          <Button
            variant="outlined"
            color="primary"
            sx={{ mt: 3 }}
            onClick={() => setOpenAppointments(true)}
            fullWidth
          >
            Ver mis citas agendadas
          </Button>
        </Grid>
      </Grid>

      <Box mt={4} width="100%">
        <PetHistoryUser mascotas={pets} />
      </Box>

      {/* Modal de citas agendadas */}
      <Appointments
        open={openAppointments}
        onClose={() => setOpenAppointments(false)}
        tipoUsuario="usuario"
        idUsuario={idUsuario}
      />
    </Box>
  );
};

export default UserView;
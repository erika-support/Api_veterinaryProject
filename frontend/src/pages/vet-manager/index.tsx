import { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Button,
  Card,
  CardContent,
  CardMedia,
  Grid,
  Divider,
  CircularProgress,
} from "@mui/material";
import agendadr from "../../assets/agendadr.jpg";
import DefinirDisponibilidad from "../../components/disponibility";
import PetHistory from "../../components/PetHistory";
import Appointments from "../../components/Appointments";
import FinalizarCitaYRegistrarHistorial from "../../components/FinalizarCitaYRegistrarHistorial";
import { getTodasLasMascotas } from "../../services/mascotasservice";
import { useLocation } from "react-router-dom";
import { getVeterinarioPorId } from "../../services/veterinarioService";

const DoctorView = () => {
  const location = useLocation();
  const [openAppointments, setOpenAppointments] = useState(false);
  const [openFinalizar, setOpenFinalizar] = useState(false);
  const [mascotas, setMascotas] = useState<any[]>([]);
  const [nombreVeterinario, setNombreVeterinario] = useState<string | null>(
    null
  );
  const [loadingMascotas, setLoadingMascotas] = useState(true);
  const [errorMascotas, setErrorMascotas] = useState<string | null>(null);

  // Obtener id del veterinario de forma robusta (igual que UserView para usuarios)
  let idVeterinario: number | null = null;
  try {
    const token = localStorage.getItem("token");
    if (token) {
      const payload = JSON.parse(atob(token.split(".")[1]));
      idVeterinario = payload.id_veterinario || null;
    }
  } catch {
    idVeterinario = null;
  }
  // Si no está en el token, intenta location.state (por navegación)
  if (!idVeterinario && location.state?.idVeterinario) {
    idVeterinario = location.state.idVeterinario;
  }
  // Si no está, usa localStorage legacy o fallback
  if (!idVeterinario)
    idVeterinario = Number(localStorage.getItem("idVeterinario")) || null;

  useEffect(() => {
    setLoadingMascotas(true);
    setErrorMascotas(null);
    getTodasLasMascotas()
      .then((data) => {
        setMascotas(data);
        setLoadingMascotas(false);
      })
      .catch((err) => {
        setErrorMascotas("Error al cargar mascotas");
        setLoadingMascotas(false);
        console.error(err);
      });
  }, []);

  //useEffect para cambiar apellido de bienvenida del veterinario
  useEffect(() => {
    if (idVeterinario) {
      getVeterinarioPorId(idVeterinario)
        .then((data) => {
          const nombreCompleto = `Dr. ${data.apellido}`;
          setNombreVeterinario(nombreCompleto);
        })
        .catch((err) => {
          console.error("Error al obtener nombre del veterinario", err);
        });
    }
  }, [idVeterinario]);

  // Mostrar loading global si no tenemos idVeterinario aún
  if (
    !idVeterinario ||
    typeof idVeterinario !== "number" ||
    idVeterinario <= 0
  ) {
    return (
      <Box
        p={4}
        sx={{
          backgroundColor: "#F5FFF5",
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <CircularProgress />
        <Typography sx={{ ml: 2, mt: 2 }}>
          Cargando información de veterinario...
        </Typography>
        <Typography sx={{ mt: 2 }} color="text.secondary">
          Origen de id: <b>token/location/localStorage</b>
        </Typography>
      </Box>
    );
  }

  return (
    <Box
      p={4}
      sx={{
        backgroundColor: "#F5FFF5",
        minHeight: "100vh",
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
        {nombreVeterinario
          ? `Bienvenido, ${nombreVeterinario} 👨🏻‍⚕🩺`
          : "Bienvenido 👨🏻‍⚕🩺"}
      </Typography>

      <Divider sx={{ width: "100%", mb: 4 }} />

      <Grid container spacing={4} justifyContent="center">
        <Grid item xs={12} md={6}>
          {loadingMascotas ? (
            <Box
              display="flex"
              justifyContent="center"
              alignItems="center"
              minHeight={160}
            >
              <CircularProgress size={32} />
            </Box>
          ) : errorMascotas ? (
            <Typography color="error">{errorMascotas}</Typography>
          ) : (
            <PetHistory mascotas={mascotas} />
          )}
        </Grid>

        <Grid item xs={12} md={6}>
          <DefinirDisponibilidad idVeterinario={idVeterinario} />
        </Grid>

        <Grid item xs={12} md={6}>
          <Card
            sx={{
              height: "100%",
              display: "flex",
              flexDirection: "column",
              boxShadow: 4,
              borderRadius: 2,
            }}
          >
            <CardContent sx={{ flexGrow: 1 }}>
              <Typography
                variant="h6"
                sx={{ fontWeight: "bold", mb: 2 }}
              ></Typography>
              <CardMedia
                component="img"
                image={agendadr}
                alt="Citas"
                sx={{
                  width: "100%",
                  height: 220,
                  objectFit: "cover",
                  borderRadius: 2,
                  mb: 2,
                }}
              />
              <Button
                fullWidth
                variant="contained"
                color="primary"
                onClick={() => setOpenAppointments(true)}
              >
                Ver Citas Agendadas
              </Button>
              <Button
                fullWidth
                variant="outlined"
                color="error"
                sx={{ mt: 2 }}
                onClick={() => setOpenFinalizar(true)}
              >
                Finalizar Cita y Registrar Historial
              </Button>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Modal de citas agendadas */}
      <Appointments
        open={openAppointments}
        onClose={() => setOpenAppointments(false)}
        tipoUsuario="veterinario"
        idUsuario={idVeterinario}
      />

      {openFinalizar && idVeterinario && (
        <FinalizarCitaYRegistrarHistorial
          open={openFinalizar}
          onClose={() => setOpenFinalizar(false)}
          idVeterinario={idVeterinario}
        />
      )}
    </Box>
  );
};

export default DoctorView;

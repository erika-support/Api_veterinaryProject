import { useState } from "react";
import {
  Box,
  Typography,
  Button,
  Card,
  CardContent,
  CardMedia,
  Dialog,
  DialogTitle,
  DialogContent,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Grid,
} from "@mui/material";
import medicos from "../../assets/medicos.jpeg";
import agendadr from "../../assets/agendadr.jpg";
import ElegirHorario from "../scheduling";
import DefinirDisponibilidad from "../scheduling";

const petHistory = [
  {
    name: "Firulais",
    species: "Perro",
    owner: "Juan Pérez",
    lastVisit: "2025-04-20",
  },
  {
    name: "Agata",
    species: "Gato",
    owner: "Laura Gómez",
    lastVisit: "2025-04-18",
  },
  {
    name: "Rocky",
    species: "Perro",
    owner: "Carlos Díaz",
    lastVisit: "2025-04-15",
  },
];

const appointments = [
  {
    pet: "Firulais",
    date: "2025-05-07",
    time: "10:00 AM",
    owner: "Juan Pérez",
  },
  { pet: "Misu", date: "2025-05-08", time: "02:30 PM", owner: "Laura Gómez" },
];

const DoctorView = () => {
  const [openAppointments, setOpenAppointments] = useState(false);

  return (
    <Box p={4} sx={{ backgroundColor: "#D0F0C0", minHeight: "50vh" }}>
      <Typography variant="h4" gutterBottom>
        Bienvenido, Dr. Ramírez 👨🏻‍⚕🩺
      </Typography>

      <Grid container spacing={6} alignItems="stretch">
        {/* Historial de Mascotas */}
        <Grid item xs={12} md={6}>
          <Card
            sx={{
              height: "100%",
              display: "flex",
              flexDirection: "column",
              boxShadow: 3,
            }}
          >
            <CardMedia
              component="img"
              height="220"
              image={medicos}
              alt="Veterinario"
            />
            <CardContent sx={{ flexGrow: 1, pb: 4 }}>
              <Typography variant="h6" sx={{ fontWeight: "bold", mb: 2 }}>
                Historial de Mascotas
              </Typography>

              <Table size="small">
                <TableHead>
                  <TableRow>
                    <TableCell>Mascota</TableCell>
                    <TableCell>Especie</TableCell>
                    <TableCell>Dueño</TableCell>
                    <TableCell>Última Visita</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {petHistory.map((pet, index) => (
                    <TableRow key={index}>
                      <TableCell>{pet.name}</TableCell>
                      <TableCell>{pet.species}</TableCell>
                      <TableCell>{pet.owner}</TableCell>
                      <TableCell>{pet.lastVisit}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </Grid>
        <ElegirHorario />
        <DefinirDisponibilidad />
        {/* Agenda de Citas */}
        <Grid item xs={12} md={6}>
          <Card
            sx={{
              height: "100%",
              display: "flex",
              flexDirection: "column",
              boxShadow: 3,
            }}
          >
            <CardContent sx={{ flexGrow: 1 }}>
              <Typography variant="h6" sx={{ fontWeight: "bold" }} gutterBottom>
                ¿Deseas ver las próximas citas?
              </Typography>

              <CardMedia
                component="img"
                image={agendadr}
                alt="Citas"
                sx={{
                  width: "100%",
                  height: 250,
                  objectFit: "cover",
                  borderRadius: "12px",
                  mb: 2,
                }}
              />

              <Button
                fullWidth
                variant="contained"
                onClick={() => setOpenAppointments(true)}
              >
                Ver Citas Agendadas
              </Button>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Modal para las citas */}
      <Dialog
        open={openAppointments}
        onClose={() => setOpenAppointments(false)}
        fullWidth
      >
        <DialogTitle>Citas Agendadas</DialogTitle>
        <DialogContent>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Mascota</TableCell>
                <TableCell>Fecha</TableCell>
                <TableCell>Hora</TableCell>
                <TableCell>Dueño</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {appointments.map((appt, index) => (
                <TableRow key={index}>
                  <TableCell>{appt.pet}</TableCell>
                  <TableCell>{appt.date}</TableCell>
                  <TableCell>{appt.time}</TableCell>
                  <TableCell>{appt.owner}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </DialogContent>
      </Dialog>
    </Box>
  );
};

export default DoctorView;

import React, { useState } from "react";
import {
  Box,
  Typography,
  TextField,
  Button,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  List,
  ListItem,
  ListItemText,
  Divider,
} from "@mui/material";
import { Pet } from "./s"; // Asegúrate de importar la interfaz Pet

interface Appointment {
  petName: string;
  date: string;
  time: string;
}

interface AppointmentSchedulerProps {
  pets: Pet[];
}

const AppointmentScheduler: React.FC<AppointmentSchedulerProps> = ({ pets }) => {
  const [selectedPet, setSelectedPet] = useState<string>("");
  const [date, setDate] = useState<string>("");
  const [time, setTime] = useState<string>("");
  const [appointments, setAppointments] = useState<Appointment[]>([]);

  const handleScheduleAppointment = () => {
    if (selectedPet && date && time) {
      setAppointments([...appointments, { petName: selectedPet, date, time }]);
      setSelectedPet("");
      setDate("");
      setTime("");
    }
  };

  return (
    <Box sx={{ p: 3, maxWidth: 600, mx: "auto", backgroundColor: "#f9f9f9", borderRadius: 2 }}>
      <Typography variant="h4" gutterBottom>
        Agendar Cita
      </Typography>

      <Box sx={{ mb: 3 }}>
        <FormControl fullWidth sx={{ mb: 2 }}>
          <InputLabel>Mascota</InputLabel>
          <Select
            value={selectedPet}
            onChange={(e) => setSelectedPet(e.target.value as string)}
            label="Mascota"
          >
            {pets.map((pet, index) => (
              <MenuItem key={index} value={pet.name}>
                {pet.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <TextField
          label="Fecha"
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          fullWidth
          sx={{ mb: 2 }}
          InputLabelProps={{
            shrink: true,
          }}
        />
        <TextField
          label="Hora"
          type="time"
          value={time}
          onChange={(e) => setTime(e.target.value)}
          fullWidth
          sx={{ mb: 2 }}
          InputLabelProps={{
            shrink: true,
          }}
        />
        <Button variant="contained" color="primary" onClick={handleScheduleAppointment} fullWidth>
          Confirmar Cita
        </Button>
      </Box>

      <Divider sx={{ my: 3 }} />

      <Typography variant="h5" gutterBottom>
        Citas Programadas
      </Typography>
      <List>
        {appointments.map((appointment, index) => (
          <ListItem key={index}>
            <ListItemText
              primary={`${appointment.petName} - ${appointment.date} a las ${appointment.time}`}
            />
          </ListItem>
        ))}
      </List>
    </Box>
  );
};

export default AppointmentScheduler;

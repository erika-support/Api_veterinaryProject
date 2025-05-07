//1) cod Anderson
import React from "react";

//import React, { useState, memo } from "react";
import {
  Box,
  Typography,
} from "@mui/material";
import AppointmentScheduler from "../scheduling";
import PetManager from "../pet-manager";
import Grid from '@mui/material/Grid';



interface Pet {
  name: string;
  species: string;
  owner: string;
  lastVisit: string;
}

interface UserViewProps {
  pets: Pet[];
  setPets: React.Dispatch<React.SetStateAction<Pet[]>>;
}

const UserView: React.FC<UserViewProps> = ({ pets, setPets }) => {
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
          <AppointmentScheduler pets={pets} />
        </Grid>
      </Grid>
    </Box>
  );
};

export default UserView;

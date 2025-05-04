import React from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Box,
  Tabs,
  Tab,
} from "@mui/material";
import PetsIcon from "@mui/icons-material/Pets";
import InstagramIcon from "@mui/icons-material/Instagram";
import FacebookIcon from "@mui/icons-material/Facebook";
import { Link } from "react-router-dom"; // Asegúrate de tener react-router-dom instalado

const Layout = ({ children }: { children: React.ReactNode }) => {
  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <div>
      <AppBar position="static" sx={{ backgroundColor: "#4caf50" }}>
        <Toolbar>
          <IconButton edge="start" color="inherit" aria-label="logo">
            <PetsIcon />
          </IconButton>
          <Typography variant="h6"> Clínica Veterinaria </Typography>
          <Box sx={{ flexGrow: 1 }} />
          <Tabs
            value={value}
            onChange={handleChange}
            textColor="inherit"
            indicatorColor="primary"
          >
            <Tab label="Inicio" component={Link} to="/" />
            <Tab label="Login" component={Link} to="/login" />
            <Tab label="Registro" component={Link} to="/register" />
            <Tab label="Usuarios" component={Link} to="/users" />
          </Tabs>
        </Toolbar>
      </AppBar>

      <Box component="main" sx={{ my: 4 }}>
        {children}
      </Box>

      {/* <Box
        component="footer"
        sx={{
          p: 2,
          backgroundColor: "#AEDFF7",
          color: "#333",
          textAlign: "center",
        }}
      >
        <Typography variant="body2">
          kkkkkkkkk Todos los derechos reservados :/ kkkkkkkkkk
        </Typography>
      </Box>
    </div>
  );
}; */}

      <Box
        component="footer"
        sx={{
          p: 2,
          backgroundColor: "#AEDFF7",
          color: "#333",
          textAlign: "center",
        }}
      >
        <Box sx={{ display: "flex", justifyContent: "center", gap: 2, mb: 1 }}>
          <IconButton
            component="a"
            href="https://instagram.com"
            target="_blank"
            rel="noopener"
            color="inherit"
          >
            <InstagramIcon />
          </IconButton>
          <IconButton
            component="a"
            href="https://facebook.com"
            target="_blank"
            rel="noopener"
            color="inherit"
          >
            <FacebookIcon />
          </IconButton>
        </Box>
        <Typography variant="body2">
          ¿Quieres saber más sobre nuestra Clínica Veterinaria?
        </Typography>
      </Box>
    </div>
  );
};

export default Layout;

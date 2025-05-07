import React, { memo } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Box,
  Tabs,
  Tab,
  Divider,
  Button,
} from "@mui/material";
import PetsIcon from "@mui/icons-material/Pets";
import InstagramIcon from "@mui/icons-material/Instagram";
import FacebookIcon from "@mui/icons-material/Facebook";
import { Link, useLocation, useNavigate } from "react-router-dom";

interface LayoutProps {
  children: React.ReactNode;
  userType: string;
  setUserType: React.Dispatch<React.SetStateAction<string>>;
}

const Layout: React.FC<LayoutProps> = ({ children, userType, setUserType }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const [value, setValue] = React.useState(location.pathname);

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };

  const handleLogout = () => {
    localStorage.removeItem("user");
    setUserType("guest");
    navigate("/login");
  };

  const tabData = {
    registeredUser: [
      { label: "Inicio", to: "/clínica-veterinaria" },
      { label: "VetNow", to: "/vet-now" },
      { label: "Cuenta", to: "/account" },
    ],
    veterinarian: [
      { label: "Inicio", to: "/clínica-veterinaria" },
      { label: "VetManager", to: "/vet-manager" },
      { label: "Cuenta", to: "/account" },
    ],
    default: [
      { label: "Inicio", to: "/clínica-veterinaria" },
      { label: "Login", to: "/login" },
      { label: "Registro", to: "/register" },
    ],
  };

  const renderTabs = () => {
    return (tabData[userType] || tabData.default).map((tab, index) => (
      <Tab
        key={index}
        label={tab.label}
        component={Link}
        to={tab.to}
        value={tab.to}
      />
    ));
  };

  return (
    <div>
      <AppBar position="static" sx={{ backgroundColor: "#4caf50" }}>
        <Toolbar>
          <IconButton edge="start" color="inherit" aria-label="logo">
            <PetsIcon />
          </IconButton>
          <Typography variant="h6">Clínica Veterinaria</Typography>
          <Box sx={{ flexGrow: 1 }} />
          <Tabs
            value={value}
            onChange={handleChange}
            textColor="inherit"
            indicatorColor="primary"
            aria-label="navigation tabs"
          >
            {renderTabs()}
          </Tabs>
          {userType !== "guest" && (
            <Button color="inherit" onClick={handleLogout}>
              Cerrar Sesión
            </Button>
          )}
        </Toolbar>
      </AppBar>

      <Box component="main" sx={{ my: 4 }}>
        {children}
      </Box>

      <Box
        component="footer"
        sx={{
          p: 2,
          backgroundColor: "#AEDFF7",
          color: "#333",
          textAlign: "center",
          mt: 4,
        }}
      >
        <Box sx={{ display: "flex", justifyContent: "center", gap: 2, mb: 1 }}>
          <IconButton
            component="a"
            href="https://instagram.com"
            target="_blank"
            rel="noopener"
            color="inherit"
            aria-label="Instagram"
          >
            <InstagramIcon />
          </IconButton>
          <IconButton
            component="a"
            href="https://facebook.com"
            target="_blank"
            rel="noopener"
            color="inherit"
            aria-label="Facebook"
          >
            <FacebookIcon />
          </IconButton>
        </Box>

        <Typography variant="body2" sx={{ mb: 1 }}>
          ¿Quieres saber más sobre nuestra Clínica Veterinaria?
        </Typography>

        <Divider
          sx={{ my: 1, width: "60%", mx: "auto", backgroundColor: "#333" }}
        />

        <Box
          component="ul"
          sx={{
            listStyle: "none",
            padding: 0,
            margin: 0,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 0.5,
          }}
        >
          {[
            "Servicio Estético",
            "Consultas virtuales",
            "Recuperaciones",
            "Citas virtuales",
            "Accesorios",
          ].map((item, index) => (
            <Box
              component="li"
              key={index}
              sx={{ display: "flex", alignItems: "center", gap: 1 }}
            >
              <PetsIcon sx={{ fontSize: 18, color: "#333" }} />
              <Typography variant="body2">{item}</Typography>
            </Box>
          ))}
        </Box>
      </Box>
    </div>
  );
};

export default memo(Layout);

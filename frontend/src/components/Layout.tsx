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
  Tooltip,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import PetsIcon from "@mui/icons-material/Pets";
import InstagramIcon from "@mui/icons-material/Instagram";
import FacebookIcon from "@mui/icons-material/Facebook";
import MenuIcon from "@mui/icons-material/Menu";
import { Link, useLocation, useNavigate } from "react-router-dom";

interface LayoutProps {
  children: React.ReactNode;
  userType: string;
  setUserType: React.Dispatch<React.SetStateAction<string>>;
}

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
  guest: [
    { label: "Inicio", to: "/clínica-veterinaria" },
    { label: "Login", to: "/login" },
    { label: "Registro", to: "/register" },
  ],
};

const Layout: React.FC<LayoutProps> = ({ children, userType, setUserType }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const tabs = tabData[userType] || tabData.guest;
  const validTabs = tabs.map(tab => tab.to);

  // Solo selecciona el tab si la ruta está en las tabs; si no, ninguno seleccionado
  const tabValue = validTabs.includes(location.pathname) ? location.pathname : false;

  const handleChange = (_: React.SyntheticEvent, newValue: string) => {
    if (validTabs.includes(newValue)) {
      navigate(newValue);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    setUserType("guest");
    navigate("/login");
  };

  return (
    <div>
      <AppBar position="static" sx={{ backgroundColor: "#4caf50" }}>
        <Toolbar>
          <IconButton edge="start" color="inherit" aria-label="logo">
            <PetsIcon />
          </IconButton>
          <Typography
            variant="h6"
            sx={{ mr: 2, fontWeight: "bold", letterSpacing: 1 }}
            component={Link}
            to="/clínica-veterinaria"
            color="inherit"
            style={{ textDecoration: "none" }}
          >
            Clínica Veterinaria
          </Typography>
          <Box sx={{ flexGrow: 1 }} />
          {!isMobile ? (
            <Tabs
              value={tabValue}
              onChange={handleChange}
              textColor="inherit"
              indicatorColor="secondary"
              aria-label="navigation tabs"
              sx={{ minHeight: 48 }}
            >
              {tabs.map((tab, index) => (
                <Tab
                  key={index}
                  label={tab.label}
                  value={tab.to}
                  sx={{ minWidth: 110, fontWeight: "bold" }}
                />
              ))}
            </Tabs>
          ) : (
            <Tooltip title="Navegación">
              <IconButton
                color="inherit"
                onClick={() => {
                  alert("Navegación móvil próximamente");
                }}
              >
                <MenuIcon />
              </IconButton>
            </Tooltip>
          )}
          {userType !== "guest" && (
            <Button color="inherit" onClick={handleLogout} sx={{ ml: 2 }}>
              Cerrar Sesión
            </Button>
          )}
        </Toolbar>
      </AppBar>

      <Box component="main" sx={{ my: 4, minHeight: "60vh" }}>
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
          borderTop: "1px solid #b2ebf2",
        }}
      >
        <Box sx={{ display: "flex", justifyContent: "center", gap: 2, mb: 1 }}>
          <Tooltip title="Instagram">
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
          </Tooltip>
          <Tooltip title="Facebook">
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
          </Tooltip>
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
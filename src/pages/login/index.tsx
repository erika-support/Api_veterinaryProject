import { Stack, TextField, SxProps, Theme, Button, Box } from "@mui/material";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import petIcon from "../../assets/casa-de-mascotas.png";
import huella from "../../assets/huella.png";

const stylesInput: SxProps<Theme> = {
  "& .MuiOutlinedInput-root": {
    "& fieldset": {
      borderColor: "#333",
    },
    "&:hover fieldset": {
      borderColor: "#333",
    },
    "&.Mui-focused fieldset": {
      borderColor: "#333",
    },
  },
  "& .MuiInputLabel-root": {
    color: "#333",
  },
  "& .MuiInputLabel-root.Mui-focused": {
    color: "#333",
  },
  "& .MuiInputBase-input": {
    color: "#333",
  },
};

interface LoginProps {
  setUserType: React.Dispatch<React.SetStateAction<string>>;
}

const Login: React.FC<LoginProps> = ({ setUserType }) => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const { email, password } = formData;

    // Simulación de autenticación
    if (email === "veterinario@gmail.com" && password === "admin123") {
      localStorage.setItem("user", JSON.stringify({ role: "admin" }));
      setUserType("veterinarian");
      navigate("/vet-manager");
    } else if (email === "usuario@gmail.com" && password === "user123") {
      localStorage.setItem("user", JSON.stringify({ role: "user" }));
      setUserType("registeredUser");
      navigate("/vet-now");
    } else {
      alert("Credenciales inválidas");
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, name } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  useEffect(() => {
    const userJson = localStorage.getItem("user");
    if (userJson !== null) {
      const user = JSON.parse(userJson);
      if (user.role === "admin") {
        setUserType("veterinarian");
        navigate("/vet-manager");
      } else if (user.role === "user") {
        setUserType("registeredUser");
        navigate("/vet-now");
      }
    }
  }, [navigate, setUserType]);

  // Para pruebas, borra sesión desde login
  const clearSession = () => {
    localStorage.removeItem("user");
    setUserType("guest");
    window.location.reload();
  };

  return (
    <Box
      sx={{
        backgroundImage: `url(${huella})`,
        backgroundRepeat: "repeat",
        backgroundSize: "100px",
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Stack
        bgcolor="#D0F0C0"
        gap={2}
        p={5}
        borderRadius="16px"
        component="form"
        onSubmit={handleSubmit}
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          maxWidth: 400,
          width: "100%",
          margin: "0 auto",
        }}
      >
        <img
          src={petIcon}
          alt="Pet Icon"
          style={{ width: "100px", marginBottom: "16px" }}
        />

        <TextField
          label="Email"
          variant="outlined"
          sx={stylesInput}
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
        />
        <TextField
          label="Password"
          variant="outlined"
          sx={stylesInput}
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
        />

        <Button
          component={RouterLink}
          to="/register"
          variant="contained"
          sx={{
            backgroundColor: "#AEDFF7",
            color: "#333",
            "&:hover": {
              backgroundColor: "#9CD6F4",
            },
          }}
        >
          ¿No tienes cuenta? Regístrate.
        </Button>

        <Button
          variant="contained"
          type="submit"
          sx={{
            backgroundColor: "#4CAF50",
            color: "#333",
            "&:hover": {
              backgroundColor: "#45A049",
            },
          }}
        >
          Sign In
        </Button>

        {/*PARA PRUEBAS: botón borrar sesión */}
        <Button
          variant="outlined"
          color="secondary"
          onClick={clearSession}
          sx={{ mt: 2 }}
        >
          Borrar sesión
        </Button>
      </Stack>
    </Box>
  );
};

export default Login;

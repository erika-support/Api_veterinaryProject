import {
  Typography,
  Stack,
  TextField,
  SxProps,
  Theme,
  Button,
  Box,
} from "@mui/material";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import huella from "../../assets/huella.png";
import petIcon from "../../assets/casa-de-mascotas.png";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { register } from "../../services/authService"; // Usa tu nuevo service adaptado

interface RegisterProps {
  setUserType: (type: string) => void;
}

const stylesInput: SxProps<Theme> = {
  "& .MuiOutlinedInput-root": {
    backgroundColor: "#ffffffcc",
    borderRadius: "8px",
    boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
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

const Register: React.FC<RegisterProps> = ({ setUserType }) => {
  const [formData, setFormData] = useState({
    name: "",
    lastname: "",
    document: "",
    email: "",
    password: "",
    confirmPassword: "",
    secretCode: "",
  });

  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      setError("Las contraseñas no coinciden");
      return;
    }

    // Usa la clave secreta para determinar el id_rol
    const id_rol = formData.secretCode === "1010vetAdmin" ? 2 : 1; // 2 = veterinario, 1 = dueño

    try {
      await register({
        nombre: formData.name,
        apellido: formData.lastname,
        documento: formData.document,
        correo: formData.email,
        password: formData.password,
        id_rol,
      });

      setUserType(id_rol === 2 ? "veterinarian" : "registeredUser");

      alert("Registro exitoso. Ahora puedes iniciar sesión.");
      navigate("/login");
    } catch (error) {
      console.error(error);
      setError("Error al registrar usuario. Verifica los datos.");
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, name } = e.target;
    const newData = {
      ...formData,
      [name]: value,
    };

    if (name === "confirmPassword" && formData.password !== value) {
      setError("Las contraseñas no coinciden");
    } else {
      setError("");
    }

    setFormData(newData);
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) navigate("/vet-now");
  }, [navigate]);

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      minHeight="100vh"
      sx={{
        position: "relative",
        background:
          "linear-gradient(135deg,rgb(11, 197, 129),rgb(156, 231, 36),rgb(220, 145, 94))",
      }}
    >
      <Box
        component="img"
        src={petIcon}
        alt="Logo con mascotas"
        sx={{
          position: "absolute",
          top: -40,
          left: "50%",
          transform: "translateX(-50%)",
          width: 80,
          height: 80,
          borderRadius: "50%",
          backgroundColor: "#fff",
          padding: "8px",
          boxShadow: 3,
        }}
      />

      <Stack
        component="form"
        onSubmit={handleSubmit}
        sx={{
          backgroundImage: `url(${huella})`,
          backgroundRepeat: "repeat",
          backgroundSize: "100px",
          bgcolor: "#fff",
          gap: 2,
          p: 5,
          borderRadius: "16px",
          width: "100%",
          maxWidth: "600px",
          boxShadow: "0 20px 40px rgba(0, 0, 0, 0.3)",
          alignItems: "center",
          mt: 5,
        }}
      >
        <Stack direction="row" gap={2}>
          <TextField
            sx={stylesInput}
            label="Name"
            name="name"
            required
            autoComplete="off"
            value={formData.name}
            onChange={handleChange}
          />
          <TextField
            sx={stylesInput}
            label="Lastname"
            name="lastname"
            required
            autoComplete="off"
            value={formData.lastname}
            onChange={handleChange}
          />
        </Stack>
        <Stack direction="row" gap={2}>
          <TextField
            sx={stylesInput}
            label="Document"
            name="document"
            required
            autoComplete="off"
            value={formData.document}
            onChange={handleChange}
          />
          <TextField
            sx={stylesInput}
            label="Email"
            name="email"
            required
            type="email"
            autoComplete="off"
            value={formData.email}
            onChange={handleChange}
          />
        </Stack>
        <Stack direction="row" gap={2}>
          <TextField
            sx={stylesInput}
            label="Password"
            name="password"
            type="password"
            required
            value={formData.password}
            onChange={handleChange}
          />
          <TextField
            sx={stylesInput}
            label="Confirm Password"
            name="confirmPassword"
            type="password"
            required
            value={formData.confirmPassword}
            onChange={handleChange}
          />
        </Stack>

        <TextField
          sx={stylesInput}
          label="Código Veterinario"
          name="secretCode"
          type="password"
          value={formData.secretCode}
          onChange={handleChange}
          autoComplete="off"
        />
        {error.length > 0 && <Typography color="error">{error}</Typography>}
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
          Registrarse
        </Button>
        <Button
          component={RouterLink}
          to="/login"
          startIcon={<ArrowBackIcon />}
          sx={{
            mt: 2,
            color: "#333",
            backgroundColor: "#E8F5E9",
            border: "2px solid #388E3C",
            fontWeight: "bold",
            borderRadius: "30px",
            textTransform: "none",
            px: 3,
            py: 1,
            fontSize: "1rem",
            "&:hover": {
              backgroundColor: "#66BB6A",
              borderColor: "#2e7d",
            },
          }}
        >
          Volver al Login
        </Button>
      </Stack>
    </Box>
  );
};

export default Register;
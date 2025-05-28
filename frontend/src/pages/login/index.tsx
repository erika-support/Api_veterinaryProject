import { Stack, TextField, SxProps, Theme, Button, Box } from "@mui/material";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { login } from "../../services/authService";
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
  setUserInfo?: (userInfo: any) => void; // opcional, para guardar info completa del usuario
}

const Login: React.FC<LoginProps> = ({ setUserType, setUserInfo }) => {
  const [formData, setFormData] = useState({
    correo: "",
    password: "",
  });

  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { correo, password } = formData;

    try {
      const { data } = await login(correo, password);
      localStorage.setItem("token", data.token);

      const payload = JSON.parse(atob(data.token.split('.')[1]));
      const role = payload.role;
      const id = payload.id || payload.userId || payload.id_veterinario || payload.id_usuario || null;

      // Guardar info de usuario si se provee el setUserInfo
      if (setUserInfo) {
        setUserInfo({ ...payload });
      }

      if (role === "vet") {
        setUserType("veterinarian");
        navigate("/vet-manager", { state: { idVeterinario: id } });
      } else if (role === "owner") {
        setUserType("registeredUser");
        navigate("/vet-now", { state: { idUsuario: id } });
      } else {
        alert("Rol no reconocido");
      }
    } catch (error) {
      alert("Credenciales inválidas o error de conexión");
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
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const payload = JSON.parse(atob(token.split('.')[1]));
        const role = payload.role;
        const id = payload.id || payload.userId || payload.id_veterinario || payload.id_usuario || null;
        if (setUserInfo) setUserInfo({ ...payload });

        if (role === "vet") {
          setUserType("veterinarian");
          navigate("/vet-manager", { state: { idVeterinario: id } });
        } else if (role === "owner") {
          setUserType("registeredUser");
          navigate("/vet-now", { state: { idUsuario: id } });
        }
      } catch (e) {
        localStorage.removeItem("token");
      }
    }
  }, [navigate, setUserType, setUserInfo]);

  const clearSession = () => {
    localStorage.removeItem("token");
    setUserType("guest");
    if (setUserInfo) setUserInfo(null);
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
          label="Correo"
          variant="outlined"
          sx={stylesInput}
          type="email"
          name="correo"
          value={formData.correo}
          onChange={handleChange}
        />
        <TextField
          label="Contraseña"
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
          Iniciar sesión
        </Button>

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
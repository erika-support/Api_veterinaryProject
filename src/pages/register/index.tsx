// import {
//   Typography,
//   Stack,
//   TextField,
//   SxProps,
//   Theme,
//   Button,
//   Link,
//   Box,
// } from "@mui/material";
// import { Link as RouterLink, useNavigate } from "react-router-dom";
// import { useState, useEffect } from "react";
// import huella from "../../assets/huella.png";

// const stylesInput: SxProps<Theme> = {
//   "& .MuiOutlinedInput-root": {
//     backgroundColor: "#ffffffcc", // blanco semi-transparente
//     borderRadius: "8px",
//     boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
//     "& fieldset": {
//       borderColor: "#333",
//     },
//     "&:hover fieldset": {
//       borderColor: "#333",
//     },
//     "&.Mui-focused fieldset": {
//       borderColor: "#333",
//     },
//   },
//   "& .MuiInputLabel-root": {
//     color: "#333",
//   },
//   "& .MuiInputLabel-root.Mui-focused": {
//     color: "#333",
//   },
//   "& .MuiInputBase-input": {
//     color: "#333",
//   },
// };

// const Register = () => {
//   const [formData, setFormData] = useState({
//     name: "",
//     lastname: "",
//     document: "",
//     email: "",
//     password: "",
//     confirmPassword: "",
//   });
//   const [error, setError] = useState("");
//   const navigate = useNavigate();

//   const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
//     e.preventDefault();
//     if (formData.password !== formData.confirmPassword) {
//       setError("Passwords do not match");
//       return;
//     }
//   };

//   const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const { value, name } = e.target;
//     const newData = {
//       ...formData,
//       [name]: value,
//     };
//     if (
//       name === "confirmPassword" &&
//       formData.password !== formData.confirmPassword
//     ) {
//       setError("Passwords do not match");
//     } else {
//       setError("");
//     }
//     setFormData(newData);
//   };

//   useEffect(() => {
//     const userJson = localStorage.getItem("user");
//     if (userJson !== null) {
//       navigate("/dashboard");
//     }
//   }, []);

//   return (
//     <Box
//       display="flex"
//       justifyContent="center"
//       alignItems="center"
//       minHeight="100vh"
//       bgcolor="#D0F0C0"
//     >
//       <Stack
//         component="form"
//         onSubmit={handleSubmit}
//         sx={{
//           backgroundImage: `url(${huella})`,
//           backgroundRepeat: "repeat",
//           backgroundSize: "100px",
//           bgcolor: "#fff",
//           gap: 2,
//           p: 5,
//           borderRadius: "16px",
//           width: "100%",
//           maxWidth: "600px",
//           boxShadow: 3,
//           alignItems: "center",
//         }}
//       >
//         <Stack direction="row" gap={2}>
//           <TextField
//             sx={stylesInput}
//             label="Name"
//             name="name"
//             required
//             value={formData.name}
//             autoComplete="off"
//             onChange={handleChange}
//           />
//           <TextField
//             sx={stylesInput}
//             label="Lastname"
//             name="lastname"
//             autoComplete="off"
//             required
//             value={formData.lastname}
//             onChange={handleChange}
//           />
//         </Stack>
//         <Stack direction="row" gap={2}>
//           <TextField
//             sx={stylesInput}
//             label="Document"
//             name="document"
//             autoComplete="off"
//             required
//             value={formData.document}
//             onChange={handleChange}
//           />
//           <TextField
//             sx={stylesInput}
//             label="Email"
//             name="email"
//             autoComplete="off"
//             type="email"
//             required
//             value={formData.email}
//             onChange={handleChange}
//           />
//         </Stack>
//         <Stack direction="row" gap={2}>
//           <TextField
//             sx={stylesInput}
//             label="Password"
//             name="password"
//             type="password"
//             required
//             value={formData.password}
//             onChange={handleChange}
//           />
//           <TextField
//             sx={stylesInput}
//             label="Confirm Password"
//             name="confirmPassword"
//             type="password"
//             required
//             value={formData.confirmPassword}
//             onChange={handleChange}
//           />
//         </Stack>
//         {error.length > 0 && <Typography color="error">{error}</Typography>}
//         <Button
//           variant="contained"
//           type="submit"
//           sx={{
//             backgroundColor: "#4CAF50",
//             color: "#333",
//             "&:hover": {
//               backgroundColor: "#45A049",
//             },
//           }}
//         >
//           Register
//         </Button>

//         <Link
//           component={RouterLink}
//           to="/login"
//           sx={{
//             mt: 2,
//             textAlign: "center",
//             width: "100%",
//             color: "#333",
//             fontWeight: "bold",
//             fontSize: "2rem",
//             textDecoration: "underline",
//             "&:hover": {
//               color: "#388E3C",
//             },
//           }}
//         >
//           Back
//         </Link>
//       </Stack>
//     </Box>
//   );
// };

// export default Register;

import {
  Typography,
  Stack,
  TextField,
  SxProps,
  Theme,
  Button,
  Link,
  Box,
} from "@mui/material";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import huella from "../../assets/huella.png";
import petIcon from "../../assets/casa-de-mascotas.png";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

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

const Register = () => {
  const [formData, setFormData] = useState({
    name: "",
    lastname: "",
    document: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      return;
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, name } = e.target;
    const newData = {
      ...formData,
      [name]: value,
    };
    if (
      name === "confirmPassword" &&
      formData.password !== formData.confirmPassword
    ) {
      setError("Passwords do not match");
    } else {
      setError("");
    }
    setFormData(newData);
  };

  useEffect(() => {
    const userJson = localStorage.getItem("user");
    if (userJson !== null) {
      navigate("/dashboard");
    }
  }, []);

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      minHeight="100vh"
      bgcolor="#D0F0C0"
      sx={{ position: "relative" }} //icono csita form.
    >
      {/* Ícono sobre el formulario */}
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
          boxShadow: 3,
          alignItems: "center",
          mt: 5, // Esto crea espacio para que no se solape con el ícono
        }}
      >
        <Stack direction="row" gap={2}>
          <TextField
            sx={stylesInput}
            label="Name"
            name="name"
            required
            value={formData.name}
            autoComplete="off"
            onChange={handleChange}
          />
          <TextField
            sx={stylesInput}
            label="Lastname"
            name="lastname"
            autoComplete="off"
            required
            value={formData.lastname}
            onChange={handleChange}
          />
        </Stack>
        <Stack direction="row" gap={2}>
          <TextField
            sx={stylesInput}
            label="Document"
            name="document"
            autoComplete="off"
            required
            value={formData.document}
            onChange={handleChange}
          />
          <TextField
            sx={stylesInput}
            label="Email"
            name="email"
            autoComplete="off"
            type="email"
            required
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
          Register
        </Button>

        <Button
          component={RouterLink}
          to="/login"
          startIcon={<ArrowBackIcon />}
          sx={{
            mt: 2,
            color: "#333",
            border: "2px solid #388E3C",
            fontWeight: "bold",
            borderRadius: "30px",
            textTransform: "none",
            px: 3,
            py: 1,
            fontSize: "1rem",
            "&:hover": {
              backgroundColor: "#E8F5E9",
              borderColor: "#2e7d",
            },
          }}
        >
          Volver al login
        </Button>
      </Stack>
    </Box>
  );
};

export default Register;

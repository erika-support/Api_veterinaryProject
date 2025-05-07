// import {
//   Stack,
//   TextField,
//   SxProps,
//   Theme,
//   Button,
//   //Link,
//   Box,
// } from "@mui/material";
// import { Link as RouterLink, useNavigate } from "react-router-dom";
// import { useState, useEffect } from "react";
// import petIcon from "../../assets/casa-de-mascotas.png";
// import huella from "../../assets/huella.png";

// const stylesInput: SxProps<Theme> = {
//   "& .MuiOutlinedInput-root": {
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

// const Login = () => {
//   const [formData, setFormData] = useState({
//     email: "fulanito@gmail.com",
//     password: "123",
//   });

//   const navigate = useNavigate();

//   //-----NO DESCOM------------
//   // const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
//   //   e.preventDefault();
//   //   navigate("/dashboard");
//   // };
//   //--------------------

//   const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
//     e.preventDefault();

//     // Simulación de autenticación
//     const { email, password } = formData;

//     // Usuario veterinario (admin)
//     if (email === "veterinario@gmail.com" && password === "admin123") {
//       localStorage.setItem("user", JSON.stringify({ role: "admin" }));
//       navigate("/veterinary-admin");
//     }
//     // Usuario normal
//     else if (email === "usuario@gmail.com" && password === "user123") {
//       localStorage.setItem("user", JSON.stringify({ role: "user" }));
//       navigate("/users");
//     }
//     // Credenciales incorrectas
//     else {
//       alert("Credenciales inválidas");
//     }
//   };

//   const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const { value, name } = e.target;
//     setFormData({
//       ...formData,
//       [name]: value,
//     });
//   };

//   //-----NO DESCOM------------
//   // useEffect(() => {
//   //   const userJson = localStorage.getItem("user");
//   //   if (userJson !== null) {
//   //     navigate("/dashboard");
//   //   }
//   // }, []);
//   //------------------------

//   useEffect(() => {
//     const userJson = localStorage.getItem("user");
//     if (userJson !== null) {
//       const user = JSON.parse(userJson);
//       if (user.role === "admin") {
//         navigate("/veterinary-admin");
//       } else if (user.role === "user") {
//         navigate("/users");
//       }
//     }
//   }, []);

//   return (
//     <Box
//       sx={{
//         backgroundImage: `url(${huella})`,
//         backgroundRepeat: "repeat",
//         backgroundSize: "100px", // ajusta tamaño de huellitas
//         minHeight: "100vh",
//         display: "flex",
//         alignItems: "center",
//         justifyContent: "center",
//       }}
//     >
//       <Stack
//         bgcolor="#D0F0C0"
//         gap={2}
//         p={5}
//         borderRadius="16px"
//         component="form"
//         onSubmit={handleSubmit}
//         sx={{
//           display: "flex",
//           flexDirection: "column",
//           justifycontent: "center",
//           alignItems: "center",
//           maxWidth: 400, //ancho del login
//           width: "100%",
//           margin: "0 auto",
//           borderRadius: "16px",
//         }}
//       >
//         <img
//           src={petIcon}
//           alt="Pet Icon"
//           style={{ width: "100px", marginBottom: "16px" }}
//         />

//         <TextField
//           label="Email"
//           variant="outlined"
//           sx={stylesInput}
//           type="email"
//           name="email"
//           value={formData.email}
//           onChange={handleChange}
//         />
//         <TextField
//           label="Password"
//           variant="outlined"
//           sx={stylesInput}
//           type="password"
//           name="password"
//           value={formData.password}
//           onChange={handleChange}
//         />

//         <Button
//           component={RouterLink}
//           to="/register"
//           variant="contained"
//           sx={{
//             backgroundColor: "#AEDFF7",
//             color: "#333",
//             "&:hover": {
//               backgroundColor: "#9CD6F4",
//             },
//           }}
//         >
//           ¿No tienes cuenta? Regístrate.
//         </Button>

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
//           Sign In
//         </Button>
//       </Stack>
//     </Box>
//   );
// };

// export default Login;

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

const Login = () => {
  const [formData, setFormData] = useState({
    email: "fulanito@gmail.com",
    password: "123",
  });

  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const { email, password } = formData;

    // Simulación de autenticación
    if (email === "veterinario@gmail.com" && password === "admin123") {
      localStorage.setItem("user", JSON.stringify({ role: "admin" }));
      navigate("/veterinary-admin");
    } else if (email === "usuario@gmail.com" && password === "user123") {
      localStorage.setItem("user", JSON.stringify({ role: "user" }));
      navigate("/users");
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
        navigate("/veterinary-admin");
      } else if (user.role === "user") {
        navigate("/users");
      }
    }
  }, [navigate]);

  // 🔽 OPCIONAL: útil para pruebas, borra sesión desde login
  const clearSession = () => {
    localStorage.removeItem("user");
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

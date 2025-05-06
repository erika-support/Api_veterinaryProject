//1)
// import React from "react";
// import { Box, Button, Grid } from "@mui/material";
// import Slider from "react-slick";
// import { useNavigate } from "react-router-dom";

// import "slick-carousel/slick/slick.css";
// import "slick-carousel/slick/slick-theme.css";

// import vacunacion from "../../assets/vacunacion.jpeg";
// import estrella from "../../assets/estrella.jpg";
// import razonesAdop from "../../assets/razonesAdop.jpeg";
// import jornadaAdop from "../../assets/jornadaAdop.jpg";
// import acuarela from "../../assets/acuarela.jpg";
// import chunky from "../../assets/chunky.png";
// import agenda from "../../assets/agenda.jpg";
// import descuento from "../../assets/descuento.jpg";

// const Users = () => {
//   const navigate = useNavigate();

//   const settings = {
//     dots: true,
//     infinite: true,
//     speed: 500,
//     slidesToShow: 3,
//     slidesToScroll: 1,
//     centerMode: true,
//     centerPadding: "0px",
//     responsive: [
//       {
//         breakpoint: 960,
//         settings: {
//           slidesToShow: 1,
//         },
//       },
//     ],
//   };

//   const images = [vacunacion, estrella, razonesAdop, jornadaAdop];

//   return (
//     <Box
//       sx={{
//         padding: 4,
//         backgroundImage: `url(${acuarela})`,
//         backgroundRepeat: "no-repeat",
//         backgroundSize: "cover",
//         backgroundPosition: "center",
//         minHeight: "100vh",
//       }}
//     >
//       <Grid
//         container
//         spacing={4}
//         alignItems="center"
//         justifyContent="center"
//         sx={{ flexWrap: "wrap" }}
//       >
//         {/* Imagen decorativa izquierda */}
//         <Grid item xs={12} md={3}>
//           <Box
//             component="img"
//             src={descuento}
//             alt="Imagen decorativa izquierda"
//             sx={{
//               width: "100%",
//               maxWidth: 400,
//               maxHeight: 500,
//               height: "auto",
//               objectFit: "cover",
//               borderRadius: 3,
//               boxShadow: 2,
//               display: { xs: "none", md: "block" },
//             }}
//           />
//         </Grid>

//         <Grid item xs={12} md={6}>
//           <Box sx={{ maxWidth: 800, margin: "0 auto" }}>
//             <Slider {...settings} dotsClass="slick-dots">
//               {images.map((src, index) => (
//                 <Box
//                   key={index}
//                   sx={{
//                     px: 1,
//                     display: "flex",
//                     justifyContent: "center",
//                   }}
//                 >
//                   <Box
//                     component="img"
//                     src={src}
//                     alt={`slide-${index}`}
//                     sx={{
//                       width: "100%",
//                       maxWidth: 250,
//                       height: 300,
//                       objectFit: "cover",
//                       borderRadius: 3,
//                       boxShadow: 2,
//                     }}
//                   />
//                 </Box>
//               ))}
//             </Slider>
//           </Box>
//         </Grid>

//         <Grid item xs={12} md={3}>
//           <Box
//             component="img"
//             src={chunky}
//             alt="Imagen decorativa derecha"
//             sx={{
//               width: "100%",
//               height: "auto",
//               objectFit: "contain",
//               borderRadius: 3,
//               boxShadow: 2,
//               display: { xs: "none", md: "block" },
//             }}
//           />
//         </Grid>
//       </Grid>

//       <Box
//         sx={{
//           mt: 6,
//           display: "flex",
//           justifyContent: "center",
//           alignItems: "center",
//           position: "relative",
//         }}
//       >
//         <Box
//           component="img"
//           src={agenda}
//           alt="Fondo agenda tu cita"
//           sx={{
//             width: "100%",
//             maxWidth: 800,
//             height: "auto",
//             objectFit: "contain",
//             borderRadius: 3,
//             boxShadow: 3,
//           }}
//         />
//         <Button
//           variant="contained"
//           onClick={() => navigate("/login")}
//           sx={{
//             position: "absolute",
//             top: "80%",
//             left: "50%",
//             transform: "translate(-50%, -50%)",
//             padding: "14px 28px",
//             fontSize: "1.2rem",
//             backgroundColor: "#ba68c8",
//             color: "#ffffff",
//             borderRadius: "12px",
//             boxShadow: "0 8px 16px rgba(0,0,0,0.3)",
//             border: "2px solid white",
//             backdropFilter: "blur(4px)",
//             transition: "all 0.3s ease",
//             "&:hover": {
//               backgroundColor: "#388e3c",
//               transform: "translate(-50%, -50%) scale(1.05)",
//             },
//           }}
//         >
//           Agenda tu cita ahora
//         </Button>
//       </Box>
//     </Box>
//   );
// };

// export default Users;

//2)---------------------------------------------------------------intento incorporan slider
import React from "react";
import { Box, Button, Grid } from "@mui/material";
import Slider from "react-slick";
import { useNavigate } from "react-router-dom";

import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import vacunacion from "../../assets/vacunacion.jpeg";
import estrella from "../../assets/estrella.jpg";
import razonesAdop from "../../assets/razonesAdop.jpeg";
import jornadaAdop from "../../assets/jornadaAdop.jpg";
import acuarela from "../../assets/acuarela.jpg";
import chunky from "../../assets/chunky.png";
import agenda from "../../assets/agenda.jpg";
import descuento from "../../assets/descuento.jpg";

const Users = () => {
  const navigate = useNavigate();

  const PrevArrow = (props: any) => {
    const { onClick } = props;
    return (
      <Box
        onClick={onClick}
        sx={{
          position: "absolute",
          left: "-30px",
          top: "50%",
          transform: "translateY(-50%)",
          zIndex: 1,
          cursor: "pointer",
          backgroundColor: "#ffffffaa",
          borderRadius: "50%",
          padding: "6px",
          boxShadow: 2,
          "&:hover": {
            backgroundColor: "#ba68c8",
            color: "white",
          },
        }}
      >
        <ArrowBackIosIcon />
      </Box>
    );
  };

  const NextArrow = (props: any) => {
    const { onClick } = props;
    return (
      <Box
        onClick={onClick}
        sx={{
          position: "absolute",
          right: "-30px",
          top: "50%",
          transform: "translateY(-50%)",
          zIndex: 1,
          cursor: "pointer",
          backgroundColor: "#ffffffaa",
          borderRadius: "50%",
          padding: "6px",
          boxShadow: 2,
          "&:hover": {
            backgroundColor: "#ba68c8",
            color: "white",
          },
        }}
      >
        <ArrowForwardIosIcon />
      </Box>
    );
  };

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    centerMode: true,
    centerPadding: "0px",
    prevArrow: <PrevArrow />,
    nextArrow: <NextArrow />,
    responsive: [
      {
        breakpoint: 960,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  const images = [
    descuento,
    vacunacion,
    estrella,
    razonesAdop,
    jornadaAdop,
    chunky,
  ];

  return (
    <Box
      sx={{
        padding: 4,
        backgroundImage: `url(${acuarela})`,
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        backgroundPosition: "center",
        minHeight: "100vh",
      }}
    >
      {/* Slider */}
      <Grid container justifyContent="center">
        <Grid item xs={12} md={10}>
          <Box sx={{ maxWidth: 1000, margin: "0 auto", position: "relative" }}>
            <Slider {...settings}>
              {images.map((src, index) => (
                <Box
                  key={index}
                  sx={{
                    px: 1,
                    display: "flex",
                    justifyContent: "center",
                  }}
                >
                  <Box
                    component="img"
                    src={src}
                    alt={`slide-${index}`}
                    sx={{
                      width: "100%",
                      maxWidth: 280,
                      height: 300,
                      objectFit: "cover",
                      borderRadius: 3,
                      border: "4px solid white",
                      boxShadow: 3,
                      transition: "transform 0.3s ease, box-shadow 0.3s ease",
                      "&:hover": {
                        transform: "scale(1.07)",
                        boxShadow: 6,
                      },
                    }}
                  />
                </Box>
              ))}
            </Slider>
          </Box>
        </Grid>
      </Grid>

      <Box
        sx={{
          mt: 6,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          position: "relative",
        }}
      >
        <Box
          component="img"
          src={agenda}
          alt="Fondo agenda tu cita"
          sx={{
            width: "100%",
            maxWidth: 800,
            height: "auto",
            objectFit: "contain",
            borderRadius: 3,
            boxShadow: 3,
          }}
        />
        <Button
          variant="contained"
          onClick={() => navigate("/login")}
          sx={{
            position: "absolute",
            top: "80%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            padding: "14px 28px",
            fontSize: "1.2rem",
            backgroundColor: "#ba68c8",
            color: "#ffffff",
            borderRadius: "12px",
            boxShadow: "0 8px 16px rgba(0,0,0,0.3)",
            border: "2px solid white",
            backdropFilter: "blur(4px)",
            transition: "all 0.3s ease",
            "&:hover": {
              backgroundColor: "#388e3c",
              transform: "translate(-50%, -50%) scale(1.05)",
            },
          }}
        >
          Agenda tu cita ahora
        </Button>
      </Box>
    </Box>
  );
};

export default Users;

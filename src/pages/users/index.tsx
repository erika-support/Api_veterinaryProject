import React from "react";
import { Grid, Button, Box } from "@mui/material";
import { useNavigate } from "react-router-dom";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import perritoDr from "../../assets/perritoDr.jpeg";
import vacunacion from "../../assets/vacunacion.jpeg";
import razonesAdop from "../../assets/razonesAdop.jpeg";
import adoptame from "../../assets/adoptame.jpeg";

// const Users = () => {
//   const navigate = useNavigate();
//   const handleButtonClick = () => {
//     navigate("/login");
//   };

//   return (
//     <Box sx={{ overflowX: "auto", display: "flex", flexWrap: "nowrap" }}>
//       <Grid container spacing={2} sx={{ display: "flex", flexWrap: "nowrap" }}>
//         <Grid item>
//           <Box
//             sx={{
//               backgroundImage: `url(${perritoDr})`,
//               backgroundSize: "cover",
//               backgroundPosition: "center",
//               height: 400,
//               width: 300,
//               display: "flex",
//               justifyContent: "center",
//               alignItems: "center",
//               flexDirection: "column",
//             }}
//           >
//             <h2>Agenda tu cita ahora</h2>
//             <Button variant="contained" onClick={handleButtonClick}>
//               {"Ir"}
//             </Button>
//           </Box>
//         </Grid>
//         <Grid item>
//           <Box
//             sx={{
//               backgroundImage: `url(${vacunacion})`,
//               backgroundSize: "cover",
//               backgroundPosition: "center",
//               height: 400,
//               width: 300,
//             }}
//           />
//         </Grid>
//         <Grid item>
//           <Box
//             sx={{
//               backgroundImage: `url(${razonesAdop})`,
//               backgroundSize: "cover",
//               backgroundPosition: "center",
//               height: 400,
//               width: 300,
//             }}
//           />
//         </Grid>
//         <Grid item>
//           <Box
//             sx={{
//               backgroundImage: `url(${adoptame})`,
//               backgroundSize: "cover",
//               backgroundPosition: "center",
//               height: 400,
//               width: 300,
//             }}
//           />
//         </Grid>
//       </Grid>
//     </Box>
//   );
// };

// export default Users;

//2)
// import Slider from "react-slick";
// import "slick-carousel/slick/slick.css";
// import "slick-carousel/slick/slick-theme.css";

// const Users = () => {
//   const settings = {
//     dots: true,
//     infinite: true,
//     speed: 500,
//     slidesToShow: 1.2,
//     centerMode: true,
//     centerPadding: "0px",
//   };

//   return (
//     <Slider {...settings}>
//       <div>
//         <img src={perritoDr} alt="Perrito Dr" />
//       </div>
//       <div>
//         <img src={vacunacion} alt="Vacunación" />
//       </div>
//       <div>
//         <img src={razonesAdop} alt="Razones de adopción" />
//       </div>
//       <div>
//         <img src={adoptame} alt="Adoptame" />
//       </div>
//     </Slider>
//   );
// };

// export default Users;

const Users = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1, // muestra parte del siguiente slide
    centerMode: true,
    centerPadding: "0px",
    focusOnSelect: true,
  };

  const images = [perritoDr, vacunacion, razonesAdop, adoptame];
  //console.log(perritoDr, vacunacion, razonesAdop, adoptame);

  return (
    <Box sx={{ padding: 4, backgroundColor: "#D0F0C0" }}>
      <Slider {...settings}>
        {images.map((src, index) => (
          <Box
            key={index}
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              overflow: "hidden",
            }}
          >
            <Box
              component="img"
              src={src}
              alt={`slide-${index}`}
              sx={{
                width: "100%",
                maxWidth: 450,
                height: 450,
                objectFit: "cover",
                borderRadius: 3,
                boxShadow: 2,
                margin: "0 5px",
              }}
            />
          </Box>
        ))}
      </Slider>
    </Box>
  );
};

export default Users;

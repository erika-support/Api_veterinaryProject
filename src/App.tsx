import React, { memo, useState } from 'react';
import { Routes, Route, Navigate } from "react-router-dom";
import Layout from "./components/Layout";
import { Login, Register, VeterinaryAdmin } from "./pages";
import ClinicaVeterinaria from "./pages/clínica-veterinaria";
import UserView from "./pages/vet-now";
import PetManager from "./pages/pet-manager";
import AppointmentScheduler from "./pages/scheduling";

const App: React.FC = () => {
  const [userType, setUserType] = useState("guest");
  const [pets, setPets] = useState([
    { name: "Firulais", type: "Perro" },
    { name: "Michi", type: "Gato" },
  ]);

  return (
    <Layout userType={userType} setUserType={setUserType}>
      <Routes>
        <Route path="/" element={<Navigate to="/clínica-veterinaria" />} />
        <Route path="/login" element={<Login setUserType={setUserType} />} />
        <Route path="/register" element={<Register setUserType={setUserType} />} />
        <Route path="/vet-manager" element={<VeterinaryAdmin />} />
        <Route path="/clínica-veterinaria" element={<ClinicaVeterinaria />} />
        <Route path="/scheduling" element={<AppointmentScheduler pets={pets} />} />
        <Route path="/vet-now" element={<UserView pets={pets} setPets={setPets} />} />
        <Route path="/pet-manager" element={<PetManager pets={pets} setPets={setPets} />} />
      </Routes>
    </Layout>
  );
};

export default memo(App);

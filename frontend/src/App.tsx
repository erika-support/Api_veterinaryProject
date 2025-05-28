import React, { memo, useState, useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Layout from "./components/Layout";
import { Login, Register, VeterinaryAdmin } from "./pages";
import ClinicaVeterinaria from "./pages/clínica-veterinaria";
import UserView from "./pages/vet-now";
import PetManager from "./components/petManager";
import AppointmentScheduler from "./components/scheduling";
import PrivateRoute from "./components/PrivateRoute";
import { getMascotasByUsuario } from "./services/mascotasservice";
import DoctorView from "./pages/vet-manager"; // Asegúrate de importar

interface Pet {
  id_mascota: number;
  nombre: string;
  id_especie: number;
  id_raza: number;
  id_usuario: number;
}

const App: React.FC = () => {
  const [userType, setUserType] = useState("guest");
  const [userId, setUserId] = useState<number | null>(null);
  const [idVeterinario, setIdVeterinario] = useState<number | null>(null);
  const [pets, setPets] = useState<Pet[]>([]);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const payload = JSON.parse(atob(token.split(".")[1]));
        setUserType(payload.role);
        setUserId(payload.id_usuario);
        if (payload.role === "vet") setIdVeterinario(payload.id_usuario); // <- Aquí
      } catch (e) {
        setUserType("guest");
        setUserId(null);
        setIdVeterinario(null);
      }
    }
  }, []);

  useEffect(() => {
    if (userId && userType === "owner") {
      getMascotasByUsuario(userId)
        .then(setPets)
        .catch(console.error);
    }
  }, [userId, userType]);

  return (
    <Layout userType={userType} setUserType={setUserType}>
      <Routes>
        <Route path="/" element={<Navigate to="/clínica-veterinaria" />} />
        <Route path="/login" element={<Login setUserType={setUserType} />} />
        <Route path="/register" element={<Register setUserType={setUserType} />} />
        <Route
          path="/vet-manager"
          element={
            <PrivateRoute allowedRoles={["vet"]}>
              <VeterinaryAdmin />
            </PrivateRoute>
          }
        />
        <Route path="/clínica-veterinaria" element={<ClinicaVeterinaria />} />
        <Route
          path="/scheduling"
          element={
            <PrivateRoute allowedRoles={["owner"]}>
              <AppointmentScheduler pets={pets} idVeterinario={idVeterinario} />
            </PrivateRoute>
          }
        />
        <Route
          path="/vet-now"
          element={
            <PrivateRoute allowedRoles={["owner"]}>
              <UserView />
            </PrivateRoute>
          }
        />
        <Route
          path="/pet-manager"
          element={
            <PrivateRoute allowedRoles={["owner"]}>
              <PetManager pets={pets} setPets={setPets} />
            </PrivateRoute>
          }
        />
        <Route
          path="/doctor-view"
          element={
            <PrivateRoute allowedRoles={["vet"]}>
              <DoctorView idVeterinario={idVeterinario} />
            </PrivateRoute>
          }
        />
      </Routes>
    </Layout>
  );
};

export default memo(App);
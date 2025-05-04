import { Routes, Route, Navigate } from "react-router-dom";
import Layout from "./components/Layout";

import {
  Login,
  Register,
  VeterinaryAdmin,
  Users,
  Scheduling,
} from "./pages";

const App = () => {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/veterinary-admin" element={<VeterinaryAdmin />} />
        <Route path="/users" element={<Users />} />
        <Route path="/scheduling" element={<Scheduling />} />
      </Routes>
    </Layout>
  );
};

export default App; 




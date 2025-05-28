import React, { useState, useEffect } from "react";
import {
  Box, Typography, TextField, Button,
  MenuItem, Select, InputLabel, FormControl
} from "@mui/material";
import { fetchPetsByUser, createPet } from "../services/mascotasservice";
import { fetchEspecies, fetchRazasByEspecie } from "../services/catalogoservice";

interface Pet {
  nombre: string;
  id_especie: number;
  id_raza: number;
}

interface Especie {
  id_especie: number;
  nombre_especie: string;
}

interface Raza {
  id_raza: number;
  nombre_raza: string;
}

interface PetManagerProps {
  userId: number;
}

const PetManager: React.FC<PetManagerProps> = ({ userId }) => {
  const [pets, setPets] = useState<Pet[]>([]);
  const [petName, setPetName] = useState("");
  const [especies, setEspecies] = useState<Especie[]>([]);
  const [razas, setRazas] = useState<Raza[]>([]);
  const [selectedEspecie, setSelectedEspecie] = useState<number | "">("");
  const [selectedRaza, setSelectedRaza] = useState<number | "">("");

  useEffect(() => {
    fetchPetsByUser(userId).then(setPets);
    fetchEspecies().then(setEspecies);
  }, [userId]);

  useEffect(() => {
    if (selectedEspecie) {
      fetchRazasByEspecie(selectedEspecie).then(setRazas);
    } else {
      setRazas([]);
    }
  }, [selectedEspecie]);

  const handleAddPet = async () => {
    if (petName && selectedEspecie && selectedRaza) {
      const newPet = {
        nombre: petName,
        id_especie: selectedEspecie,
        id_raza: selectedRaza,
        id_usuario: userId
      };
      try {
        await createPet(newPet);
        const updatedPets = await fetchPetsByUser(userId); // 👈 actualiza lista
        setPets(updatedPets);
        setPetName("");
        setSelectedEspecie("");
        setSelectedRaza("");
      } catch (error) {
        console.error("Error al registrar mascota", error);
      }
    }
  };

  return (
    <Box sx={{ p: 3, maxWidth: 600, mx: "auto", backgroundColor: "#f9f9f9", borderRadius: 2 }}>
      <Typography variant="h4" gutterBottom>Gestión de Mascotas</Typography>

      <Box sx={{ mb: 3 }}>
        <TextField
          label="Nombre de la Mascota"
          value={petName}
          onChange={(e) => setPetName(e.target.value)}
          fullWidth sx={{ mb: 2 }}
        />
        <FormControl fullWidth sx={{ mb: 2 }}>
          <InputLabel>Especie</InputLabel>
          <Select
            value={selectedEspecie}
            onChange={(e) => setSelectedEspecie(Number(e.target.value))}
            label="Especie"
          >
            {especies.map((esp) => (
              <MenuItem key={esp.id_especie} value={esp.id_especie}>
                {esp.nombre_especie}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControl fullWidth sx={{ mb: 2 }}>
          <InputLabel>Raza</InputLabel>
          <Select
            value={selectedRaza}
            onChange={(e) => setSelectedRaza(Number(e.target.value))}
            label="Raza"
            disabled={!selectedEspecie}
          >
            {razas.map((raza) => (
              <MenuItem key={raza.id_raza} value={raza.id_raza}>
                {raza.nombre_raza}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <Button variant="contained" color="primary" onClick={handleAddPet} fullWidth>
          Registrar Mascota
        </Button>
      </Box>
    </Box>
  );
};

export default PetManager;
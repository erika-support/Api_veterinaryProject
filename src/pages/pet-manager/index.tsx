import React, { useState, memo } from "react";
import {
  Box,
  Typography,
  TextField,
  Button,
  List,
  ListItem,
  ListItemText,
  Divider,
  IconButton,
} from "@mui/material";
import PetsIcon from "@mui/icons-material/Pets";
import DeleteIcon from "@mui/icons-material/Delete";

interface Pet {
  name: string;
  type: string;
}

interface PetManagerProps {
  pets: Pet[];
  setPets: React.Dispatch<React.SetStateAction<Pet[]>>;
}

const PetManager: React.FC<PetManagerProps> = memo(({ pets, setPets }) => {
  const [petName, setPetName] = useState<string>("");
  const [petType, setPetType] = useState<string>("");

  const handleAddPet = () => {
    if (petName && petType) {
      setPets([...pets, { name: petName, type: petType }]);
      setPetName("");
      setPetType("");
    }
  };

  const handleDeletePet = (index: number) => {
    setPets(pets.filter((_, i) => i !== index));
  };

  return (
    <Box sx={{ p: 3, maxWidth: 600, mx: "auto", backgroundColor: "#f9f9f9", borderRadius: 2 }}>
      <Typography variant="h4" gutterBottom>
        Gestión de Mascotas
      </Typography>

      <Box sx={{ mb: 3 }}>
        <TextField
          label="Nombre de la Mascota"
          value={petName}
          onChange={(e) => setPetName(e.target.value)}
          fullWidth
          sx={{ mb: 2 }}
        />
        <TextField
          label="Tipo de Mascota"
          value={petType}
          onChange={(e) => setPetType(e.target.value)}
          fullWidth
          sx={{ mb: 2 }}
        />
        <Button variant="contained" color="primary" onClick={handleAddPet} fullWidth>
          Registrar Mascota
        </Button>
      </Box>

      <Divider sx={{ my: 3 }} />

      <Typography variant="h5" gutterBottom>
        Mascotas Registradas
      </Typography>
      <List>
        {pets.map((pet, index) => (
          <ListItem key={index} sx={{ display: "flex", alignItems: "center" }}>
            <PetsIcon sx={{ mr: 2, color: "#4caf50" }} />
            <ListItemText primary={pet.name} secondary={pet.type} />
            <IconButton edge="end" aria-label="delete" onClick={() => handleDeletePet(index)}>
              <DeleteIcon />
            </IconButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );
});

export default PetManager;

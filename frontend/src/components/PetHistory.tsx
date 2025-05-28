import { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  CircularProgress,
} from "@mui/material";
import { getHistorialByMascota } from "../services/historialService";
import medicos from "../assets/medicos.jpeg";

interface Mascota {
  id_mascota: number;
  nombre: string;
}

interface Historial {
  id_mascota: number;
  fecha_consulta: string;
  diagnostico: string;
  tratamiento: string;
}

interface PetHistoryProps {
  mascotas: Mascota[];
}

const PetHistory: React.FC<PetHistoryProps> = ({ mascotas }) => {
  const [historial, setHistorial] = useState<Historial[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchHistorial = async () => {
      setLoading(true);
      try {
        console.log("Mascotas recibidas:", mascotas);
        const allData = await Promise.all(
          mascotas.map(async (mascota) => {
            try {
              const data = await getHistorialByMascota(mascota.id_mascota);
              console.log(`Historial de ${mascota.nombre}:`, data);
              return data.map((entry: Historial) => ({
                ...entry,
                id_mascota: mascota.id_mascota,
              }));
            } catch (err) {
              console.error(`Error al obtener historial de ${mascota.nombre}`, err);
              return [];
            }
          })
        );
        const flattened = allData.flat();
        console.log("Historial combinado:", flattened);
        setHistorial(flattened);
      } catch (error) {
        console.error("Error general al cargar historial", error);
      } finally {
        setLoading(false);
      }
    };

    if (mascotas.length > 0) {
      fetchHistorial();
    }
  }, [mascotas]);

  return (
    <Card sx={{ height: "100%", display: "flex", flexDirection: "column", boxShadow: 3 }}>
      <CardMedia component="img" height="220" image={medicos} alt="Veterinario" />
      <CardContent sx={{ flexGrow: 1, pb: 4 }}>
        <Typography variant="h6" sx={{ fontWeight: "bold", mb: 2 }}>
          Historial de Mascotas
        </Typography>
        {loading ? (
          <CircularProgress />
        ) : historial.length === 0 ? (
          <Typography variant="body2" color="text.secondary">
            No hay historial disponible.
          </Typography>
        ) : (
          <Table size="small">
            <TableHead>
              <TableRow>
                <TableCell>Mascota</TableCell>
                <TableCell>Fecha</TableCell>
                <TableCell>Diagnóstico</TableCell>
                <TableCell>Tratamiento</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {historial.map((entry, index) => {
                const mascota = mascotas.find((m) => m.id_mascota === entry.id_mascota);
                return (
                  <TableRow key={index}>
                    <TableCell>{mascota?.nombre || "Desconocido"}</TableCell>
                    <TableCell>{entry.fecha_consulta}</TableCell>
                    <TableCell>{entry.diagnostico}</TableCell>
                    <TableCell>{entry.tratamiento}</TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        )}
      </CardContent>
    </Card>
  );
};

export default PetHistory;

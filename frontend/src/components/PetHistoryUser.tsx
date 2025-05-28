import { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  Typography,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  CircularProgress,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { getHistorialByMascota } from "../services/historialService";

interface Mascota {
  id_mascota: number;
  nombre: string;
}

interface Historial {
  fecha_consulta: string;
  diagnostico: string;
  tratamiento: string;
}

interface Props {
  mascotas: Mascota[];
}

const PetHistoryUser: React.FC<Props> = ({ mascotas }) => {
  const [historiales, setHistoriales] = useState<Record<number, Historial[]>>({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchHistorial = async () => {
      setLoading(true);
      try {
        const data: Record<number, Historial[]> = {};
        for (const mascota of mascotas) {
          const historial = await getHistorialByMascota(mascota.id_mascota);
          data[mascota.id_mascota] = historial;
        }
        setHistoriales(data);
      } catch (error) {
        console.error("Error al cargar historial", error);
      } finally {
        setLoading(false);
      }
    };

    if (mascotas.length > 0) {
      fetchHistorial();
    }
  }, [mascotas]);

  return (
    <Card sx={{ mt: 4, boxShadow: 3 }}>
      <CardContent>
        <Typography variant="h6" sx={{ fontWeight: "bold", mb: 2 }}>
          Historial de tus Mascotas
        </Typography>
        {loading ? (
          <CircularProgress />
        ) : (
          mascotas.map((mascota) => (
            <Accordion key={mascota.id_mascota}>
              <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <Typography>{mascota.nombre}</Typography>
              </AccordionSummary>
              <AccordionDetails>
                {historiales[mascota.id_mascota]?.length ? (
                  <Table size="small">
                    <TableHead>
                      <TableRow>
                        <TableCell>Fecha</TableCell>
                        <TableCell>Diagnóstico</TableCell>
                        <TableCell>Tratamiento</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {historiales[mascota.id_mascota].map((entry, index) => (
                        <TableRow key={index}>
                          <TableCell>{entry.fecha_consulta}</TableCell>
                          <TableCell>{entry.diagnostico}</TableCell>
                          <TableCell>{entry.tratamiento}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                ) : (
                  <Typography variant="body2">Sin historial registrado.</Typography>
                )}
              </AccordionDetails>
            </Accordion>
          ))
        )}
      </CardContent>
    </Card>
  );
};

export default PetHistoryUser;
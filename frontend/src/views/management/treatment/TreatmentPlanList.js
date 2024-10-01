import { Table, TableBody, TableCell, TableHead, TableRow, Button, CircularProgress, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import { SERVIDOR } from '../../../api/Servidor';

const TreatmentPlanList = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchItems();
  }, []);

  const fetchItems = () => {
    const token = localStorage.getItem('token');
    setLoading(true);
    setError(null);
    fetch(`${SERVIDOR}/api/treatment-plan`, {
      headers: { 'x-access-token': token }
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Error al obtener los artículos de los planes de tratamientos.');
        }
        return response.json();
      })
      .then((data) => {
        setItems(data.records || []);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching treatment plan items:', error);
        setError('No hay tratamientos registrados.');
        setLoading(false);
      });
  };

  const createItem = () => {
    navigate('/ui/create-treatment-plan');
  };

  const handleDeleteLogicallyItem = (id) => {
    const token = localStorage.getItem('token');
    if (window.confirm('¿Estás seguro de que deseas eliminar este artículo?')) {
      fetch(`${SERVIDOR}/api/treatment-plan`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'x-access-token': token
        },
        body: JSON.stringify({ id })
      })
        .then((response) => {
          if (response.ok) {
            alert('Artículo eliminado correctamente');
            setItems(items.filter((item) => item.id !== id));
          } else {
            console.error('Error al eliminar el artículo.');
          }
        })
        .catch((error) => {
          console.error('Error al eliminar el artículo:', error);
        });
    }
  };

  return (
    <>
      <Button variant="contained" color="secondary" size="large" onClick={createItem}>
        Crear plan de tratamiento
      </Button>
      {loading ? (
        <CircularProgress />
      ) : error ? (
        <Typography variant="body1" color="error">
          {error}
        </Typography>
      ) : items.length === 0 ? (
        <Typography variant="body1">
          No hay artículos en los planes de tratamientos.
        </Typography>
      ) : (
        <Table>
          <TableHead>
            <TableRow>
              <TableCell sx={{ fontSize: '15px' }}>ID</TableCell>
              <TableCell sx={{ fontSize: '15px' }}>Tratamiento</TableCell>
              <TableCell sx={{ fontSize: '15px' }}>Categoría</TableCell>
              <TableCell sx={{ fontSize: '15px' }}>Costo</TableCell>
              <TableCell sx={{ fontSize: '15px' }}>Editar</TableCell>
              <TableCell sx={{ fontSize: '15px' }}>Eliminar</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {items.map((item) => (
              <TableRow key={item.id}>
                <TableCell sx={{ fontSize: '15px' }}>{item.treatment_plan_id}</TableCell>
                <TableCell sx={{ fontSize: '15px' }}>{item.plan_details}</TableCell>
                <TableCell sx={{ fontSize: '15px' }}>{item.treatment_category_name}</TableCell>
                <TableCell sx={{ fontSize: '15px' }}>{item.estimated_cost}</TableCell>
                <TableCell>
                  <Button
                    variant="contained"
                    color="primary"
                    size="small"
                    onClick={() =>
                      navigate(`/ui/update-treatment-plan/${item.id}`, { state: { item: item } })
                    }
                  >
                    Editar
                  </Button>
                </TableCell>
                <TableCell>
                  <Button
                    variant="contained"
                    color="secondary"
                    size="small"
                    onClick={() => handleDeleteLogicallyItem(item.id)}
                  >
                    Eliminar
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
    </>
  );
};

export default TreatmentPlanList;
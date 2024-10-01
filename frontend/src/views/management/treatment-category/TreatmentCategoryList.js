import { Table, TableBody, TableCell, TableHead, TableRow, Button, CircularProgress, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import { SERVIDOR } from '../../../api/Servidor';

const TreatmentCategoryList = () => {
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
    fetch(`${SERVIDOR}/api/treatment-category`, {
      headers: { 'x-access-token': token }
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Error al obtener las categorías de tratamiento.');
        }
        return response.json();
      })
      .then((data) => {
        setItems(data || []);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching treatment categories:', error);
        setError('No hay tratamientos registrados.');
        setLoading(false);
      });
  };

  const handleDeleteLogicallyItem = (id) => {
    const token = localStorage.getItem('token');
    if (window.confirm('¿Estás seguro de que deseas eliminar esta categoría?')) {
      fetch(`${SERVIDOR}/api/treatment-category`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'x-access-token': token
        },
        body: JSON.stringify({ id })
      })
        .then((response) => {
          if (response.ok) {
            alert('Categoría eliminada correctamente');
            setItems(items.filter((item) => item.id !== id));
          } else {
            console.error('Error al eliminar la categoría.');
          }
        })
        .catch((error) => {
          console.error('Error al eliminar la categoría:', error);
        });
    }
  };

  const createItem = () => {
    navigate('/ui/create-treatment-category');
  };

  return (
    <>
      <Button variant="contained" color="secondary" size="large" onClick={createItem}>
        Crear categoria de tratamiento
      </Button>
      {loading ? (
        <CircularProgress />
      ) : error ? (
        <Typography variant="body1" color="error">
          {error}
        </Typography>
      ) : items.length === 0 ? (
        <Typography variant="body1">No hay categorías de tratamiento registradas.</Typography>
      ) : (
        <Table>
          <TableHead>
            <TableRow>
              <TableCell sx={{ fontSize: '15px' }}>ID</TableCell>
              <TableCell sx={{ fontSize: '15px' }}>Categoría</TableCell>
              <TableCell sx={{ fontSize: '15px' }}>Editar</TableCell>
              <TableCell sx={{ fontSize: '15px' }}>Eliminar</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {items.map((item) => (
              <TableRow key={item.id}>
                <TableCell sx={{ fontSize: '15px' }}>{item.id}</TableCell>
                <TableCell sx={{ fontSize: '15px' }}>{item.name}</TableCell>
                <TableCell>
                  <Button
                    variant="contained"
                    color="primary"
                    size="small"
                    onClick={() =>
                      navigate(`/ui/update-treatment-category/${item.id}`, { state: { item: item } })
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

export default TreatmentCategoryList;
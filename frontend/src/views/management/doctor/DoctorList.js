import { Table, TableBody, TableCell, TableHead, TableRow, CircularProgress } from '@mui/material';
import { useEffect, useState } from 'react';
import { SERVIDOR } from '../../../api/Servidor';

const DoctorList = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    setLoading(true);
    setError(null);
    fetch(`${SERVIDOR}/api/user/doctors`, {
      headers: { 'x-access-token': token }
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Error al obtener los usuarios.');
        }
        return response.json();
      })
      .then((data) => {
        setUsers(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching users:', error);
        setError('No existen registros de doctores.');
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <CircularProgress />;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell sx={{ fontSize: '15px' }}>ID</TableCell>
            <TableCell sx={{ fontSize: '15px' }}>Nombre</TableCell>
            <TableCell sx={{ fontSize: '15px' }}>Apellido</TableCell>
            <TableCell sx={{ fontSize: '15px' }}>Teléfono</TableCell>
            <TableCell sx={{ fontSize: '15px' }}>Dirección</TableCell>
            <TableCell sx={{ fontSize: '15px' }}>Email</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {users.map((user) => (
            <TableRow key={user.id}>
              <TableCell sx={{ fontSize: '15px' }}>{(user.id)}</TableCell>
              <TableCell sx={{ fontSize: '15px' }}>{user.name}</TableCell>
              <TableCell sx={{ fontSize: '15px' }}>{user.last_name}</TableCell>
              <TableCell sx={{ fontSize: '15px' }}>{user.phone}</TableCell>
              <TableCell sx={{ fontSize: '15px' }}>{user.address}</TableCell>
              <TableCell sx={{ fontSize: '15px' }}>{user.email}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </>
  );
};

export default DoctorList;
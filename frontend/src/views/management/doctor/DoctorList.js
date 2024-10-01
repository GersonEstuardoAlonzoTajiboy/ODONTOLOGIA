import { Table, TableBody, TableCell, TableHead, TableRow, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { SERVIDOR } from '../../../api/Servidor';
import { Box } from '@mui/system';

const DoctorList = () => {
  const [users, setUsers] = useState([])

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = (page, limit) => {
    const token = localStorage.getItem('token');
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
      })
      .catch((error) => {
        console.error('Error fetching users:', error);
      });
  };

  return (
    <Box sx={{ padding: '16px' }}>
      <Typography variant="h3" align="center" fontWeight={600} gutterBottom>
        Lista de Doctores
      </Typography>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell sx={{ fontSize: '15px' }}>ID</TableCell>
            <TableCell sx={{ fontSize: '15px' }}>Nombre</TableCell>
            <TableCell sx={{ fontSize: '15px' }}>Teléfono</TableCell>
            <TableCell sx={{ fontSize: '15px' }}>Email</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {users.map((user) => (
            <TableRow key={user.id}>
              <TableCell sx={{ fontSize: '15px' }}>{user.id}</TableCell>
              <TableCell sx={{ fontSize: '15px' }}>{`${user.name} ${user.last_name}`}</TableCell>
              <TableCell sx={{ fontSize: '15px' }}>{user.phone}</TableCell>
              <TableCell sx={{ fontSize: '15px' }}>{user.email}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Box>
  );
};

export default DoctorList;
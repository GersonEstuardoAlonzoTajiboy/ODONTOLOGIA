import React, { useEffect, useState } from 'react';
import { CircularProgress, Table, TableBody, TableCell, TableHead, TableRow } from '@mui/material';
import { jwtDecode } from 'jwt-decode';
import { SERVIDOR } from '../../../api/Servidor';

const ScheduleCalendar = () => {
  const [schedules, setSchedules] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const getUserFromToken = () => {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        return jwtDecode(token);
      } catch (error) {
        console.error('Error decoding token:', error);
        return null;
      }
    }
    return null;
  };

  const user = getUserFromToken();
  const doctorId = user?.type_of_user === 'DOCTOR' ? user.id : null;

  useEffect(() => {
    if (doctorId) {
      fetchSchedules(doctorId);
    }
  }, [doctorId]);

  const fetchSchedules = (doctorId) => {
    const token = localStorage.getItem('token');
    setLoading(true);
    setError(null);

    const url = `${SERVIDOR}/api/schedule/${doctorId}`;

    fetch(url, {
      headers: { 'x-access-token': token }
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Error al obtener los horarios.');
        }
        return response.json();
      })
      .then((data) => {
        setSchedules(data.schedules || []);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching schedules:', error);
        setError('Error al obtener la agenda');
        setLoading(false);
      });
  };

  if (loading) {
    return <CircularProgress />;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <Table>
      <TableHead>
        <TableRow>
          <TableCell sx={{ fontSize: '15px' }}>Fecha</TableCell>
          <TableCell sx={{ fontSize: '15px' }}>Nombre del Paciente</TableCell>
          <TableCell sx={{ fontSize: '15px' }}>Motivo de la Cita</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {schedules.map((schedule) => (
          <TableRow key={schedule.schedule_id}>
            <TableCell sx={{ fontSize: '15px' }}>{schedule.schedule_date}</TableCell>
            <TableCell sx={{ fontSize: '15px' }}>{schedule.patient_name}</TableCell>
            <TableCell sx={{ fontSize: '15px' }}>{schedule.reason}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default ScheduleCalendar;
import React, { useEffect, useState } from 'react';
import { Grid, Box, Card, CardContent, Typography } from '@mui/material';
import PageContainer from '../../components/container/PageContainer';
import { SERVIDOR } from '../../api/Servidor';

const Dashboard = () => {
  const [totalCost, setTotalCost] = useState(null);
  const [totalPatients, setTotalPatients] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    const fetchTotalCost = async () => {
      try {
        const response = await fetch(`${SERVIDOR}/api/treatment`, {
          method: 'GET',
          headers: {
            'x-access-token': token,
            'Content-Type': 'application/json',
          },
        });
        if (!response.ok) {
          throw new Error('Error al obtener el costo total');
        }
        const data = await response.json();
        setTotalCost(data.totalCost);
      } catch (error) {
        console.error('Error fetching total cost:', error);
      }
    };
    const fetchTotalPatients = async () => {
      try {
        const response = await fetch(`${SERVIDOR}/patients/total`, {
          method: 'GET',
          headers: {
            'x-access-token': token,
            'Content-Type': 'application/json',
          },
        });
        if (!response.ok) {
          throw new Error('Error al obtener el total de pacientes');
        }
        const data = await response.json();
        setTotalPatients(data.totalPatients); // Set total patients in state
      } catch (error) {
        console.error('Error fetching total patients:', error);
      }
    };
    fetchTotalCost();
    fetchTotalPatients();
  }, []);

  return (
    <PageContainer title="ICI DENT" description="this is Dashboard">
      <Box>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6} md={4}>
            <Card>
              <CardContent>
                <Typography variant="h5" component="div">
                  Total de Tratamientos
                </Typography>
                <Typography variant="h6" color="textSecondary">
                  {totalCost !== null ? `Q. ${totalCost}` : 'Cargando...'}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <Card>
              <CardContent>
                <Typography variant="h5" component="div">
                  Total de Pacientes
                </Typography>
                <Typography variant="h6" color="textSecondary">
                  {totalPatients !== null ? totalPatients : 'Cargando...'}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Box>
    </PageContainer>
  );
};

export default Dashboard;
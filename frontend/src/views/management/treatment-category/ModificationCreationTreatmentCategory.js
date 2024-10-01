import { useLocation, useNavigate } from 'react-router';
import React, { useState } from 'react';
import { Box, Button, Paper, Stack, Typography } from '@mui/material';
import CustomTextField from '../../../components/forms/theme-elements/CustomTextField';
import { SERVIDOR } from '../../../api/Servidor';

const ModificationCreationTreatmentCategory = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const itemData = state?.item || {};
  const isEditing = !!itemData.id;
  const [itemId] = useState(isEditing ? itemData.id : '');
  const [name, setName] = useState(isEditing ? itemData.name : '');

  const handleSubmit = async () => {
    const itemDataToUpdate = {
      name: name,
    };
    if (isEditing) {
      itemDataToUpdate.id = itemId;
      return handleUpdate(parseInt(itemData.id), itemDataToUpdate);
    } else {
      return handleCreate(itemDataToUpdate);
    }
  };

  const handleCreate = async (itemData) => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`${SERVIDOR}/api/treatment-category`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-access-token': token
        },
        body: JSON.stringify(itemData),
      });
      if (response.ok) {
        alert('Categoria de tratamiento creado con éxito.');
        navigate('/treatments-category');
      } else {
        alert('Error al crear la Categoria de tratamiento.');
      }
    } catch (error) {
      alert('No se puede crear la Categoria de tratamiento en este momento. Por favor, inténtalo de nuevo más tarde.');
    }
  };

  const handleUpdate = async (itemId, itemData) => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`${SERVIDOR}/api/treatment-category/${itemId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'x-access-token': token
        },
        body: JSON.stringify(itemData),
      });
      if (response.ok) {
        alert('Categoria de tratamiento actualizado con éxito.');
        navigate('/treatments-category');
      } else {
        alert('Error al actualizar la Categoria de tratamiento.');
      }
    } catch (error) {
      alert('No se puede actualizar la Categoria de tratamiento en este momento. Por favor, inténtalo de nuevo más tarde.');
    }
  };

  return (
    <Box display="flex" justifyContent="center" alignItems="flex-start" minHeight="100vh" mt={4}>
      <Box maxWidth="600px" width="100%">
        <Paper elevation={3} sx={{ padding: 2 }}>
          <Typography variant="h5" align='center' mb={2} fontWeight={600}>
            {isEditing ? 'Actualizar información de la Categoria de tratamiento' : 'Agregar información de la Categoria de tratamiento'}
          </Typography>
          <Stack spacing={3}>
            <Box>
              <Typography
                variant="subtitle1"
                fontWeight={600}
                component="label"
                htmlFor="name"
                mb="5px"
                sx={{ fontSize: '15px' }}
              >
                Tratamiento
              </Typography>
              <CustomTextField
                id="name"
                variant="outlined"
                fullWidth value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </Box>
            <Box>
              <Button
                color="primary"
                variant="contained"
                size="large"
                fullWidth
                onClick={handleSubmit}
              >
                {isEditing ? 'Actualizar' : 'Guardar'}
              </Button>
            </Box>
          </Stack>
        </Paper>
      </Box>
    </Box>
  );
};

export default ModificationCreationTreatmentCategory;
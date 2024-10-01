import { useLocation, useNavigate } from 'react-router';
import React, { useEffect, useState } from 'react';
import { Box, Button, Paper, Stack, Typography, MenuItem, Select, CircularProgress } from '@mui/material';
import CustomTextField from '../../../components/forms/theme-elements/CustomTextField';
import { SERVIDOR } from '../../../api/Servidor';

const ModificationCreationTreatmentPlan = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const itemData = state?.item || {};
  const isEditing = !!itemData.treatment_plan_id;

  const [itemId] = useState(isEditing ? itemData.treatment_plan_id : '');
  const [planDetails, setPlanDetails] = useState(isEditing ? itemData.plan_details : '');
  const [estimatedCost, setEstimatedCost] = useState(isEditing ? itemData.estimated_cost : '');

  const [categories, setCategories] = useState([]);
  const [selectedCategoryId, setSelectedCategoryId] = useState(isEditing ? itemData.treatment_category_id : '');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await fetch(`${SERVIDOR}/api/treatment-category`, {
          headers: {
            'x-access-token': token,
          },
        });

        if (!response.ok) {
          throw new Error('Error al obtener las categorías.');
        }
        const data = await response.json();
        setCategories(data);
        setLoading(false);
      } catch (error) {
        setError('Error al cargar las categorías.');
        setLoading(false);
      }
    };
    fetchCategories();
  }, []);

  const handleSubmit = async () => {
    const itemDataToUpdate = {
      plan_details: planDetails,
      estimated_cost: estimatedCost,
      treatment_category_id: selectedCategoryId,
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
      const response = await fetch(`${SERVIDOR}/api/treatment-plan`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-access-token': token,
        },
        body: JSON.stringify(itemData),
      });
      if (response.ok) {
        alert('Plan de tratamiento creado con éxito.');
        navigate('/treatments');
      } else {
        alert('Error al crear el plan de tratamiento.');
      }
    } catch (error) {
      alert('No se puede crear el plan de tratamiento en este momento. Por favor, inténtalo de nuevo más tarde.');
    }
  };

  const handleUpdate = async (itemId, itemData) => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`${SERVIDOR}/api/treatment-plan/${itemId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'x-access-token': token,
        },
        body: JSON.stringify(itemData),
      });
      if (response.ok) {
        alert('Plan de tratamiento actualizado con éxito.');
        navigate('/treatments');
      } else {
        alert('Error al actualizar el plan de tratamiento.');
      }
    } catch (error) {
      alert('No se puede actualizar el plan de tratamiento en este momento. Por favor, inténtalo de nuevo más tarde.');
    }
  };

  return (
    <Box display="flex" justifyContent="center" alignItems="flex-start" minHeight="100vh" mt={4}>
      <Box maxWidth="600px" width="100%">
        <Paper elevation={3} sx={{ padding: 2 }}>
          <Typography variant="h5" align='center' mb={2} fontWeight={600}>
            {isEditing ? 'Actualizar información del plan de tratamiento' : 'Agregar información del plan de tratamiento'}
          </Typography>
          {loading ? (
            <CircularProgress />
          ) : error ? (
            <Typography variant="body1" color="error">
              {error}
            </Typography>
          ) : (
            <Stack spacing={3}>
              <Box>
                <Typography
                  variant="subtitle1"
                  fontWeight={600}
                  component="label"
                  htmlFor="plan-details"
                  mb="5px"
                  sx={{ fontSize: '15px' }}
                >
                  Detalles del Plan
                </Typography>
                <CustomTextField
                  id="plan-details"
                  variant="outlined"
                  fullWidth
                  value={planDetails}
                  onChange={(e) => setPlanDetails(e.target.value)}
                />
              </Box>
              <Box>
                <Typography
                  variant="subtitle1"
                  fontWeight={600}
                  component="label"
                  htmlFor="estimated-cost"
                  mb="5px"
                  sx={{ fontSize: '15px' }}
                >
                  Costo Estimado
                </Typography>
                <CustomTextField
                  id="estimated-cost"
                  variant="outlined"
                  type="number"
                  fullWidth
                  value={estimatedCost}
                  onChange={(e) => setEstimatedCost(e.target.value)}
                  inputProps={{ step: "0.01" }}
                />
              </Box>
              <Box>
                <Typography
                  variant="subtitle1"
                  fontWeight={600}
                  component="label"
                  htmlFor="category"
                  mb="5px"
                  sx={{ fontSize: '15px' }}
                >
                  Selecciona una Categoría
                </Typography>
                <Select
                  id="category"
                  value={selectedCategoryId}
                  fullWidth
                  onChange={(e) => setSelectedCategoryId(e.target.value)}
                >
                  {categories.map((category) => (
                    <MenuItem key={category.id} value={category.id}>
                      {category.name}
                    </MenuItem>
                  ))}
                </Select>
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
          )}
        </Paper>
      </Box>
    </Box>
  );
};

export default ModificationCreationTreatmentPlan;
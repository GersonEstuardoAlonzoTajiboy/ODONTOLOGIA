import { useLocation, useNavigate } from 'react-router';
import React, { useState, useEffect } from 'react';
import { Box, Button, Paper, Stack, Typography, TextField, Select, MenuItem, FormControl, InputLabel, IconButton } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import { SERVIDOR } from '../../../../api/Servidor';

const CreationMultipleTreatments = () => {
  const navigate = useNavigate();
  const { state } = useLocation();
  const patientData = state?.patient || {};
  const isPresentPatient = !!patientData.id;
  const [patientId] = useState(isPresentPatient ? patientData.id : '');
  const [treatmentsList, setTreatmentsList] = useState([]);
  const [treatments, setTreatments] = useState([{ treatment: '', cost: '', date: '' }]);

  useEffect(() => {
    const fetchTreatments = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await fetch(`${SERVIDOR}/api/treatment-plan-not-page`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'x-access-token': token
          }
        });
        if (response.ok) {
          const data = await response.json();
          setTreatmentsList(data.records);
        } else {
          alert('Error al obtener la lista de tratamientos.');
        }
      } catch (error) {
        console.error('Error al obtener la lista de tratamientos:', error);
      }
    };
    fetchTreatments();
  }, []);

  const handleTreatmentChange = (index, event) => {
    const selectedTreatment = event.target.value;
    const updatedTreatments = [...treatments];
    updatedTreatments[index].treatment = selectedTreatment;
    const selectedTreatmentData = treatmentsList.find(t => t.plan_details === selectedTreatment);
    if (selectedTreatmentData) {
      updatedTreatments[index].cost = selectedTreatmentData.estimated_cost;
    }
    setTreatments(updatedTreatments);
  };

  const handleDateChange = (index, event) => {
    const updatedTreatments = [...treatments];
    updatedTreatments[index].date = event.target.value;
    setTreatments(updatedTreatments);
  };

  const addTreatmentRow = () => {
    setTreatments([...treatments, { treatment: '', cost: '', date: '' }]);
  };

  const removeTreatmentRow = (index) => {
    const updatedTreatments = treatments.filter((_, i) => i !== index);
    setTreatments(updatedTreatments);
  };

  const handleSubmit = async () => {
    const token = localStorage.getItem('token');
    const treatmentsData = treatments.map(t => ({
      treatment: t.treatment,
      cost: parseFloat(t.cost),
      date: t.date
    }));
    const requestData = {
      treatments: treatmentsData,
      patient_id: patientId
    };
    try {
      const response = await fetch(`${SERVIDOR}/api/multiple-treatments`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-access-token': token
        },
        body: JSON.stringify(requestData),
      });
      if (response.ok) {
        alert('Tratamientos guardados exitosamente.');
        navigate('/patients');
      } else {
        alert('Error al guardar los tratamientos.');
      }
    } catch (error) {
      console.error('Error al guardar los tratamientos:', error);
      alert('Error al guardar los tratamientos.');
    }
  };

  return (
    <Box display="flex" justifyContent="center" alignItems="flex-start" minHeight="100vh" mt={4}>
      <Box maxWidth="600px" width="100%">
        <Paper elevation={3} sx={{ padding: 2 }}>
          <Typography variant="h5" align='center' mb={2} fontWeight={600}>
            Tratamientos
          </Typography>
          <Stack spacing={3}>
            <Typography variant="subtitle1" align='center' fontWeight={600}>
              Por favor complete todos los campos
            </Typography>
            {treatments.map((treatmentData, index) => (
              <div key={index}>
                <Stack spacing={2} direction="row" alignItems="center">
                  <FormControl fullWidth variant="outlined">
                    <InputLabel>Tratamiento</InputLabel>
                    <Select
                      value={treatmentData.treatment}
                      onChange={(e) => handleTreatmentChange(index, e)}
                      label="Tratamiento"
                    >
                      {treatmentsList.map((treatmentOption) => (
                        <MenuItem key={treatmentOption.id} value={treatmentOption.plan_details}>
                          {treatmentOption.plan_details}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                  <TextField
                    fullWidth
                    variant="outlined"
                    label="Costo"
                    type="number"
                    value={treatmentData.cost}
                    InputProps={{ readOnly: true }}
                  />
                  <TextField
                    fullWidth
                    variant="outlined"
                    label="Fecha"
                    type="date"
                    value={treatmentData.date}
                    onChange={(e) => handleDateChange(index, e)}
                    InputLabelProps={{ shrink: true }}
                  />
                  {treatments.length > 1 && (
                    <IconButton onClick={() => removeTreatmentRow(index)} color="secondary">
                      <DeleteIcon />
                    </IconButton>
                  )}
                </Stack>
              </div>
            ))}
            <Button
              startIcon={<AddIcon />}
              onClick={addTreatmentRow}
              variant="contained"
              color="primary"
            >
              Añadir otro tratamiento
            </Button>
            <Box>
              <Button
                color="primary"
                variant="contained"
                size="large"
                fullWidth
                onClick={handleSubmit}
              >
                Guardar tratamientos
              </Button>
            </Box>
          </Stack>
        </Paper>
      </Box>
    </Box>
  );
};

export default CreationMultipleTreatments;
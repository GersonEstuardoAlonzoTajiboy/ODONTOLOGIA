import { useNavigate, useLocation } from 'react-router';
import React, { useEffect, useState } from 'react';
import { Box, Button, Paper, Stack, Typography, Select, MenuItem, FormControl, InputLabel, TextField, IconButton } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import { SERVIDOR } from '../../../../api/Servidor';

const CreationHealthQuestionnaire = () => {
  const navigate = useNavigate();
  const { state } = useLocation();
  const patientData = state?.patient || {};
  const patientId = patientData.id || '';
  const patientSex = patientData.sex || '';
  const isFemale = patientSex === 'F';

  const [hypertension, setHypertension] = useState(false);
  const [hypertensionControlled, setHypertensionControlled] = useState(false);
  const [diabetes, setDiabetes] = useState(false);
  const [diabetesControlled, setDiabetesControlled] = useState(false);
  const [hospitalized, setHospitalized] = useState(false);
  const [allergic, setAllergic] = useState(false);
  const [excessiveBleeding, setExcessiveBleeding] = useState(false);
  const [sheIsPregnant, setSheIsPregnant] = useState(false);
  const [pregnant, setPregnant] = useState('');
  const [eatenLastSixHours, setEatenLastSixHours] = useState(false);
  const [covidSymptoms, setCovidSymptoms] = useState(false);
  const [seriousIllnesses, setSeriousIllnesses] = useState('');
  const [bloodPressure, setBloodPressure] = useState('');
  const [bloodSugar, setBloodSugar] = useState('');
  const [lastTreatment, setLastTreatment] = useState('');
  const [otherData, setOtherData] = useState('');
  const [treatmentsList, setTreatmentsList] = useState([]);
  const [treatments, setTreatments] = useState([{ treatment: '', cost: '', date: '' }]);
  const [budgetItems, setBudgetItems] = useState([{ treatment: '', cost: '' }]);
  const [treatmentPlanList, setTreatmentPlanList] = useState([]);



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

  useEffect(() => {
    const fetchTreatmentPlans = async () => {
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
          setTreatmentPlanList(data.records);
        } else {
          alert('Error al obtener la lista de planes de tratamiento.');
        }
      } catch (error) {
        console.error('Error al obtener la lista de planes de tratamiento:', error);
      }
    };
    fetchTreatmentPlans();
  }, []);

  const handleSubmit = async () => {
    const token = localStorage.getItem('token');
    const questionnaireData = {
      hypertension,
      hypertension_control: hypertensionControlled,
      diabetes,
      diabetes_control: diabetesControlled,
      hospitalization: hospitalized,
      medicine_allergy: allergic,
      bleeding: excessiveBleeding,
      serious_illnesses: seriousIllnesses,
      pregnancy: isFemale ? sheIsPregnant : null,
      pregnancy_months: isFemale ? parseInt(pregnant) : null,
      recent_meal: eatenLastSixHours,
      recent_symptoms: covidSymptoms,
      patient_id: patientId
    };
    try {
      const response = await fetch(`${SERVIDOR}/api/health-questionnarie`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-access-token': token
        },
        body: JSON.stringify(questionnaireData),
      });
      if (response.ok) {
        alert('Cuestionario de salud guardado exitosamente.');
        navigate('/patients');
      } else {
        alert('Error al guardar el cuestionario de salud.');
      }
    } catch (error) {
      console.error('Error al guardar el cuestionario de salud:', error);
      alert('Error al guardar el cuestionario de salud.');
    }
    const evaluationData = {
      blood_pressure: bloodPressure,
      blood_sugar: bloodSugar,
      last_treatment: lastTreatment,
      other_data: otherData,
      patient_id: patientId
    };
    try {
      const response = await fetch(`${SERVIDOR}/api/physical-evaluation`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-access-token': token
        },
        body: JSON.stringify(evaluationData),
      });

      if (response.ok) {
        alert('Evaluación física guardada exitosamente.');
        navigate('/patients');
      } else {
        alert('Error al guardar la evaluación física.');
      }
    } catch (error) {
      console.error('Error al guardar la evaluación física:', error);
      alert('Error al guardar la evaluación física.');
    }
    const treatmentsData = treatments.map(t => ({
      treatment: t.treatment,
      cost: parseFloat(t.cost),
      date: t.date
    }));
    const requestDataTraetments = {
      treatments_json: treatmentsData,
      patient_id: patientId
    };
    try {
      const response = await fetch(`${SERVIDOR}/api/treatment`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-access-token': token
        },
        body: JSON.stringify(requestDataTraetments),
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
    const budgetData = budgetItems.map(b => ({
      treatment: b.treatment,
      cost: parseFloat(b.cost)
    }));
    const requestDataBudget = {
      treatments_json: budgetData,
      patient_id: patientId
    };
    try {
      const response = await fetch(`${SERVIDOR}/api/budget`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-access-token': token
        },
        body: JSON.stringify(requestDataBudget),
      });
      if (response.ok) {
        alert('Presupuesto guardado exitosamente.');
        navigate('/patients');
      } else {
        alert('Error al guardar el presupuesto.');
      }
    } catch (error) {
      console.error('Error al guardar el presupuesto:', error);
      alert('Error al guardar el presupuesto.');
    }
  };

  const renderSelect = (label, value, onChange) => (
    <FormControl fullWidth variant="outlined">
      <InputLabel>{label}</InputLabel>
      <Select
        value={value ? 'SI' : 'NO'}
        onChange={(e) => onChange(e.target.value === 'SI')}
        label={label}
      >
        <MenuItem value="SI">Sí</MenuItem>
        <MenuItem value="NO">No</MenuItem>
      </Select>
    </FormControl>
  );

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

  const handleBudgetItemChange = (index, event) => {
    const selectedTreatment = event.target.value;
    const updatedBudgetItems = [...budgetItems];
    updatedBudgetItems[index].treatment = selectedTreatment;
    const selectedTreatmentData = treatmentPlanList.find(t => t.plan_details === selectedTreatment);
    if (selectedTreatmentData) {
      updatedBudgetItems[index].cost = selectedTreatmentData.estimated_cost;
    }
    setBudgetItems(updatedBudgetItems);
  };

  const addBudgetItemRow = () => {
    setBudgetItems([...budgetItems, { treatment: '', cost: '' }]);
  };

  const removeBudgetItemRow = (index) => {
    const updatedBudgetItems = budgetItems.filter((_, i) => i !== index);
    setBudgetItems(updatedBudgetItems);
  };

  return (
    <Box display="flex" justifyContent="center" alignItems="flex-start" minHeight="100vh" mt={4}>
      <Box maxWidth="600px" width="100%">
        <Paper elevation={3} sx={{ padding: 2 }}>
          <Typography variant="h5" align='center' mb={2} fontWeight={600}>
            Ficha medica
          </Typography>
          <Stack spacing={3}>
            <Typography variant="subtitle1" align='center' fontWeight={600}>
              Cuestionario de salud
            </Typography>
            {renderSelect('¿Sufre de Hipertensión arterial?', hypertension, setHypertension)}
            {renderSelect('¿Está controlada? ¿Toma su tratamiento?', hypertensionControlled, setHypertensionControlled)}
            {renderSelect('¿Sufre de Diabetes?', diabetes, setDiabetes)}
            {renderSelect('¿Está controlada? ¿Toma su tratamiento?', diabetesControlled, setDiabetesControlled)}
            {renderSelect('¿Ha estado hospitalizado en los últimos dos años?', hospitalized, setHospitalized)}
            {renderSelect('¿Es alérgico a la aspirina, penicilina u otra medicina?', allergic, setAllergic)}
            {renderSelect('¿Ha tenido alguna vez algún sangramiento excesivo?', excessiveBleeding, setExcessiveBleeding)}
            <TextField
              fullWidth
              variant="outlined"
              label="Indique las enfermedades serias que ha padecido o que padece"
              value={seriousIllnesses || ''}
              onChange={(e) => setSeriousIllnesses(e.target.value)}
            />
            {isFemale && (
              <>
                {renderSelect('¿Está embarazada?', sheIsPregnant, setSheIsPregnant)}
                <TextField
                  fullWidth
                  variant="outlined"
                  label="¿Cuántos meses de embarazo?"
                  type="number"
                  value={pregnant}
                  onChange={(e) => setPregnant(e.target.value)}
                  InputProps={{
                    inputProps: {
                      min: 0,
                      max: 9,
                    },
                  }}
                />
              </>
            )}
            {renderSelect('¿Ha comido algo en las últimas seis horas?', eatenLastSixHours, setEatenLastSixHours)}
            {renderSelect('¿Ha tenido síntomas como tos, fiebre, etc. en el último mes?', covidSymptoms, setCovidSymptoms)}
            <Typography variant="subtitle1" align='center' fontWeight={600}>
              Evaluación fisica
            </Typography>
            <TextField
              fullWidth
              variant="outlined"
              label="Presión Arterial"
              value={bloodPressure}
              onChange={(e) => setBloodPressure(e.target.value)}
            />
            <TextField
              fullWidth
              variant="outlined"
              label="Nivel de Azúcar en Sangre"
              value={bloodSugar}
              onChange={(e) => setBloodSugar(e.target.value)}
            />
            <TextField
              fullWidth
              variant="outlined"
              label="Último Tratamiento"
              value={lastTreatment}
              onChange={(e) => setLastTreatment(e.target.value)}
            />
            <TextField
              fullWidth
              variant="outlined"
              label="Otros Datos"
              value={otherData}
              onChange={(e) => setOtherData(e.target.value)}
            />
            <Typography variant="subtitle1" align='center' fontWeight={600}>
              Tratamientos
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
            <Typography variant="subtitle1" align='center' fontWeight={600}>
              Presupuesto
            </Typography>
            {budgetItems.map((budgetItem, index) => (
              <div key={index}>
                <Stack spacing={2} direction="row" alignItems="center">
                  <FormControl fullWidth variant="outlined">
                    <InputLabel>Tratamiento</InputLabel>
                    <Select
                      value={budgetItem.treatment}
                      onChange={(e) => handleBudgetItemChange(index, e)}
                      label="Tratamiento"
                    >
                      {treatmentPlanList.map((treatmentOption) => (
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
                    value={budgetItem.cost}
                    InputProps={{ readOnly: true }}
                  />
                  {budgetItems.length > 1 && (
                    <IconButton onClick={() => removeBudgetItemRow(index)} color="secondary">
                      <DeleteIcon />
                    </IconButton>
                  )}
                </Stack>
              </div>
            ))}
            <Button
              startIcon={<AddIcon />}
              onClick={addBudgetItemRow}
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
                Guardar
              </Button>
            </Box>
          </Stack>
        </Paper>
      </Box>
    </Box>
  );
};

export default CreationHealthQuestionnaire;
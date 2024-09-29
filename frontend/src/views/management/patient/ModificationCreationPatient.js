import { useLocation, useNavigate } from 'react-router';
import React, { useState } from 'react';
import { Box, Button, Paper, Stack, Typography } from '@mui/material';
import CustomTextField from '../../../components/forms/theme-elements/CustomTextField';
import { SERVIDOR } from '../../../api/Servidor';

const ModificationCreationPatient = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const patientData = state?.patient || {};
  const isEditing = !!patientData.id;
  const [patientId] = useState(isEditing ? patientData.id : '');
  const [fullName, setFullName] = useState(isEditing ? patientData.full_name : '');
  const [address, setAddress] = useState(isEditing ? patientData.address : '');
  const [email, setEmail] = useState(isEditing ? patientData.email : '');
  const [phone, setPhone] = useState(isEditing ? patientData.phone : '');
  const [sex, setSex] = useState(isEditing ? patientData.sex : '');
  const [birthDate, setBirthDate] = useState(isEditing ? patientData.birth_date : '');
  const [nameContact, setNameContact] = useState(isEditing ? patientData.name_contact : '');
  const [relationship, setRelationship] = useState(isEditing ? patientData.relationship : '');
  const [emergencyPhone, setEmergencyPhone] = useState(isEditing ? patientData.emergency_phone : '');

  const handleSubmit = async () => {
    const patientDataToUpdate = {
      id: patientId,
      full_name: fullName,
      address,
      email,
      phone,
      sex,
      birth_date: birthDate,
      name_contact: nameContact,
      relationship: relationship,
      emergency_phone: emergencyPhone
    };
    if (isEditing) {
      return handleUpdate(parseInt(patientData.id), patientDataToUpdate);
    } else {
      return handleCreate(patientDataToUpdate);
    }
  };

  const handleCreate = async (patientData) => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`${SERVIDOR}/api/patient`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-access-token': token
        },
        body: JSON.stringify(patientData),
      });
      if (response.ok) {
        alert('Paciente creado con éxito.');
        navigate('/patients');
      } else {
        alert('Error al crear el paciente.');
      }
    } catch (error) {
      alert('No se puede crear el paciente en este momento. Por favor, inténtalo de nuevo más tarde.');
    }
  };

  const handleUpdate = async (patientId, patientData) => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`${SERVIDOR}/api/patient/${patientId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'x-access-token': token
        },
        body: JSON.stringify(patientData),
      });
      if (response.ok) {
        alert('Paciente actualizado con éxito.')
        navigate('/patients');
      } else {
        alert('Error al actualizar el paciente.');
      }
    } catch (error) {
      alert('No se puede actualizar el paciente en este momento. Por favor, inténtalo de nuevo más tarde.');
    }
  };

  return (
    <Box display="flex" justifyContent="center" alignItems="flex-start" minHeight="100vh" mt={4}>
      <Box maxWidth="600px" width="100%">
        <Paper elevation={3} sx={{ padding: 2 }}>
          <Typography variant="h5" align='center' mb={2} fontWeight={600}>
            {isEditing ? 'Modificar información del paciente' : 'Agregar información del paciente'}
          </Typography>
          <Stack spacing={3}>
            <Box>
              <Typography
                variant="subtitle1"
                fontWeight={600}
                component="label"
                htmlFor="fullName"
                mb="5px"
              >
                Nombre Completo
              </Typography>
              <CustomTextField
                id="fullName"
                variant="outlined"
                fullWidth
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
              />
            </Box>
            <Box>
              <Typography
                variant="subtitle1"
                fontWeight={600}
                component="label"
                htmlFor="address"
                mb="5px"
              >
                Dirección de vivienda
              </Typography>
              <CustomTextField
                id="address"
                variant="outlined"
                fullWidth value={address}
                onChange={(e) => setAddress(e.target.value)}
              />
            </Box>
            <Box>
              <Typography
                variant="subtitle1"
                fontWeight={600}
                component="label"
                htmlFor="email"
                mb="5px"
              >
                Correo electrónico
              </Typography>
              <CustomTextField
                id="email"
                type="email"
                variant="outlined"
                fullWidth value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </Box>
            <Box>
              <Typography
                variant="subtitle1"
                fontWeight={600}
                component="label"
                htmlFor="phone"
                mb="5px"
              >
                Telefono
              </Typography>
              <CustomTextField
                id="phone"
                variant="outlined"
                fullWidth value={phone}
                onChange={(e) => setPhone(e.target.value)}
                inputProps={{ maxLength: 8 }}
              />
            </Box>
            <Box>
              <Typography
                variant="subtitle1"
                fontWeight={600}
                component="label"
                htmlFor="sex"
                mb="5px">
                Sexo (M/F)
              </Typography>
              <CustomTextField
                id="sex"
                variant="outlined"
                fullWidth value={sex}
                onChange={(e) => setSex(e.target.value.toUpperCase().slice(0, 1))}
                inputProps={{ maxLength: 1 }}
              />
            </Box>
            <Box>
              <Typography
                variant="subtitle1"
                fontWeight={600}
                component="label"
                htmlFor="birthDate"
                mb="5px">
                Fecha de Nacimiento
              </Typography>
              <CustomTextField
                id="birthDate"
                variant="outlined"
                fullWidth
                value={birthDate}
                onChange={(e) => setBirthDate(e.target.value)}
                inputProps={{ type: 'date' }} />
            </Box>
            <Box>
              <Typography
                variant="subtitle1"
                fontWeight={600}
                component="label"
                htmlFor="nameContact"
                mb="5px"
              >
                Nombre de contacto
              </Typography>
              <CustomTextField
                id="nameContact"
                variant="outlined"
                fullWidth
                value={nameContact}
                onChange={(e) => setNameContact(e.target.value)}
              />
            </Box>
            <Box>
              <Typography
                variant="subtitle1"
                fontWeight={600}
                component="label"
                htmlFor="relationship"
                mb="5px"
              >
                Parentesco de contacto
              </Typography>
              <CustomTextField
                id="relationship"
                variant="outlined"
                fullWidth value={relationship}
                onChange={(e) => setRelationship(e.target.value)}
              />
            </Box>
            <Box>
              <Typography
                variant="subtitle1"
                fontWeight={600}
                component="label"
                htmlFor="emergencyPhone"
                mb="5px"
              >
                Teléfono de contacto
              </Typography>
              <CustomTextField
                id="emergencyPhone"
                variant="outlined"
                fullWidth value={emergencyPhone}
                onChange={(e) => setEmergencyPhone(e.target.value)}
                inputProps={{ maxLength: 8 }}
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
                Guardar
              </Button>
            </Box>
          </Stack>
        </Paper>
      </Box>
    </Box>
  );
};

export default ModificationCreationPatient;
import React, { lazy } from 'react';
import { Navigate } from 'react-router-dom';
import Loadable from '../layouts/full/shared/loadable/Loadable';
import ProtectedRoute from './ProtectedRoute';

/* ****Layouts**** */
const FullLayout = Loadable(lazy(() => import('../layouts/full/FullLayout')));
const BlankLayout = Loadable(lazy(() => import('../layouts/blank/BlankLayout')));
/* ****** */

/* ****Pages**** */
const Dashboard = Loadable(lazy(() => import('../views/dashboard/Dashboard')))
const Error = Loadable(lazy(() => import('../views/authentication/Error')));
const Login = Loadable(lazy(() => import('../views/authentication/Login')));
/* ****** */

/* ****Usuarios y Pacientes**** */
const UserList = Loadable(lazy(() => import('../views/management/user/UserList')));
const ModificationCreationUser = Loadable(lazy(() => import('../views/management/user/ModificationCreationUser')));
const PatientList = Loadable(lazy(() => import('../views/management/patient/PatientList')));
const ModificationCreationPatient = Loadable(lazy(() => import('../views/management/patient/ModificationCreationPatient')));
/* ****** */

/* ****Citas y Agenda**** */
const AppointmentList = Loadable(lazy(() => import('../views/management/appointment/AppointmentList')));
const ModificationCreationAppointment = Loadable(lazy(() => import('../views/management/appointment/ModificationCreationAppointment')));
const ScheduleList = Loadable(lazy(() => import('../views/management/schedule/ScheduleList')));
/* ****** */

/* ****Inventario y Facturación**** */
const InventoryList = Loadable(lazy(() => import('../views/management/inventory/InventoryList')));
const ModificationCreationInventory = Loadable(lazy(() => import('../views/management/inventory/ModificationCreationInventory')));
/* ****** */

const Router = [
  {
    path: '/',
    element: <FullLayout />,
    children: [
      { path: '/', element: <Navigate to="/auth/login" /> },
      {
        path: '/dashboard',
        exact: true,
        element: (<ProtectedRoute> <Dashboard /> </ProtectedRoute>)
      },
      {
        path: '/users',
        exact: true,
        element: (<ProtectedRoute> <UserList /> </ProtectedRoute>)
      },
      {
        path: '/ui/create-user',
        exact: true,
        element: (<ProtectedRoute> <ModificationCreationUser /> </ProtectedRoute>)
      },
      {
        path: '/ui/update-user/:id',
        exact: true,
        element: (<ProtectedRoute> <ModificationCreationUser /> </ProtectedRoute>)
      },
      {
        path: '/patients',
        exact: true,
        element: (<ProtectedRoute> <PatientList /> </ProtectedRoute>)
      },
      {
        path: '/ui/create-patient',
        exact: true,
        element: (<ProtectedRoute> <ModificationCreationPatient /> </ProtectedRoute>)
      },
      {
        path: '/ui/update-patient/:id',
        exact: true,
        element: (<ProtectedRoute> <ModificationCreationPatient /> </ProtectedRoute>)
      },
      {
        path: '/appointments',
        exact: true,
        element: (<ProtectedRoute> <AppointmentList /> </ProtectedRoute>)
      },
      {
        path: '/ui/create-appointment',
        exact: true,
        element: (<ProtectedRoute> <ModificationCreationAppointment /> </ProtectedRoute>)
      },
      {
        path: '/ui/update-appointment/:id',
        exact: true,
        element: (<ProtectedRoute> <ModificationCreationAppointment /> </ProtectedRoute>)
      },
      {
        path: '/schedules',
        exact: true,
        element: (<ProtectedRoute> <ScheduleList /> </ProtectedRoute>)
      },
      {
        path: '/inventory',
        exact: true,
        element: (<ProtectedRoute> <InventoryList /> </ProtectedRoute>)
      },
      {
        path: '/ui/create-inventory',
        exact: true,
        element: (<ProtectedRoute> <ModificationCreationInventory /> </ProtectedRoute>)
      },
      {
        path: '/ui/update-inventory/:id',
        exact: true,
        element: (<ProtectedRoute> <ModificationCreationInventory /> </ProtectedRoute>)
      },
      { path: '*', element: <Navigate to="/auth/404" /> },
    ],
  },
  {
    path: '/auth',
    element: <BlankLayout />,
    children: [
      { path: '404', element: <Error /> },
      { path: '/auth/login', element: <Login /> },
      { path: '*', element: <Navigate to="/auth/404" /> },
    ],
  },
];

export default Router;
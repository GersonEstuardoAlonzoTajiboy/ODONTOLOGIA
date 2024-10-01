import { IconCalendar, IconCategory, IconLayoutDashboard, IconServicemark, IconUser } from '@tabler/icons';
import { uniqueId } from 'lodash';
import jwtUtils from '../../../api/jwtUtils';

const getUserType = () => {
  const token = localStorage.getItem('token');
  if (token) {
    const decoded = jwtUtils(token);
    return decoded?.type_of_user || '';
  }
  return '';
};

const userType = getUserType();

const Menuitems = [
  {
    navlabel: true,
    subheader: 'Home',
  },
  {
    id: uniqueId(),
    title: 'Dashboard',
    icon: IconLayoutDashboard,
    href: '/dashboard',
  },
  {
    navlabel: true,
    subheader: 'Personas'
  },
  ...(userType === 'ADMINISTRADOR'
    ? [
      {
        id: uniqueId(),
        title: 'Usuarios',
        icon: IconUser,
        href: '/users'
      }
    ]
    : []),
  {
    id: uniqueId(),
    title: 'Doctores',
    icon: IconUser,
    href: '/doctors'
  },
  {
    id: uniqueId(),
    title: 'Pacientes',
    icon: IconUser,
    href: '/patients'
  },
  ...(userType === 'SECRETARIA'
    ? [
      {
        navlabel: true,
        subheader: 'Citas'
      },
      {
        id: uniqueId(),
        title: 'Citas',
        icon: IconCalendar,
        href: '/appointments'
      }
    ]
    : []),
  ...(userType === 'DOCTOR'
    ? [
      {
        navlabel: true,
        subheader: 'Agenda'
      },
      {
        id: uniqueId(),
        title: 'Agenda',
        icon: IconUser,
        href: '/schedules'
      }
    ]
    : []),
  {
    navlabel: true,
    subheader: 'Servicios'
  },
  {
    id: uniqueId(),
    title: 'Categorias',
    icon: IconCategory,
    href: '/treatments-category'
  },
  {
    id: uniqueId(),
    title: 'Tratamientos',
    icon: IconServicemark,
    href: '/treatments'
  }
];

export default Menuitems;
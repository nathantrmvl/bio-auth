import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { StackNavigator } from '../../navigator/StackNavigator';
import { QrGeneratorScreen } from '../../screens/camera/QrGeneratorScreen';
import { QrNavigator } from '../../navigator/QrNavigator';
import { UserNavigator } from '../../navigator/UsersNavigator';
import { FormUserScreen } from '../../screens/admins/FormUserScreen';
import { UserCredentialScreen } from '../../screens/users/UserCredentialScreen';
import  NotificationsScreen  from '../../screens/notifications/NotificationsScreen';
import  HelpChatScreen  from '../../screens/support/HelpChatScreen';
import  NewsScreen  from '../../screens/noticias/NewsScreen';
import  CalendarScreen  from '../../screens/calendar/CalendarScreen';
import ProfileScreen from '../../screens/users/ProfileScreen';
import SettingsScreen from '../../screens/settingstem/SettingsScreen';
import ScheduleScreen from '../../screens/users/scheduleScreen';

interface DrawerIconProps {
  color: string;
  size: number;
}

export const getDrawerScreens = (isSmallDevice: boolean) => [
  
  {
    name: "StackNavigator",
    component: StackNavigator,
    options: {
      title: "Inicio",
      drawerItemStyle: { display: 'none' }, // Ocultar del drawer
    },
  },

  {
    name: "ProfileScreen",
    component: ProfileScreen,
    options: {
      title: "Perfil",
      drawerItemStyle: { display: 'none' }, // Ocultar del drawer
    },
  },
  {
    name: "SettingsScreen",
    component: SettingsScreen,
    options: {
      title: "Ajustes",
      drawerItemStyle: { display: 'none' }, // Ocultar del drawer
    },
  },
  {
    name: "QrGeneratorScreen",
    component: QrGeneratorScreen,
    options: {
      title: "Generar QR",
      drawerItemStyle: { display: 'none' }, // Ocultar del drawer
    },
  },
  {
    name: "QrNavigator",
    component: QrNavigator,
    options: {
      title: "Escanear QR",
      drawerItemStyle: { display: 'none' }, // Ocultar del drawer
    },
  },
  {
    name: "UserNavigator",
    component: UserNavigator,
    options: {
      title: "Usuarios",
      drawerItemStyle: { display: 'none' }, // Ocultar del drawer
    },
  },
  {
    name: "FormUserScreen",
    component: FormUserScreen,
    options: {
      title: "Formulario",
      drawerItemStyle: { display: 'none' }, // Ocultar del drawer
    },
  },
  {
    name: "ScheduleScreen",
    component: ScheduleScreen,
    options: {
      title: "Horario laboral",
      drawerItemStyle: { display: 'none' }, // Ocultar del drawer
    },
  },
  {
    name: "UserCredentialScreen",
    component: UserCredentialScreen,
    options: {
      title: "Credencial",
      drawerItemStyle: { display: 'none' }, // Ocultar del drawer
    },
  },

  // Nuevas pantallas para el drawer (no aparecen en MenuInterno)
  {
    name: "NotificationsScreen",
    component: NotificationsScreen,
    options: {
      title: "Notificaciones",
      drawerIcon: ({ color, size }: DrawerIconProps) => (
        <MaterialCommunityIcons name="bell" size={isSmallDevice ? size-2 : size} color={color} />
      ),
    },
  },
  {
    name: "HelpChatScreen",
    component: HelpChatScreen,
    options: {
      title: "Chat de Ayuda",
      drawerIcon: ({ color, size }: DrawerIconProps) => (
        <MaterialCommunityIcons name="chat" size={isSmallDevice ? size-2 : size} color={color} />
      ),
    },
  },
  {
    name: "NewsScreen",
    component: NewsScreen,
    options: {
      title: "Boletín",
      drawerIcon: ({ color, size }: DrawerIconProps) => (
        <MaterialCommunityIcons name="newspaper" size={isSmallDevice ? size-2 : size} color={color} />
      ),
    },
  },
  {
    name: "CalendarScreen",
    component: CalendarScreen,
    options: {
      title: "Calendario",
      drawerIcon: ({ color, size }: DrawerIconProps) => (
        <MaterialCommunityIcons name="calendar" size={isSmallDevice ? size-2 : size} color={color} />
      ),
    },
  },
];
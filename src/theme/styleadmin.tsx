import { StyleSheet } from 'react-native';

// Paleta de colores centralizada
export const AdminColors = {
  primary: '#596dc6',
  primaryLight: '#4c956c',
  primaryDark: '#1e4a32',
  secondary: '#1b3a4b',
  success: '#28a745',
  error: '#dc3545',
  warning: '#ffc107',
  info: '#17a2b8',
  white: '#ffffff',
  light: '#f8f9fa',
  gray: '#6c757d',
  dark: '#212529',
  border: '#dee2e6'
};

// Estilos globales mínimos
export const styleadmin = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: AdminColors.light,
  },
  listContent: {
    paddingHorizontal: 16,
    paddingBottom: 20,
  }
});
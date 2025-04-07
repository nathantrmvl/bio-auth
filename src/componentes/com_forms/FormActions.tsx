import React from 'react';
import { View, StyleSheet, Alert, Text, useWindowDimensions } from 'react-native';
import { ProfessionalButton } from '../newButton';
import { StatusBadge } from './StatusBadge';

interface FormActionsProps {
  isEditing: boolean;
  status: string;
  onSave: () => void;
  onDelete: () => void;
  onStatusChange: (status: string) => void;
}

export const FormActions: React.FC<FormActionsProps> = ({
  isEditing,
  status = 'Activo',
  onSave,
  onDelete,
  onStatusChange,
}) => {
  const { width } = useWindowDimensions();
  const isSmallScreen = width < 400;
  const isVerySmallScreen = width < 350;

  // Función para determinar la acción según el estado actual
  const getStatusAction = () => {
    switch (status) {
      case 'Activo':
        return { action: 'Desactivar', next: 'Inactivo' };
      case 'Inactivo':
        return { action: 'Bloquear', next: 'Bloqueado' };
      case 'Bloqueado':
        return { action: 'Activar', next: 'Activo' };
      default:
        return { action: 'Activar', next: 'Activo' };
    }
  };

  // Ajuste de etiqueta según el tamaño de pantalla
  const getButtonLabel = (action: string) => {
    if (isVerySmallScreen) return action.substring(0, 3) + '..';
    if (isSmallScreen) return action.substring(0, 6);
    return action;
  };

  const { action, next } = getStatusAction();
  const buttonLabel = getButtonLabel(action);

  // Función para confirmar cambio de estado
  const handleStatusPress = () => {
    Alert.alert(
      'Cambiar Estado',
      `¿Estás seguro de cambiar el estado a ${next}?`,
      [
        { text: 'Cancelar', style: 'cancel' },
        { text: 'Confirmar', onPress: () => onStatusChange(next), style: 'destructive' },
      ]
    );
  };

  // Función para confirmar eliminación del usuario
  const handleDeletePress = () => {
    Alert.alert(
      'Eliminar Usuario',
      '¿Estás seguro de eliminar este usuario permanentemente?',
      [
        { text: 'Cancelar', style: 'cancel' },
        { text: 'Eliminar', onPress: onDelete, style: 'destructive' },
      ]
    );
  };

  return (
    <View style={styles.container}>
      {isEditing && (
        <View style={[styles.statusContainer, isSmallScreen && styles.smallStatusContainer]}>
          <Text style={[styles.statusLabel, isSmallScreen && styles.smallStatusLabel]}>
            {isSmallScreen ? 'Estado:' : 'Estado actual:'}
          </Text>
          <StatusBadge status={status} />
        </View>
      )}

      <ProfessionalButton
        title={isEditing ? 'Guardar Cambios' : 'Crear Usuario'}
        onPress={onSave}
        variant="primary"
        style={[styles.saveButton, isSmallScreen && styles.smallSaveButton]}
      />

      {isEditing && (
        <View
          style={[
            styles.actionRow,
            isSmallScreen && styles.smallActionRow,
            isVerySmallScreen && styles.verySmallActionRow,
          ]}
        >
          <View style={[styles.buttonContainer, isVerySmallScreen && styles.verySmallButtonContainer]}>
            <ProfessionalButton
              title={buttonLabel}
              onPress={handleStatusPress}
              variant="secondary"
              style={styles.actionButton}
              accessibilityLabel={action}
            />
          </View>

          <View style={styles.separator} />

          <View
            style={[
              styles.buttonContainer,
              styles.deleteButtonContainer,
              isVerySmallScreen && styles.verySmallButtonContainer,
            ]}
          >
            <ProfessionalButton
              title={
                isVerySmallScreen
                  ? 'Elim.'
                  : isSmallScreen
                  ? 'Eliminar'
                  : 'Eliminar Usuario'
              }
              onPress={handleDeletePress}
              variant="danger"
              style={[styles.actionButton, styles.deleteButton]}
              accessibilityLabel="Eliminar usuario"
            />
          </View>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 24,
    paddingHorizontal: 8,
  },
  statusContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },
  smallStatusContainer: {
    marginBottom: 12,
    flexDirection: 'column',
    alignItems: 'flex-start',
  },
  statusLabel: {
    marginRight: 10,
    fontSize: 16,
    color: '#333',
    fontWeight: '500',
  },
  smallStatusLabel: {
    fontSize: 14,
    marginRight: 0,
    marginBottom: 4,
  },
  saveButton: {
    marginBottom: 16,
    width: '100%',
    minHeight: 50,
    borderRadius: 8,
  },
  smallSaveButton: {
    minHeight: 45,
  },
  actionRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    alignItems: 'center',
  },
  smallActionRow: {
    flexDirection: 'row',
  },
  verySmallActionRow: {
    flexDirection: 'column',
  },
  buttonContainer: {
    flex: 1,
    minWidth: 0,
  },
  deleteButtonContainer: {
    marginLeft: 10,
  },
  verySmallButtonContainer: {
    width: '100%',
    marginBottom: 8,
    marginLeft: 0,
  },
  actionButton: {
    width: '100%',
    minHeight: 48,
    borderRadius: 8,
  },
  deleteButton: {
    backgroundColor: '#ff4444', // Rojo más intenso
    borderWidth: 1,
    borderColor: '#cc0000',
  },
  separator: {
    width: 10,
    height: '100%',
  },
});

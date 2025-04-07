import React, { useState } from 'react';
import { View, TouchableOpacity, Text, StyleSheet, Platform, Modal } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { Picker } from '@react-native-picker/picker';

const userTypes = [
  { label: 'Administrador', value: 'Administrador' },
  { label: 'Empleado', value: 'Empleado' },
  { label: 'Seguridad', value: 'Seguridad' },
  { label: 'Autobus', value: 'Autobus' },
];

interface UserTypeSelectorProps {
  selectedValue: string;
  onValueChange: (value: string) => void;
  error?: string;
}

export const UserTypeSelector: React.FC<UserTypeSelectorProps> = ({ 
  selectedValue, 
  onValueChange,
  error,
}) => {
  const [modalVisible, setModalVisible] = useState(false);

  if (Platform.OS === 'android') {
    return (
      <View style={styles.container}>
        <Text style={styles.label}>Tipo de Usuario</Text>
        <View style={[styles.pickerContainer, error ? styles.errorBorder : {}]}>
          <Picker
            selectedValue={selectedValue}
            onValueChange={onValueChange}
            style={styles.picker}
            dropdownIconColor="#555"
          >
            <Picker.Item label="Seleccione un tipo" value="" />
            {userTypes.map((type) => (
              <Picker.Item key={type.value} label={type.label} value={type.value} />
            ))}
          </Picker>
        </View>
        {error && <Text style={styles.errorText}>{error}</Text>}
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Tipo de Usuario</Text>
      <TouchableOpacity 
        onPress={() => setModalVisible(true)}
        style={[styles.iosPickerButton, error ? styles.errorBorder : {}]}
      >
        <Text style={[styles.pickerText, !selectedValue && styles.placeholderText]}>
          {selectedValue || 'Seleccione un tipo de usuario'}
        </Text>
        <MaterialIcons name="keyboard-arrow-down" size={24} color="#555" />
      </TouchableOpacity>

      <Modal
        visible={modalVisible}
        transparent={true}
        animationType="slide"
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <TouchableOpacity 
                onPress={() => setModalVisible(false)}
                style={styles.closeButton}
              >
                <Text style={styles.closeButtonText}>Listo</Text>
              </TouchableOpacity>
            </View>
            <Picker
              selectedValue={selectedValue}
              onValueChange={onValueChange}
            >
              <Picker.Item label="Seleccione un tipo" value="" />
              {userTypes.map((type) => (
                <Picker.Item key={type.value} label={type.label} value={type.value} />
              ))}
            </Picker>
          </View>
        </View>
      </Modal>
      {error && <Text style={styles.errorText}>{error}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
  },
  label: {
    fontSize: 14,
    color: '#444',
    marginBottom: 6,
    fontWeight: '500',
  },
  pickerContainer: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    backgroundColor: '#fff',
    overflow: 'hidden',
  },
  picker: {
    height: 48,
  },
  iosPickerButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: 48,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    paddingHorizontal: 12,
    backgroundColor: '#fff',
  },
  pickerText: {
    fontSize: 16,
    color: '#333',
  },
  placeholderText: {
    color: '#000',
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalContent: {
    backgroundColor: '#000000',
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    padding: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#fff',
  },
  closeButton: {
    padding: 8,
  },
  closeButtonText: {
    color: '#007AFF',
    fontSize: 16,
  },
  errorBorder: {
    borderColor: '#e74c3c',
  },
  errorText: {
    color: '#e74c3c',
    fontSize: 12,
    marginTop: 4,
  },
});

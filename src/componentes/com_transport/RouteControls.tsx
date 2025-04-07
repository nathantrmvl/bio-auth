import React, { useState } from 'react';
import { View, TouchableOpacity, Text, Modal, StyleSheet, Alert } from 'react-native';
import { Coordinates, Route } from './types';

interface RouteControlsProps {
  isRouteActive: boolean;
  onStartRoute: (route: Route) => void;
  onEndRoute: () => void;
  userType: 'empleado' | 'autobus' | 'admin';
}

const RouteControls: React.FC<RouteControlsProps> = ({
  isRouteActive,
  onStartRoute,
  onEndRoute,
  userType,
}) => {
  const [modalVisible, setModalVisible] = useState(false);

  const handleStartRoute = () => {
    const newRoute: Route = {
      id: Date.now().toString(),
      name: `Ruta ${new Date().toLocaleTimeString()}`,
      points: [],
      isActive: true,
    };
    onStartRoute(newRoute);
    setModalVisible(false);
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity 
        style={[styles.button, isRouteActive && styles.stopButton]}
        onPress={isRouteActive ? onEndRoute : () => setModalVisible(true)}
      >
        <Text style={styles.buttonText}>
          {isRouteActive ? 'Detener Ruta' : 'Iniciar Ruta'}
        </Text>
      </TouchableOpacity>

      <Modal visible={modalVisible} transparent animationType="slide">
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalText}>
              {userType === 'autobus' 
                ? '¿Iniciar nueva ruta?' 
                : '¿Solicitar transporte?'}
            </Text>
            <TouchableOpacity 
              style={styles.confirmButton}
              onPress={handleStartRoute}
            >
              <Text style={styles.buttonText}>Confirmar</Text>
            </TouchableOpacity>
            <TouchableOpacity 
              style={styles.cancelButton}
              onPress={() => setModalVisible(false)}
            >
              <Text style={styles.cancelButtonText}>Cancelar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 8,
  },
  button: {
    backgroundColor: '#007AFF',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
  },
  stopButton: {
    backgroundColor: '#FF3B30',
  },
  buttonText: {
    color: '#FFF',
    fontWeight: 'bold',
    fontSize: 16,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalContent: {
    backgroundColor: '#FFF',
    borderRadius: 12,
    padding: 20,
    width: '80%',
  },
  modalText: {
    fontSize: 18,
    textAlign: 'center',
    marginBottom: 20,
    fontWeight: '500',
  },
  confirmButton: {
    backgroundColor: '#007AFF',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 8,
  },
  cancelButton: {
    backgroundColor: '#F1F1F1',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  cancelButtonText: {
    color: '#333',
    fontWeight: '500',
  },
});

export default RouteControls;
import React from 'react';
import { Text, View, StyleSheet } from 'react-native';

interface TransportHeaderProps {
  title: string;
  userType: 'empleado' | 'autobus' | 'admin';
}

const TransportHeader: React.FC<TransportHeaderProps> = ({ title, userType }) => {
  const getRoleText = () => {
    switch(userType) {
      case 'autobus': return 'Conductor';
      case 'admin': return 'Administrador';
      default: return 'Pasajero';
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.roleText}>{getRoleText()}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    paddingBottom: 8,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 4,
  },
  roleText: {
    fontSize: 16,
    color: '#666',
    fontWeight: '500',
  },
});

export default TransportHeader;
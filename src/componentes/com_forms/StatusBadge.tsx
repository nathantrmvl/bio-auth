import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

interface StatusBadgeProps {
  status: string;
}

export const StatusBadge: React.FC<StatusBadgeProps> = ({ status }) => {
  const getStatusStyle = () => {
    switch (status) {
      case 'Activo': return styles.active;
      case 'Inactivo': return styles.inactive;
      case 'Bloqueado': return styles.blocked;
      default: return styles.default;
    }
  };

  return (
    <View style={[styles.container, getStatusStyle()]}>
      <Text style={styles.text}>{status}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 12,
    alignSelf: 'flex-start',
  },
  text: {
    fontSize: 14,
    fontWeight: '600',
    color: '#fff',
  },
  active: {
    backgroundColor: '#2ecc71',
  },
  inactive: {
    backgroundColor: '#e67e22',
  },
  blocked: {
    backgroundColor: '#e74c3c',
  },
  default: {
    backgroundColor: '#95a5a6',
  },
});
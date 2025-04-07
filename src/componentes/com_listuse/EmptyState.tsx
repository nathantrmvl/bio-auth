import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

export const EmptyState = () => {
  return (
    <View style={styles.container}>
      <MaterialIcons name="search-off" size={48} color="#9e9e9e" />
      <Text style={styles.title}>No se encontraron usuarios</Text>
      <Text style={styles.message}>
        Intenta con otro término de búsqueda o agrega un nuevo usuario
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 40,
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    color: '#212529',
    marginTop: 16,
  },
  message: {
    fontSize: 16,
    color: '#6c757d',
    textAlign: 'center',
    marginTop: 8,
    maxWidth: '80%',
  },
});
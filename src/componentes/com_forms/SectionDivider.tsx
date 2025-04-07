import React from 'react';
import { View, StyleSheet, Text } from 'react-native';

interface SectionDividerProps {
  title?: string;
}

export const SectionDivider: React.FC<SectionDividerProps> = ({ title }) => {
  return (
    <View style={styles.container}>
      {title && <Text style={styles.title}>{title}</Text>}
      <View style={styles.divider} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 16,
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
    color: '#444',
    marginBottom: 8,
  },
  divider: {
    height: 1,
    backgroundColor: '#eee',
  },
});

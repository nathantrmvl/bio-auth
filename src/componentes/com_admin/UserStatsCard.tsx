import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { AdminColors } from '../../theme/styleadmin';

interface UserStatsCardProps {
  value: number;
  label: string;
  color: string;
  icon: string;
}

export const UserStatsCard = ({ value, label, color, icon }: UserStatsCardProps) => {
  return (
    <View style={[styles.statCard, { backgroundColor: color }]}>
      <Text style={styles.statNumber}>{value}</Text>
      <Text style={styles.statLabel}>{label}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  statCard: {
    flex: 1,
    padding: 12,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 1,
    marginHorizontal: 5,
  },
  statNumber: {
    fontSize: 20,
    fontWeight: 'bold',
    color: AdminColors.dark,
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    color: AdminColors.dark,
    textAlign: 'center',
  },
});
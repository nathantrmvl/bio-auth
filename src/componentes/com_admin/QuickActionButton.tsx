import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { Feather, FontAwesome } from '@expo/vector-icons';

interface QuickActionButtonProps {
  label: string;
  icon: 'user-plus' | 'users';
  color: string;
  onPress: () => void;
}

export const QuickActionButton = ({ label, icon, color, onPress }: QuickActionButtonProps) => (
  <TouchableOpacity 
    style={[styles.quickActionButton, { backgroundColor: color }]}
    onPress={onPress}
  >
    {icon === 'user-plus' ? (
      <Feather name={icon} size={20} color="white" />
    ) : (
      <FontAwesome name={icon} size={18} color="white" />
    )}
    <Text style={styles.quickActionText}>{label}</Text>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  quickActionButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    borderRadius: 10,
    gap: 8,
    elevation: 2,
  },
  quickActionText: {
    color: 'white',
    fontWeight: '500',
    fontSize: 14,
  },
});
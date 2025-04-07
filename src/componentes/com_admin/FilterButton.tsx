import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { AdminColors } from '../../theme/styleadmin';

interface FilterButtonProps {
  label: string;
  icon: string;
  isActive: boolean;
  onPress: () => void;
  small?: boolean;
}

export const FilterButton = ({ label, icon, isActive, onPress, small }: FilterButtonProps) => (
  <TouchableOpacity 
    style={[
      styles.filterButton, 
      isActive && styles.activeFilter,
      small && styles.filterButtonSmall
    ]}
    onPress={onPress}
  >
    <Ionicons 
      name={icon} 
      size={16} 
      color={isActive ? AdminColors.white : AdminColors.primary} 
    />
    {!small && (
      <Text style={[
        styles.filterText, 
        isActive && styles.activeFilterText
      ]}>
        {label}
      </Text>
    )}
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  filterButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: AdminColors.white,
    borderWidth: 1,
    borderColor: AdminColors.border,
    gap: 6,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  filterButtonSmall: {
    paddingHorizontal: 10,
    paddingVertical: 6,
  },
  activeFilter: {
    backgroundColor: AdminColors.primary,
    borderColor: AdminColors.primaryDark,
  },
  filterText: {
    fontSize: 14,
    color: AdminColors.dark,
  },
  activeFilterText: {
    color: AdminColors.white,
    fontWeight: '500',
  },
});
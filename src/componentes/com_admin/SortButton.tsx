import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { AdminColors } from '../../theme/styleadmin';

interface SortButtonProps {
  label: string;
  sortBy: string;
  currentSort: string;
  sortOrder: 'asc' | 'desc';
  onPress: () => void;
  small?: boolean;
}

export const SortButton = ({ label, sortBy, currentSort, sortOrder, onPress, small }: SortButtonProps) => (
  <TouchableOpacity 
    style={styles.sortButton}
    onPress={onPress}
  >
    {!small && (
      <Text style={[
        styles.filterText,
        sortBy === currentSort && styles.activeSortText
      ]}>
        {label}
      </Text>
    )}
    <MaterialIcons 
      name={sortOrder === 'asc' ? 'arrow-upward' : 'arrow-downward'} 
      size={16} 
      color={sortBy === currentSort ? AdminColors.primary : AdminColors.gray}
    />
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  sortButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 6,
    gap: 4,
    borderRadius: 16,
    backgroundColor: AdminColors.white,
  },
  filterText: {
    fontSize: 14,
    color: AdminColors.dark,
  },
  activeSortText: {
    color: AdminColors.primary,
    fontWeight: '500',
  },
});
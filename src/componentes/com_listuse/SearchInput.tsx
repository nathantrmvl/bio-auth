import React from 'react';
import { View, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

interface SearchInputProps {
  value: string;
  onChangeText: (text: string) => void;
  placeholder?: string;
  style?: any;
}

export const SearchInput = ({ 
  value, 
  onChangeText, 
  placeholder, 
  style 
}: SearchInputProps) => {
  return (
    <View style={[styles.container, style]}>
      <MaterialIcons 
        name="search" 
        size={20} 
        color="#6c757d"
        style={styles.searchIcon}
      />
      <TextInput
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor="#6c757d"
        style={styles.input}
      />
      {value.length > 0 && (
        <TouchableOpacity 
          onPress={() => onChangeText('')}
          style={styles.clearButton}
        >
          <MaterialIcons name="close" size={20} color="#6c757d" />
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderWidth: 1,
    borderColor: '#dee2e6',
  },
  searchIcon: {
    marginRight: 8,
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: '#212529',
  },
  clearButton: {
    marginLeft: 8,
  },
});
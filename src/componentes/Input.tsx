import React from 'react';
import { View, TextInput, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

interface ProfessionalInputProps {
  label: string;
  value: string;
  onChangeText: (text: string) => void;
  placeholder: string;
  secureTextEntry?: boolean;
  disabled?: boolean;
  icon?: JSX.Element;
  error?: string;
}

export const ProfessionalInput: React.FC<ProfessionalInputProps> = ({
  label,
  value,
  onChangeText,
  placeholder,
  secureTextEntry = false,
  disabled = false,
  icon,
  error,
}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>
      <View
        style={[
          styles.inputContainer,
          error && styles.errorInput,
          disabled && styles.disabledInput,
        ]}
      >
        {icon && <View style={styles.iconContainer}>{icon}</View>}
        <TextInput
          style={styles.input}
          value={value}
          onChangeText={onChangeText}
          placeholder={placeholder}
          secureTextEntry={secureTextEntry}
          editable={!disabled}
          placeholderTextColor="#BDC3C7"
        />
      </View>
      {error && <Text style={styles.errorText}>{error}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    marginBottom: 16,
  },
  label: {
    color: '#BDC3C7',
    marginBottom: 4,
    fontWeight: '600',
    fontSize: 14,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 14,
    paddingHorizontal: 16,
    borderWidth: 1,
    borderColor: '#BDC3C7',
    borderRadius: 8,
    backgroundColor: '#FFFFFF',
    shadowColor: '#BDC3C7',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 4,
    transition: 'all 0.2s ease-in-out',
  },
  errorInput: {
    borderColor: '#E74C3C',
  },
  disabledInput: {
    backgroundColor: '#F0F0F0',
    borderColor: '#BDC3C7',
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: '#333333',
    paddingVertical: 0,
  },
  iconContainer: {
    marginRight: 12,
  },
  errorText: {
    color: '#E74C3C',
    fontSize: 12,
    marginTop: 4,
    fontWeight: '500',
  },
});

import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';

interface ProfessionalButtonProps {
  title: string;
  onPress: () => void;
  disabled?: boolean;
  variant?: 'primary' | 'secondary' | 'text';
  width?: number | string;
}

export const ProfessionalButton: React.FC<ProfessionalButtonProps> = ({
  title,
  onPress,
  disabled = false,
  variant = 'primary',
  width = '100%',
}) => {
  const buttonStyles = {
    primary: styles.primaryButton,
    secondary: styles.secondaryButton,
    text: styles.textButton,
  };

  const textStyles = {
    primary: styles.primaryButtonText,
    secondary: styles.secondaryButtonText,
    text: styles.textButtonText,
  };

  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={disabled}
      style={[buttonStyles[variant], { width }, disabled && styles.disabledButton]}
      activeOpacity={0.8}
    >
      <Text style={textStyles[variant]}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  primaryButton: {
    backgroundColor: '#000',
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 3,
    shadowColor: '#5271ff',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.15,
    shadowRadius: 5,
    transition: 'all 0.2s ease-in-out',
  },
  secondaryButton: {
    backgroundColor: '#F8F9F9',
    paddingVertical: 14,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#5271ff',
    alignItems: 'center',
    justifyContent: 'center',
    transition: 'all 0.2s ease-in-out',
  },
  textButton: {
    paddingVertical: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  primaryButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
  secondaryButtonText: {
    color: '#5271ff',
    fontSize: 16,
    fontWeight: '600',
  },
  textButtonText: {
    color: '#5271ff',
    fontSize: 14,
    fontWeight: '500',
    textDecorationLine: 'underline',
  },
  disabledButton: {
    opacity: 0.6,
    backgroundColor: '#BDC3C7',
  },
});

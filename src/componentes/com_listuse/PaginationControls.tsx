import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { ProfessionalButton } from '../newButton';
import { MaterialIcons } from '@expo/vector-icons';

interface PaginationControlsProps {
  page: number;
  onPrev: () => void;
  onNext: () => void;
  showNext: boolean;
}

export const PaginationControls = ({ 
  page, 
  onPrev, 
  onNext, 
  showNext 
}: PaginationControlsProps) => {
  return (
    <View style={styles.container}>
      {page > 1 && (
        <ProfessionalButton 
          title="Anterior"
          icon="chevron-left"
          onPress={onPrev}
          style={styles.button}
          textStyle={styles.buttonText}
        />
      )}
      
      <Text style={styles.pageNumber}>Página {page}</Text>
      
      {showNext && (
        <ProfessionalButton 
          title="Siguiente"
          icon="chevron-right"
          iconPosition="right"
          onPress={onNext}
          style={styles.button}
          textStyle={styles.buttonText}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 16,
    gap: 16,
  },
  button: {
    backgroundColor: '#2c6e49',
    borderRadius: 8,
    paddingVertical: 8,
    paddingHorizontal: 16,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#ffffff',
  },
  pageNumber: {
    fontSize: 16,
    fontWeight: '600',
    color: '#212529',
    marginHorizontal: 16,
  },
});
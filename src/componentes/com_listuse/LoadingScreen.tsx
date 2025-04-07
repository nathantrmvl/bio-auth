import React from 'react';
import { View, Text, ActivityIndicator, StyleSheet } from 'react-native';
import { AdminColors } from '../../theme/styleadmin';

interface LoadingScreenProps {
  message?: string;
}

export const LoadingScreen = ({ message = "Cargando..." }: LoadingScreenProps) => {
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: AdminColors.light,
    },
    text: {
      marginTop: 16,
      fontSize: 16,
      color: AdminColors.dark,
    }
  });

  return (
    <View style={styles.container}>
      <ActivityIndicator 
        size="large" 
        color={AdminColors.primary} 
      />
      <Text style={styles.text}>
        {message}
      </Text>
    </View>
  );
};
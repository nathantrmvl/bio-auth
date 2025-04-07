// screens/SettingsScreen.tsx
import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { currentTheme } from '../../theme/appTheme';
import { MaterialIcons } from '@expo/vector-icons';

export const SettingsScreen = () => {
  const [menuVisible, setMenuVisible] = useState(false);

  const settingsOptions = [
    { id: '1', title: 'Configuración de cuenta', icon: 'account-circle' },
    { id: '2', title: 'Notificaciones', icon: 'notifications' },
    { id: '3', title: 'Privacidad', icon: 'lock' },
    { id: '4', title: 'Tema de la app', icon: 'color-lens' },
    { id: '5', title: 'Ayuda y soporte', icon: 'help' },
    { id: '6', title: 'Cerrar sesión', icon: 'exit-to-app' },
  ];

  return (
    <View style={currentTheme.container}>
      <Text style={currentTheme.title}>Ajustes</Text>
      
      <TouchableOpacity 
        style={styles.menuButton}
        onPress={() => setMenuVisible(!menuVisible)}
      >
        <Text style={styles.menuButtonText}>Mostrar opciones</Text>
        <MaterialIcons 
          name={menuVisible ? 'keyboard-arrow-up' : 'keyboard-arrow-down'} 
          size={24} 
          color={currentTheme.headerTitle.color} 
        />
      </TouchableOpacity>

      {menuVisible && (
        <View style={styles.menuContainer}>
          {settingsOptions.map((option) => (
            <TouchableOpacity 
              key={option.id}
              style={styles.optionItem}
              onPress={() => console.log(option.title)}
            >
              <MaterialIcons 
                name={option.icon} 
                size={24} 
                color={currentTheme.headerTitle.color} 
                style={styles.optionIcon}
              />
              <Text style={[styles.optionText, { color: currentTheme.headerTitle.color }]}>
                {option.title}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  menuButton: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    marginVertical: 10,
    borderRadius: 8,
    backgroundColor: 'rgba(0,0,0,0.1)',
  },
  menuButtonText: {
    fontSize: 16,
    marginRight: 10,
  },
  menuContainer: {
    width: '100%',
    marginTop: 10,
    borderRadius: 8,
    overflow: 'hidden',
  },
  optionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(0,0,0,0.1)',
  },
  optionIcon: {
    marginRight: 15,
  },
  optionText: {
    fontSize: 16,
  },
});
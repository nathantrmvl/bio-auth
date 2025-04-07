import React, { useState, useEffect } from 'react';
import { View, TouchableOpacity, Text, StyleSheet, StatusBar } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { useNavigation } from '@react-navigation/native';
import { getStatusBarHeight } from 'react-native-iphone-x-helper';
import { useWindowDimensions } from 'react-native';

interface CustomHeaderProps {
  navigation: any;
  title?: string;
}

export const CustomHeader: React.FC<CustomHeaderProps> = ({ navigation, title = "BioAuth" }) => {
  const [notifications, setNotifications] = useState(0);
  const nav = useNavigation();
  const { width } = useWindowDimensions();
  const isSmallScreen = width < 400;

  useEffect(() => {
    // Simular notificaciones
    setNotifications(3);
  }, []);

  const handleNotificationsPress = () => {
    nav.navigate("NotificationsScreen");
  };

  const handleMenuPress = () => {
    navigation.toggleDrawer();
  };

  const handleCalendarPress = () => {
    nav.navigate("CalendarScreen");
  };

  const handleChatPress = () => {
    nav.navigate("HelpChatScreen");
  };

  const handleNewsPress = () => {
    nav.navigate("NewsScreen");
  };

  return (
    <View style={[
      styles.headerContainer,
      { 
        paddingTop: getStatusBarHeight(),
        height: getStatusBarHeight() + (isSmallScreen ? 50 : 60)
      }
    ]}>
      <StatusBar backgroundColor="#1a1a1a" barStyle="light-content" translucent />
      
      <View style={styles.headerContent}>
        {/* Notificaciones - Izquierda */}
        <TouchableOpacity 
          onPress={handleNotificationsPress}
          style={styles.notificationButton}
        >
          <Ionicons 
            name="notifications" 
            size={isSmallScreen ? 20 : 24} 
            color="white" 
          />
          {notifications > 0 && (
            <View style={styles.badge}>
              <Text style={styles.badgeText}>
                {notifications > 9 ? '9+' : notifications}
              </Text>
            </View>
          )}
        </TouchableOpacity>

        {/* Nuevos botones - Centro */}
        <View style={styles.actionsContainer}>
          <TouchableOpacity 
            onPress={handleCalendarPress}
            style={styles.actionButton}
          >
            <MaterialCommunityIcons 
              name="calendar" 
              size={isSmallScreen ? 20 : 22} 
              color="white" 
            />
          </TouchableOpacity>
          
          <TouchableOpacity 
            onPress={handleChatPress}
            style={styles.actionButton}
          >
            <MaterialCommunityIcons 
              name="chat" 
              size={isSmallScreen ? 20 : 22} 
              color="white" 
            />
          </TouchableOpacity>
          
          <TouchableOpacity 
            onPress={handleNewsPress}
            style={styles.actionButton}
          >
            <MaterialCommunityIcons 
              name="newspaper" 
              size={isSmallScreen ? 20 : 22} 
              color="white" 
            />
          </TouchableOpacity>
        </View>

        {/* Menú - Derecha */}
        <TouchableOpacity 
          onPress={handleMenuPress}
          style={styles.menuButton}
        >
          <Ionicons name="menu" size={isSmallScreen ? 24 : 28} color="white" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    backgroundColor: '#000',
    borderBottomWidth: 1,
    borderBottomColor: '#333',
    width: '100%',
  },
  headerContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 15,
    paddingVertical: 10,
  },
  actionsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  actionButton: {
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  menuButton: {
    padding: 8,
  },
  notificationButton: {
    padding: 8,
    position: 'relative',
  },
  badge: {
    position: 'absolute',
    right: 2,
    top: 2,
    backgroundColor: 'red',
    borderRadius: 10,
    width: 18,
    height: 18,
    justifyContent: 'center',
    alignItems: 'center',
  },
  badgeText: {
    color: 'white',
    fontSize: 10,
    fontWeight: 'bold',
  },
});
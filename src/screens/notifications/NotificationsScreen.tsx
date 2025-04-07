import React, { useState, useEffect } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  FlatList, 
  TouchableOpacity, 
  Image, 
  SafeAreaView,
  RefreshControl 
} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { useNavigation } from '@react-navigation/native';

interface Notification {
  id: string;
  title: string;
  message: string;
  timestamp: string;
  isRead: boolean;
  type: 'system' | 'alert' | 'reminder' | 'update';
  icon?: string;
}

const NotificationsScreen = () => {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [refreshing, setRefreshing] = useState(false);
  const navigation = useNavigation();

  // Datos de ejemplo para notificaciones
  const mockNotifications: Notification[] = [
    {
      id: '1',
      title: 'Actualización del sistema',
      message: 'Se ha lanzado una nueva versión de la aplicación con mejoras de rendimiento',
      timestamp: 'Hace 2 horas',
      isRead: false,
      type: 'update',
      icon: 'update'
    },
    {
      id: '2',
      title: 'Recordatorio importante',
      message: 'Tu credencial virtual expirará en 7 días, renueva ahora',
      timestamp: 'Hace 1 día',
      isRead: true,
      type: 'reminder',
      icon: 'calendar-clock'
    },
    {
      id: '3',
      title: 'Alerta de seguridad',
      message: 'Se detectó un intento de acceso sospechoso a tu cuenta',
      timestamp: 'Hace 3 días',
      isRead: true,
      type: 'alert',
      icon: 'alert-circle'
    },
    {
      id: '4',
      title: 'Mantenimiento programado',
      message: 'El sistema estará en mantenimiento el próximo domingo de 2:00 a 6:00 AM',
      timestamp: 'Hace 5 días',
      isRead: true,
      type: 'system',
      icon: 'wrench'
    },
  ];

  useEffect(() => {
    loadNotifications();
  }, []);

  const loadNotifications = () => {
    setRefreshing(true);
    // Simular carga de datos
    setTimeout(() => {
      setNotifications(mockNotifications);
      setRefreshing(false);
    }, 1000);
  };

  const markAsRead = (id: string) => {
    setNotifications(notifications.map(notification => 
      notification.id === id ? { ...notification, isRead: true } : notification
    ));
  };

  const getIconName = (type: string) => {
    switch(type) {
      case 'update': return 'update';
      case 'reminder': return 'calendar-clock';
      case 'alert': return 'alert-circle';
      case 'system': return 'wrench';
      default: return 'bell';
    }
  };

  const getIconColor = (type: string) => {
    switch(type) {
      case 'update': return '#4CAF50';
      case 'reminder': return '#FF9800';
      case 'alert': return '#F44336';
      case 'system': return '#2196F3';
      default: return '#9E9E9E';
    }
  };

  const renderItem = ({ item }: { item: Notification }) => (
    <TouchableOpacity 
      style={[
        styles.notificationItem,
        !item.isRead && styles.unreadNotification
      ]}
      onPress={() => markAsRead(item.id)}
    >
      <View style={styles.notificationIcon}>
        <MaterialCommunityIcons 
          name={item.icon || getIconName(item.type)} 
          size={24} 
          color={getIconColor(item.type)} 
        />
      </View>
      <View style={styles.notificationContent}>
        <Text style={styles.notificationTitle}>{item.title}</Text>
        <Text style={styles.notificationMessage}>{item.message}</Text>
        <Text style={styles.notificationTime}>{item.timestamp}</Text>
      </View>
      {!item.isRead && (
        <View style={styles.unreadBadge} />
      )}
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Notificaciones</Text>
        <TouchableOpacity onPress={() => setNotifications(notifications.map(n => ({ ...n, isRead: true })))}>
          <Text style={styles.markAllText}>Marcar todas como leídas</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={notifications}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContent}
        refreshControl={
          <RefreshControl 
            refreshing={refreshing} 
            onRefresh={loadNotifications}
            colors={['#596dc6']}
          />
        }
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <MaterialCommunityIcons name="bell-off" size={50} color="#ccc" />
            <Text style={styles.emptyText}>No hay notificaciones</Text>
          </View>
        }
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
    backgroundColor: 'white',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
  },
  markAllText: {
    color: '#000',
    fontSize: 14,
  },
  listContent: {
    paddingBottom: 20,
  },
  notificationItem: {
    flexDirection: 'row',
    padding: 16,
    marginHorizontal: 16,
    marginVertical: 8,
    backgroundColor: 'white',
    borderRadius: 10,
    elevation: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  unreadNotification: {
    borderLeftWidth: 4,
    borderLeftColor: '#596dc6',
  },
  notificationIcon: {
    marginRight: 16,
    justifyContent: 'center',
  },
  notificationContent: {
    flex: 1,
  },
  notificationTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 4,
  },
  notificationMessage: {
    fontSize: 14,
    color: '#666',
    marginBottom: 4,
  },
  notificationTime: {
    fontSize: 12,
    color: '#999',
  },
  unreadBadge: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#596dc6',
    alignSelf: 'center',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 40,
  },
  emptyText: {
    marginTop: 15,
    fontSize: 16,
    color: '#888',
    textAlign: 'center',
  },
});

export default NotificationsScreen;
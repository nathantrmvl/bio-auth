import React from 'react';
import { View, Image, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Animated, { FadeInDown } from 'react-native-reanimated';
import { MaterialIcons, FontAwesome, Feather, AntDesign, Ionicons } from '@expo/vector-icons';
import { AdminColors } from '../../theme/styleadmin';

interface UserCardProps {
  user: any;
  onEdit: () => void;
  onDelete: () => void;
  onView?: () => void;
  index: number;
}

export const UserCard = ({ user, onEdit, onDelete, onView, index }: UserCardProps) => {
  const statusStyle = user.status === 'Activo' ? styles.statusActive : 
                     user.status === 'Inactivo' ? styles.statusInactive : 
                     styles.statusWarning;

  // Extraer los primeros 6 caracteres del ID para mostrarlo de forma más legible
  const shortId = user._id ? user._id.substring(0, 6) + '...' : 'N/A';

  // Determinar el icono y color según el tipo de usuario
  const getUserTypeIcon = () => {
    switch(user.type_user?.toLowerCase()) {
      case 'admin':
        return { icon: 'shield', color: AdminColors.primary };
      case 'manager':
        return { icon: 'star', color: AdminColors.warning };
      case 'supervisor':
        return { icon: 'user-check', color: AdminColors.success };
      default:
        return { icon: 'user', color: AdminColors.gray };
    }
  };

  const userType = getUserTypeIcon();

  return (
    <Animated.View 
      style={styles.card}
      entering={FadeInDown.delay(index * 50).springify()}
    >
      <View style={styles.cardHeader}>
        <View style={styles.headerLeft}>
          <Text style={styles.userId}>ID: {shortId}</Text>
          <View style={styles.userTypeBadge}>
            <Feather name={userType.icon} size={14} color={userType.color} />
            <Text style={[styles.userTypeText, { color: userType.color }]}>
              {user.type_user || 'Usuario'}
            </Text>
          </View>
        </View>
        <View style={[styles.statusBadge, statusStyle]}>
          <Text style={styles.statusText}>{user.status}</Text>
        </View>
      </View>

      <TouchableOpacity 
        style={styles.cardContent}
        onPress={onView}
        activeOpacity={0.9}
      >
        <View style={styles.userInfo}>
          <Image
            source={user.image ? 
              { uri: `data:image/jpeg;base64,${user.image}` } : 
              require("../../../assets/user.jpg")}
            style={styles.avatar}
          />
          <View style={styles.textContainer}>
            <Text style={styles.name} numberOfLines={1} ellipsizeMode="tail">
              {user.name} {user.f_surname} {user.m_surname}
            </Text>
            
            {/* Información principal */}
            <View style={styles.detailRow}>
              <MaterialIcons name="work-outline" size={16} color={AdminColors.gray} />
              <Text style={styles.detailText} numberOfLines={1}>
                {user.position || 'Sin cargo asignado'}
              </Text>
            </View>

            <View style={styles.detailRow}>
              <MaterialIcons name="business" size={16} color={AdminColors.gray} />
              <Text style={styles.detailText}>
                {user.department || 'Sin departamento'}
              </Text>
            </View>

            {/* Nueva información: Email */}
            {user.email && (
              <View style={styles.detailRow}>
                <MaterialIcons name="email" size={16} color={AdminColors.gray} />
                <Text style={styles.detailText} numberOfLines={1}>
                  {user.email}
                </Text>
              </View>
            )}

            {/* Información secundaria (se muestra solo si hay espacio) */}
            <View style={styles.secondaryInfo}>
              <View style={styles.detailRow}>
                <MaterialIcons name="person-outline" size={14} color={AdminColors.gray} />
                <Text style={styles.secondaryText} numberOfLines={1}>
                  {user.userKey || 'Sin usuario'}
                </Text>
              </View>
              
              <View style={styles.detailRow}>
                <Ionicons name="time-outline" size={14} color={AdminColors.gray} />
                <Text style={styles.secondaryText}>
                  {new Date(user.createdAt).toLocaleDateString()}
                </Text>
              </View>
            </View>
          </View>
        </View>
      </TouchableOpacity>

      <View style={styles.actions}>
        <TouchableOpacity 
          style={[styles.actionButton, styles.editButton]}
          onPress={onEdit}
          activeOpacity={0.7}
        >
          <Feather name="edit" size={16} color="white" />
          <Text style={styles.actionButtonText}>Editar</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={[styles.actionButton, styles.deleteButton]}
          onPress={onDelete}
          activeOpacity={0.7}
        >
          <AntDesign name="delete" size={16} color="white" />
          <Text style={styles.actionButtonText}>Eliminar</Text>
        </TouchableOpacity>
      </View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: AdminColors.white,
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    borderLeftWidth: 4,
    borderLeftColor: '#5271ff',
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
    paddingBottom: 8,
    borderBottomWidth: 1,
    borderBottomColor: AdminColors.lightGray,
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  userId: {
    fontSize: 12,
    color: AdminColors.gray,
    fontFamily: 'monospace',
  },
  userTypeBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 10,
    backgroundColor: AdminColors.light,
  },
  userTypeText: {
    fontSize: 12,
    fontWeight: '500',
  },
  cardContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  userInfo: {
    flexDirection: 'row',
    flex: 1,
  },
  textContainer: {
    flex: 1,
    marginLeft: 12,
  },
  avatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
    borderWidth: 2,
    borderColor: '#5271ff',
  },
  name: {
    fontSize: 16,
    fontWeight: '600',
    color: AdminColors.dark,
    marginBottom: 6,
  },
  detailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 6,
  },
  detailText: {
    fontSize: 13,
    color: AdminColors.dark,
    marginLeft: 8,
    flexShrink: 1,
  },
  secondaryInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 6,
    paddingTop: 6,
    borderTopWidth: 1,
    borderTopColor: AdminColors.lightGray,
  },
  secondaryText: {
    fontSize: 12,
    color: AdminColors.gray,
    marginLeft: 6,
  },
  statusBadge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  statusActive: {
    backgroundColor: AdminColors.success,
  },
  statusInactive: {
    backgroundColor: AdminColors.error,
  },
  statusWarning: {
    backgroundColor: AdminColors.warning,
  },
  statusText: {
    fontSize: 12,
    fontWeight: '600',
    color: AdminColors.white,
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    gap: 12,
    marginTop: 8,
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 8,
    paddingVertical: 8,
    paddingHorizontal: 12,
    minWidth: 100,
    gap: 6,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 2,
  },
  editButton: {
    backgroundColor: AdminColors.success,
  },
  deleteButton: {
    backgroundColor: AdminColors.error,
  },
  actionButtonText: {
    fontSize: 14,
    fontWeight: '500',
    color: AdminColors.white,
  },
});
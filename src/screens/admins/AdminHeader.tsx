import React from 'react';
import { 
  View, 
  Image, 
  Text, 
  StyleSheet, 
  Dimensions,
  TouchableOpacity 
} from 'react-native';
import { MaterialIcons, Ionicons, Feather } from '@expo/vector-icons';
import { SearchInput } from '../../componentes/com_listuse/SearchInput';
import { AdminColors } from '../../theme/styleadmin';

interface AdminHeaderProps {
  search: string;
  onSearchChange: (text: string) => void;
  onAddUser: () => void;
  onViewHistory: () => void;
  onViewDashboard?: () => void;
}

export const AdminHeader = ({ 
  search, 
  onSearchChange, 
  onAddUser, 
  onViewHistory,
  onViewDashboard
}: AdminHeaderProps) => {
  const screenWidth = Dimensions.get('window').width;
  const isSmallScreen = screenWidth < 400;
  const isMediumScreen = screenWidth < 600;

  return (
    <View style={styles.container}>
      {/* Encabezado superior con logo y título */}
      <View style={styles.headerTop}>
        <View style={styles.logoContainer}>
          <Image 
            style={[styles.logo, isSmallScreen && styles.logoSmall]} 
            source={require("../../../assets/logbiofull.png")} 
          />
          {!isSmallScreen && (
            <Text style={styles.title}>Gestión de Usuarios</Text>
          )}
        </View>
        
        {!isMediumScreen && onViewDashboard && (
          <TouchableOpacity 
            style={styles.dashboardButton}
            onPress={onViewDashboard}
            activeOpacity={0.8}
          >
            <Feather name="pie-chart" size={18} color={AdminColors.primary} />
            <Text style={styles.dashboardButtonText}>Dashboard</Text>
          </TouchableOpacity>
        )}
      </View>

      {/* Barra de búsqueda */}
      <View style={styles.searchRow}>
        <SearchInput
          value={search}
          onChangeText={onSearchChange}
          placeholder="Buscar usuarios..."
          containerStyle={styles.searchContainer}
          inputStyle={styles.searchInput}
        />
        
        {isMediumScreen && onViewDashboard && (
          <TouchableOpacity 
            style={styles.dashboardButtonSmall}
            onPress={onViewDashboard}
            activeOpacity={0.8}
          >
            <Feather name="pie-chart" size={18} color={AdminColors.primary} />
          </TouchableOpacity>
        )}
      </View>

      {/* Botones de acción principales */}
      <View style={styles.actions}>
        <TouchableOpacity 
          style={[styles.actionButton, styles.primaryButton]}
          onPress={onAddUser}
          activeOpacity={0.8}
        >
          <Ionicons name="person-add" size={18} color="white" />
          <Text style={styles.buttonText}>Nuevo Usuario</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={[styles.actionButton, styles.secondaryButton]}
          onPress={onViewHistory}
          activeOpacity={0.8}
        >
          <MaterialIcons name="history" size={18} color="white" />
          <Text style={styles.buttonText}>Historial</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: 16,
    backgroundColor: AdminColors.white,
    borderBottomWidth: 1,
    borderBottomColor: AdminColors.lightGray,
    marginBottom: 16,
    paddingHorizontal: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 6,
    elevation: 3,
  },
  headerTop: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  logoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  logo: {
    width: 160,
    height: 40,
    resizeMode: 'contain',
  },
  logoSmall: {
    width: 130,
    height: 32,
  },
  title: {
    fontSize: 18,
    fontWeight: '700',
    color: AdminColors.primaryDark,
    marginLeft: 12,
    letterSpacing: 0.5,
  },
  searchRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
    gap: 10,
  },
  searchContainer: {
    flex: 1,
  },
  searchInput: {
    backgroundColor: AdminColors.light,
    borderColor: AdminColors.border,
    height: 42,
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 12,
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 16,
    flex: 1,
    gap: 8,
    shadowColor: AdminColors.primaryDark,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  primaryButton: {
    backgroundColor: AdminColors.primary,
  },
  secondaryButton: {
    backgroundColor: AdminColors.secondary,
  },
  buttonText: {
    fontSize: 15,
    fontWeight: '500',
    color: AdminColors.white,
    letterSpacing: 0.3,
  },
  dashboardButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 6,
    backgroundColor: AdminColors.light,
    gap: 6,
    borderWidth: 1,
    borderColor: AdminColors.border,
  },
  dashboardButtonSmall: {
    padding: 10,
    borderRadius: 6,
    backgroundColor: AdminColors.light,
    borderWidth: 1,
    borderColor: AdminColors.border,
  },
  dashboardButtonText: {
    fontSize: 14,
    fontWeight: '500',
    color: AdminColors.primary,
  },
});
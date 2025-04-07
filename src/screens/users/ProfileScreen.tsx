import React from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  ScrollView, 
  SafeAreaView,
  Image,
  Platform,
  StatusBar,
  Dimensions
} from 'react-native';
import { useAuth } from '../../context/AuthContext';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';

// Función de normalización responsiva
const { width, height } = Dimensions.get('window');
const guidelineBaseWidth = 375;
const guidelineBaseHeight = 812;

const scale = (size: number) => width / guidelineBaseWidth * size;
const verticalScale = (size: number) => height / guidelineBaseHeight * size;
const moderateScale = (size: number, factor = 0.5) => size + (scale(size) - size) * factor;

const normalize = (size: number) => {
  const newSize = scale(size);
  if (Platform.OS === 'ios') {
    return Math.round(newSize);
  } else {
    return Math.round(newSize) - 1;
  }
};

const ProfileScreen = () => {
  const { authState } = useAuth();
  
  // Función para formatear el tipo de usuario
  const formatUserType = (type: string) => {
    switch(type?.toLowerCase()) {
      case 'administrador': return 'Administrador';
      case 'seguridad': return 'Personal de Seguridad';
      case 'autobus': return 'Chofer de Transporte';
      default: return 'Empleado';
    }
  };

  // Datos del perfil organizados en secciones
  const profileSections = [
    {
      title: 'Información Personal',
      icon: 'account',
      items: [
        { label: 'Nombre', value: authState.name, icon: 'account-outline' },
        { label: 'Apellido Paterno', value: authState.f_surname, icon: 'account-outline' },
        { label: 'Apellido Materno', value: authState.m_surname, icon: 'account-outline' },
        { label: 'Email', value: authState.email, icon: 'email-outline' },
      ]
    },
    {
      title: 'Información Laboral',
      icon: 'briefcase',
      items: [
        { label: 'Tipo de Usuario', value: formatUserType(authState.type_user), icon: 'badge-account-horizontal-outline' },
        { label: 'Departamento', value: authState.department, icon: 'office-building-outline' },
        { label: 'Puesto', value: authState.position, icon: 'briefcase-outline' },
        { label: 'Estado', value: authState.status, icon: 'check-circle-outline' },
      ]
    },
    {
      title: 'Credenciales',
      icon: 'key',
      items: [
        { label: 'ID de Usuario', value: authState._id, icon: 'identifier' },
        { label: 'Clave de Usuario', value: authState.userKey, icon: 'key-outline' },
      ]
    }
  ];

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />
      
      <ScrollView 
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Encabezado con foto y nombre */}
        <View style={styles.header}>
          <View style={styles.avatarContainer}>
            <Image
              source={
                authState.image 
                  ? { uri: `data:image/jpeg;base64,${authState.image}` }
                  : require("../../../assets/user.jpg")
              }
              style={[
                styles.avatar,
                {
                  width: normalize(100),
                  height: normalize(100),
                  borderRadius: normalize(50),
                  borderWidth: moderateScale(3),
                }
              ]}
            />
            <View style={styles.verifiedBadge}>
              <Ionicons 
                name="checkmark-circle" 
                size={normalize(20)} 
                color="#4CAF50" 
              />
            </View>
          </View>
          
          <Text style={[styles.userName, { fontSize: normalize(20) }]}>
            {authState.name} {authState.f_surname} {authState.m_surname}
          </Text>
          
          <View style={styles.userTypeBadge}>
            <MaterialCommunityIcons 
              name={authState.type_user === 'administrador' ? 'shield-account' : 'badge-account'} 
              size={normalize(16)} 
              color="#FFFFFF" 
            />
            <Text style={[styles.userTypeText, { fontSize: normalize(12) }]}>
              {formatUserType(authState.type_user)}
            </Text>
          </View>
        </View>

        {/* Secciones del perfil */}
        {profileSections.map((section, sectionIndex) => (
          <View 
            key={`section-${sectionIndex}`} 
            style={[
              styles.section,
              { marginBottom: verticalScale(10) }
            ]}
          >
            <View style={styles.sectionHeader}>
              <MaterialCommunityIcons 
                name={section.icon} 
                size={normalize(20)} 
                color="#3F51B5" 
              />
              <Text style={[styles.sectionTitle, { fontSize: normalize(16) }]}>
                {section.title}
              </Text>
            </View>
            
            <View style={styles.sectionContent}>
              {section.items.map((item, itemIndex) => (
                <View 
                  key={`item-${itemIndex}`} 
                  style={[
                    styles.infoRow,
                    { paddingVertical: verticalScale(12) }
                  ]}
                >
                  <View style={[styles.infoIcon, { width: normalize(40) }]}>
                    <MaterialCommunityIcons 
                      name={item.icon} 
                      size={normalize(20)} 
                      color="#757575" 
                    />
                  </View>
                  <View style={styles.infoTextContainer}>
                    <Text style={[styles.infoLabel, { fontSize: normalize(12) }]}>
                      {item.label}
                    </Text>
                    <Text 
                      style={[styles.infoValue, { fontSize: normalize(14) }]}
                      numberOfLines={1}
                      ellipsizeMode="tail"
                    >
                      {item.value || 'No especificado'}
                    </Text>
                  </View>
                </View>
              ))}
            </View>
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  scrollContent: {
    paddingBottom: verticalScale(20),
  },
  header: {
    alignItems: 'center',
    padding: moderateScale(20),
    backgroundColor: '#FFFFFF',
    marginBottom: verticalScale(10),
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  avatarContainer: {
    position: 'relative',
    marginBottom: verticalScale(10),
  },
  avatar: {
    borderColor: '#3F51B5',
  },
  verifiedBadge: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    backgroundColor: '#FFFFFF',
    borderRadius: moderateScale(12),
    padding: moderateScale(3),
  },
  userName: {
    fontWeight: 'bold',
    color: '#212121',
    textAlign: 'center',
    marginBottom: verticalScale(5),
  },
  userTypeBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#3F51B5',
    paddingHorizontal: moderateScale(12),
    paddingVertical: verticalScale(5),
    borderRadius: moderateScale(20),
  },
  userTypeText: {
    color: '#FFFFFF',
    fontWeight: '500',
    marginLeft: moderateScale(5),
  },
  section: {
    backgroundColor: '#FFFFFF',
    borderRadius: moderateScale(8),
    overflow: 'hidden',
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: moderateScale(15),
    backgroundColor: '#F5F5F5',
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  sectionTitle: {
    fontWeight: '600',
    color: '#212121',
    marginLeft: moderateScale(10),
  },
  sectionContent: {
    paddingVertical: verticalScale(5),
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: moderateScale(15),
    borderBottomWidth: 1,
    borderBottomColor: '#F5F5F5',
  },
  infoIcon: {
    alignItems: 'center',
  },
  infoTextContainer: {
    flex: 1,
  },
  infoLabel: {
    color: '#757575',
    marginBottom: verticalScale(2),
  },
  infoValue: {
    color: '#212121',
    fontWeight: '500',
  },
});

export default ProfileScreen;
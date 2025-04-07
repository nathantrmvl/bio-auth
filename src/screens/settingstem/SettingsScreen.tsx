import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  Switch,
  StatusBar,
  Dimensions,
  Platform
} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { useAuth } from '../../context/AuthContext';

// Funciones de normalización responsiva (las mismas que en ProfileScreen)
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

const SettingsScreen = () => {
  const [notificationsEnabled, setNotificationsEnabled] = React.useState(true);
  const [darkModeEnabled, setDarkModeEnabled] = React.useState(false);
  const [biometricEnabled, setBiometricEnabled] = React.useState(false);

  const { authState } = useAuth();

  const settingsOptions = [
    {
      title: "Cuenta",
      icon: "account-cog",
      items: [
        {
          label: "Cambiar contraseña",
          icon: "lock-reset",
          action: () => console.log("Cambiar contraseña"),
        },
        {
          label: "Seguridad",
          icon: "shield-account",
          action: () => console.log("Seguridad"),
        },
      ],
    },
    {
      title: "Notificaciones",
      icon: "bell",
      items: [
        {
          label: "Notificaciones push",
          icon: "bell-outline",
          component: (
            <Switch
              value={notificationsEnabled}
              onValueChange={setNotificationsEnabled}
              trackColor={{ false: "#767577", true: "#81b0ff" }}
              thumbColor={notificationsEnabled ? "#3F51B5" : "#f4f3f4"}
            />
          ),
        },
        {
          label: "Sonido de notificaciones",
          icon: "music-note",
          component: (
            <Switch
              value={true}
              onValueChange={() => {}}
              trackColor={{ false: "#767577", true: "#81b0ff" }}
              thumbColor="#3F51B5"
            />
          ),
        },
      ],
    },
    {
      title: "Apariencia",
      icon: "palette",
      items: [
        {
          label: "Modo oscuro",
          icon: "weather-night",
          component: (
            <Switch
              value={darkModeEnabled}
              onValueChange={setDarkModeEnabled}
              trackColor={{ false: "#767577", true: "#81b0ff" }}
              thumbColor={darkModeEnabled ? "#3F51B5" : "#f4f3f4"}
            />
          ),
        },
      ],
    },
    {
      title: "Seguridad",
      icon: "security",
      items: [
        {
          label: "Autenticación biométrica",
          icon: "fingerprint",
          component: (
            <Switch
              value={biometricEnabled}
              onValueChange={setBiometricEnabled}
              trackColor={{ false: "#767577", true: "#81b0ff" }}
              thumbColor={biometricEnabled ? "#3F51B5" : "#f4f3f4"}
            />
          ),
        },
        {
          label: "Bloqueo automático",
          icon: "lock-clock",
          action: () => console.log("Bloqueo automático"),
        },
      ],
    },
    {
      title: "Ayuda",
      icon: "help-circle",
      items: [
        {
          label: "Centro de ayuda",
          icon: "help-box",
          action: () => console.log("Centro de ayuda"),
        },
        {
          label: "Reportar un problema",
          icon: "alert-circle",
          action: () => console.log("Reportar problema"),
        },
        {
          label: "Términos y condiciones",
          icon: "file-document",
          action: () => console.log("Términos y condiciones"),
        },
      ],
    },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />
      
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.header}>
          <Text style={[styles.headerText, { fontSize: normalize(24) }]}>
            Configuración
          </Text>
          <Text style={[styles.subHeaderText, { fontSize: normalize(14) }]}>
            {authState.email}
          </Text>
        </View>

        {settingsOptions.map((section, sectionIndex) => (
          <View
            key={`section-${sectionIndex}`}
            style={[
              styles.section,
              { marginBottom: verticalScale(15) }
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
                    styles.optionRow,
                    {
                      paddingVertical: verticalScale(12),
                      borderBottomWidth: itemIndex === section.items.length - 1 ? 0 : 1,
                    }
                  ]}
                >
                  <View style={[styles.optionIcon, { width: normalize(40) }]}>
                    <MaterialCommunityIcons
                      name={item.icon}
                      size={normalize(20)}
                      color="#757575"
                    />
                  </View>

                  <Text style={[styles.optionLabel, { fontSize: normalize(14) }]}>
                    {item.label}
                  </Text>

                  {item.component ? (
                    item.component
                  ) : (
                    <MaterialCommunityIcons
                      name="chevron-right"
                      size={normalize(20)}
                      color="#A0A4C2"
                    />
                  )}
                </View>
              ))}
            </View>
          </View>
        ))}

        <View style={[styles.versionContainer, { marginTop: verticalScale(20) }]}>
          <Text style={[styles.versionText, { fontSize: normalize(12) }]}>
            Versión 2.1.0
          </Text>
        </View>
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
    paddingHorizontal: moderateScale(15),
  },
  header: {
    paddingVertical: verticalScale(20),
    marginBottom: verticalScale(10),
  },
  headerText: {
    fontWeight: 'bold',
    color: '#212121',
  },
  subHeaderText: {
    color: '#757575',
    marginTop: verticalScale(5),
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
    paddingHorizontal: moderateScale(15),
  },
  optionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderBottomColor: '#F5F5F5',
  },
  optionIcon: {
    alignItems: 'center',
  },
  optionLabel: {
    flex: 1,
    color: '#212121',
    marginLeft: moderateScale(10),
  },
  versionContainer: {
    alignItems: 'center',
  },
  versionText: {
    color: '#A0A4C2',
  },
});

export default SettingsScreen;
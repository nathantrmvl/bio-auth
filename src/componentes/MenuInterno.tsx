import React, { useContext, useEffect, useState, useRef } from "react";
import { 
  View, 
  Text, 
  Image, 
  StyleSheet, 
  TouchableOpacity,
  Dimensions,
  ScrollView,
  Platform,
  SafeAreaView
} from "react-native";
import { DrawerContentComponentProps } from '@react-navigation/drawer';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { AuthContext } from '../context/AuthContext';
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import Ionicons from "react-native-vector-icons/Ionicons";

const normalize = (size: number) => {
  const { width } = Dimensions.get('window');
  const scale = width / 375;
  return Math.round(size * Math.min(scale, 1.8));
};

export const MenuInterno = ({ navigation }: DrawerContentComponentProps) => {
    const { authState, logOut } = useContext(AuthContext);
    const { name, f_surname, m_surname, image, type_user } = authState;
    const [dimensions, setDimensions] = useState(Dimensions.get('window'));
    const [showProfileOptions, setShowProfileOptions] = useState(false);
    const insets = useSafeAreaInsets();

    // Manejo de cambios de dimensión y orientación
    useEffect(() => {
        const subscription = Dimensions.addEventListener('change', ({ window }) => {
            setDimensions(window);
        });

        return () => {
            subscription?.remove();
        };
    }, []);

    const toggleProfileOptions = () => {
        setShowProfileOptions(!showProfileOptions);
    };

    const normalizedTypeUser = type_user?.trim().toLowerCase() || 'empleado';

    // Opciones de perfil
    const profileOptions = [
        { title: "Perfil", icon: "account", action: () => handlePress(() => navigation.navigate('ProfileScreen')) },
        { title: "Configuración", icon: "cog", action: () => handlePress(() => navigation.navigate('SettingsScreen')) },
        { title: "Términos y Condiciones", icon: "file-document", action: () => handlePress(() => navigation.navigate('TermsScreen')) },
        { title: "Ayuda", icon: "help-circle", action: () => handlePress(() => navigation.navigate('HelpScreen')) },
    ];

    // Opciones principales del menú
    const mainMenuOptions = {
        administrador: [
            { title: "Usuarios", icon: "account-group", action: () => handlePress(() => navigation.navigate('UserNavigator')) },
            { title: "Credencial Virtual", icon: "card-account-details", action: () => handlePress(() => navigation.navigate("UserCredentialScreen")) },
            { title: "Generar QR", icon: "qrcode-plus", action: () => handlePress(() => navigation.navigate("QrGeneratorScreen")) },
            { title: "Escanear QR", icon: "qrcode-scan", action: () => handlePress(() => navigation.navigate("QrNavigator")) },
            { title: "Horarios", icon: "clock-time-eight", action: () => handlePress(() => navigation.navigate("ScheduleScreen")) },
        ],
        seguridad: [
            { title: "Escanear QR", icon: "qrcode-scan", action: () => handlePress(() => navigation.navigate("QrNavigator")) },
            { title: "Reportes", icon: "file-document", action: () => handlePress(() => navigation.navigate("ReportesScreen")) },
            { title: "Horarios", icon: "clock-time-eight", action: () => handlePress(() => navigation.navigate("ScheduleScreen")) },
        ],
        autobus: [
            { title: "Escanear QR", icon: "qrcode-scan", action: () => handlePress(() => navigation.navigate("QrNavigator")) }, 
            { title: "Horarios", icon: "clock-time-eight", action: () => handlePress(() => navigation.navigate("ScheduleScreen")) },
        ],
        empleado: [
            { title: "Credencial Virtual", icon: "card-account-details", action: () => handlePress(() => navigation.navigate("UserCredentialScreen")) },
            { title: "Horarios", icon: "clock-time-eight", action: () => handlePress(() => navigation.navigate("ScheduleScreen")) },
        ]
    };

    const handlePress = (action: () => void) => {
        action();
        navigation.closeDrawer();
    };

    const currentMainOptions = mainMenuOptions[normalizedTypeUser as keyof typeof mainMenuOptions] || [];

    const getUserTypeDisplay = () => {
        switch(normalizedTypeUser) {
            case "administrador": return "Administrador";
            case "seguridad": return "Personal de Seguridad";
            case "autobus": return "Chofer de Transporte";
            default: return "Empleado";
        }
    };

    // Cálculos responsivos
    const isLandscape = dimensions.width > dimensions.height;
    const drawerWidth = Math.min(dimensions.width * (isLandscape ? 0.6 : 0.82), 310);
    const avatarSize = normalize(100);
    const headerPadding = normalize(12);
    const fontSizeTitle = normalize(16);
    const fontSizeSubtitle = normalize(14);
    const menuItemHeight = normalize(44);
    const profileOptionHeight = normalize(40);
    const iconSize = normalize(24);

    return (
        <View style={[styles.container, { 
            width: drawerWidth,
            paddingTop: insets.top,
            paddingBottom: insets.bottom
        }]}>
            <ScrollView 
                style={styles.scrollView}
                contentContainerStyle={[
                    styles.scrollContent,
                    { 
                        paddingBottom: normalize(80),
                        minHeight: dimensions.height - insets.top - insets.bottom,
                    }
                ]}
                showsVerticalScrollIndicator={false}
                bounces={false}
            >
                {/* Sección de perfil */}
                <View style={styles.profileSection}>
                    <TouchableOpacity 
                        style={[styles.profileHeader, { 
                            padding: headerPadding,
                            width: '90%',
                        }]}
                        onPress={toggleProfileOptions}
                        activeOpacity={0.8}
                    >
                        <View style={styles.avatarWrapper}>
                            <Image
                                style={[styles.avatarImage, { 
                                    width: avatarSize, 
                                    height: avatarSize, 
                                    borderRadius: avatarSize/2,
                                }]}
                                source={
                                    image
                                        ? { uri: `data:image/jpeg;base64,${image}` }
                                        : require('./../../assets/user.jpg')
                                }
                                resizeMode="cover"
                            />
                            <View style={styles.avatarIndicator}>
                                <Ionicons 
                                    name={showProfileOptions ? "chevron-up" : "chevron-down"} 
                                    size={normalize(14)} 
                                    color="#000" 
                                />
                            </View>
                        </View>
                        
                        <Text 
                            style={[styles.userName, { 
                                fontSize: fontSizeTitle,
                            }]}
                            numberOfLines={2}
                            ellipsizeMode="tail"
                        >
                            {name} {f_surname} {m_surname}
                        </Text>
                        <View style={styles.userRoleContainer}>
                            <Text style={[styles.userRole, { fontSize: fontSizeSubtitle }]}>
                                {getUserTypeDisplay()}
                            </Text>
                        </View>
                    </TouchableOpacity>
                </View>

                {/* Opciones de perfil */}
                <View style={[
                    styles.profileOptionsWrapper,
                    {
                        height: showProfileOptions ? profileOptions.length * profileOptionHeight : 0,
                        width: '85%',
                        marginBottom: showProfileOptions ? normalize(16) : 0
                    }
                ]}>
                    {profileOptions.map((option, index) => (
                        <TouchableOpacity 
                            key={`profile-${index}`}
                            style={[
                                styles.profileOptionItem,
                                { 
                                    height: profileOptionHeight,
                                }
                            ]}
                            onPress={option.action}
                            activeOpacity={0.7}
                        >
                            <MaterialCommunityIcons 
                                name={option.icon} 
                                size={iconSize} 
                                color="#000" 
                                style={styles.profileOptionIcon}
                            />
                            <Text 
                                style={[styles.profileOptionLabel, { fontSize: normalize(14) }]}
                                numberOfLines={1}
                                ellipsizeMode="tail"
                            >
                                {option.title}
                            </Text>
                        </TouchableOpacity>
                    ))}
                </View>

                {/* Opciones principales */}
                <View style={[
                    styles.menuSection,
                    { 
                        width: '90%',
                    }
                ]}>
                    {currentMainOptions.map((option, index) => (
                        <View
                            key={`main-${index}`}
                            style={[
                                styles.menuItemWrapper,
                                {
                                    height: menuItemHeight,
                                    marginVertical: normalize(8)
                                }
                            ]}
                        >
                            <TouchableOpacity 
                                style={styles.menuButton}
                                onPress={option.action}
                                activeOpacity={0.7}
                            >
                                <View style={styles.menuIcon}>
                                    <MaterialCommunityIcons 
                                        name={option.icon} 
                                        size={iconSize} 
                                        color="#000" 
                                    />
                                </View>
                                <Text 
                                    style={[styles.menuButtonText, { fontSize: normalize(14) }]}
                                    numberOfLines={1}
                                    ellipsizeMode="tail"
                                >
                                    {option.title}
                                </Text>
                                <MaterialCommunityIcons 
                                    name="chevron-right" 
                                    size={iconSize} 
                                    color="#A0A4C2" 
                                />
                            </TouchableOpacity>
                        </View>
                    ))}
                </View>
            </ScrollView>

            {/* Footer */}
            <View style={[
                styles.footerContainer,
                { 
                    paddingBottom: insets.bottom > 0 ? insets.bottom : normalize(16),
                }
            ]}>
                <View style={styles.footerContent}>
                    <View style={styles.logosContainer}>
                        <Image 
                            source={require('./../../assets/nkos_logvnegro.png')} 
                            style={[styles.logoImage]} 
                            resizeMode="contain" 
                        />
                        <Image 
                            source={require('./../../assets/logbiofull.png')} 
                            style={[styles.logoImage]} 
                            resizeMode="contain" 
                        />
                    </View>
                    
                    <TouchableOpacity 
                        style={[styles.logoutButton, { height: normalize(44) }]}
                        onPress={() => handlePress(logOut)}
                        activeOpacity={0.7}
                    >
                        <MaterialCommunityIcons name="logout" size={iconSize} color="#FF5252" />
                        <Text style={[styles.logoutText, { fontSize: normalize(14) }]}>Cerrar sesión</Text>
                    </TouchableOpacity>
                    
                    <Text style={[styles.versionLabel, { fontSize: normalize(11) }]}>Versión 2.1.0</Text>
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#F8FAFF",
    },
    scrollView: {
        flex: 1,
        width: '100%'
    },
    scrollContent: {
        flexGrow: 1,
        alignItems: 'center',
        paddingTop: 24
    },
    profileSection: {
        width: '100%',
        alignItems: 'center',
        marginBottom: 16
    },
    profileHeader: {
        alignItems: "center",
        borderRadius: 14,
        backgroundColor: 'white',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.05,
        shadowRadius: 4,
        elevation: 2,
    },
    avatarWrapper: {
        position: 'relative',
        marginBottom: 10,
    },
    avatarImage: {
        borderWidth: 2,
        borderColor: '#000'
    },
    avatarIndicator: {
        position: 'absolute',
        bottom: 0,
        right: 0,
        backgroundColor: '#FFFFFF',
        borderRadius: 10,
        padding: 3,
        borderWidth: 1.5,
        borderColor: '#F8FAFF'
    },
    userName: {
        color: "#2D3748",
        fontWeight: "600",
        marginBottom: 6,
        textAlign: 'center',
    },
    userRoleContainer: {
        backgroundColor: '#E6EDFF',
        paddingHorizontal: 10,
        paddingVertical: 4,
        borderRadius: 12,
    },
    userRole: {
        color: "#000",
        fontWeight: "500",
    },
    profileOptionsWrapper: {
        overflow: 'hidden',
        borderRadius: 10,
        backgroundColor: '#FFFFFF',
        borderWidth: 1,
        borderColor: '#E6EBFF',
    },
    profileOptionItem: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 16,
        borderBottomWidth: 1,
        borderBottomColor: '#F0F4FF',
    },
    profileOptionIcon: {
        marginRight: 12,
        width: 24,
        textAlign: 'center'
    },
    profileOptionLabel: {
        color: "#2D3748",
        fontWeight: "500",
        flex: 1,
    },
    menuSection: {
        alignItems: 'center',
        marginBottom: 16
    },
    menuItemWrapper: {
        width: '100%',
    },
    menuButton: {
        flex: 1,
        flexDirection: "row",
        alignItems: "center",
        paddingHorizontal: 16,
        borderRadius: 10,
        backgroundColor: "#FFFFFF",
        borderWidth: 1,
        borderColor: '#E6EBFF',
    },
    menuIcon: {
        width: 26,
        alignItems: 'center',
        marginRight: 10
    },
    menuButtonText: {
        flex: 1,
        color: "#2D3748",
        fontWeight: "500",
    },
    footerContainer: {
        width: '100%',
        paddingTop: 12,
        alignItems: 'center',
        backgroundColor: '#F8FAFF',
        borderTopWidth: 1,
        borderTopColor: '#E6EBFF',
    },
    footerContent: {
        width: '90%',
        alignItems: 'center'
    },
    logosContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginBottom: 12,
        width: '100%'
    },
    logoImage: {
        width: '45%',
        height: 30,
    },
    logoutButton: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: 'center',
        marginTop: 8,
        marginBottom: 12,
        borderRadius: 10,
        backgroundColor: "#FFF0F0",
        borderWidth: 1,
        borderColor: '#FFE0E0',
        width: '100%'
    },
    logoutText: {
        color: "#FF5252",
        fontWeight: "500",
        marginLeft: 8
    },
    versionLabel: {
        color: '#A0A4C2',
        textAlign: 'center',
        marginBottom: 5
    }
});
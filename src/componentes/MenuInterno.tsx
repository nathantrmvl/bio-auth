import React, { useContext } from "react";
import { View, Text, Image } from "react-native";
import { DrawerContentComponentProps, DrawerContentScrollView } from '@react-navigation/drawer';
import { AuthContext } from '../context/AuthContext';
import { ButtonText } from "./ButtonText";
import { styles } from "../theme/stylemenu"; 

export const MenuInterno = ({ navigation }: DrawerContentComponentProps) => {
    const { authState, logOut } = useContext(AuthContext);
    const { name, f_surname, m_surname, image, type_user } = authState;

    // Normalizamos el tipo de usuario
    const normalizedTypeUser = type_user?.trim().toLowerCase();

    // Opciones del menú basadas en el tipo de usuario
    const menuOptions = {
        administrador: [
            { title: "Usuarios", action: () => navigation.navigate('StackNavigator', { screen: 'AdminHome' }) },
            { title: "Credencial Virtual", action: () => navigation.navigate("UserCredentialScreen") },
            { title: "School Calendar", action: () => navigation.navigate("CalendarScreen") },
            { title: "Services", action: () => navigation.navigate("ServiceScreen") },
            { title: "Ruta de transporte", action: () => navigation.navigate("TransporteScreen") },
            { title: "Generar QR", action: () => navigation.navigate("QrNavigator", { screen: "QrGeneratorScreen" }) },
            { title: "Escanear Código QR", action: () => navigation.navigate("QrNavigator", { screen: "QrScannerScreen" }) },
            { title: "Formulario Registro", action: () => navigation.navigate("FormUserScreen") },
        ],
        empleado: [
            { title: "Credencial Virtual", action: () => navigation.navigate("UserCredentialScreen") },
            { title: "School Calendar", action: () => navigation.navigate("CalendarScreen") },
            { title: "Services", action: () => navigation.navigate("ServiceScreen") },
            { title: "Ruta de transporte", action: () => navigation.navigate("TransporteScreen") },
            { title: "Generar QR", action: () => navigation.navigate("QrNavigator", { screen: "QrGeneratorScreen" }) },
        ],
        autobus: [
            { title: "Credencial Virtual", action: () => navigation.navigate("UserCredentialScreen") },
            { title: "School Calendar", action: () => navigation.navigate("CalendarScreen") },
            { title: "Services", action: () => navigation.navigate("ServiceScreen") },
            { title: "Ruta de transporte", action: () => navigation.navigate("TransporteScreen") },
            { title: "Generar QR", action: () => navigation.navigate("QrNavigator", { screen: "QrGeneratorScreen" }) },
            { title: "Escanear Código QR", action: () => navigation.navigate("QrNavigator", { screen: "QrScannerScreen" }) },
        ],
        seguridad: [
            { title: "Credencial Virtual", action: () => navigation.navigate("UserCredentialScreen") },
            { title: "School Calendar", action: () => navigation.navigate("CalendarScreen") },
            { title: "Services", action: () => navigation.navigate("ServiceScreen") },
            { title: "Ruta de transporte", action: () => navigation.navigate("TransporteScreen") },
            { title: "Generar QR", action: () => navigation.navigate("QrNavigator", { screen: "QrGeneratorScreen" }) },
            { title: "Escanear Código QR", action: () => navigation.navigate("QrNavigator", { screen: "QrScannerScreen" }) },
        ],
    };

    // Obtener las opciones del menú según el tipo de usuario
    const currentMenuOptions = menuOptions[normalizedTypeUser] || [];

    return (
        <DrawerContentScrollView contentContainerStyle={styles.container}>
            {/* Header con Avatar e Información */}
            <View style={styles.header}>
                <Image
                    style={styles.avatar}
                    source={
                        image
                            ? { uri: `data:image/jpeg;base64,${image}` }
                            : require('./../../assets/cuervoutvtfull.png')
                    }
                />
                <Text style={styles.username}>
                    {name} {f_surname} {m_surname}
                </Text>
                <Text style={styles.userType}>
                    {normalizedTypeUser === "administrador" ? "Administrador/@" :
                     normalizedTypeUser === "seguridad" ? "Seguridad" :
                     normalizedTypeUser === "autobus" ? "Chofer" :
                     "Empleado"}
                </Text>
            </View>

            {/* Opciones del Menú */}
            <View style={styles.menu}>
                {currentMenuOptions.map((option, index) => (
                    <ButtonText
                        key={index}
                        action={option.action}
                        title={option.title}
                        style={styles.menuButton}
                    />
                ))}

                {/* Cerrar sesión - Disponible para todos */}
                <ButtonText action={logOut} title="Cerrar sesión" style={styles.logoutButton} />

                {/* Imágenes pequeñas */}
                <View style={styles.imagesContainer}>
                    <Image source={require('./../../assets/nkos_logvnegro.png')} style={styles.smallImage} resizeMode="contain" />
                    <Image source={require('./../../assets/logbiofull.png')} style={styles.smallImage} resizeMode="contain" />
                </View>
            </View>
        </DrawerContentScrollView>
    );
};
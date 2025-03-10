import React, { useContext } from "react";
import { View, Text, Image } from "react-native";
import { AuthContext } from '../context/AuthContext';
import { DrawerContentComponentProps, DrawerContentScrollView } from '@react-navigation/drawer';
import { ButtonText } from "./ButtonText";
import { styles } from "../theme/stylemenu";

export const MenuInterno = ({ navigation }: DrawerContentComponentProps) => {
    const { authState, logOut } = useContext(AuthContext);
    const type_user = authState.type_user?.trim().toLowerCase(); // Normalizamos el tipo de usuario
    const { username, userImage } = authState;

    return (
        <DrawerContentScrollView contentContainerStyle={styles.container}>
            {/* Header con Avatar e Información */}
            <View style={styles.header}>
                <Image
                    style={styles.avatar}
                    source={
                        userImage
                            ? { uri: `data:image/jpeg;base64,${userImage}` }
                            : require('./../../assets/cuervoutvtfull.png')
                    }
                />
                <Text style={styles.username}>
                    {username || "Usuario"}
                </Text>
                <Text style={styles.userType}>
                    {type_user === "administrador" ? "Administrador/@" :
                    type_user === "seguridad" ? "Seguridad" :
                    type_user === "autobus" ? "Autobús" :
                    "Empleado"}
                </Text>
            </View>

            {/* Opciones del Menú */}
            <View style={styles.menu}>
                {/* Menú para Administrador */}
                {type_user === "administrador" && (
                    <>
                        <ButtonText action={() => navigation.navigate('StackNavigator', { screen: 'AdminHome' })} title="Usuarios" style={styles.menuButton} />
                        <ButtonText action={() => navigation.navigate("UserCredentialScreen")} title="Credencial Virtual" style={styles.menuButton} />
                        <ButtonText action={() => navigation.navigate("CalendarScreen")} title="School Calendar" style={styles.menuButton} />
                        <ButtonText action={() => navigation.navigate("ServiceScreen")} title="Services" style={styles.menuButton} />
                        <ButtonText action={() => navigation.navigate("TransporteScreen")} title="Ruta de transporte" style={styles.menuButton} />
                        <ButtonText action={() => navigation.navigate("QrNavigator", { screen: "QrGeneratorScreen" })} title="Generar QR" style={styles.menuButton} />
                        <ButtonText action={() => navigation.navigate("QrNavigator", { screen: "QrScannerScreen" })} title="Escanear Código QR" style={styles.menuButton} />
                        <ButtonText action={() => navigation.navigate("FormUserScreen")} title="Formulario Registro" style={styles.menuButton} />
                    </>
                )}

                {/* Menú para Empleado */}
                {type_user === "empleado" && (
                    <>
                        <ButtonText action={() => navigation.navigate("UserCredentialScreen")} title="Credencial Virtual" style={styles.menuButton} />
                        <ButtonText action={() => navigation.navigate("CalendarScreen")} title="School Calendar" style={styles.menuButton} />
                        <ButtonText action={() => navigation.navigate("ServiceScreen")} title="Services" style={styles.menuButton} />
                        <ButtonText action={() => navigation.navigate("TransporteScreen")} title="Ruta de transporte" style={styles.menuButton} />
                        <ButtonText action={() => navigation.navigate("QrNavigator", { screen: "QrGeneratorScreen" })} title="Generar QR" style={styles.menuButton} />
                    </>
                )}

                {/* Menú para Autobús */}
                {type_user === "Autobus" && (
                    <>
                        <ButtonText action={() => navigation.navigate("UserCredentialScreen")} title="Credencial Virtual" style={styles.menuButton} />
                        <ButtonText action={() => navigation.navigate("CalendarScreen")} title="School Calendar" style={styles.menuButton} />
                        <ButtonText action={() => navigation.navigate("ServiceScreen")} title="Services" style={styles.menuButton} />
                        <ButtonText action={() => navigation.navigate("TransporteScreen")} title="Ruta de transporte" style={styles.menuButton} />
                        <ButtonText action={() => navigation.navigate("QrNavigator", { screen: "QrGeneratorScreen" })} title="Generar QR" style={styles.menuButton} />
                        <ButtonText action={() => navigation.navigate("QrNavigator", { screen: "QrScannerScreen" })} title="Escanear Código QR" style={styles.menuButton} />
                    </>
                )}

                {/* Menú para Seguridad */}
                {type_user === "seguridad" && (
                    <>
                        <ButtonText action={() => navigation.navigate("UserCredentialScreen")} title="Credencial Virtual" style={styles.menuButton} />
                        <ButtonText action={() => navigation.navigate("CalendarScreen")} title="School Calendar" style={styles.menuButton} />
                        <ButtonText action={() => navigation.navigate("ServiceScreen")} title="Services" style={styles.menuButton} />
                        <ButtonText action={() => navigation.navigate("TransporteScreen")} title="Ruta de transporte" style={styles.menuButton} />
                        <ButtonText action={() => navigation.navigate("QrNavigator", { screen: "QrGeneratorScreen" })} title="Generar QR" style={styles.menuButton} />
                        <ButtonText action={() => navigation.navigate("QrNavigator", { screen: "QrScannerScreen" })} title="Escanear Código QR" style={styles.menuButton} />
                    </>
                )}

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

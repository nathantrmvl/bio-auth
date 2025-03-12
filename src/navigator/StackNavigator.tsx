import React, { useContext } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { AdminHome } from '../screens/users/AdminHome';
import { UserCredentialScreen } from '../screens/users/UserCredentialScreen';
import { LoginScreen } from '../screens/users/LoginScreen';
import { AuthContext } from '../context/AuthContext';
import { QrScannerScreen } from '../screens/camera/QrScannerScreen';
import { TransporteScreen } from '../screens/users/TransporteScreen';

export type RootStackParams = {
    AdminHome: undefined; // No recibe parámetros
    UserCredentialScreen: { id?: string; name?: string }; // Parámetros opcionales
    LoginScreen: undefined;    
    TransporteScreen: undefined;
}   

const Stack = createStackNavigator<RootStackParams>();

export const StackNavigator = () => {
    const { authState } = useContext(AuthContext); // Usar el contexto de autenticación

    return (
        <Stack.Navigator
            initialRouteName={
                authState.isLoggenIn ? 
                (authState.type_user === "Administrador" ? "AdminHome" : "UserCredentialScreen") 
                : "LoginScreen"  // Si no está autenticado, redirigir al LoginScreen
            }
            screenOptions={{
                headerShown: false,
                cardStyle: {
                    backgroundColor: "white",
                },
            }}
        >

            <Stack.Screen
                name="AdminHome"
                component={AdminHome}
                options={{ title: "Admin Home" }}
            />
            <Stack.Screen
                name="UserCredentialScreen"
                component={UserCredentialScreen}
                options={{ title: "User Credential" }}
            />
            <Stack.Screen
                name="LoginScreen"
                component={LoginScreen}
                options={{ title: "Login" }}
            />
            <Stack.Screen
                name="QrScannerScreen"
                component={QrScannerScreen} 
                options={{ title: "QR Scanner" }}
            />
            <Stack.Screen name="TransporteScreen" 
            component={TransporteScreen} 
            options={{ title: "Seguimiento de Transporte" }} /> 
        </Stack.Navigator>
    );
};

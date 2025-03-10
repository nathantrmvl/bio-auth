import React, { useContext } from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { useWindowDimensions } from "react-native";
import { StackNavigator } from "./StackNavigator";
import { MenuInterno } from "../componentes/MenuInterno";
import { AuthContext } from "../context/AuthContext";
import { LoginScreen } from "../screens/users/LoginScreen";
import { QrScannerScreen } from "../screens/camera/QrScannerScreen";
import { QrGeneratorScreen } from "../screens/camera/QrGeneratorScreen";
import { FormUserScreen } from "../screens/users/FormUserScreen";
import { UserCredentialScreen } from "../screens/users/UserCredentialScreen";
import { UserNavigator } from "../navigator/UsersNavigator";  
import { UserResponse } from "../interfaces/api-bioauth";
import { QrNavigator } from "./QrNavigator";
import { TransporteScreen } from "../screens/users/TransporteScreen";



export type RootDrawerParams = {
  StackNavigator:         undefined;
  SettingsScreen:         undefined;
  AvatarScreen:           undefined;
  QrNavigator:            undefined;
  AlumnosNavigator:       undefined;
  QrGeneratorScreen:      undefined;
  UserCredentialScreen:   undefined;
  FormUserScreen:         { UserResponse: UserResponse };
  UserNavigator:          undefined;
  TransporteScreen:        undefined;
};

const Drawer = createDrawerNavigator<RootDrawerParams>();

const Navigator = () => {
  const { width } = useWindowDimensions();

  return (
    <Drawer.Navigator
      initialRouteName="StackNavigator"
      screenOptions={{
        headerShown: true,
        drawerType: width >= 768 ? 'permanent' : 'front',
        drawerPosition: "right",
        drawerStyle: {
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
          width: width * 0.7,
        },
        headerStyle: {
          height: 50,
        },
        
      }}
      drawerContent={(props) => <MenuInterno {...props} />}
    >
      
      <Drawer.Screen
        name="StackNavigator"
        options={{ title: '' }}
        component={StackNavigator}
      />
      <Drawer.Screen
        name="QrGeneratorScreen"
        options={{ title: "Generador QR" }}
        component={QrGeneratorScreen}
      />
      <Drawer.Screen
        name="QrNavigator"
        options={{ title: "Escanear Código QR" }}
        component={QrNavigator}
      />
      <Drawer.Screen
        name="TransporteScreen"
        options={{ title: "Transporte" }}
        component={TransporteScreen}
      />
      <Drawer.Screen
        name="UserNavigator"
        options={{ title: "Usuarios" }}
        component={UserNavigator}
      />
      <Drawer.Screen
        name="FormUserScreen"
        options={{ title: "FormUserScreen" }}
        component={FormUserScreen}
      />
      <Drawer.Screen
        name="UserCredentialScreen"
        options={{ title: "UserCredentialScreen" }}
        component={UserCredentialScreen}
      />
    </Drawer.Navigator>
  );
};

export const DrawerNavigator = () => {
  const { authState } = useContext(AuthContext);

  // Si el usuario está autenticado, muestra el Drawer Navigator, sino muestra el LoginScreen
  return authState.isLoggenIn ? <Navigator /> : <LoginScreen />;
};

import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { QrScannerScreen } from "../screens/camera/QrScannerScreen";
import { QrGeneratorScreen } from "../screens/camera/QrGeneratorScreen";

export type RootStackQrParams = {
    QrScannerScreen: undefined;
    QrGeneratorScreen: undefined;
};

const Stack = createStackNavigator<RootStackQrParams>();

export const QrNavigator = () => {
    return (
        <Stack.Navigator
            initialRouteName="QrScannerScreen"
            screenOptions={{
                headerShown: false,
                cardStyle: {
                    backgroundColor: "white",
                },
            }}
        >
            <Stack.Screen name="QrScannerScreen" component={QrScannerScreen} />
            <Stack.Screen name="QrGeneratorScreen" component={QrGeneratorScreen} />
        </Stack.Navigator>
    );
};

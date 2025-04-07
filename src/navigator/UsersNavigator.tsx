// UserNavigator.tsx
import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { FormUserScreen } from "../screens/admins/FormUserScreen";
import { AdminHome } from "../screens/admins/AdminHome";
import { UserResponse } from "../interfaces/api-bioauth";

export type RootStackUserParam = {
    AdminHome: undefined;
    FormUserScreen: { UserResponse: UserResponse };
}

const Stack = createStackNavigator<RootStackUserParam>();

export const UserNavigator = () => {
    return (
        <Stack.Navigator
            screenOptions={{
                headerShown: false,
                cardStyle: {
                    backgroundColor: "white"
                }
            }}
        >
            <Stack.Screen
                component={AdminHome}
                name='AdminHome'
            />
            <Stack.Screen
                name='FormUserScreen'
                component={FormUserScreen}
            />
        </Stack.Navigator>
    );
};

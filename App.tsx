import React, { ReactNode } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { DrawerNavigator } from './src/navigator/DrawerNavigator';
import { AuthProvider } from './src/context/AuthContext';

const App = () => {
    return (
        <NavigationContainer>
            <AppState>
                <DrawerNavigator />
            </AppState>
        </NavigationContainer>
    );
}

const AppState = ({ children }: { children: ReactNode }) => {
    return (
        <AuthProvider>
            {children}
        </AuthProvider>
    );
}

export default App;
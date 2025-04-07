import React, { useContext } from 'react';
import { StatusBar } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import { AuthContext } from '../context/AuthContext';
import { LoginScreen } from '../screens/access/LoginScreen';
import { Navigator } from '../componentes/com_drawer/Navigator';

export const DrawerNavigator: React.FC = () => {
  const { authState } = useContext(AuthContext);
  
  return (
    <SafeAreaProvider>
      <StatusBar 
        backgroundColor="#1a1a1a" 
        barStyle="light-content" 
        translucent
      />
      {authState.isLoggenIn ? <Navigator /> : <LoginScreen />}
    </SafeAreaProvider>
  );
};
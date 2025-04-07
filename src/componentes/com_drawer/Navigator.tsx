import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { SafeAreaView, StyleSheet } from 'react-native';
import { getStatusBarHeight } from 'react-native-iphone-x-helper';

import { CustomHeader } from './CustomHeader';
import { useDrawerConfig } from './DrawerConfig';
import { getDrawerScreens } from './DrawerScreens';
import { MenuInterno } from '../MenuInterno';
import { RootDrawerParams } from '../../interfaces/api-bioauth';

const Drawer = createDrawerNavigator<RootDrawerParams>();

export const Navigator: React.FC = () => {
  const { drawerConfig, isLargeScreen, isSmallDevice } = useDrawerConfig();
  const drawerScreens = getDrawerScreens(isSmallDevice);

  const screenOptions = {
    drawerType: isLargeScreen ? "permanent" : "slide",
    drawerPosition: "right",
    drawerStyle: drawerConfig,
    overlayColor: "rgba(0,0,0,0.3)",
    swipeEdgeWidth: isLargeScreen ? 0 : 25,
    swipeEnabled: !isLargeScreen,
    drawerActiveTintColor: "#1a73e8",
    drawerInactiveTintColor: "#5f6368",
    drawerActiveBackgroundColor: "#e8f0fe",
    drawerLabelStyle: {
      marginLeft: -10,
      fontSize: isSmallDevice ? 14 : 16,
      fontWeight: '500',
    },
    drawerItemStyle: {
      borderRadius: 8,
      marginHorizontal: 8,
      marginVertical: 2,
    },
    sceneContainerStyle: {
      backgroundColor: "#f8f9fa",
    },
    unmountOnBlur: true,
    header: ({ navigation, route }: any) => (
      <CustomHeader navigation={navigation} title={route.name} />
    ),
  };

  return (
    <Drawer.Navigator
      initialRouteName="StackNavigator"
      screenOptions={screenOptions}
      drawerContent={(props) => (
        <SafeAreaView style={styles.drawerSafeArea}>
          <MenuInterno {...props} />
        </SafeAreaView>
      )}
    >
      {drawerScreens.map((screen) => (
        <Drawer.Screen
          key={screen.name}
          name={screen.name as keyof RootDrawerParams}
          component={screen.component}
          options={screen.options}
        />
      ))}
    </Drawer.Navigator>
  );
};

const styles = StyleSheet.create({
  drawerSafeArea: {
    flex: 1,
    backgroundColor: 'white',
    paddingTop: getStatusBarHeight(),
  },
});
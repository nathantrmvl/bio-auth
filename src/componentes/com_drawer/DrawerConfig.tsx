import { useWindowDimensions } from 'react-native';
import { getStatusBarHeight } from 'react-native-iphone-x-helper';

export const useDrawerConfig = () => {
  const { width, height } = useWindowDimensions();
  const isLargeScreen = width >= 768;
  const isSmallDevice = width < 400;
  const isLandscape = width > height;

  const getDrawerWidth = () => {
    if (isLargeScreen) return Math.min(400, width * 0.35);
    if (isLandscape) return Math.min(350, width * 0.4);
    return Math.min(300, width * 0.85);
  };

  return {
    drawerConfig: {
      width: getDrawerWidth(),
      backgroundColor: "#ffffff",
      borderTopLeftRadius: 20,
      borderBottomLeftRadius: 20,
      marginTop: getStatusBarHeight(),
    },
    isLargeScreen,
    isSmallDevice,
    isLandscape
  };
};
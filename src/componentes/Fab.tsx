import React from "react";
import { View, StyleSheet, TouchableOpacity, Dimensions, Animated, Easing, Text } from "react-native";
import Svg, { Path } from 'react-native-svg';

interface Props {
  title: string;
  position?: 'right' | 'left'; // Más nombres intuitivos
  onPress: () => void;
  icon?: 'plus' | 'arrow-up' | 'pencil' | 'custom'; // Tipos de iconos comunes
  customIcon?: React.ReactNode; // Para iconos personalizados
  size?: 'small' | 'medium' | 'large'; // Tamaños estándar
  color?: string; // Color personalizable
  disabled?: boolean;
  visible?: boolean; // Control de visibilidad
}

export const Fab = ({ 
  title, 
  position = 'right', 
  onPress, 
  icon = 'plus', 
  customIcon, 
  size = 'medium', 
  color = '#007AFF', 
  disabled = false,
  visible = true
}: Props) => {
  const { width, height } = Dimensions.get("window");
  const scaleValue = React.useRef(new Animated.Value(1)).current;
  const opacityValue = React.useRef(new Animated.Value(1)).current;

  // Animación de pulsación
  const animatePress = () => {
    Animated.sequence([
      Animated.timing(scaleValue, {
        toValue: 0.9,
        duration: 100,
        easing: Easing.ease,
        useNativeDriver: true,
      }),
      Animated.timing(scaleValue, {
        toValue: 1,
        duration: 200,
        easing: Easing.ease,
        useNativeDriver: true,
      }),
    ]).start();
  };

  // Efecto para visibilidad
  React.useEffect(() => {
    Animated.timing(opacityValue, {
      toValue: visible ? 1 : 0,
      duration: 300,
      useNativeDriver: true,
    }).start();
  }, [visible]);

  const handlePress = () => {
    animatePress();
    onPress();
  };

  const getIcon = () => {
    if (customIcon) return customIcon;
    
    switch (icon) {
      case 'plus':
        return (
          <Svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <Path d="M12 5V19M5 12H19" stroke="#fff" strokeWidth="2" strokeLinecap="round" />
          </Svg>
        );
      case 'arrow-up':
        return (
          <Svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <Path d="M12 19V5M12 5L5 12M12 5L19 12" stroke="#fff" strokeWidth="2" strokeLinecap="round" />
          </Svg>
        );
      case 'pencil':
        return (
          <Svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <Path d="M15.2322 5.23223L18.7677 8.76777M16.7322 3.73223C17.7085 2.75592 19.2915 2.75592 20.2677 3.73223C21.244 4.70854 21.244 6.29146 20.2677 7.26777L6.5 21.0355H3V17.4644L16.7322 3.73223Z" stroke="#fff" strokeWidth="2" strokeLinecap="round" />
          </Svg>
        );
      default:
        return null;
    }
  };

  const getSize = () => {
    switch (size) {
      case 'small': return 40;
      case 'medium': return 56;
      case 'large': return 72;
      default: return 56;
    }
  };

  const fabSize = getSize();
  const borderRadius = fabSize / 2;

  return (
    <Animated.View
      style={[
        styles.fabLocation,
        position === 'right' ? styles.fabLocationRight : styles.fabLocationLeft,
        { 
          opacity: opacityValue,
          transform: [{ scale: scaleValue }],
          zIndex: visible ? 1000 : -1 // Mejor manejo del zIndex
        }
      ]}
    >
      <TouchableOpacity
        onPress={handlePress}
        activeOpacity={0.7}
        disabled={disabled}
        accessible={true}
        accessibilityRole="button"
        accessibilityLabel={title}
      >
        <View 
          style={[
            styles.fab, 
            { 
              backgroundColor: disabled ? '#B5B5B5' : color,
              width: fabSize,
              height: fabSize,
              borderRadius,
              shadowColor: disabled ? 'transparent' : '#000',
            }
          ]}
        >
          {getIcon()}
        </View>
      </TouchableOpacity>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  fab: {
    justifyContent: "center",
    alignItems: "center",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  fabLocation: {
    position: "absolute",
    bottom: 25,
  },
  fabLocationRight: {
    right: 25,
  },
  fabLocationLeft: {
    left: 25,
  },
});
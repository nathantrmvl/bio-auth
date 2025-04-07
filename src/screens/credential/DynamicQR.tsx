import React, { useEffect, useState, useRef } from 'react';
import { View, Text, Animated, Easing, Image } from 'react-native';
import QRCode from 'react-native-qrcode-svg';
import { MaterialIcons } from '@expo/vector-icons';
import { ProfessionalButton } from "../../componentes/newButton";
import { stylecredential } from '../../theme/stylecredential';
import * as Haptics from 'expo-haptics';
import { LinearGradient } from 'expo-linear-gradient';

interface DynamicQRProps {
  userData: object;
}

export const DynamicQR: React.FC<DynamicQRProps> = ({ userData}) => {
  const [isActive, setIsActive] = useState(false);
  const [timeLeft, setTimeLeft] = useState(0);
  const pulseAnim = useRef(new Animated.Value(1)).current;
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isActive && timeLeft > 0) {
      timer = setInterval(() => {
        setTimeLeft(prev => prev - 1000);
      }, 1000);
    } else if (timeLeft <= 0) {
      setIsActive(false);
    }
    return () => clearInterval(timer);
  }, [isActive, timeLeft]);

  useEffect(() => {
    // Animación de entrada
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 500,
      useNativeDriver: true,
    }).start();

    if (isActive) {
      // Animación de pulso (nativa)
      Animated.loop(
        Animated.sequence([
          Animated.timing(pulseAnim, {
            toValue: 1.05,
            duration: 1000,
            easing: Easing.inOut(Easing.ease),
            useNativeDriver: true,
          }),
          Animated.timing(pulseAnim, {
            toValue: 1,
            duration: 1000,
            easing: Easing.inOut(Easing.ease),
            useNativeDriver: true,
          }),
        ])
      ).start();
    } else {
      pulseAnim.setValue(1);
    }
  }, [isActive]);

  const handleGenerateQR = () => {
    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    setIsActive(true);
    setTimeLeft(15000);
  };

  return (
    <Animated.View style={[stylecredential.qrSection, { opacity: fadeAnim }]}>
      <View style={stylecredential.qrHolographicContainer}>
        {isActive && (
          <LinearGradient
            colors={['rgba(28, 49, 165, 0.1)', 'rgba(37, 117, 252, 0.2)', 'transparent']}
            style={stylecredential.holographicEffect}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
          />
        )}
        
        <View style={stylecredential.qrContainer}>
          {isActive ? (
            <Animated.View style={{ transform: [{ scale: pulseAnim }] }}>
              <LinearGradient
                colors={['transparent', 'rgba(28, 49, 165, 0.2)', 'transparent']}
                style={stylecredential.qrGradient}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
              >
                <QRCode
                  value={JSON.stringify(userData)}
                  size={220}
                  color="#1c31a5"
                  backgroundColor="transparent"
                  ecl="H"
                />
              </LinearGradient>
              
            </Animated.View>
          ) : (
            <View style={stylecredential.qrPlaceholder}>
              <MaterialIcons name="qr-code-2" size={50} color="rgba(28, 49, 165, 0.3)" />
              <Text style={stylecredential.qrPlaceholderText}>
                Presiona para generar QR de acceso
              </Text>
            </View>
          )}
        </View>
      </View>

      <ProfessionalButton
        title={isActive ? `QR VÁLIDO (${Math.ceil(timeLeft/1000)}s)` : 'GENERAR QR SEGURO'}
        onPress={handleGenerateQR}
        disabled={isActive}
        iconName={isActive ? "lock-clock" : "qr-code-scanner"}
        iconPosition="right"
        buttonStyle={[
          stylecredential.generateButton,
          isActive && stylecredential.activeButton
        ]}
        textStyle={stylecredential.buttonText}
      />
    </Animated.View>
  );
};
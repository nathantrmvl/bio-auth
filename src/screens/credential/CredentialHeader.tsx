import React, { useEffect, useRef } from 'react';
import { View, Text, Image, Animated } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { MaterialIcons } from '@expo/vector-icons';
import { stylecredential } from '../../theme/stylecredential';
import * as Haptics from 'expo-haptics';

interface CredentialHeaderProps {
  image: string | null;
  name: string;
  f_surname: string;
  m_surname: string;
  position: string;
  status: string;
  companyLogo?: string;
}

export const CredentialHeader: React.FC<CredentialHeaderProps> = ({
  image,
  name,
  f_surname,
  m_surname,
  position,
  status,
  companyLogo,
}) => {
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    // Animación de entrada suave
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 800,
      useNativeDriver: true,
    }).start();

    // Feedback háptico al aparecer
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
  }, []);

  return (
    <Animated.View style={{ opacity: fadeAnim }}>
      <LinearGradient
        colors={['#1c31a5', '#6a11cb']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        style={stylecredential.headerContainer}
      >
        {/* Efecto de partículas estáticas (mejor performance) */}
        <View style={stylecredential.particlesContainer}>
          {[...Array(15)].map((_, i) => (
            <View 
              key={i} 
              style={[
                stylecredential.particle,
                {
                  top: `${Math.random() * 100}%`,
                  left: `${Math.random() * 100}%`,
                  opacity: Math.random() * 0.3 + 0.1,
                  transform: [{ scale: Math.random() * 0.3 + 0.3 }]
                }
              ]}
            />
          ))}
        </View>

        {companyLogo && (
          <Image 
            source={{ uri: companyLogo }}
            style={stylecredential.companyLogo}
          />
        )}

        <View style={stylecredential.profileContainer}>
          <View style={stylecredential.profileImageBorder}>
            <Image
              source={image ? { uri: `data:image/jpeg;base64,${image}` } : require('../../../assets/user.jpg')}
              style={stylecredential.profileImage}
            />
            <View style={[
              stylecredential.statusBadge,
              status === 'Activo' ? stylecredential.activeStatus : 
              status === 'Inactivo' ? stylecredential.inactiveStatus : 
              stylecredential.blockedStatus
            ]}>
              <MaterialIcons 
                name={status === 'Activo' ? 'verified' : 'error'} 
                size={14} 
                color="#fff" 
              />
            </View>
          </View>
        </View>
        
        <View style={stylecredential.userInfo}>
          <Text style={stylecredential.name}>
            {name} {f_surname} {m_surname}
          </Text>
          <Text style={stylecredential.position}>{position}</Text>
        </View>

        <View style={stylecredential.glassEffect} />
      </LinearGradient>
    </Animated.View>
  );
};
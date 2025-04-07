import React, { useState, useRef, useEffect } from 'react';
import { View, Text, Animated, TouchableOpacity, Easing } from 'react-native';
import { MaterialIcons, FontAwesome, Ionicons } from '@expo/vector-icons';
import { stylecredential } from '../../theme/stylecredential';
import * as Haptics from 'expo-haptics';

interface CredentialInfoProps {
  userKey: string;
  department: string;
  issueDate: string;
  expiryDate: string;
  additionalInfo?: {
    bloodType?: string;
    emergencyContact?: string;
    accessLevel?: string;
  };
}

export const CredentialInfo: React.FC<CredentialInfoProps> = ({
  userKey,
  department,
  issueDate,
  expiryDate,
  additionalInfo,
}) => {
  const [expanded, setExpanded] = useState(false);
  const heightAnim = useRef(new Animated.Value(0)).current;
  const fadeAnim = useRef(new Animated.Value(0)).current;
  
  useEffect(() => {
    // Animación de entrada
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 600,
      delay: 200,
      useNativeDriver: true,
    }).start();
  }, []);

  const toggleExpand = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    // Animación de altura (no nativa)
    Animated.timing(heightAnim, {
      toValue: expanded ? 0 : 1,
      duration: 300,
      easing: Easing.ease,
      useNativeDriver: false,
    }).start();
    setExpanded(!expanded);
  };

  const heightInterpolation = heightAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 120] // Ajusta según el contenido adicional
  });

  return (
    <Animated.View style={[stylecredential.infoContainer, { opacity: fadeAnim }]}>
      <TouchableOpacity 
        style={stylecredential.infoHeader} 
        onPress={toggleExpand}
        activeOpacity={0.8}
      >
        <Ionicons 
          name={expanded ? "chevron-up" : "chevron-down"} 
          size={24} 
          color="#1c31a5" 
        />
        <Text style={stylecredential.infoHeaderText}>INFORMACIÓN DE CREDENCIAL</Text>
      </TouchableOpacity>

      <View style={stylecredential.infoContent}>
        <View style={stylecredential.infoRow}>
          <FontAwesome name="id-card" size={18} color="#1c31a5" />
          <View>
            <Text style={stylecredential.infoLabel}>IDENTIFICACIÓN</Text>
            <Text style={stylecredential.infoText}>{userKey}</Text>
          </View>
        </View>
        
        <View style={stylecredential.infoRow}>
          <MaterialIcons name="business" size={18} color="#1c31a5" />
          <View>
            <Text style={stylecredential.infoLabel}>DEPARTAMENTO</Text>
            <Text style={stylecredential.infoText}>{department}</Text>
          </View>
        </View>

        <View style={stylecredential.datesRow}>
          <View style={stylecredential.dateBox}>
            <Text style={stylecredential.dateLabel}>EXPEDICIÓN</Text>
            <Text style={stylecredential.dateText}>{issueDate}</Text>
          </View>
          
          <View style={stylecredential.dateBox}>
            <Text style={stylecredential.dateLabel}>VIGENCIA</Text>
            <Text style={stylecredential.dateText}>{expiryDate}</Text>
          </View>
        </View>
      </View>

      <Animated.View style={[stylecredential.additionalInfo, { height: heightInterpolation }]}>
        {additionalInfo && (
          <>
            {additionalInfo.bloodType && (
              <View style={stylecredential.additionalRow}>
                <MaterialIcons name="bloodtype" size={18} color="#1c31a5" />
                <Text style={stylecredential.additionalText}>
                  Tipo sanguíneo: {additionalInfo.bloodType}
                </Text>
              </View>
            )}
            
            {additionalInfo.emergencyContact && (
              <View style={stylecredential.additionalRow}>
                <MaterialIcons name="emergency" size={18} color="#1c31a5" />
                <Text style={stylecredential.additionalText}>
                  Contacto emergencia: {additionalInfo.emergencyContact}
                </Text>
              </View>
            )}
            
            {additionalInfo.accessLevel && (
              <View style={stylecredential.additionalRow}>
                <MaterialIcons name="security" size={18} color="#1c31a5" />
                <Text style={stylecredential.additionalText}>
                  Nivel de acceso: {additionalInfo.accessLevel}
                </Text>
              </View>
            )}
          </>
        )}
      </Animated.View>
    </Animated.View>
  );
};
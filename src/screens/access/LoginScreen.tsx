import React, { useEffect, useState, useRef } from "react";
import { View, Text, ActivityIndicator, Image, ScrollView, KeyboardAvoidingView, Platform, Dimensions, StyleSheet, TouchableWithoutFeedback, Keyboard, TouchableOpacity, Animated, Easing } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useLogin } from "../../hooks/useLogin";
import { Video } from 'expo-av';
import { ProfessionalButton } from "../../componentes/newButton";
import { ProfessionalInput } from "../../componentes/Input";
import { MaterialIcons, Feather } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Haptics from 'expo-haptics';
import { LinearGradient } from 'expo-linear-gradient';

export const LoginScreen = () => {
  const navigation = useNavigation();
  const { isLoading, handleLogin, handleInputChange, state, request } = useLogin();
  const [errorMessage, setErrorMessage] = useState("");
  const [rememberDevice, setRememberDevice] = useState(false);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const { width, height } = Dimensions.get("window");
  
  // Animaciones
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(0.95)).current;
  const errorAnim = useRef(new Animated.Value(0)).current;
  const logoScale = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    // Animación de entrada
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      }),
      Animated.timing(scaleAnim, {
        toValue: 1,
        duration: 800,
        easing: Easing.bezier(0.17, 0.67, 0.83, 0.67),
        useNativeDriver: true,
      }),
      Animated.sequence([
        Animated.timing(logoScale, {
          toValue: 1.05,
          duration: 500,
          useNativeDriver: true,
        }),
        Animated.spring(logoScale, {
          toValue: 1,
          friction: 3,
          useNativeDriver: true,
        })
      ])
    ]).start();

    // Verificar si hay dispositivo recordado
    const checkRememberedDevice = async () => {
      const remembered = await AsyncStorage.getItem('rememberDevice');
      setRememberDevice(remembered === 'true');
    };
    checkRememberedDevice();
  }, []);

  useEffect(() => {
    // Animación para mensajes de error
    if (errorMessage) {
      Animated.sequence([
        Animated.timing(errorAnim, {
          toValue: 1,
          duration: 200,
          useNativeDriver: true,
        }),
        Animated.spring(errorAnim, {
          toValue: 0,
          friction: 3,
          tension: 40,
          useNativeDriver: true,
        }),
        Animated.timing(errorAnim, {
          toValue: -1,
          duration: 100,
          useNativeDriver: true,
        }),
        Animated.spring(errorAnim, {
          toValue: 0,
          friction: 3,
          tension: 40,
          useNativeDriver: true,
        })
      ]).start();
    }
  }, [errorMessage]);

  const handleLoginAndNavigate = async () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    const loginSuccess = await handleLogin();
    
    if (!navigation.isReady()) return;

    if (loginSuccess) {
      await handleRememberDevice(rememberDevice);
      navigation.navigate(authState.type_user === "Administrador" ? "AdminHome" : "UserCrentialScreen");
    } else {
      setErrorMessage("Credenciales incorrectas. Intenta nuevamente.");
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
    }
  };

  const handleRememberDevice = async (value) => {
    setRememberDevice(value);
    await AsyncStorage.setItem('rememberDevice', value ? 'true' : 'false');
  };

  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
    Haptics.selectionAsync();
  };

  return (
    <KeyboardAvoidingView 
      behavior={Platform.OS === "ios" ? "padding" : "height"} 
      style={{ flex: 1 }}
      keyboardVerticalOffset={Platform.OS === "ios" ? 40 : 0}
    >
      <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        <ScrollView 
          contentContainerStyle={styles.scrollContainer}
          keyboardShouldPersistTaps="handled"
        >
          {/* Video de fondo con efecto parallax */}
          <Video
            source={require("../../../assets/videos/fondo3.mp4")}
            style={[styles.videoBackground, { width, height }]}
            rate={1.0}
            volume={0.3}
            isMuted={false}
            resizeMode="cover"
            shouldPlay
            isLooping
          />

          {/* Capa de Overlay con gradiente */}
          <LinearGradient
            colors={['rgba(0,0,0,0.8)', 'rgba(0,0,0,0.5)', 'rgba(0,0,0,0.8)']}
            style={styles.overlay}
          >
            <Animated.View 
              style={[
                styles.formContainer, 
                { 
                  width: width * 0.9, 
                  maxWidth: 400,
                  opacity: fadeAnim,
                  transform: [{ scale: scaleAnim }]
                }
              ]}
            >
              {/* Logo más grande con animación */}
              <Animated.View style={{ transform: [{ scale: logoScale }] }}>
                <Image 
                  style={styles.logo} 
                  source={require("../../../assets/logblabio.png")} 
                  resizeMode="contain"
                />
              </Animated.View>
              
              <View style={styles.formContent}>
                {errorMessage && (
                  <Animated.View 
                    style={[
                      styles.errorContainer,
                      {
                        transform: [{
                          translateX: errorAnim.interpolate({
                            inputRange: [-1, 0, 1],
                            outputRange: [-10, 0, 10]
                          })
                        }]
                      }
                    ]}
                  >
                    <MaterialIcons name="error-outline" size={24} color="#FF6B6B" />
                    <Text style={styles.errorMessage}>{errorMessage}</Text>
                  </Animated.View>
                )}
                
                {isLoading ? (
                  <View style={styles.loaderContainer}>
                    <ActivityIndicator 
                      size="large" 
                      color="#48BBEC" 
                    />
                    <Text style={styles.loaderText}>Verificando credenciales...</Text>
                  </View>
                ) : (
                  <>
                    <ProfessionalInput
                      label="Matrícula"
                      value={state.userKey}
                      onChangeText={(text) => handleInputChange("userKey", text)}
                      placeholder="Ingresa tu matrícula"
                      disabled={isLoading}
                      icon={<MaterialIcons name="person" size={24} color="#A0AEC0" />}
                      error={errorMessage ? "" : undefined}
                      containerStyle={styles.inputContainer}
                    />

                    <ProfessionalInput
                      label="Contraseña"
                      value={state.password}
                      onChangeText={(text) => handleInputChange("password", text)}
                      placeholder="Ingresa tu contraseña"
                      secureTextEntry={!isPasswordVisible}
                      disabled={isLoading}
                      icon={<MaterialIcons name="lock" size={24} color="#A0AEC0" />}
                      rightIcon={
                        <TouchableOpacity 
                          onPress={togglePasswordVisibility}
                          style={styles.eyeIconContainer}
                        >
                          <Feather 
                            name={isPasswordVisible ? "eye-off" : "eye"} 
                            size={20} 
                            color="#A0AEC0" 
                          />
                        </TouchableOpacity>
                      }
                      error={errorMessage ? "" : undefined}
                      containerStyle={styles.inputContainer}
                    />

                    <View style={styles.rememberDeviceWrapper}>
                      <TouchableOpacity 
                        style={styles.rememberDeviceContainer} 
                        onPress={() => handleRememberDevice(!rememberDevice)}
                        activeOpacity={0.7}
                      >
                        <MaterialIcons 
                          name={rememberDevice ? "check-box" : "check-box-outline-blank"} 
                          size={24} 
                          color={rememberDevice ? "#48BBEC" : "#A0AEC0"} 
                        />
                        <Text style={styles.rememberDeviceText}>Recordar dispositivo</Text>
                      </TouchableOpacity>
                    </View>

                    <ProfessionalButton
                      title="Iniciar sesión"
                      onPress={handleLoginAndNavigate}
                      disabled={isLoading}
                      variant="primary"
                      width="100%"
                      buttonStyle={styles.loginButton}
                      icon={<Feather name="log-in" size={20} color="white" />}
                      iconPosition="right"
                    />

                    {/* Enlace "Olvidé contraseña" movido aquí */}
                    <TouchableOpacity
                      onPress={() => {
                        Haptics.selectionAsync();
                        navigation.navigate("RecoverPasswordScreen");
                      }}
                      style={styles.forgotPasswordButton}
                    >
                      <Text style={styles.forgotPasswordText}>¿Olvidaste tu contraseña?</Text>
                    </TouchableOpacity>

                    <View style={styles.dividerContainer}>
                      <View style={styles.dividerLine} />
                      <Text style={styles.dividerText}>o</Text>
                      <View style={styles.dividerLine} />
                    </View>

                    <ProfessionalButton
                      title="Regístrate"
                      onPress={() => {
                        Haptics.selectionAsync();
                        navigation.navigate("RegisterScreen");
                      }}
                      variant="secondary"
                      width="100%"
                      buttonStyle={styles.registerButton}
                      icon={<Feather name="user-plus" size={20} color="#48BBEC" />}
                    />
                  </>
                )}
              </View>
            </Animated.View>

            {/* Footer con animación */}
            <Animated.View 
              style={[
                styles.footer,
                { opacity: fadeAnim }
              ]}
            >
              <Image 
                style={styles.footerLogo} 
                source={require("../../../assets/nkos_logvblanco.png")} 
                resizeMode="contain"
              />
              
              <View style={styles.footerLinks}>
                <TouchableOpacity
                  onPress={() => {
                    Haptics.selectionAsync();
                    // navigation.navigate("TermsScreen");
                  }}
                >
                  <Text style={styles.footerLinkText}>Términos y condiciones</Text>
                </TouchableOpacity>
                
                <View style={styles.footerSeparator} />
                
                <TouchableOpacity
                  onPress={() => {
                    Haptics.selectionAsync();
                    // navigation.navigate("SupportScreen");
                  }}
                >
                  <Text style={styles.footerLinkText}>Soporte Técnico</Text>
                </TouchableOpacity>
              </View>
            </Animated.View>
          </LinearGradient>
        </ScrollView>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
    minHeight: Dimensions.get('window').height,
  },
  videoBackground: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: -1,
  },
  overlay: {
    flex: 1,
    width: '100%',
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 40,
  },
  formContainer: {
    backgroundColor: "rgba(255, 255, 255, 0.12)",
    borderRadius: 24,
    padding: 30,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 12 },
    shadowOpacity: 0.3,
    shadowRadius: 24,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.1)",
    overflow: 'hidden',
  },
  logo: {
    height: 140,
    width: '100%',
    marginBottom: 30,
    tintColor: 'white',
  },
  formContent: {
    width: '100%',
  },
  errorContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 107, 107, 0.2)',
    padding: 16,
    borderRadius: 12,
    marginBottom: 20,
    borderLeftWidth: 4,
    borderLeftColor: '#FF6B6B',
  },
  errorMessage: {
    color: "#FFFFFF",
    fontWeight: "500",
    marginLeft: 12,
    flex: 1,
    fontSize: 14,
  },
  loaderContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 30,
  },
  loaderText: {
    color: '#FFFFFF',
    marginTop: 15,
    fontSize: 14,
    opacity: 0.8,
  },
  inputContainer: {
    marginBottom: 22,
  },
  rememberDeviceWrapper: {
    marginBottom: 20,
  },
  rememberDeviceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
  },
  rememberDeviceText: {
    color: '#E2E8F0',
    fontSize: 14,
    marginLeft: 10,
    fontWeight: '500',
  },
  forgotPasswordButton: {
    alignSelf: 'center',
    marginTop: 16,
    marginBottom: 24,
  },
  forgotPasswordText: {
    fontSize: 14,
    color: '#5271ff',
    fontWeight: '500',
    textDecorationLine: 'underline',
  },
  eyeIconContainer: {
    padding: 8,
  },
  loginButton: {
    marginTop: 10,
    height: 52,
    borderRadius: 12,
    shadowColor: '#48BBEC',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
  },
  dividerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 16,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
  },
  dividerText: {
    color: '#CBD5E0',
    paddingHorizontal: 12,
    fontSize: 12,
    fontWeight: '600',
  },
  registerButton: {
    height: 52,
    borderRadius: 12,
    borderWidth: 1.5,
    borderColor: '#48BBEC',
    backgroundColor: 'rgba(72, 187, 236, 0.1)',
  },
  footer: {
    marginTop: 40,
    alignItems: 'center',
  },
  footerLogo: {
    height: 70,
    width: 120,
    marginBottom: 20,
  },
  footerLinks: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  footerLinkText: {
    fontSize: 12,
    color: '#CBD5E0',
    fontWeight: '500',
  },
  footerSeparator: {
    width: 1,
    height: 14,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    marginHorizontal: 12,
  },
});
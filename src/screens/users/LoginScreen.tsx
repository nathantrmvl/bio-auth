import React, { useEffect, useState } from "react";
import { View, Text, TextInput, TouchableOpacity, ActivityIndicator, Image, ScrollView } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useLogin } from "../../hooks/useLogin";
import { appTheme } from "../../theme/appTheme";
import { Video } from 'expo-av';  

export const LoginScreen = () => {
  const navigation = useNavigation();
  const { isLoading, handleLogin, handleInputChange, state, request } = useLogin();
  const [errorMessage, setErrorMessage] = useState("");

  const handleLoginAndNavigate = async () => {
    const loginSuccess = await handleLogin();
    
    if (!navigation.isReady()) return;
    if (loginSuccess) {
      navigation.navigate(authState.type_user === "Administrador" ? "AdminHome" : "UserCrentialScreen");
    } else {
      setErrorMessage("Credenciales incorrectas. Intenta nuevamente.");
    }
  };

  useEffect(() => {
    if (request === false) {
      setErrorMessage("Ocurrió un error durante el login. Por favor intenta de nuevo.");
    }
  }, [request]);

  
  return (
    <ScrollView contentContainerStyle={appTheme.container}>
      {/* Video Background */}
      <Video
        source={require("../../../assets/videos/fondo6.mp4")}
        style={appTheme.videoBackground}
        rate={1.0}
        volume={1.0}
        isMuted={false}
        resizeMode="cover"
        shouldPlay
        isLooping
      />

      <View style={appTheme.overlay}>
        <View style={appTheme.formContainer}>
          <Image
            style={appTheme.footerLogo}
            source={require("../../../assets/logblabio.png")}
          />
          {errorMessage && <Text style={appTheme.errorMessage}>{errorMessage}</Text>}
          {isLoading && <ActivityIndicator style={appTheme.loader} size="large" color="green" />}
          <TextInput
            style={appTheme.input}
            value={state.userKey}
            onChangeText={(text) => handleInputChange("userKey", text)}
            placeholder="Ingresa tu matrícula"
            placeholderTextColor="#aaa"
            editable={!isLoading}
          />
          <TextInput
            style={[appTheme.input, { marginTop: 20 }]}
            value={state.password}
            onChangeText={(text) => handleInputChange("password", text)}
            placeholder="Contraseña"
            placeholderTextColor="#aaa"
            editable={!isLoading}
            secureTextEntry
          />
          <TouchableOpacity onPress={() => navigation.navigate("RecoverPasswordScreen")}>
            <Text style={appTheme.footerLinkText}>¿Olvidaste tu contraseña?</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={handleLoginAndNavigate} disabled={isLoading}>
            <View style={appTheme.loginButton}>
              <Text style={appTheme.loginButtonText}>Iniciar sesión</Text>
            </View>
          </TouchableOpacity>

          {/* Link para Olvidaste tu contraseña */}
          

          {/* Link para Registrarse - Centrado */}
          <View style={appTheme.registerLinkContainer}>
            <TouchableOpacity onPress={() => navigation.navigate("RegisterScreen")}>
              <Text style={appTheme.registerLinkText}>¿No tienes cuenta? Regístrate</Text>
            </TouchableOpacity>
          </View>
        </View>

        <Image
          style={appTheme.footerLogo2}
          source={require("../../../assets/nkos_logvblanco.png")}
        />
        <View style={appTheme.footerLinks}>
          <TouchableOpacity>
            <Text style={appTheme.footerLinkText}> Términos y condiciones</Text>
          </TouchableOpacity>
          <Text style={appTheme.footerLinkSeparator}>|</Text>
          <TouchableOpacity>
            <Text style={appTheme.footerLinkText}>Soporte Técnico</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};

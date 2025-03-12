import React, { useEffect, useState } from "react";
import { View, Text, TextInput, TouchableOpacity, ActivityIndicator, Image, ScrollView, KeyboardAvoidingView, Platform, Dimensions } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useLogin } from "../../hooks/useLogin";
import { Video } from 'expo-av';  
import { appTheme } from "../../theme/appTheme";

export const LoginScreen = () => {
  const navigation = useNavigation();
  const { isLoading, handleLogin, handleInputChange, state, request } = useLogin();
  const [errorMessage, setErrorMessage] = useState("");
  const { width, height } = Dimensions.get("window");

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
    <KeyboardAvoidingView 
      behavior={Platform.OS === "ios" ? "padding" : "height"} 
      style={{ flex: 1 }}
    >
      <ScrollView contentContainerStyle={[appTheme.container, { minHeight: height }]}>
        {/* Video de fondo */}
        <Video
          source={require("../../../assets/videos/fondo6.mp4")}
          style={[appTheme.videoBackground, { width, height }]}
          rate={1.0}
          volume={1.0}
          isMuted={false}
          resizeMode="cover"
          shouldPlay
          isLooping
        />

        {/* Capa de Overlay */}
        <View style={[appTheme.overlay, { paddingHorizontal: width * 0.05 }]}>
          <View style={[appTheme.formContainer, { width: width * 0.9, maxWidth: 400 }]}>
            <Image style={appTheme.footerLogo} source={require("../../../assets/logblabio.png")} />
            
            {errorMessage && <Text style={appTheme.errorMessage}>{errorMessage}</Text>}
            {isLoading && <ActivityIndicator style={appTheme.loader} size="large" color="green" />}

            <TextInput
              style={[appTheme.input, { fontSize: width * 0.045 }]}
              value={state.userKey}
              onChangeText={(text) => handleInputChange("userKey", text)}
              placeholder="Ingresa tu matrícula"
              placeholderTextColor="#aaa"
              editable={!isLoading}
            />
            <TextInput
              style={[appTheme.input, { marginTop: 20, fontSize: width * 0.045 }]}
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

            {/* Link de Registro */}
            <View style={appTheme.registerLinkContainer}>
              <TouchableOpacity onPress={() => navigation.navigate("RegisterScreen")}>
                <Text style={appTheme.registerLinkText}>¿No tienes cuenta? Regístrate</Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* Footer */}
          <Image style={appTheme.footerLogo2} source={require("../../../assets/nkos_logvblanco.png")} />
          <View style={appTheme.footerLinks}>
            <TouchableOpacity>
              <Text style={appTheme.footerLinkText}>Términos y condiciones</Text>
            </TouchableOpacity>
            <Text style={appTheme.footerLinkSeparator}>|</Text>
            <TouchableOpacity>
              <Text style={appTheme.footerLinkText}>Soporte Técnico</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

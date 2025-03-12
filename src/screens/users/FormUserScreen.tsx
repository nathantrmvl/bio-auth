import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, Image, SafeAreaView, ScrollView, Alert } from 'react-native';
import { StackScreenProps } from '@react-navigation/stack';
import * as ImagePicker from 'expo-image-picker';
import * as FileSystem from 'expo-file-system';
import { RootStackUserParam } from '../../navigator/UsersNavigator';
import { useUserForm } from "../../hooks/useUserForm";
import { BtnTouch } from '../../componentes/BtnTouch';
import { styles } from '../../theme/styleform';

interface Props extends StackScreenProps<RootStackUserParam, 'FormUserScreen'> {}

export const FormUserScreen = ({ navigation, route }: Props) => {
  const { state, handleInputChange, handleDelete, handleSubmit, handleReset } = useUserForm();
  const [successMessage, setSuccessMessage] = useState('');

  useEffect(() => {
    const usuario = route.params?.UserResponse;
    if (usuario) {
      Object.entries(usuario).forEach(([userKey, value]) => {
        if (value) handleInputChange(userKey, value);
      });
    }
  }, [route.params]);

  const pickImage = async () => {
    try {
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 0.5,
      });

      if (!result.canceled) {
        const base64 = await FileSystem.readAsStringAsync(result.assets[0].uri, {
          encoding: FileSystem.EncodingType.Base64,
        });
        handleInputChange('image', base64);
      }
    } catch (error) {
      console.log('Error al seleccionar imagen:', error);
    }
  };

  const handleSave = async () => {
    try {
      await handleSubmit();
      if (state._id) {
        setSuccessMessage(`Usuario ${state.status} correctamente`);
      } else {
        setSuccessMessage('Usuario registrado exitosamente');
        handleReset();
      }
      navigation.navigate("StackNavigator", { screen: "AdminHome" });
    } catch (error) {
      console.error('Error al guardar el usuario:', error);
      Alert.alert('Error', 'Ocurrió un error al guardar el usuario.');
    }
  };

  const handleToggleStatus = async () => {
    const newStatus = state.status === 'Bloqueado' ? 'Activo' : 'Bloqueado';

    Alert.alert(
      "Confirmación",
      `¿Estás seguro de que deseas ${newStatus.toLowerCase()} a este usuario?`,
      [
        { text: "Cancelar", style: "cancel" },
        {
          text: "Sí, continuar",
          onPress: async () => {
            handleInputChange('status', newStatus);
            await handleSubmit();
            setSuccessMessage(`Usuario ${newStatus} correctamente.`);
          }
        }
      ]
    );
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.title}>Formulario de usuarios</Text>
        <TextInput
          style={[styles.input, state.userKey ? styles.inputFocus : {}]}
          value={state.userKey}
          onChangeText={(text) => handleInputChange('userKey', text)}
          placeholder="Nombre del usuario"
        />
        <TextInput
          style={[styles.input, state.name ? styles.inputFocus : {}]}
          value={state.name}
          onChangeText={(text) => handleInputChange('name', text)}
          placeholder="Nombre"
        />
        <TextInput
          style={[styles.input, state.f_surname ? styles.inputFocus : {}]}
          value={state.f_surname}
          onChangeText={(text) => handleInputChange('f_surname', text)}
          placeholder="Apellido paterno"
        />
        <TextInput
          style={[styles.input, state.m_surname ? styles.inputFocus : {}]}
          value={state.m_surname}
          onChangeText={(text) => handleInputChange('m_surname', text)}
          placeholder="Apellido materno"
        />
        <TextInput
          style={[styles.input, state.email ? styles.inputFocus : {}]}
          value={state.email}
          onChangeText={(text) => handleInputChange('email', text)}
          placeholder="Correo electrónico"
        />

        <BtnTouch
          title="Seleccionar imagen"
          action={pickImage}
          backgroundColor="#007AFF"
        />
        {state.image !== '' && (
          <Image
            source={{ uri: `data:image/jpeg;base64,${state.image}` }}
            style={styles.imagePreview}
          />
        )}

        <TextInput
          style={[styles.input, state.password ? styles.inputFocus : {}]}
          value={state.password}
          secureTextEntry
          onChangeText={(text) => handleInputChange('password', text)}
          placeholder="Contraseña"
        />

        <TextInput
          style={[styles.input, state.department ? styles.inputFocus : {}]}
          value={state.department}
          onChangeText={(text) => handleInputChange('department', text)}
          placeholder="Departamento"
        />

        <TextInput
          style={[styles.input, state.position ? styles.inputFocus : {}]}
          value={state.position}
          onChangeText={(text) => handleInputChange('position', text)}
          placeholder="Posición"
        />

        <TextInput
          style={[styles.input, state.type_user ? styles.inputFocus : {}]}
          value={state.type_user}
          onChangeText={(text) => handleInputChange('type_user', text)}
          placeholder="Tipo de usuario (Ej. Administrador, Empleado, Seguridad, Autobus)"
        />

        <View style={styles.buttonContainer}>
          <View style={styles.horizontalButtonsContainer}>
            <BtnTouch
              action={handleSave}
              title={state.userKey ? 'Actualizar registro' : 'Crear Registro'}
              backgroundColor="#007AFF"
            />
            {state.userKey && (
              <BtnTouch
                title={state.status === 'Bloqueado' ? "Desbloquear" : "Bloquear"}
                action={handleToggleStatus}
                backgroundColor={state.status === 'Bloqueado' ? "#0cca0c" : "#e10a0a"}
              />
            )}
          </View>
        </View>

        {successMessage !== '' && <Text style={styles.successMessage}>{successMessage}</Text>}
      </ScrollView>
    </SafeAreaView>
  );
};

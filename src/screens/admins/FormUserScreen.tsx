import React, { useEffect, useState } from 'react';
import { SafeAreaView, ScrollView, StyleSheet, View, Alert } from 'react-native';
import { StackScreenProps } from '@react-navigation/stack';
import { RootStackUserParam } from '../../navigator/UsersNavigator';
import { useUserForm } from '../../hooks/useUserForm';
import { FormHeader } from '../../componentes/com_forms/FormHeader';
import { UserImagePicker } from '../../componentes/com_forms/UserImagePicker';
import { UserFormFields } from '../../componentes/com_forms/UserFormFields';
import { UserTypeSelector } from '../../componentes/com_forms/UserTypeSelector';
import { FormActions } from '../../componentes/com_forms/FormActions';
import { SectionDivider } from '../../componentes/com_forms/SectionDivider';

interface Props extends StackScreenProps<RootStackUserParam, 'FormUserScreen'> {}

export const FormUserScreen = ({ navigation, route }: Props) => {
  const { state, handleInputChange, setFormData, handleSubmit, handleDelete, handleReset } = useUserForm();
  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    const usuario = route.params?.UserResponse;
    if (usuario) {
      setFormData({
        ...usuario,
        password: '', // Inicializamos como vacío para edición
        status: usuario.status || 'Activo'
      });
    } else {
      handleReset();
    }
  }, [route.params?.UserResponse]);

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    if (!state.name.trim()) newErrors.name = 'Nombre es requerido';
    if (!state.email.trim()) newErrors.email = 'Email es requerido';
    if (!state._id && !state.password) newErrors.password = 'Contraseña es requerida';
    if (!state.type_user.trim()) newErrors.type_user = 'Seleccione un tipo de usuario';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSave = async () => {
    if (validateForm()) {
      try {
        // Preparamos los datos para enviar
        const dataToSend = { ...state };
        
        // Si estamos editando y el campo password está vacío, lo eliminamos
        if (state._id && dataToSend.password === '') {
          delete dataToSend.password;
        }

        await handleSubmit(dataToSend);
        navigation.goBack();
      } catch (error: any) {
        Alert.alert('Error', error.message || 'Ocurrió un error al guardar los datos');
      }
    }
  };

  const confirmDelete = () => {
    if (!state._id) return;
    
    Alert.alert(
      'Eliminar Usuario',
      '¿Estás seguro de eliminar este usuario?',
      [
        { text: 'Cancelar', style: 'cancel' },
        { 
          text: 'Eliminar', 
          onPress: async () => {
            try {
              await handleDelete(state._id);
              navigation.goBack();
            } catch (error: any) {
              Alert.alert('Error', error.message || 'Error al eliminar usuario');
            }
          },
          style: 'destructive'
        },
      ]
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <FormHeader 
          title={state._id ? 'Editar Usuario' : 'Nuevo Usuario'} 
          onBack={() => navigation.goBack()} 
        />

        <View style={styles.formCard}>
          <UserImagePicker 
            image={state.image} 
            onImageSelected={(base64) => handleInputChange('image', base64)} 
          />

          <SectionDivider title="Información Personal" />
          <UserFormFields 
            state={state} 
            errors={errors}
            onInputChange={handleInputChange}
            isEditing={!!state._id}
          />

          <SectionDivider title="Tipo de Usuario" />
          <UserTypeSelector 
            selectedValue={state.type_user}
            onValueChange={(value) => handleInputChange('type_user', value)}
            error={errors.type_user}
          />

          <FormActions 
            isEditing={!!state._id}
            status={state.status}
            onSave={handleSave}
            onDelete={state._id ? confirmDelete : undefined}
            onStatusChange={(newStatus) => handleInputChange('status', newStatus)}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  scrollContainer: {
    padding: 16,
    paddingBottom: 32,
  },
  formCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 3,
  },
});
import React from 'react';
import { View, StyleSheet } from 'react-native';
import { ProfessionalInput } from '../Input';

interface UserFormFieldsProps {
  state: any;
  errors: Record<string, string>;
  onInputChange: (field: string, value: string | null) => void;
  isEditing?: boolean;
}

export const UserFormFields: React.FC<UserFormFieldsProps> = ({ 
  state, 
  errors,
  onInputChange,
  isEditing = false
}) => {
  const handlePasswordChange = (text: string) => {
    if (isEditing && text === '') {
      onInputChange('password', null); // Envía null cuando no se quiere cambiar
    } else {
      onInputChange('password', text); // Envía la nueva contraseña
    }
  };

  return (
    <View style={styles.container}>
      <ProfessionalInput
        label="Nombre completo"
        value={state.name}
        onChangeText={(text) => onInputChange('name', text)}
        placeholder="Ej: Juan Pérez"
        error={errors.name}
        icon="person"
      />

      <ProfessionalInput
        label="Apellido paterno"
        value={state.f_surname}
        onChangeText={(text) => onInputChange('f_surname', text)}
        placeholder="Ej: González"
        error={errors.f_surname}
      />

      <ProfessionalInput
        label="Apellido materno"
        value={state.m_surname}
        onChangeText={(text) => onInputChange('m_surname', text)}
        placeholder="Ej: López"
        error={errors.m_surname}
      />

      <ProfessionalInput
        label="Correo electrónico"
        value={state.email}
        onChangeText={(text) => onInputChange('email', text)}
        placeholder="Ej: usuario@empresa.com"
        keyboardType="email-address"
        error={errors.email}
        icon="email"
      />

      <ProfessionalInput
        label="Nombre de usuario"
        value={state.userKey}
        onChangeText={(text) => onInputChange('userKey', text)}
        placeholder="Ej: juan.perez"
        error={errors.userKey}
        icon="alternate-email"
      />

      <ProfessionalInput
        label="Contraseña"
        value={state.password || ''}
        onChangeText={handlePasswordChange}
        placeholder={isEditing ? "Dejar vacío para no cambiar" : "Mínimo 8 caracteres"}
        secureTextEntry={true}
        error={errors.password}
        icon="lock"
      />

      <ProfessionalInput
        label="Departamento"
        value={state.department}
        onChangeText={(text) => onInputChange('department', text)}
        placeholder="Ej: Recursos Humanos"
        error={errors.department}
        icon="business"
      />

      <ProfessionalInput
        label="Posición/Cargo"
        value={state.position}
        onChangeText={(text) => onInputChange('position', text)}
        placeholder="Ej: Gerente de RH"
        error={errors.position}
        icon="work"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
  },
});
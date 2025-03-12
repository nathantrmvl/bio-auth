import React, { useContext } from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import { StackScreenProps } from '@react-navigation/stack';
import { RootStackParams } from './../../navigator/StackNavigator';
import { Ionicons } from '@expo/vector-icons';
import { AuthContext } from './../../context/AuthContext';
import { stylecredential } from '../../theme/stylecredential'; // Importa los estilos

interface Props extends StackScreenProps<RootStackParams, 'UserCredentialScreen'> {};

export const UserCredentialScreen = ({ navigation, route }: Props) => {
    const { authState } = useContext(AuthContext);

    const {
        _id,
        name = 'Usuario Desconocido',
        f_surname = '',
        m_surname = '',
        image,
        department = 'Sin departamento',
        position = 'Sin puesto',
        status = 'Inactivo',
    } = authState;

    return (
        <View style={stylecredential.container}>
            <View style={stylecredential.header}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Ionicons name="arrow-back" size={24} color="black" />
                </TouchableOpacity>
                <Text style={stylecredential.headerTitle}>Credencial Digital</Text>
            </View>

            <View style={stylecredential.card}>
                {/* Logo o nombre de la empresa */}
                <Text style={stylecredential.companyName}></Text>

                {/* Imagen del usuario */}
                <Image 
                    source={image ? { uri: `data:image/jpeg;base64,${image}` } : require('../../../assets/cuervo.png')} 
                    style={stylecredential.profileImage} 
                />

                {/* Nombre completo */}
                <Text style={stylecredential.name}>{name} {f_surname} {m_surname}</Text>

                {/* Puesto */}
                <Text style={stylecredential.position}>{position}</Text>

                {/* Información adicional */}
                <View style={stylecredential.infoSection}>
                    <Text style={stylecredential.infoText}>ID: {_id}</Text>
                    <Text style={stylecredential.infoText}>Departamento: {department}</Text>
                    
                </View>

                {/* Estado */}
                <View style={[
                    stylecredential.statusContainer, 
                    status === 'Activo' ? stylecredential.active : 
                    status === 'Inactivo' ? stylecredential.inactive : 
                    stylecredential.blocked
                ]}>
                    <Text style={stylecredential.statusText}>Estado: {status}</Text>
                </View>

                {/* Fechas de expedición y vigencia */}
                <View style={stylecredential.datesContainer}>
                    <Text style={stylecredential.dateText}>Expedición: 05/04/30</Text>
                    <Text style={stylecredential.dateText}>Vigencia: 05/04/30</Text>
                </View>
            </View>
        </View>
    );
};
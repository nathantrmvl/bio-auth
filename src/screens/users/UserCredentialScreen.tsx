import React, { useContext } from 'react';
import { View, ScrollView } from 'react-native';
import { StackScreenProps } from '@react-navigation/stack';
import { RootStackParams } from './../../navigator/StackNavigator';
import { AuthContext } from './../../context/AuthContext';
import { stylecredential } from '../../theme/stylecredential';
import { CredentialHeader } from '../credential/CredentialHeader';
import { CredentialInfo } from '../credential/CredentialInfo';
import { DynamicQR } from '../credential/DynamicQR';

interface Props extends StackScreenProps<RootStackParams, 'UserCredentialScreen'> {}

export const UserCredentialScreen = ({ navigation, route }: Props) => {
    const { authState } = useContext(AuthContext);
    
    const usuario = {
        name: authState.name,
        f_surname: authState.f_surname,
        m_surname: authState.m_surname,
        department: authState.department,
        position: authState.position,
        userKey: authState.userKey,
        hora: Date.now(),
    };

    const additionalInfo = {
        bloodType: 'O+',
        emergencyContact: 'Juan Pérez (55 1234 5678)',
        accessLevel: 'Nivel 3 - Áreas restringidas'
    };

    console.log("Datos en credencial:", {
        department: authState.department,
        allData: authState
    });

    return (
        <ScrollView 
            contentContainerStyle={stylecredential.scrollContainer}
            showsVerticalScrollIndicator={false}
        >
            <View style={stylecredential.card}>
                <CredentialHeader
                    image={authState.image}
                    name={authState.name}
                    f_surname={authState.f_surname}
                    m_surname={authState.m_surname}
                    position={authState.position}
                    status={authState.status}
                    companyLogo="https://ejemplo.com/logo.png" // Reemplaza con tu logo
                />
                
                <CredentialInfo
                    userKey={authState.userKey}
                    department={authState.department}
                    issueDate="01/01/2023"
                    expiryDate="01/01/2025"
                    additionalInfo={additionalInfo}
                />
                
                <DynamicQR 
                    userData={usuario}
                />
            </View>
        </ScrollView>
    );
};
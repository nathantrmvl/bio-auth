import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { StackScreenProps } from '@react-navigation/stack';
import { RootStackParams } from './../../navigator/StackNavigator';
import { appTheme } from '../../theme/appTheme';
import { Ionicons } from '@expo/vector-icons';

interface Props extends StackScreenProps<RootStackParams, 'UserCredentialScreen'> {};

export const UserCredentialScreen = ({ navigation, route }: Props) => {
    const { name = 'Usuario Desconocido' } = route.params || {}; 

    return (
        <View style={appTheme.containerMarginGlobal}>
            <View style={appTheme.headerContainer}>
                <TouchableOpacity
                    style={appTheme.backButton}
                    onPress={() => navigation.goBack()}
                >
                    <Ionicons name="arrow-back" size={24} color="#000" />
                </TouchableOpacity>
                <Text style={appTheme.headerTitle}>
                    Bienvenido, {name}
                </Text>
            </View>
            <View style={appTheme.contentContainer}>
                <Text style={appTheme.welcomeMessage}>
                    Esta es tu pantalla de credenciales.
                </Text>
            </View>
        </View>
    );
};
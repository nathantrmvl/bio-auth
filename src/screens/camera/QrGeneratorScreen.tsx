import React, { useContext } from 'react';
import { View, Text } from 'react-native';
import { AuthContext } from '../../context/AuthContext';
import { styleGenerator } from '../../theme/styleGenerator';

export const QrGeneratorScreen = () => {
    const { authState } = useContext(AuthContext);

    return (
        <View style={styleGenerator.container}>
            <Text style={styleGenerator.timerText}>
                Esta pantalla ahora está simplificada.
            </Text>
        </View>
    );
};
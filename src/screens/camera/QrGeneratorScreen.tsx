import React, { useContext, useState, useEffect, useCallback } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import QRCode from 'react-native-qrcode-svg';
import { AuthContext } from '../../context/AuthContext';
import { styleGenerator } from '../../theme/styleGenerator';

export const QrGeneratorScreen = () => {
    const { authState } = useContext(AuthContext);
    const [estado, setEstado] = useState(false);
    const [time, setTime] = useState(0);

    // Crear objeto con los datos esenciales
    const usuario = {
        fullName: `${authState.name} ${authState.f_surname} ${authState.m_surname}`, // Nombre completo
        department: authState.department,
        position: authState.position,
        userKey: authState.userKey,
        hora: Date.now(),
    };

    useEffect(() => {
        let timer;
        if (estado && time > 0) {
            timer = setInterval(() => {
                setTime(prevTime => prevTime - 1000);
            }, 1000);
        }
        return () => clearInterval(timer);
    }, [estado, time]);

    const getTimer = useCallback(() => {
        if (time <= 0) return '00:00';
        const seconds = Math.floor(time / 1000);
        return `00:${seconds < 10 ? `0${seconds}` : seconds}`;
    }, [time]);

    const handleGenerateQR = () => {
        setTime(15000);
        setEstado(true);
    };

    const progress = (time / 15000) * 100;

    return (
        <View style={styleGenerator.container}>
            <Text style={styleGenerator.timerText}>{getTimer()}</Text>
            
            {estado && (
                <View style={styleGenerator.progressContainer}>
                    <View style={[styleGenerator.progressBar, { width: `${progress}%` }]} />
                </View>
            )}

            {time === 0 ? (
                <TouchableOpacity onPress={handleGenerateQR}>
                    <View style={styleGenerator.generateButton}>
                        <Text style={styleGenerator.buttonText}>Generar QR</Text>
                    </View>
                </TouchableOpacity>
            ) : (
                <QRCode
                    value={JSON.stringify(usuario)} 
                    color="#5271ff"
                    backgroundColor="#FFFFFF"
                    size={300}
                    logo={{ uri: `data:image/png;base64,${authState.image}` }}
                    logoBorderRadius={30}
                    logoSize={50}
                />
            )}
        </View>
    );
};

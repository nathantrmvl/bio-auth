import React, { useContext, useState, useEffect, useCallback } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import QRCode from 'react-native-qrcode-svg';
import { AuthContext } from '../../context/AuthContext';
import { styleGenerator } from '../../theme/styleGenerator';

export const QrGeneratorScreen = () => {
    const { authState } = useContext(AuthContext);
    const [estado, setEstado] = useState(false);
    const [time, setTime] = useState(0);

    const usuario = {
        nombre: authState.username,
        userKey: authState.userKey,
        hora: Date.now(),
    };

    // Temporizador optimizado
    useEffect(() => {
        let timer;
        if (estado && time > 0) {
            timer = setInterval(() => {
                setTime(prevTime => prevTime - 1000);
            }, 1000);
        }
        return () => clearInterval(timer); // Limpiar intervalo cuando el estado cambie
    }, [estado, time]);

    // Formato de tiempo con useCallback para evitar recreación en cada renderizado
    const getTimer = useCallback(() => {
        if (time <= 0) return '00:00'; // Garantiza que no se devuelvan valores incorrectos
        const seconds = Math.floor(time / 1000);
        const formattedTime = seconds < 10 ? `0${seconds}` : `${seconds}`;
        return `00:${formattedTime}`;
    }, [time]);

    // Función para manejar la generación del QR
    const handleGenerateQR = () => {
        setTime(15000);  // Tiempo de 15 segundos
        setEstado(true);  // Iniciar el temporizador
    };

    // Cálculo del porcentaje de progreso basado en el tiempo restante
    const progress = (time / 15000) * 100;

    return (
        <View style={styleGenerator.container}>
            <Text style={styleGenerator.timerText}>
                {getTimer()} {/* Mostrar el temporizador formateado */}
            </Text>
            
            {/* Barra de progreso */}
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
                    color="#5271ff" // Morado atractivo
                    backgroundColor="#FFFFFF" // Fondo blanco para el QR
                    size={300}
                    logo={{ uri: `data:image/png;base64,${authState.userImage}` }}
                    logoBorderRadius={30}
                    logoSize={50}
                />
            )}
        </View>
    );
};

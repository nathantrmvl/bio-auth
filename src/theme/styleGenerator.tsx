import { StyleSheet } from 'react-native';

export const styleGenerator = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F1F6F9', // Un color suave de fondo
        padding: 20,
    },
    timerText: {
        fontSize: 60,
        color: '#5271ff', // Morado atractivo
        fontWeight: 'bold',
        marginBottom: 30,
        textShadowColor: '#fff', // Morado más claro
        textShadowOffset: { width: 2, height: 2 },
        textShadowRadius: 10,
    },
    generateButton: {
        height: 70,
        width: 250,
        backgroundColor: '#5271ff', // Azul claro
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 40,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 6 },
        shadowOpacity: 0.3,
        shadowRadius: 8,
        elevation: 6,
        marginBottom: 20,
        transform: [{ scale: 1 }],
        transition: 'transform 0.3s ease-in-out',
    },
    buttonText: {
        color: 'white',
        fontSize: 24,
        fontWeight: 'bold',
    },
    progressContainer: {
        width: '100%',
        height: 5,
        backgroundColor: '#D3D3D3', // Gris claro como fondo de la barra
        borderRadius: 10,
        marginBottom: 20,
    },
    progressBar: {
        height: '100%',
        backgroundColor: '#5271ff', // Morado atractivo para la barra
        borderRadius: 10,
    },
});

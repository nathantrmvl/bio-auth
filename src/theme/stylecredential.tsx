import { StyleSheet } from 'react-native';

export const stylecredential = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f4f4f4', // Fondo claro
        padding: 20,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 20,
    },
    headerTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        marginLeft: 10,
        color: '#333', // Texto oscuro
    },
    card: {
        borderRadius: 5,
        padding: 25,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 10 },
        shadowOpacity: 0.2,
        shadowRadius: 15,
        elevation: 10,
        backgroundColor: '#fff', // Fondo blanco
    },
    companyName: {
        fontSize: 28,
        fontWeight: 'bold',
        color: '#333', // Texto oscuro
        marginBottom: 20,
        textAlign: 'center',
    },
    profileImage: {
        width: 175,
        height: 175,
        borderRadius: 5, // Imagen circular
        marginBottom: 20,
        borderWidth: 1,
        borderColor: '#e0e0e0', // Borde gris claro
    },
    name: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#333', // Texto oscuro
        marginBottom: 10,
        textAlign: 'center',
    },
    position: {
        fontSize: 18,
        color: '#666', // Texto gris
        marginBottom: 20,
        textAlign: 'center',
    },
    infoSection: {
        width: '100%',
        marginBottom: 20,
    },
    infoText: {
        fontSize: 16,
        color: '#333', // Texto oscuro
        marginBottom: 8,
        textAlign: 'center',
    },
    statusContainer: {
        marginTop: 15,
        paddingVertical: 8,
        paddingHorizontal: 20,
        borderRadius: 20,
        alignSelf: 'center',
    },
    statusText: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#fff', // Texto blanco
    },
    active: {
        backgroundColor: '#28a745', // Verde para estado activo
    },
    inactive: {
        backgroundColor: '#ffc107', // Amarillo para estado inactivo
    },
    blocked: {
        backgroundColor: '#dc3545', // Rojo para estado bloqueado
    },
    datesContainer: {
        marginTop: 20,
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    dateText: {
        fontSize: 14,
        color: '#666', // Texto gris
    },
});
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#f8f9fa", // Fondo claro y moderno
        paddingHorizontal: 16, // Menos padding para pantallas pequeñas
    },
    header: {
        alignItems: "center",
        paddingVertical: 20,
        borderBottomWidth: 1,
        borderColor: "#e9ecef", // Borde suave
        marginBottom: 16,
    },
    avatar: {
        width: 100,
        height: 100,
        borderRadius: 50,
        marginBottom: 12,
        backgroundColor: "#dee2e6", // Color de fondo para el avatar
        borderWidth: 2,
        borderColor: "#ffffff", // Borde blanco para resaltar
    },
    username: {
        fontSize: 18,
        fontWeight: "bold",
        textAlign: "center",
        marginVertical: 6,
        color: "#212529", // Texto oscuro
        textTransform: "capitalize", // Primera letra en mayúscula
    },
    userType: {
        fontSize: 14,
        fontWeight: "500", // Menos grueso que el nombre
        textAlign: "center",
        color: "#495057", // Texto gris oscuro
        marginTop: 4,
    },
    menu: {
        flex: 1,
        marginTop: 12,
    },
    menuButton: {
        marginBottom: 10,
        marginHorizontal: 8,
        backgroundColor: "#ffffff", // Fondo blanco para los botones
        paddingVertical: 12,
        paddingHorizontal: 16,
        borderRadius: 8,
        shadowColor: "#000", // Sombra suave
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3, // Sombra en Android
    },
    logoutButton: {
        marginTop: 16,
        backgroundColor: "#dc3545", // Rojo para el botón de cerrar sesión
        paddingVertical: 12,
        paddingHorizontal: 16,
        borderRadius: 8,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    imagesContainer: {
        flexDirection: "row",
        justifyContent: "center",
        marginTop: 24,
        gap: 16, // Espacio entre imágenes
    },
    smallImage: {
        width: 80,
        height: 40,
        borderRadius: 4,
    },
});
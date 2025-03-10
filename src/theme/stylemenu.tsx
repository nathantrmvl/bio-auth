import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#f4f7fc",
        paddingHorizontal: 24,
    },
    header: {
        alignItems: "center",
        paddingVertical: 24,
        borderBottomWidth: 1,
        borderColor: "#d1d9e6",
        marginBottom: 24,
    },
    avatar: {
        width: 110,
        height: 110,
        borderRadius: 55,
        marginBottom: 12,
        backgroundColor: "#cbd2e1",
    },
    username: {
        fontSize: 18,
        fontWeight: "bold",
        textAlign: "center",
        marginVertical: 6,
        color: "#2c3e50",
        textTransform: "uppercase",
    },
    userType: {
        fontSize: 16,
        fontWeight: "bold",
        textAlign: "center",
        color: "#34495e",
        marginTop: 6,
    },
    logoutButton: {
        marginTop: 12,
        backgroundColor: "#e74c3c",
        paddingVertical: 12,
        paddingHorizontal: 18,
        borderRadius: 12,
        marginTop: 24,
    },
    menu: {
        flex: 1,
        marginTop: 12,
    },
    menuButton: {
        marginBottom: 12,
        marginHorizontal: 12,
        backgroundColor: "#ecf0f1",
        paddingVertical: 10,
        paddingHorizontal: 15,
        borderRadius: 10,
        shadowColor: "#95a5a6",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
    },
    imagesContainer: {
        flexDirection: "row",
        justifyContent: "center",
        marginTop: '30%',
        gap: 24,
    },
    smallImage: {
        width: 90,
        height: 45,
        borderRadius: 6,
    },
});

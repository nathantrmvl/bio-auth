import React, { useEffect, useState } from "react";
import { View, Text, ActivityIndicator, StyleSheet, ScrollView } from "react-native";
import { CameraView, useCameraPermissions, ScanningResult } from 'expo-camera';
import { Fab } from "../../componentes/Fab";

export const QrScannerScreen = () => {
    const [getFacing, setFacing] = useState<"front" | "back">("back");
    const [data, setData] = useState<any>(null);
    const [permissions, requestPermissions] = useCameraPermissions();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const requestCameraPermissions = async () => {
            if (!permissions?.granted) {
                await requestPermissions();
            } else {
                setLoading(false);
            }
        };
        requestCameraPermissions();
    }, [permissions]);

    const toggleCameraFacing = () => {
        setFacing(current => (current === "back" ? "front" : "back"));
    };

    if (!permissions?.granted) {
        return (
            <View style={styles.permissionContainer}>
                <Text style={styles.permissionText}>Permiso de cámara requerido</Text>
                <Fab action={requestPermissions} title="🔄" position="center" />
            </View>
        );
    }

    return (
        <View style={styles.container}>
            {loading ? (
                <View style={styles.loadingContainer}>
                    <ActivityIndicator size="large" color="#00ff00" />
                    <Text style={styles.loadingText}>Cargando cámara...</Text>
                </View>
            ) : (
                <CameraView
                    facing={getFacing}
                    barcodeScannerSettings={{ barcodeTypes: ["qr"] }}
                    onBarcodeScanned={(result: ScanningResult) => {
                        try {
                            const scannedData = JSON.parse(result.data);
                            setData(scannedData);
                        } catch (error) {
                            console.error("Error al leer el QR:", error);
                        }
                    }}
                    style={styles.camera}
                >
                    <View style={styles.overlay}>
                        <View style={styles.scanBox} />
                        <Text style={styles.scanText}>Escanear QR</Text>

                        {data && (
                            <ScrollView contentContainerStyle={styles.dataContainer}>
                                <Text style={styles.dataText}>Datos Escaneados:</Text>

                                {data.fullName && (
                                    <Text style={styles.dataDetailsText}>
                                        <Text style={styles.bold}>Nombre completo:</Text> {data.fullName}
                                    </Text>
                                )}
                                {data.department && (
                                    <Text style={styles.dataDetailsText}>
                                        <Text style={styles.bold}>Departamento:</Text> {data.department}
                                    </Text>
                                )}
                                {data.position && (
                                    <Text style={styles.dataDetailsText}>
                                        <Text style={styles.bold}>Puesto:</Text> {data.position}
                                    </Text>
                                )}
                                {data.userKey && (
                                    <Text style={styles.dataDetailsText}>
                                        <Text style={styles.bold}>Usuario:</Text> {data.userKey}
                                    </Text>
                                )}
                            </ScrollView>
                        )}

                        <Fab action={toggleCameraFacing} title="🔄" position="button_right" />
                    </View>
                </CameraView>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "black",
    },
    camera: {
        flex: 1,
    },
    overlay: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    scanBox: {
        width: 250,
        height: 250,
        borderWidth: 4,
        borderColor: "#00FF00",
        borderRadius: 10,
        position: "absolute",
    },
    scanText: {
        color: "white",
        fontSize: 18,
        marginTop: 280,
    },
    dataContainer: {
        alignItems: "center",
        paddingHorizontal: 10,
        marginTop: 20,
    },
    dataText: {
        color: "#fff",
        fontSize: 18,
        marginBottom: 5,
        textAlign: "center",
    },
    dataDetailsText: {
        color: "#fff",
        fontSize: 14,
        textAlign: "center",
        marginTop: 10,
        backgroundColor: "rgba(0, 0, 0, 0.6)",
        padding: 10,
        borderRadius: 5,
        maxHeight: 200,
        overflow: "scroll",
    },
    bold: {
        fontWeight: "bold",
    },
    permissionContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#000",
    },
    permissionText: {
        color: "white",
        fontSize: 18,
        marginBottom: 20,
    },
    loadingContainer: {
        justifyContent: "center",
        alignItems: "center",
    },
    loadingText: {
        color: "#fff",
        fontSize: 18,
        marginTop: 10,
    },
});

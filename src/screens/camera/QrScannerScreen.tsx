import React, { useEffect, useState } from "react";
import { View, Text, ActivityIndicator, StyleSheet, ScrollView } from "react-native";
import { CameraView, useCameraPermissions, ScanningResult } from 'expo-camera';
import { Fab } from "../../componentes/Fab";

export const QrScannerScreen = () => {
    const [getFacing, setFacing] = useState<"front" | "back">("back");
    const [data, setData] = useState<any | null>(null); // Guardará el objeto decodificado
    const [permissions, requestPermissions] = useCameraPermissions();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!permissions?.granted) {
            requestPermissions();
        } else {
            setLoading(false);
        }
    }, [permissions]);

    const toggleCameraFacing = () => {
        setFacing(current => (current === "back" ? "front" : "back"));
    };

    // Función para procesar y ordenar los datos del QR
    const handleScan = (result: ScanningResult) => {
        try {
            const scannedData = JSON.parse(result.data); // Convertir a objeto
            setData(scannedData); // Guardar los datos en el estado
        } catch (error) {
            console.error("Error al procesar el QR:", error);
            setData({ error: "QR inválido" });
        }
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
                    onBarcodeScanned={handleScan}
                    style={styles.camera}
                >
                    <View style={styles.overlay}>
                        <View style={styles.scanBox} />
                        <Text style={styles.scanText}>Escanear QR</Text>

                        {data && (
                            <ScrollView contentContainerStyle={styles.dataContainer}>
                                <Text style={styles.dataText}>Datos escaneados:</Text>

                                {data.error ? (
                                    <Text style={styles.errorText}>{data.error}</Text>
                                ) : (
                                    <>
                                        <Text style={styles.dataDetailsText}><Text style={styles.bold}>Nombre:</Text> {data.name}</Text>
                                        <Text style={styles.dataDetailsText}><Text style={styles.bold}>Apellido paterno:</Text> {data.f_surname}</Text>
                                        <Text style={styles.dataDetailsText}><Text style={styles.bold}>Apellido materno:</Text> {data.m_surname}</Text>
                                        <Text style={styles.dataDetailsText}><Text style={styles.bold}>Departamento:</Text> {data.department}</Text>
                                        <Text style={styles.dataDetailsText}><Text style={styles.bold}>Puesto:</Text> {data.position}</Text>
                                        <Text style={styles.dataDetailsText}><Text style={styles.bold}>Clave de usuario:</Text> {data.userKey}</Text>
                                        <Text style={styles.dataDetailsText}><Text style={styles.bold}>Hora:</Text> {new Date(data.hora).toLocaleString()}</Text>
                                    </>
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
    container: { flex: 1, backgroundColor: "black" },
    camera: { flex: 1 },
    overlay: { flex: 1, justifyContent: "center", alignItems: "center" },
    scanBox: { width: 250, height: 250, borderWidth: 4, borderColor: "#00FF00", borderRadius: 10, position: "absolute" },
    scanText: { color: "white", fontSize: 18, marginTop: 280 },
    dataContainer: { alignItems: "center", paddingHorizontal: 10, marginTop: 20 },
    dataText: { color: "#fff", fontSize: 18, marginBottom: 5, textAlign: "center" },
    dataDetailsText: { color: "#fff", fontSize: 14, textAlign: "center", marginTop: 5 },
    bold: { fontWeight: "bold", color: "#00FF00" },
    errorText: { color: "red", fontSize: 16, textAlign: "center", marginTop: 10 },
    permissionContainer: { flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: "#000" },
    permissionText: { color: "white", fontSize: 18, marginBottom: 20 },
    loadingContainer: { justifyContent: "center", alignItems: "center" },
    loadingText: { color: "#fff", fontSize: 18, marginTop: 10 },
});


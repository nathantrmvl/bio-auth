import React, { useEffect, useState } from "react";
import { View, Text, ActivityIndicator, Alert, TouchableOpacity, Modal, TextInput } from "react-native";
import MapView, { Marker, Polyline } from "react-native-maps";
import * as Location from "expo-location";
import { useNavigation } from "@react-navigation/native";
import { styletransport } from '../../theme/styletransport';

export const TransporteScreen = ({ route }) => {
  const navigation = useNavigation();
  const type_user = route?.params?.type_user || "empleado";

  const [userLocation, setUserLocation] = useState(null);
  const [busLocation, setBusLocation] = useState(null);
  const [routeCoordinates, setRouteCoordinates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isTransportActive, setIsTransportActive] = useState(false);
  const [distance, setDistance] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [newRoute, setNewRoute] = useState("");
  const [locationSubscription, setLocationSubscription] = useState(null);

  useEffect(() => {
    const getLocation = async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        Alert.alert("Permiso denegado", "Se necesita acceso a la ubicación para mostrar el mapa");
        setLoading(false);
        return;
      }
      let location = await Location.getCurrentPositionAsync({});
      setUserLocation(location.coords);
      if (type_user === "Autobus") {
        setBusLocation(location.coords);
      }
      setLoading(false);
    };
    getLocation();
  }, []);

  useEffect(() => {
    if (type_user === "Autobus" && isTransportActive) {
      const subscribeLocation = async () => {
        const subscription = await Location.watchPositionAsync(
          { accuracy: Location.Accuracy.High, timeInterval: 3000, distanceInterval: 10 },
          (location) => {
            setBusLocation(location.coords);
            setRouteCoordinates(prev => [...prev, location.coords]);
          }
        );
        setLocationSubscription(subscription);
      };
      subscribeLocation();

      return () => {
        if (locationSubscription) locationSubscription.remove();
      };
    }
  }, [type_user, isTransportActive]);

  const startRoute = () => {
    if (!newRoute) {
      Alert.alert("Error", "Ingresa una ruta válida");
      return;
    }
    setRouteCoordinates([]);
    setIsTransportActive(true);
    setModalVisible(false);
  };

  if (loading) {
    return (
      <View style={styletransport.loadingContainer}>
        <ActivityIndicator size="large" color="#007bff" />
      </View>
    );
  }

  return (
    <View style={styletransport.containerGlobal}>
      <Text style={styletransport.headingadmin}>Seguimiento de Transporte</Text>
      <View style={styletransport.mapContainer}>
        <MapView
          style={{ flex: 1 }}
          initialRegion={{
            latitude: userLocation.latitude,
            longitude: userLocation.longitude,
            latitudeDelta: 0.05,
            longitudeDelta: 0.05,
          }}
          showsUserLocation>
          {busLocation && (
            <Marker coordinate={busLocation} title="Autobus" />
          )}
          {routeCoordinates.length > 0 && (
            <Polyline coordinates={routeCoordinates} strokeWidth={3} strokeColor="blue" />
          )}
        </MapView>
      </View>
      {distance && <Text style={styletransport.distanceText}>Distancia del transporte: {distance} km</Text>}
      {type_user === "Autobus" && (
        <TouchableOpacity style={styletransport.button} onPress={() => setModalVisible(true)}>
          <Text style={styletransport.buttonText}>{isTransportActive ? "Terminar Ruta" : "Iniciar Ruta"}</Text>
        </TouchableOpacity>
      )}
      <TouchableOpacity style={styletransport.button} onPress={() => navigation.goBack()}>
        <Text style={styletransport.buttonText}>Volver</Text>
      </TouchableOpacity>
      <Modal visible={modalVisible} transparent animationType="slide">
        <View style={styletransport.modalContainer}>
          <View style={styletransport.modalContent}>
            <Text style={styletransport.modalText}>Ingresa la ruta:</Text>
            <TextInput style={styletransport.input} placeholder="Ejemplo: Ruta 1" onChangeText={setNewRoute} />
            <TouchableOpacity style={styletransport.modalButton} onPress={startRoute}>
              <Text style={styletransport.modalButtonText}>Confirmar</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styletransport.modalCancelButton} onPress={() => setModalVisible(false)}>
              <Text style={styletransport.modalCancelButtonText}>Cancelar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

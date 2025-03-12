import React, { useEffect, useState, useRef } from "react";
import { View, Text, ActivityIndicator, Alert, TouchableOpacity, Modal, TextInput, Image } from "react-native";
import MapView, { Marker, Polyline } from "react-native-maps";
import * as Location from "expo-location";
import { useNavigation } from "@react-navigation/native";
import { styles } from '../../theme/styletransport'; // Importamos los estilos desde la carpeta theme

export const TransporteScreen = ({ route }) => {
  const navigation = useNavigation();
  const type_user = route?.params?.type_user || "empleado";

  const mapRef = useRef(null); // Referencia para el mapa
  const [userLocation, setUserLocation] = useState(null);
  const [busLocation, setBusLocation] = useState(null);
  const [routeCoordinates, setRouteCoordinates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isTransportActive, setIsTransportActive] = useState(false);
  const [distance, setDistance] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [origin, setOrigin] = useState(""); // Dirección de origen
  const [destination, setDestination] = useState(""); // Dirección de destino
  const [locationSubscription, setLocationSubscription] = useState(null);
  const [activeRoutes, setActiveRoutes] = useState([]);
  const [timeToDestination, setTimeToDestination] = useState(null);
  const [trafficLevel, setTrafficLevel] = useState("low"); // Nivel de tráfico: low, medium, high
  const [selectedPoints, setSelectedPoints] = useState([]); // Puntos seleccionados en el mapa

  useEffect(() => {
    const getLocation = async () => {
      try {
        let { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== "granted") {
          Alert.alert("Permiso denegado", "Se necesita acceso a la ubicación para mostrar el mapa");
          setLoading(false);
          return;
        }
        let location = await Location.getCurrentPositionAsync({});
        setUserLocation(location.coords);
        setBusLocation(location.coords); // Inicializar la ubicación del autobús
        setSelectedPoints([location.coords]); // Establecer la ubicación del usuario como primer punto
      } catch (error) {
        Alert.alert("Error", "No se pudo obtener la ubicación");
      } finally {
        setLoading(false);
      }
    };
    getLocation();
  }, []);

  useEffect(() => {
    if (isTransportActive) {
      const subscribeLocation = async () => {
        try {
          const subscription = await Location.watchPositionAsync(
            { accuracy: Location.Accuracy.High, timeInterval: 3000, distanceInterval: 10 },
            (location) => {
              setBusLocation(location.coords);
              setRouteCoordinates(prev => [...prev, location.coords]);
              calculateDistanceAndTime(location.coords);
              updateTrafficLevel(); // Actualizar el nivel de tráfico
              centerMapOnBus(location.coords); // Centrar el mapa en el autobús
            }
          );
          setLocationSubscription(subscription);
        } catch (error) {
          Alert.alert("Error", "No se pudo suscribir a la ubicación");
        }
      };
      subscribeLocation();

      return () => {
        if (locationSubscription) locationSubscription.remove();
      };
    }
  }, [isTransportActive]);

  const calculateDistanceAndTime = (coords) => {
    if (routeCoordinates.length > 0) {
      const lastCoord = routeCoordinates[routeCoordinates.length - 1];
      const distance = Math.sqrt(
        Math.pow(coords.latitude - lastCoord.latitude, 2) +
        Math.pow(coords.longitude - lastCoord.longitude, 2)
      );
      setDistance(distance.toFixed(2));
      setTimeToDestination((distance / 0.05).toFixed(1)); // Suponiendo una velocidad de 0.05 grados por minuto
    }
  };

  const updateTrafficLevel = () => {
    // Simular el nivel de tráfico (puedes integrar una API de tráfico real aquí)
    const levels = ["low", "medium", "high"];
    const randomLevel = levels[Math.floor(Math.random() * levels.length)];
    setTrafficLevel(randomLevel);
  };

  const centerMapOnBus = (coords) => {
    if (mapRef.current && coords) {
      mapRef.current.animateToRegion({
        latitude: coords.latitude,
        longitude: coords.longitude,
        latitudeDelta: 0.05,
        longitudeDelta: 0.05,
      }, 1000); // Animación de 1 segundo
    }
  };

  const handleMapPress = (event) => {
    const { coordinate } = event.nativeEvent;
    if (selectedPoints.length < 2) {
      setSelectedPoints(prev => [...prev, coordinate]);
    } else {
      Alert.alert("Aviso", "Ya has seleccionado dos puntos (origen y destino).");
    }
  };

  const startRoute = () => {
    if (selectedPoints.length < 2) {
      Alert.alert("Error", "Selecciona un punto en el mapa para definir el destino");
      return;
    }
    setRouteCoordinates(selectedPoints);
    setIsTransportActive(true);
    setActiveRoutes(prev => [...prev, `Ruta ${activeRoutes.length + 1}`]);
    setModalVisible(false);
  };

  const endRoute = () => {
    setIsTransportActive(false);
    if (locationSubscription) {
      locationSubscription.remove();
      setLocationSubscription(null);
    }
    setRouteCoordinates([]);
    setDistance(null);
    setTimeToDestination(null);
    setSelectedPoints([]);
  };

  const renderModal = () => (
    <Modal visible={modalVisible} transparent animationType="slide">
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <Text style={styles.modalText}>Selecciona el destino en el mapa:</Text>
          <TouchableOpacity style={styles.modalButton} onPress={startRoute}>
            <Text style={styles.modalButtonText}>Confirmar Ruta</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.modalCancelButton} onPress={() => setModalVisible(false)}>
            <Text style={styles.modalCancelButtonText}>Cancelar</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );

  const getMapStyle = () => {
    switch (trafficLevel) {
      case "low":
        return styles.mapContainer;
      case "medium":
        return [styles.mapContainer, styles.mapContainerMediumTraffic];
      case "high":
        return [styles.mapContainer, styles.mapContainerHighTraffic];
      default:
        return styles.mapContainer;
    }
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#007bff" />
      </View>
    );
  }

  return (
    <View style={styles.containerGlobal}>
      <Text style={styles.headingadmin}>Seguimiento de Transporte</Text>
      <View style={getMapStyle()}>
        <MapView
          ref={mapRef}
          style={{ flex: 1 }}
          initialRegion={{
            latitude: userLocation.latitude,
            longitude: userLocation.longitude,
            latitudeDelta: 0.05,
            longitudeDelta: 0.05,
          }}
          showsUserLocation
          showsTraffic // Muestra el tráfico en tiempo real
          showsCompass // Muestra la brújula
          showsBuildings // Muestra edificios en 3D
          onPress={handleMapPress} // Manejar clics en el mapa
        >
          {busLocation && (
            <Marker coordinate={busLocation} title="Autobus">
              <Image source={require("../../../assets/autobus_128.png")} style={{ width: 40, height: 40 }} />
            </Marker>
          )}
          {selectedPoints.map((point, index) => (
            <Marker key={index} coordinate={point} title={index === 0 ? "Origen" : "Destino"} />
          ))}
          {routeCoordinates.length > 0 && (
            <Polyline coordinates={routeCoordinates} strokeWidth={3} strokeColor="blue" />
          )}
        </MapView>
      </View>
      {distance && <Text style={styles.distanceText}>Distancia del transporte: {distance} km</Text>}
      {timeToDestination && <Text style={styles.timeText}>Tiempo estimado: {timeToDestination} minutos</Text>}
      <TouchableOpacity
        style={styles.button}
        onPress={isTransportActive ? endRoute : () => setModalVisible(true)}
      >
        <Text style={styles.buttonText}>{isTransportActive ? "Terminar Ruta" : "Iniciar Ruta"}</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.button, { backgroundColor: "orange" }]}
        onPress={() => centerMapOnBus(busLocation)}
      >
        <Text style={styles.buttonText}>Centrar en Autobús</Text>
      </TouchableOpacity>
      {renderModal()}
      <View style={styles.activeRoutesContainer}>
        <Text style={styles.activeRoutesTitle}>Rutas Activas:</Text>
        {activeRoutes.map((route, index) => (
          <Text key={index} style={styles.activeRouteText}>{route}</Text>
        ))}
      </View>
    </View>
  );
};
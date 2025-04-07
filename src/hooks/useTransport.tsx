import { useState, useEffect, useCallback, useRef, useMemo } from 'react';
import * as Location from 'expo-location';
import { Alert } from 'react-native';
import { Coordinates, Route, TrafficLevel, TransportUserType } from '../components/com_transport/types';

// Configuración constante
const LOCATION_OPTIONS = {
  accuracy: Location.Accuracy.High,
  timeInterval: 3000,
  distanceInterval: 10
};

const TRAFFIC_UPDATE_INTERVAL = 30000;
const TRAFFIC_LEVELS: TrafficLevel[] = ['low', 'medium', 'high'];

// Velocidades base según nivel de tráfico (km/h)
const TRAFFIC_SPEEDS = {
  high: 20,
  medium: 40,
  low: 60
};

export const useTransport = (userType: TransportUserType) => {
  const [state, setState] = useState({
    userLocation: null as Coordinates | null,
    busLocation: null as Coordinates | null,
    currentRoute: null as Route | null,
    routes: [] as Route[],
    loading: true,
    trafficLevel: 'low' as TrafficLevel,
    error: null as string | null
  });

  const locationSubscriptionRef = useRef<Location.LocationSubscription | null>(null);

  // Calcula la distancia entre dos puntos (fórmula haversine mejorada)
  const calculateDistance = useCallback((pointA: Coordinates, pointB: Coordinates) => {
    const toRad = (value: number) => (value * Math.PI) / 180;
    const R = 6371; // Radio de la Tierra en km
    const dLat = toRad(pointB.latitude - pointA.latitude);
    const dLon = toRad(pointB.longitude - pointA.longitude);
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(toRad(pointA.latitude)) * 
      Math.cos(toRad(pointB.latitude)) * 
      Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c; // Distancia en km
  }, []);

  // Calcula el tiempo estimado de viaje
  const calculateTimeEstimate = useCallback((distance: number, traffic: TrafficLevel) => {
    const baseSpeed = TRAFFIC_SPEEDS[traffic];
    return (distance / baseSpeed) * 60; // minutos
  }, []);

  // Actualiza la ruta con la nueva ubicación
  const updateRouteWithLocation = useCallback((location: Coordinates) => {
    setState(prev => {
      if (!prev.currentRoute) return prev;

      const newPoints = [...prev.currentRoute.points, location];
      let distance = prev.currentRoute.distance || 0;
      
      // Calcular distancia desde el último punto
      if (prev.currentRoute.points.length > 0) {
        const lastPoint = prev.currentRoute.points[prev.currentRoute.points.length - 1];
        distance += calculateDistance(lastPoint, location);
      }

      const timeEstimate = calculateTimeEstimate(distance, prev.trafficLevel);

      return {
        ...prev,
        busLocation: location,
        currentRoute: {
          ...prev.currentRoute,
          points: newPoints,
          distance,
          timeEstimate
        }
      };
    });
  }, [calculateDistance, calculateTimeEstimate]);

  // Maneja la suscripción a actualizaciones de ubicación
  const handleLocationUpdates = useCallback(() => {
    if (userType !== 'autobus') return;

    locationSubscriptionRef.current?.remove();

    locationSubscriptionRef.current = Location.watchPositionAsync(
      LOCATION_OPTIONS,
      ({ coords }) => {
        updateRouteWithLocation(coords);
      },
      (error) => {
        setState(prev => ({
          ...prev,
          error: `Error en ubicación: ${error.message}`
        }));
      }
    );
  }, [userType, updateRouteWithLocation]);

  // Inicialización y permisos
  useEffect(() => {
    const initTransport = async () => {
      try {
        const { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') {
          throw new Error('Permiso de ubicación denegado');
        }

        const location = await Location.getCurrentPositionAsync({});
        setState(prev => ({
          ...prev,
          userLocation: location.coords,
          busLocation: userType === 'autobus' ? location.coords : null,
          loading: false,
          error: null
        }));
      } catch (error) {
        setState(prev => ({
          ...prev,
          loading: false,
          error: error instanceof Error ? error.message : 'Error desconocido'
        }));
        Alert.alert('Error', 'No se pudo obtener la ubicación');
      }
    };

    initTransport();

    return () => {
      locationSubscriptionRef.current?.remove();
    };
  }, [userType]);

  // Simular cambios en el tráfico
  useEffect(() => {
    const trafficInterval = setInterval(() => {
      const randomLevel = TRAFFIC_LEVELS[Math.floor(Math.random() * TRAFFIC_LEVELS.length)];
      setState(prev => ({ 
        ...prev, 
        trafficLevel: randomLevel,
        // Actualizar tiempo estimado si hay ruta activa
        currentRoute: prev.currentRoute ? {
          ...prev.currentRoute,
          timeEstimate: calculateTimeEstimate(
            prev.currentRoute.distance || 0,
            randomLevel
          )
        } : null
      }));
    }, TRAFFIC_UPDATE_INTERVAL);

    return () => clearInterval(trafficInterval);
  }, [calculateTimeEstimate]);

  const startRoute = useCallback((route: Route) => {
    setState(prev => ({
      ...prev,
      currentRoute: { 
        ...route, 
        isActive: true,
        points: prev.busLocation ? [prev.busLocation] : [],
        distance: 0,
        timeEstimate: calculateTimeEstimate(0, prev.trafficLevel)
      },
      error: null
    }));

    handleLocationUpdates();
  }, [handleLocationUpdates, calculateTimeEstimate]);

  const endRoute = useCallback(() => {
    setState(prev => {
      if (!prev.currentRoute) return prev;

      const completedRoute = {
        ...prev.currentRoute,
        isActive: false,
        endTime: new Date().toISOString()
      };

      return {
        ...prev,
        routes: [...prev.routes, completedRoute],
        currentRoute: null
      };
    });

    locationSubscriptionRef.current?.remove();
  }, []);

  // Memoizar valores calculados
  const routeProgress = useMemo(() => {
    if (!state.currentRoute) return null;
    
    return {
      distance: state.currentRoute.distance || 0,
      timeEstimate: state.currentRoute.timeEstimate || 0,
      pointsCount: state.currentRoute.points.length
    };
  }, [state.currentRoute]);

  return {
    ...state,
    routeProgress,
    startRoute,
    endRoute,
    calculateDistance,
    calculateTimeEstimate
  };
};
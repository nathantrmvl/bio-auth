import React from 'react';
import { Platform, View, StyleSheet, Image } from 'react-native';
import MapView, { Marker, Polyline } from 'react-native-maps';
import { Coordinates, Route, TrafficLevel } from './types';

interface BusMapProps {
  userLocation: Coordinates | null;
  busLocation: Coordinates | null;
  currentRoute: Route | null;
  trafficLevel: TrafficLevel;
}

const BusMap: React.FC<BusMapProps> = ({ 
  userLocation, 
  busLocation, 
  currentRoute,
  trafficLevel
}) => {
  const mapRef = React.useRef<MapView>(null);

  return (
    <View style={[
      styles.container,
      trafficLevel === 'medium' && styles.mediumTraffic,
      trafficLevel === 'high' && styles.highTraffic,
    ]}>
      <MapView
        ref={mapRef}
        style={styles.map}
        initialRegion={userLocation ? {
          latitude: userLocation.latitude,
          longitude: userLocation.longitude,
          latitudeDelta: 0.05,
          longitudeDelta: 0.05,
        } : undefined}
      >
        {userLocation && (
          <Marker coordinate={userLocation} title="Tu ubicación" />
        )}
        
        {busLocation && (
          <Marker coordinate={busLocation} title="Autobús">
            <Image source={require('../../../assets/autobus_128.png')} style={styles.busIcon} />
          </Marker>
        )}
        
        {currentRoute?.points && currentRoute.points.length > 0 && (
          <Polyline
            coordinates={currentRoute.points}
            strokeColor="#007AFF"
            strokeWidth={4}
          />
        )}
      </MapView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 300,
    borderRadius: 12,
    overflow: 'hidden',
  },
  map: {
    flex: 1,
  },
  mediumTraffic: {
    borderWidth: 2,
    borderColor: '#FFA500',
  },
  highTraffic: {
    borderWidth: 2,
    borderColor: '#FF0000',
  },
  busIcon: {
    width: 40,
    height: 40,
  },
});

export default BusMap;
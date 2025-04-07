import React from 'react';
import { View, ScrollView, ActivityIndicator, StyleSheet } from 'react-native';
import  TransportHeader  from '../../componentes/com_transport/TransportHeader';
import  BusMap  from '../../componentes/com_transport/BusMap';
import  RouteControls  from '../../componentes/com_transport/RouteControls';
import  RouteInfo  from '../../componentes/com_transport/RouteInfo';
import  RoutesTable  from '../../componentes/com_transport/RoutesTable';
import { useTransport } from '../../hooks/useTransport';

const TransporteScreen = ({ route }) => {
  const userType = route?.params?.type_user || "empleado";
  const {
    userLocation,
    busLocation,
    currentRoute,
    routes,
    loading,
    trafficLevel,
    startRoute,
    endRoute,
  } = useTransport(userType);

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <ScrollView 
      contentContainerStyle={styles.container}
      style={styles.contentContainer}
    >
      <View style={styles.section}>
        <TransportHeader 
          title="Sistema de Transporte" 
          userType={userType} 
        />
      </View>

      <View style={styles.section}>
        <BusMap
          userLocation={userLocation}
          busLocation={busLocation}
          currentRoute={currentRoute}
          trafficLevel={trafficLevel}
        />
      </View>

      {currentRoute && (
        <View style={styles.section}>
          <RouteInfo 
            distance={currentRoute.distance}
            timeEstimate={currentRoute.timeEstimate}
            trafficLevel={trafficLevel}
          />
        </View>
      )}

      <View style={styles.section}>
        <RouteControls
          isRouteActive={!!currentRoute?.isActive}
          onStartRoute={startRoute}
          onEndRoute={endRoute}
          userType={userType}
        />
      </View>

      {(userType === 'autobus' || routes.length > 0) && (
        <View style={styles.section}>
          <RoutesTable 
            routes={routes} 
            userType={userType}
          />
        </View>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  contentContainer: {
    padding: 16,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  section: {
    marginBottom: 24,
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 3,
  },
});

export default TransporteScreen;
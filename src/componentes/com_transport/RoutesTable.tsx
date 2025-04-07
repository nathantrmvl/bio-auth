import React from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import { Route, TransportUserType } from './types';

interface RoutesTableProps {
  routes: Route[];
  userType: TransportUserType;
}

const RoutesTable: React.FC<RoutesTableProps> = ({ routes, userType }) => {
  const renderItem = ({ item }: { item: Route }) => (
    <TouchableOpacity style={styles.routeItem}>
      <View style={styles.routeHeader}>
        <Text style={styles.routeName}>{item.name}</Text>
        {item.isActive && <View style={styles.activeBadge} />}
      </View>
      
      <View style={styles.routeDetails}>
        <Text style={styles.detailText}>
          {item.points.length} puntos | {item.distance ? `${item.distance} km` : '--'}
        </Text>
        <Text style={styles.detailText}>
          {item.timeEstimate ? `${item.timeEstimate} min` : '--'}
        </Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        {userType === 'autobus' ? 'Mis Rutas' : 'Rutas Disponibles'}
      </Text>
      
      {routes.length > 0 ? (
        <FlatList
          data={routes}
          renderItem={renderItem}
          keyExtractor={item => item.id}
          scrollEnabled={false}
          contentContainerStyle={styles.listContent}
        />
      ) : (
        <Text style={styles.emptyText}>
          {userType === 'autobus' 
            ? 'No tienes rutas registradas' 
            : 'No hay rutas disponibles'}
        </Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 8,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 12,
  },
  listContent: {
    paddingBottom: 8,
  },
  routeItem: {
    backgroundColor: '#F9F9F9',
    borderRadius: 8,
    padding: 12,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: '#EEE',
  },
  routeHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 6,
  },
  routeName: {
    fontSize: 16,
    fontWeight: '500',
    color: '#007AFF',
  },
  activeBadge: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#4CAF50',
  },
  routeDetails: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  detailText: {
    fontSize: 14,
    color: '#666',
  },
  emptyText: {
    textAlign: 'center',
    color: '#999',
    marginVertical: 16,
  },
});

export default RoutesTable;
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { TrafficLevel } from './types';

interface RouteInfoProps {
  distance?: number;
  timeEstimate?: number;
  trafficLevel: TrafficLevel;
}

const RouteInfo: React.FC<RouteInfoProps> = ({ 
  distance, 
  timeEstimate,
  trafficLevel 
}) => {
  const getTrafficColor = () => {
    switch(trafficLevel) {
      case 'medium': return '#FFA500';
      case 'high': return '#FF0000';
      default: return '#4CAF50';
    }
  };

  const getTrafficText = () => {
    switch(trafficLevel) {
      case 'medium': return 'Tráfico moderado';
      case 'high': return 'Tráfico pesado';
      default: return 'Tráfico fluido';
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.row}>
        <Text style={styles.label}>Distancia:</Text>
        <Text style={styles.value}>{distance ? `${distance} km` : '--'}</Text>
      </View>
      
      <View style={styles.row}>
        <Text style={styles.label}>Tiempo estimado:</Text>
        <Text style={styles.value}>{timeEstimate ? `${timeEstimate} min` : '--'}</Text>
      </View>
      
      <View style={styles.row}>
        <Text style={styles.label}>Estado del tráfico:</Text>
        <View style={[styles.trafficIndicator, { backgroundColor: getTrafficColor() }]}>
          <Text style={styles.trafficText}>{getTrafficText()}</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: 8,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  label: {
    fontSize: 16,
    color: '#666',
    fontWeight: '500',
  },
  value: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  trafficIndicator: {
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 12,
  },
  trafficText: {
    color: '#FFF',
    fontWeight: '500',
    fontSize: 14,
  },
});

export default RouteInfo;
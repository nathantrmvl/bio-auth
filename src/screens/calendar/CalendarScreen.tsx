import React, { useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity, FlatList } from 'react-native';
import { Calendar, LocaleConfig } from 'react-native-calendars';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { CalendarEvent } from '../../interfaces/api-bioauth';

LocaleConfig.locales['es'] = {
  monthNames: [
    'Enero',
    'Febrero',
    'Marzo',
    'Abril',
    'Mayo',
    'Junio',
    'Julio',
    'Agosto',
    'Septiembre',
    'Octubre',
    'Noviembre',
    'Diciembre'
  ],
  monthNamesShort: [
    'Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'
  ],
  dayNames: [
    'Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'
  ],
  dayNamesShort: ['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'],
  today: 'Hoy'
};
LocaleConfig.defaultLocale = 'es';

const CalendarScreen = () => {
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  const [events, setEvents] = useState<CalendarEvent[]>([]);

  // Datos de ejemplo para eventos
  const mockEvents: Record<string, CalendarEvent[]> = {
    '2023-05-15': [
      {
        id: '1',
        title: 'Reunión de equipo',
        time: '10:00 - 11:30',
        location: 'Sala de conferencias A',
        description: 'Revisión del progreso del proyecto actual.',
        type: 'meeting'
      },
      {
        id: '2',
        title: 'Almuerzo con cliente',
        time: '13:00 - 14:30',
        location: 'Restaurante Downtown',
        description: 'Presentación de nuevas propuestas.',
        type: 'appointment'
      }
    ],
    '2023-05-20': [
      {
        id: '3',
        title: 'Taller de capacitación',
        time: '09:00 - 12:00',
        location: 'Sala de capacitación',
        description: 'Nuevas herramientas de desarrollo.',
        type: 'workshop'
      }
    ],
    '2023-05-25': [
      {
        id: '4',
        title: 'Entrega de reporte',
        time: 'Todo el día',
        location: '',
        description: 'Fecha límite para entrega del reporte mensual.',
        type: 'deadline'
      }
    ]
  };

  const onDayPress = (day: any) => {
    setSelectedDate(day.dateString);
    // Simular carga de eventos para la fecha seleccionada
    setEvents(mockEvents[day.dateString] || []);
  };

  const getEventIcon = (type: string) => {
    switch (type) {
      case 'meeting':
        return 'account-group';
      case 'appointment':
        return 'calendar-account';
      case 'workshop':
        return 'lightbulb-on';
      case 'deadline':
        return 'alert-circle';
      default:
        return 'calendar';
    }
  };

  const renderEvent = ({ item }: { item: CalendarEvent }) => (
    <View style={styles.eventItem}>
      <View style={styles.eventIconContainer}>
        <MaterialCommunityIcons 
          name={getEventIcon(item.type)} 
          size={24} 
          color="#596dc6" 
        />
      </View>
      <View style={styles.eventContent}>
        <Text style={styles.eventTitle}>{item.title}</Text>
        <Text style={styles.eventTime}>{item.time}</Text>
        {item.location && <Text style={styles.eventLocation}>{item.location}</Text>}
        <Text style={styles.eventDescription}>{item.description}</Text>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Calendario</Text>
        <TouchableOpacity style={styles.addButton}>
          <MaterialCommunityIcons name="plus" size={24} color="white" />
        </TouchableOpacity>
      </View>

      <Calendar
        current={selectedDate}
        onDayPress={onDayPress}
        markedDates={{
          [selectedDate]: { selected: true, selectedColor: '#596dc6' },
          ...Object.keys(mockEvents).reduce((acc, date) => {
            acc[date] = { marked: true, dotColor: '#596dc6' };
            return acc;
          }, {} as Record<string, any>)
        }}
        theme={{
          calendarBackground: 'white',
          selectedDayBackgroundColor: '#596dc6',
          selectedDayTextColor: 'white',
          todayTextColor: '#596dc6',
          dayTextColor: '#333',
          textDisabledColor: '#ccc',
          monthTextColor: '#333',
          arrowColor: '#596dc6',
          textMonthFontWeight: 'bold',
          textMonthFontSize: 18,
        }}
        style={styles.calendar}
      />

      <View style={styles.eventsHeader}>
        <Text style={styles.eventsTitle}>
          Eventos para {new Date(selectedDate).toLocaleDateString('es', { 
            weekday: 'long', 
            day: 'numeric', 
            month: 'long' 
          })}
        </Text>
        <Text style={styles.eventsCount}>{events.length} evento{events.length !== 1 ? 's' : ''}</Text>
      </View>

      <FlatList
        data={events}
        renderItem={renderEvent}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.eventsList}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <MaterialCommunityIcons name="calendar-remove" size={50} color="#ccc" />
            <Text style={styles.emptyText}>No hay eventos programados</Text>
          </View>
        }
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
    backgroundColor: 'white',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
  },
  addButton: {
    backgroundColor: '#596dc6',
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  calendar: {
    margin: 10,
    borderRadius: 10,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  eventsHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 15,
    paddingBottom: 10,
  },
  eventsTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  eventsCount: {
    fontSize: 14,
    color: '#666',
  },
  eventsList: {
    paddingBottom: 20,
  },
  eventItem: {
    backgroundColor: 'white',
    borderRadius: 10,
    marginHorizontal: 10,
    marginVertical: 5,
    padding: 15,
    flexDirection: 'row',
    elevation: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  eventIconContainer: {
    marginRight: 15,
    justifyContent: 'center',
  },
  eventContent: {
    flex: 1,
  },
  eventTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 3,
  },
  eventTime: {
    fontSize: 14,
    color: '#596dc6',
    marginBottom: 3,
  },
  eventLocation: {
    fontSize: 13,
    color: '#666',
    marginBottom: 5,
    fontStyle: 'italic',
  },
  eventDescription: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 40,
  },
  emptyText: {
    marginTop: 15,
    fontSize: 16,
    color: '#888',
    textAlign: 'center',
  },
});

export default CalendarScreen;
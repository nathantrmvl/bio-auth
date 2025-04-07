import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  Dimensions,
  StatusBar,
  Platform
} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { useAuth } from '../../context/AuthContext';

// Funciones de normalización responsiva
const { width, height } = Dimensions.get('window');
const guidelineBaseWidth = 375;
const guidelineBaseHeight = 812;

const scale = (size: number) => width / guidelineBaseWidth * size;
const verticalScale = (size: number) => height / guidelineBaseHeight * size;
const moderateScale = (size: number, factor = 0.5) => size + (scale(size) - size) * factor;

const normalize = (size: number) => {
  const newSize = scale(size);
  if (Platform.OS === 'ios') {
    return Math.round(newSize);
  } else {
    return Math.round(newSize) - 1;
  }
};

const ScheduleScreen = () => {
  const { authState } = useAuth();

  // Datos de ejemplo - deberías reemplazar esto con los datos reales de tu API
  const horarioLaboral = {
    diasLaborales: ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes'],
    horarioEntrada: '09:00 AM',
    horarioSalida: '06:00 PM',
    horasLaboralesPorDia: 8,
    horarioEspecial: [
      { dia: 'Martes', entrada: '10:00 AM', salida: '07:00 PM', motivo: 'Reunión de equipo' }
    ],
    diasDescanso: ['Sábado', 'Domingo'],
    proximosDiasFeriados: [
      { fecha: '15/09/2023', motivo: 'Día de la Independencia' },
      { fecha: '20/11/2023', motivo: 'Revolución Mexicana' }
    ]
  };

  // Formatear la próxima semana laboral
  const proximaSemana = Array.from({ length: 7 }).map((_, i) => {
    const date = new Date();
    date.setDate(date.getDate() + i);
    return {
      dia: date.toLocaleDateString('es-MX', { weekday: 'long' }),
      fecha: date.toLocaleDateString('es-MX', { day: 'numeric', month: 'short' }),
      esLaboral: horarioLaboral.diasLaborales.includes(
        date.toLocaleDateString('es-MX', { weekday: 'long' })
      ),
      horarioEspecial: horarioLaboral.horarioEspecial.find(
        h => h.dia === date.toLocaleDateString('es-MX', { weekday: 'long' })
      )
    };
  });

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />
      
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Encabezado */}
        <View style={styles.header}>
          <MaterialCommunityIcons 
            name="calendar-clock" 
            size={normalize(30)} 
            color="#3F51B5" 
          />
          <Text style={[styles.headerText, { fontSize: normalize(24) }]}>
            Horario Laboral
          </Text>
          <Text style={[styles.subHeaderText, { fontSize: normalize(14) }]}>
            {authState.department} • {authState.position}
          </Text>
        </View>

        {/* Horario regular */}
        <View style={[styles.card, { marginBottom: verticalScale(15) }]}>
          <View style={styles.cardHeader}>
            <MaterialCommunityIcons 
              name="calendar-today" 
              size={normalize(20)} 
              color="#3F51B5" 
            />
            <Text style={[styles.cardTitle, { fontSize: normalize(18) }]}>
              Horario Regular
            </Text>
          </View>
          
          <View style={styles.scheduleItem}>
            <MaterialCommunityIcons 
              name="calendar-week" 
              size={normalize(18)} 
              color="#757575" 
            />
            <Text style={[styles.scheduleText, { fontSize: normalize(14) }]}>
              Días laborales: {horarioLaboral.diasLaborales.join(', ')}
            </Text>
          </View>
          
          <View style={styles.scheduleItem}>
            <MaterialCommunityIcons 
              name="clock-outline" 
              size={normalize(18)} 
              color="#757575" 
            />
            <Text style={[styles.scheduleText, { fontSize: normalize(14) }]}>
              Horario: {horarioLaboral.horarioEntrada} - {horarioLaboral.horarioSalida}
            </Text>
          </View>
          
          <View style={styles.scheduleItem}>
            <MaterialCommunityIcons 
              name="timer-sand" 
              size={normalize(18)} 
              color="#757575" 
            />
            <Text style={[styles.scheduleText, { fontSize: normalize(14) }]}>
              {horarioLaboral.horasLaboralesPorDia} horas por día
            </Text>
          </View>
        </View>

        {/* Próxima semana */}
        <View style={[styles.card, { marginBottom: verticalScale(15) }]}>
          <View style={styles.cardHeader}>
            <MaterialCommunityIcons 
              name="calendar-week-begin" 
              size={normalize(20)} 
              color="#3F51B5" 
            />
            <Text style={[styles.cardTitle, { fontSize: normalize(18) }]}>
              Próxima Semana
            </Text>
          </View>
          
          {proximaSemana.map((dia, index) => (
            <View 
              key={index} 
              style={[
                styles.dayItem,
                { 
                  paddingVertical: verticalScale(10),
                  borderBottomWidth: index === proximaSemana.length - 1 ? 0 : 1,
                }
              ]}
            >
              <View style={styles.dayInfo}>
                <Text style={[styles.dayName, { fontSize: normalize(14) }]}>
                  {dia.dia.charAt(0).toUpperCase() + dia.dia.slice(1)}
                </Text>
                <Text style={[styles.dayDate, { fontSize: normalize(12) }]}>
                  {dia.fecha}
                </Text>
              </View>
              
              {dia.esLaboral ? (
                <View style={styles.scheduleIndicator}>
                  <MaterialCommunityIcons 
                    name="briefcase-check" 
                    size={normalize(16)} 
                    color="#4CAF50" 
                  />
                  <Text style={[styles.scheduleTime, { fontSize: normalize(12) }]}>
                    {dia.horarioEspecial 
                      ? `${dia.horarioEspecial.entrada} - ${dia.horarioEspecial.salida}`
                      : `${horarioLaboral.horarioEntrada} - ${horarioLaboral.horarioSalida}`
                    }
                  </Text>
                  {dia.horarioEspecial && (
                    <MaterialCommunityIcons 
                      name="alert-circle" 
                      size={normalize(14)} 
                      color="#FF9800" 
                      style={styles.warningIcon}
                    />
                  )}
                </View>
              ) : (
                <View style={styles.offDayIndicator}>
                  <MaterialCommunityIcons 
                    name="beach" 
                    size={normalize(16)} 
                    color="#F44336" 
                  />
                  <Text style={[styles.offDayText, { fontSize: normalize(12) }]}>
                    Descanso
                  </Text>
                </View>
              )}
            </View>
          ))}
        </View>

        {/* Horarios especiales */}
        {horarioLaboral.horarioEspecial.length > 0 && (
          <View style={[styles.card, { marginBottom: verticalScale(15) }]}>
            <View style={styles.cardHeader}>
              <MaterialCommunityIcons 
                name="calendar-alert" 
                size={normalize(20)} 
                color="#3F51B5" 
              />
              <Text style={[styles.cardTitle, { fontSize: normalize(18) }]}>
                Horarios Especiales
              </Text>
            </View>
            
            {horarioLaboral.horarioEspecial.map((especial, index) => (
              <View 
                key={index} 
                style={[
                  styles.specialItem,
                  { 
                    paddingVertical: verticalScale(10),
                    borderBottomWidth: index === horarioLaboral.horarioEspecial.length - 1 ? 0 : 1,
                  }
                ]}
              >
                <View style={styles.specialDay}>
                  <Text style={[styles.specialDayName, { fontSize: normalize(14) }]}>
                    {especial.dia}
                  </Text>
                  <Text style={[styles.specialTime, { fontSize: normalize(14) }]}>
                    {especial.entrada} - {especial.salida}
                  </Text>
                </View>
                <Text style={[styles.specialReason, { fontSize: normalize(12) }]}>
                  {especial.motivo}
                </Text>
              </View>
            ))}
          </View>
        )}

        {/* Días feriados */}
        <View style={styles.card}>
          <View style={styles.cardHeader}>
            <MaterialCommunityIcons 
              name="calendar-star" 
              size={normalize(20)} 
              color="#3F51B5" 
            />
            <Text style={[styles.cardTitle, { fontSize: normalize(18) }]}>
              Próximos Días Feriados
            </Text>
          </View>
          
          {horarioLaboral.proximosDiasFeriados.map((feriado, index) => (
            <View 
              key={index} 
              style={[
                styles.holidayItem,
                { 
                  paddingVertical: verticalScale(10),
                  borderBottomWidth: index === horarioLaboral.proximosDiasFeriados.length - 1 ? 0 : 1,
                }
              ]}
            >
              <MaterialCommunityIcons 
                name="star" 
                size={normalize(16)} 
                color="#FFC107" 
              />
              <View style={styles.holidayInfo}>
                <Text style={[styles.holidayDate, { fontSize: normalize(14) }]}>
                  {feriado.fecha}
                </Text>
                <Text style={[styles.holidayReason, { fontSize: normalize(12) }]}>
                  {feriado.motivo}
                </Text>
              </View>
            </View>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  scrollContent: {
    padding: moderateScale(15),
    paddingBottom: verticalScale(20),
  },
  header: {
    alignItems: 'center',
    marginBottom: verticalScale(20),
  },
  headerText: {
    fontWeight: 'bold',
    color: '#212121',
    marginTop: verticalScale(10),
  },
  subHeaderText: {
    color: '#757575',
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: moderateScale(8),
    padding: moderateScale(15),
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: verticalScale(15),
  },
  cardTitle: {
    fontWeight: '600',
    color: '#212121',
    marginLeft: moderateScale(10),
  },
  scheduleItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: verticalScale(10),
  },
  scheduleText: {
    color: '#212121',
    marginLeft: moderateScale(10),
  },
  dayItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomColor: '#F5F5F5',
  },
  dayInfo: {
    flex: 1,
  },
  dayName: {
    color: '#212121',
    fontWeight: '500',
  },
  dayDate: {
    color: '#757575',
  },
  scheduleIndicator: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  scheduleTime: {
    color: '#212121',
    marginLeft: moderateScale(5),
  },
  warningIcon: {
    marginLeft: moderateScale(5),
  },
  offDayIndicator: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  offDayText: {
    color: '#F44336',
    marginLeft: moderateScale(5),
  },
  specialItem: {
    borderBottomColor: '#F5F5F5',
  },
  specialDay: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: verticalScale(5),
  },
  specialDayName: {
    color: '#212121',
    fontWeight: '500',
  },
  specialTime: {
    color: '#3F51B5',
    fontWeight: '500',
  },
  specialReason: {
    color: '#757575',
    fontStyle: 'italic',
  },
  holidayItem: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomColor: '#F5F5F5',
  },
  holidayInfo: {
    marginLeft: moderateScale(10),
    flex: 1,
  },
  holidayDate: {
    color: '#212121',
    fontWeight: '500',
  },
  holidayReason: {
    color: '#757575',
  },
});

export default ScheduleScreen;
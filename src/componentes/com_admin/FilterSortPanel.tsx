import React, { useCallback, useMemo } from "react";
import { 
  View, 
  Text, 
  StyleSheet, 
  Dimensions,
  Platform,
  TouchableOpacity,
  I18nManager 
} from "react-native";
import { FilterButton } from "../../componentes/com_admin/FilterButton";
import { SortButton } from "../../componentes/com_admin/SortButton";
import { MaterialIcons } from "@expo/vector-icons";

// Definición de tipos
type SortField = "name" | "department" | "status" | "position" | "createdAt";
type SortOrder = "asc" | "desc";
type UserFilter = "all" | "active" | "inactive" | "admin" | "pending";

interface FilterSortPanelProps {
  sortBy: SortField;
  sortOrder: SortOrder;
  selectedFilter: UserFilter;
  onSortChange: (field: SortField) => void;
  onFilterChange: (filter: UserFilter) => void;
  onResetFilters?: () => void;
  backgroundColor?: string;
  textColor?: string;
  primaryColor?: string;
}

// Breakpoints responsivos
const { width: SCREEN_WIDTH } = Dimensions.get('window');
const IS_SMALL_SCREEN = SCREEN_WIDTH < 400;
const IS_MEDIUM_SCREEN = SCREEN_WIDTH >= 400 && SCREEN_WIDTH < 768;

export const FilterSortPanel = React.memo(({
  sortBy,
  sortOrder,
  selectedFilter,
  onSortChange,
  onFilterChange,
  onResetFilters,
  backgroundColor = '#ffffff',
  textColor = '#333333',
  primaryColor = '#3a86ff'
}: FilterSortPanelProps) => {
  const isRTL = I18nManager.isRTL;

  // Opciones de filtro
  const filterOptions = useMemo(() => [
    { label: "Todos", value: "all", icon: "people-outline" },
    { label: "Activos", value: "active", icon: "checkmark-circle-outline" },
    { label: "Inactivos", value: "inactive", icon: "close-circle-outline" },
    { label: "Admins", value: "admin", icon: "shield-checkmark-outline" },
    { label: "Pendientes", value: "pending", icon: "time-outline" }
  ], []);

  // Opciones de ordenamiento
  const sortOptions = useMemo(() => [
    { label: "Nombre", value: "name", icon: "text-outline" },
    { label: "Depto", value: "department", icon: "business-outline" },
    { label: "Estado", value: "status", icon: "flag-outline" },
    { label: "Cargo", value: "position", icon: "briefcase-outline" },
    { label: "Fecha", value: "createdAt", icon: "calendar-outline" }
  ], []);

  const renderFilterButtons = useCallback(() => (
    <View style={styles.filterGroup}>
      {!IS_SMALL_SCREEN && (
        <Text style={[styles.filterLabel, { color: textColor }]}>
          Filtrar:
        </Text>
      )}
      
      {filterOptions.map(option => (
        <FilterButton 
          key={option.value}
          label={option.label} 
          icon={option.icon} 
          isActive={selectedFilter === option.value} 
          onPress={() => onFilterChange(option.value)} 
          small={IS_SMALL_SCREEN}
          activeColor={primaryColor}
        />
      ))}
    </View>
  ), [selectedFilter, onFilterChange, textColor, primaryColor]);

  const renderSortButtons = useCallback(() => (
    <View style={styles.filterGroup}>
      {!IS_SMALL_SCREEN && (
        <Text style={[styles.filterLabel, { color: textColor }]}>
          Ordenar:
        </Text>
      )}
      
      {sortOptions
        .filter(option => !IS_SMALL_SCREEN || ['name', 'department'].includes(option.value))
        .map(option => (
          <SortButton 
            key={option.value}
            label={option.label} 
            sortBy={option.value} 
            currentSort={sortBy} 
            sortOrder={sortOrder} 
            onPress={() => onSortChange(option.value)} 
            small={IS_SMALL_SCREEN}
            icon={option.icon}
            activeColor={primaryColor}
          />
        ))
      }
    </View>
  ), [sortBy, sortOrder, onSortChange, textColor, primaryColor]);

  return (
    <View style={[
      styles.container,
      { backgroundColor }
    ]}>
      <View style={[
        styles.filterContainer,
        IS_SMALL_SCREEN && styles.filterContainerSmall,
        { flexDirection: isRTL ? 'row-reverse' : 'row' }
      ]}>
        {renderFilterButtons()}
        {renderSortButtons()}
      </View>

      {(IS_MEDIUM_SCREEN || IS_SMALL_SCREEN) && onResetFilters && (
        <TouchableOpacity 
          onPress={onResetFilters}
          style={[
            styles.resetButton,
            { 
              backgroundColor: primaryColor,
              alignSelf: IS_SMALL_SCREEN ? 'center' : 'flex-end'
            }
          ]}
          accessibilityLabel="Restablecer filtros"
        >
          <MaterialIcons 
            name="refresh" 
            size={16} 
            color="#ffffff" 
          />
          <Text style={styles.resetText}>
            Restablecer
          </Text>
        </TouchableOpacity>
      )}
    </View>
  );
});

const styles = StyleSheet.create({
  container: {
    padding: 12,
    borderRadius: 12,
    marginBottom: 16,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  filterContainer: {
    justifyContent: 'space-between',
    alignItems: 'center',
    flexWrap: 'wrap',
  },
  filterContainerSmall: {
    flexDirection: 'column',
    gap: 12,
    alignItems: 'flex-start',
  },
  filterGroup: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    flexWrap: 'wrap',
    marginBottom: Platform.OS === 'ios' ? 8 : 4,
  },
  filterLabel: {
    fontSize: 14,
    marginRight: 4,
    fontWeight: '500',
  },
  resetButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 20,
    marginTop: 8,
    gap: 4,
  },
  resetText: {
    fontSize: 12,
    fontWeight: '500',
    color: '#ffffff',
  },
});
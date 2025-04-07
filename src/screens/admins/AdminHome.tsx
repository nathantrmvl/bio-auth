import React, { useEffect, useState, useMemo, useCallback } from "react";
import { 
  View, 
  FlatList, 
  RefreshControl, 
  Alert, 
  StyleSheet, 
  Dimensions,
  Platform,
  Text, 
  TouchableOpacity,
  ScrollView
} from "react-native";
import { useNavigation, useIsFocused } from "@react-navigation/native";
import { useUserApi } from "../../hooks/useUserApi";
import { LoadingScreen } from "../../componentes/com_listuse/LoadingScreen";
import { UserCard } from "./UserCard";
import { AdminHeader } from "./AdminHeader";
import { PaginationControls } from "../../componentes/com_listuse/PaginationControls";
import { EmptyState } from "../../componentes/com_listuse/EmptyState";
import { AdminColors } from "../../theme/styleadmin";
import Animated, { FadeIn } from "react-native-reanimated";
import { UserStatsCard } from "../../componentes/com_admin/UserStatsCard";
import { QuickActionButton } from "../../componentes/com_admin/QuickActionButton";
import { FilterSortPanel } from "../../componentes/com_admin/FilterSortPanel";

// Constants for responsive design
const { width: SCREEN_WIDTH } = Dimensions.get('window');
const IS_SMALL_SCREEN = SCREEN_WIDTH < 400;
const IS_MEDIUM_SCREEN = SCREEN_WIDTH >= 400 && SCREEN_WIDTH < 768;
const USERS_PER_PAGE = IS_SMALL_SCREEN ? 5 : IS_MEDIUM_SCREEN ? 8 : 12;

type SortField = "name" | "department" | "status" | "position";
type SortOrder = "asc" | "desc";
type UserFilter = "all" | "active" | "inactive" | "admin";

export const AdminHome = () => {
  const { listUsers, isLoading, loadUsers, deleteUser } = useUserApi();
  const isFocused = useIsFocused();
  const navigation = useNavigation();
  
  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState<SortField>("name");
  const [sortOrder, setSortOrder] = useState<SortOrder>("asc");
  const [page, setPage] = useState(1);
  const [initialLoading, setInitialLoading] = useState(true);
  const [selectedFilter, setSelectedFilter] = useState<UserFilter>("all");
  const [refreshing, setRefreshing] = useState(false);
  
  // Memoized user statistics
  const userStats = useMemo(() => ({
    active: listUsers.filter(u => u.status === "Activo").length,
    inactive: listUsers.filter(u => u.status !== "Activo").length,
    admin: listUsers.filter(u => u.role === "admin").length,
    total: listUsers.length
  }), [listUsers]);

  // Load users when screen is focused
  useEffect(() => {
    if (isFocused) {
      setInitialLoading(true);
      loadUsers().finally(() => setInitialLoading(false));
    }
  }, [isFocused, loadUsers]);

  // Refresh control handler
  const handleRefresh = useCallback(async () => {
    setRefreshing(true);
    try {
      await loadUsers();
      setPage(1);
    } finally {
      setRefreshing(false);
    }
  }, [loadUsers]);

  // Filter and sort users
  const filteredAndSortedUsers = useMemo(() => {
    let filteredUsers = [...listUsers];
    
    // Search filtering
    if (search) {
      const searchTerm = search.toLowerCase();
      filteredUsers = filteredUsers.filter(user => 
        Object.entries(user).some(([_, value]) => 
          typeof value === 'string' && 
          value.toLowerCase().includes(searchTerm)
        )
      );
    }
    
    // Status filtering
    switch(selectedFilter) {
      case "active":
        filteredUsers = filteredUsers.filter(user => user.status === "Activo");
        break;
      case "inactive":
        filteredUsers = filteredUsers.filter(user => user.status !== "Activo");
        break;
      case "admin":
        filteredUsers = filteredUsers.filter(user => user.role === "admin");
        break;
      default:
        break;
    }
    
    // Sorting
    filteredUsers.sort((a, b) => {
      const valueA = (a[sortBy] || "").toString().toLowerCase();
      const valueB = (b[sortBy] || "").toString().toLowerCase();
      
      return sortOrder === "asc" 
        ? valueA.localeCompare(valueB)
        : valueB.localeCompare(valueA);
    });
    
    // Pagination
    return filteredUsers.slice(0, page * USERS_PER_PAGE);
  }, [search, listUsers, sortBy, sortOrder, page, selectedFilter]);

  // User deletion handler
  const handleDeleteUser = useCallback(async (userId: string) => {
    Alert.alert(
      "Confirmar eliminación", 
      "¿Estás seguro de que deseas eliminar este usuario?",
      [
        { text: "Cancelar", style: "cancel" },
        { 
          text: "Eliminar", 
          style: "destructive",
          onPress: async () => {
            try {
              await deleteUser(userId);
              await loadUsers();
              Alert.alert('Éxito', 'Usuario eliminado correctamente');
            } catch (error) {
              Alert.alert('Error', 'No se pudo eliminar el usuario');
            }
          }
        }
      ],
      { cancelable: true }
    );
  }, [deleteUser, loadUsers]);

  // Sort order toggle
  const toggleSortOrder = useCallback(() => {
    setSortOrder(prev => prev === "asc" ? "desc" : "asc");
  }, []);

  // Sort field change handler
  const handleSortChange = useCallback((field: SortField) => {
    setSortBy(prev => {
      if (prev === field) {
        toggleSortOrder();
        return prev;
      }
      setSortOrder("asc");
      return field;
    });
  }, [toggleSortOrder]);

  // Reset all filters
  const resetFilters = useCallback(() => {
    setSearch("");
    setSelectedFilter("all");
    setPage(1);
  }, []);

  if (initialLoading) {
    return <LoadingScreen message="Cargando usuarios..." />;
  }

  return (
    <Animated.View style={styles.container} entering={FadeIn.duration(600)}>
      <FlatList
        ListHeaderComponent={
          <View style={styles.headerContainer}>
            <AdminHeader 
              search={search}
              onSearchChange={setSearch}
              onAddUser={() => navigation.navigate("FormUserScreen", { UserResponse: null })}
              onViewHistory={() => navigation.navigate("HistoryScreen")}
              onExport={() => console.log("Export users")}
            />
            
            <ScrollView 
              horizontal={IS_SMALL_SCREEN}
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.filterScrollContainer}
            >
              <FilterSortPanel
                sortBy={sortBy}
                sortOrder={sortOrder}
                selectedFilter={selectedFilter}
                onSortChange={handleSortChange}
                onFilterChange={setSelectedFilter}
                isSmallScreen={IS_SMALL_SCREEN}
              />
            </ScrollView>

            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.statsScrollContainer}
            >
              <View style={styles.statsContainer}>
                <UserStatsCard 
                  value={userStats.active} 
                  label="Activos" 
                  color={AdminColors.successLight} 
                  icon="checkmark-circle" 
                />
                <UserStatsCard 
                  value={userStats.inactive} 
                  label="Inactivos" 
                  color={AdminColors.warningLight} 
                  icon="close-circle" 
                />
                <UserStatsCard 
                  value={userStats.admin} 
                  label="Admins" 
                  color={AdminColors.primaryLight} 
                  icon="shield-checkmark" 
                />
                <UserStatsCard 
                  value={userStats.total} 
                  label="Total" 
                  color={AdminColors.secondaryLight} 
                  icon="people" 
                />
              </View>
            </ScrollView>
          </View>
        }
        data={filteredAndSortedUsers}
        keyExtractor={(item) => item._id}
        refreshControl={
          <RefreshControl 
            refreshing={refreshing || isLoading} 
            onRefresh={handleRefresh}
            colors={[AdminColors.primary]}
            progressBackgroundColor={AdminColors.white}
          />
        }
        renderItem={({ item }) => (
          <UserCard 
            user={item} 
            onEdit={() => navigation.navigate("FormUserScreen", { UserResponse: item })}
            onDelete={() => handleDeleteUser(item._id)}
            onView={() => navigation.navigate("UserDetailScreen", { userId: item._id })}
          />
        )}
        ListFooterComponent={
          <View style={styles.footerContainer}>
            <PaginationControls 
              page={page}
              totalItems={filteredAndSortedUsers.length}
              itemsPerPage={USERS_PER_PAGE}
              onPrev={() => setPage(p => Math.max(1, p - 1))}
              onNext={() => setPage(p => p + 1)}
              onGoToPage={(newPage) => setPage(newPage)}
            />
            <View style={styles.quickActions}>
              <QuickActionButton 
                label="Nuevo Usuario" 
                icon="user-plus" 
                color={AdminColors.success} 
                onPress={() => navigation.navigate("FormUserScreen", { UserResponse: null })}
              />
              {!IS_SMALL_SCREEN && (
                <QuickActionButton 
                  label="Acciones Masivas" 
                  icon="users" 
                  color={AdminColors.primary} 
                  onPress={() => navigation.navigate("BulkActionsScreen")}
                />
              )}
            </View>
          </View>
        }
        ListEmptyComponent={
          <EmptyState 
            icon="users"
            title="No se encontraron usuarios"
            subtitle="Intenta ajustar tus filtros de búsqueda"
            action={
              <TouchableOpacity 
                style={styles.emptyStateButton}
                onPress={resetFilters}
              >
                <Text style={styles.emptyStateButtonText}>Restablecer filtros</Text>
              </TouchableOpacity>
            }
          />
        }
        contentContainerStyle={[
          styles.listContent,
          filteredAndSortedUsers.length === 0 && styles.emptyListContent
        ]}
        key={`list-${IS_SMALL_SCREEN ? 'small' : 'large'}`}
        initialNumToRender={USERS_PER_PAGE}
        maxToRenderPerBatch={USERS_PER_PAGE * 2}
        windowSize={USERS_PER_PAGE * 3}
      />
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: AdminColors.light,
  },
  headerContainer: {
    paddingBottom: 8,
  },
  listContent: {
    paddingHorizontal: Platform.select({ 
      ios: 16, 
      android: 12,
      default: 24 
    }),
    paddingBottom: 20,
  },
  emptyListContent: {
    flexGrow: 1,
    justifyContent: 'center',
  },
  filterScrollContainer: {
    paddingHorizontal: Platform.select({
      ios: 8,
      android: 4,
      default: 12
    }),
  },
  statsScrollContainer: {
    paddingHorizontal: Platform.select({
      ios: 16,
      android: 12,
      default: 24
    }),
  },
  statsContainer: {
    flexDirection: 'row',
    marginBottom: 16,
    gap: 12,
    paddingRight: 16,
  },
  quickActions: {
    flexDirection: 'row',
    justifyContent: IS_SMALL_SCREEN ? 'center' : 'space-between',
    marginTop: 16,
    gap: 12,
  },
  footerContainer: {
    marginTop: 8,
  },
  emptyStateButton: {
    marginTop: 16,
    paddingVertical: 12,
    paddingHorizontal: 24,
    backgroundColor: AdminColors.primary,
    borderRadius: 8,
    alignSelf: 'center',
    elevation: 2,
  },
  emptyStateButtonText: {
    color: 'white',
    fontWeight: '600',
    fontSize: 14,
  },
});
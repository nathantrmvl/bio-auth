import React, { useEffect, useState, useMemo } from "react";
import { View, Text, ActivityIndicator, RefreshControl, Image, FlatList, TextInput, Alert, TouchableOpacity } from "react-native";
import { useNavigation, useIsFocused } from "@react-navigation/native";
import { useUserApi } from "../../hooks/useUserApi";
import { BtnTouch } from "../../componentes/BtnTouch";
import { styleadmin } from '../../theme/styleadmin';

export const AdminHome = () => {
  const { listUsers, isLoading, loadUsers, deleteUser, updateUserStatus } = useUserApi();
  const isFocused = useIsFocused();
  const navigation = useNavigation();
  
  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState("userKey");
  const [page, setPage] = useState(1);
  const usersPerPage = 10;

  useEffect(() => {
    if (isFocused) loadUsers();
  }, [isFocused]);

  const filteredAndSortedUsers = useMemo(() => {
    return [...listUsers]
      .filter(user => 
        user.userKey.includes(search) || user.name.toLowerCase().includes(search.toLowerCase())
      )
      .sort((a, b) => (a[sortBy] > b[sortBy] ? 1 : -1))
      .slice(0, page * usersPerPage);
  }, [search, listUsers, sortBy, page]);

  const handleDelete = (userKey) => {
    Alert.alert("Confirmar eliminación", "¿Estás seguro de que deseas eliminar este usuario?", [
      { text: "Cancelar", style: "cancel" },
      { text: "Eliminar", onPress: async () => {
          try {
            await deleteUser(userKey);
            loadUsers();
          } catch (error) {
            Alert.alert('Error', 'No se pudo eliminar el usuario.');
          }
        }
      }
    ], { cancelable: false });
  };

  const handleToggleStatus = async (user) => {
    const newStatus = user.status === 'Bloqueado' ? 'Activo' : 'Bloqueado';
    try {
      await updateUserStatus(user.userKey, newStatus);
      loadUsers();
    } catch (error) {
      Alert.alert('Error', 'No se pudo actualizar el estado del usuario.');
    }
  };

  return (
    <View style={styleadmin.containerGlobal}>
      <Image style={styleadmin.headerLogo} source={require("../../../assets/logbiofull.png")} />
      <Text style={styleadmin.headingadmin}>Lista de Usuarios</Text>

      {isLoading && <ActivityIndicator size="large" color="#007bff" style={styleadmin.loaderContainer} />}

      <View style={styleadmin.headerContainer}>
        <TextInput
          style={styleadmin.searchInput}
          placeholder="Buscar por matrícula o nombre"
          value={search}
          onChangeText={setSearch}
        />
        <BtnTouch title="Agregar Alumno" action={() => navigation.navigate("FormUserScreen", { UserResponse: null })} backgroundColor="#000" />
        <BtnTouch title="Historial" action={() => navigation.navigate("HistoryScreen")} backgroundColor="#007AFF" />
      </View>

      <FlatList
        data={filteredAndSortedUsers}
        keyExtractor={(item) => item.userKey}
        refreshControl={<RefreshControl refreshing={isLoading} onRefresh={loadUsers} colors={["#fff"]} progressBackgroundColor="#007bff" />}
        ItemSeparatorComponent={() => <View style={styleadmin.separator} />}
        renderItem={({ item }) => (
          <View style={styleadmin.userListItem}>
            <Image source={item.image ? { uri: `data:image/jpeg;base64,${item.image}` } : require("../../../assets/cuervo.png")} style={styleadmin.userImage} />
            <View style={styleadmin.userInfoContainer}>
              <Text style={styleadmin.userName}>{item.name} {item.f_surname} {item.m_surname}</Text>
              <Text style={styleadmin.userDepartment}>Departamento: {item.department}</Text>
              <Text style={styleadmin.userPosition}>Puesto: {item.position}</Text>
              <Text style={styleadmin.userInfoText}>Usuario: {item.userKey}</Text>
              <Text style={styleadmin.userInfoText}>Correo: {item.email}</Text>
              <Text style={styleadmin.userInfoText}>Tipo de usuario: {item.type_user}</Text>
              
              <Text style={[styleadmin.userStatus, item.status === 'Activo' ? styleadmin.activeStatus : 
                  item.status === 'inactivo' ? styleadmin.inactiveStatus : styleadmin.blockedStatus]}>Estado: {item.status}
              </Text>
              
              <View style={styleadmin.buttonContainer}>
                <BtnTouch title="Editar" action={() => navigation.navigate("FormUserScreen", { UserResponse: item })} backgroundColor="#0cca0c" />
                <BtnTouch title="Eliminar" action={() => handleDelete(item.userKey)} backgroundColor="#e10a0a" />
              </View>
            </View>
          </View>
        )}
      />

      <View style={styleadmin.paginationContainer}>
        {page > 1 && (
          <TouchableOpacity onPress={() => setPage(page - 1)} style={styleadmin.paginationButton}>
            <Text style={styleadmin.paginationText}>Anterior</Text>
          </TouchableOpacity>
        )}
        <Text style={styleadmin.pageNumber}>Página {page}</Text>
        {filteredAndSortedUsers.length === page * usersPerPage && (
          <TouchableOpacity onPress={() => setPage(page + 1)} style={styleadmin.paginationButton}>
            <Text style={styleadmin.paginationText}>Siguiente</Text>
          </TouchableOpacity>
        )}
      </View>

      {filteredAndSortedUsers.length === 0 && !isLoading && <Text style={styleadmin.noUsersText}>No hay alumnos registrados.</Text>}
    </View>
  );
};

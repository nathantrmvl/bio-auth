import { useEffect, useState, useCallback } from "react";
import { UserResponse, UserForm } from "../interfaces/api-bioauth";
import { bioApi } from "../api/bioapi";

export const useUserApi = () => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [listUsers, setListUsers] = useState<UserResponse[]>([]);

  // Cargar usuarios
  const loadUsers = useCallback(async () => {
    try {
      const response = await bioApi.get<UserResponse[]>("/users");  // Endpoint correcto
      setListUsers(response.data);
    } catch (error: any) {
      console.error("Error cargando usuarios:", error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Crear usuario
  const createUser = useCallback(async (data: UserForm) => {
    try {
      const dataBody = {
        userKey: data.userKey,
        password: data.password,
        name: data.name || "Nombre por defecto",
        f_surname: data.f_surname || "Apellido Paterno",
        m_surname: data.m_surname || "Apellido Materno",
        email: data.email,
        image: data.image || "",
        program: data.program || "sin definir",
        type_user: data.type_user || "usuario",
        position: data.position || "sin definir", // Nuevo parámetro
        department: data.department || "sin asignar", // Nuevo parámetro
        status: data.status || "Activo"
      };

      const response = await bioApi.post("/users", dataBody);
      console.log("Usuario creado:", response.data);
      await loadUsers();
    } catch (error: any) {
      console.error("Error creando usuario:", error.response?.data || error);
      throw error;
    }
  }, [loadUsers]);

  // Actualizar usuario
  const updateUser = useCallback(async (userKey: string, data: Partial<UserForm>) => {
    try {
      const dataBody = {
        name: data.name,
        f_surname: data.f_surname,
        m_surname: data.m_surname,
        image: data.image,
        email: data.email,
        program: data.program,
        type_user: data.type_user,
        position: data.position, // Nuevo parámetro
        department: data.department, // Nuevo parámetro
        status: data.status // Asegurar booleano si se envía
      };

      const response = await bioApi.patch(`/users/${userKey}`, dataBody);
      console.log("Usuario actualizado:", response.data);
      await loadUsers();
    } catch (error: any) {
      console.error("Error actualizando usuario:", error.response?.data || error);
    }
  }, [loadUsers]);

  // Eliminar usuario
  const deleteUser = useCallback(async (userKey: string) => {
    try {
      const response = await bioApi.delete(`/users/${userKey}`);
      console.log("Usuario eliminado:", response.data);
      await loadUsers();
    } catch (error: any) {
      console.error("Error eliminando usuario:", error.response?.data || error);
    }
  }, [loadUsers]);

  useEffect(() => {
    loadUsers();
  }, [loadUsers]);

  return {
    isLoading,
    listUsers,
    loadUsers,
    createUser,
    updateUser,
    deleteUser,
  };
};

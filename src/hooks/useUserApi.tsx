import { useEffect, useState, useCallback } from "react";
import { UserResponse, UserForm } from "../interfaces/api-bioauth";
import { bioApi } from "../api/bioapi";

export const useUserApi = () => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [listUsers, setListUsers] = useState<UserResponse[]>([]);

  // Cargar usuarios
  const loadUsers = useCallback(async () => {
    try {
      const response = await bioApi.get<UserResponse[]>("/users");  // Obtener todos los usuarios
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
      const userData = {
        ...data,
        status: data.status || 'Activo' // Valor por defecto para status
      };
      const response = await bioApi.post("/users", userData);
      console.log("Usuario creado:", response.data);
      await loadUsers();
    } catch (error: any) {
      console.error("Error creando usuario:", error.response?.data || error);
      throw error;
    }
  }, [loadUsers]);

  // Actualizar usuario por _id
  const updateUser = useCallback(async (_id: string, data: Partial<UserForm>) => {
    try {
      const response = await bioApi.patch(`/users/${_id}`, data);
      console.log("Usuario actualizado:", response.data);
      await loadUsers();
    } catch (error: any) {
      console.error("Error actualizando usuario:", error.response?.data || error);
    }
  }, [loadUsers]);

  // Eliminar usuario por _id
  const deleteUser = useCallback(async (_id: string) => {
    try {
      const response = await bioApi.delete(`/users/${_id}`);
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

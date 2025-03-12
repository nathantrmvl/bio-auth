import axios from "axios";

export const bioApi = axios.create({
    baseURL: "http://192.168.1.89:3000/api/v1", 
    timeout: 30000,
    headers: { "Content-Type": "application/json" }
});

// Función para realizar el login
export const loginUser = async (userKey: string, password: string) => {
    try {
        const response = await bioApi.post("/users/login", { userKey, password });
        return response.data;
    } catch (error: any) {
        console.error("Error en login:", error.response?.data);
        const errorMessage = error.response?.data?.message || "Error al iniciar sesión";
        throw new Error(errorMessage);
    }
};

// Función para crear un usuario
export const crearUsuario = async (userData: { 
    name: string, f_surname: string, m_surname: string,
    email: string, password: string, type_user: string, 
    userKey: string, position: string, department: string, status: string 
}) => {
    try {
        userData.status = String(userData.status);
        const response = await bioApi.post("/users", userData);
        return response.data;
    } catch (error: any) {
        console.error("Error creando usuario:", error.response?.data);
        throw new Error(error.response?.data?.message || "Error al crear usuario");
    }
};

// Función para editar un usuario por _id
export const editarUsuario = async (id: string, userData: Partial<{ 
    name: string, f_surname: string, m_surname: string,
    email: string, password: string, type_user: string, 
    userKey: string, position: string, department: string, status: string 
}>) => {
    try {
        if (userData.status !== undefined) {
            userData.status = String(userData.status);
        }
        const response = await bioApi.patch(`/users/${id}`, userData);
        return response.data;
    } catch (error: any) {
        console.error("Error editando usuario:", error.response?.data);
        throw new Error(error.response?.data?.message || "Error al editar usuario");
    }
};

export const eliminarUsuario = async (id: string) => {
    try {
        const response = await bioApi.delete(`/users/${id}`);
        return response.data;
    } catch (error: any) {
        console.error("Error eliminando usuario:", error.response?.data);
        throw new Error(error.response?.data?.message || "Error al eliminar usuario");
    }
};

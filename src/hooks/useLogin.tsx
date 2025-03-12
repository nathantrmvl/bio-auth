import { useContext, useState, useReducer } from "react";
import { AuthContext } from "../context/AuthContext";
import { loginUser } from "../api/bioapi";
import { UserResponse } from "../interfaces/api-bioauth";

// Tipo de datos para el login
export interface LoginData {
    userKey: string;
    password: string;
    type_user: string;
}

// Estado inicial
const initialLoginData: LoginData = {
    userKey: "",
    password: "",
    type_user: "",
};

// Tipo de acción para el reducer
type Action =
    | { type: 'handleInputChange'; payload: { fieldName: keyof LoginData, value: string } };

// Reducer para manejar el estado de los datos de login
const dataReducer = (state: LoginData, action: Action): LoginData => {
    switch (action.type) {
        case 'handleInputChange':
            return {
                ...state,
                [action.payload.fieldName]: action.payload.value,
            };
        default:
            return state;
    }
};

// Hook para el login
export const useLogin = () => {
    const { signIn } = useContext(AuthContext);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [state, dispatch] = useReducer(dataReducer, initialLoginData);
    const [request, setRequest] = useState<boolean | null>(null);

    // Maneja cambios en los campos del formulario
    const handleInputChange = (fieldName: keyof LoginData, value: string) => {
        dispatch({ type: 'handleInputChange', payload: { fieldName, value } });
    };

    // Lógica de login
    const handleLogin = async () => {
        setIsLoading(true); // Activa el indicador de carga cuando comienza el login

        try {
            // Intentamos el login con la API
            const user: UserResponse = await loginUser(state.userKey, state.password);

            if (user) {
                // Si el login es exitoso, actualizamos el contexto con todos los datos del usuario
                signIn({
                    isLoggenIn: true,
                    _id: user._id,
                    name: user.name,
                    f_surname: user.f_surname,
                    m_surname: user.m_surname,
                    image: user.image,
                    userKey: user.userKey,
                    email: user.email,
                    password: user.password,
                    type_user: user.type_user,
                    department: user.department,
                    position: user.position,
                    status: user.status,
                });

                setRequest(true); // Login exitoso
                return true;
            }
            setRequest(false); // Si el login falla
            return false;
        } catch (error) {
            console.error(error);
            setRequest(false); // Login fallido
            return false;
        } finally {
            setIsLoading(false); // Desactiva el indicador de carga después de la solicitud
        }
    };

    return { state, handleInputChange, handleLogin, isLoading, request };
};
import { useContext, useState, useReducer } from "react";
import { AuthContext } from "../context/AuthContext";
import { loginUser } from "../api/bioapi";

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
    const { signIn, changeUserName, changeUserImage, changeUserKey, changeTypeUser } = useContext(AuthContext);
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
            const user = await loginUser(state.userKey, state.password);

            if (user) {
                // Si el login es exitoso, actualizamos el contexto
                signIn();
                changeUserName(`${user.name} ${user.f_surname} ${user.m_surname}`);
                changeUserImage(user.image);
                changeUserKey(user.usuario); // Cambiado a usuario
                changeTypeUser(user.type_user);

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

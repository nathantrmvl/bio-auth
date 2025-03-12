import React, { createContext, ReactNode, useContext, useReducer } from "react";
import { AuthReducer } from "./AuthReducer";
import { UserResponse } from "../interfaces/api-bioauth";

// Definición del estado de autenticación
export interface AuthState extends UserResponse {
    isLoggenIn: boolean;
}

// Estado inicial basado en UserResponse
export const AuthInitialState: AuthState = {
    isLoggenIn: false,
    _id: '',
    name: '',
    f_surname: '',
    m_surname: '',
    image: '',
    userKey: '',
    email: '',
    password: '',
    type_user: '',
    department: '',
    position: '',
    status: '',
};

// Tipos del contexto
export interface AuthContextProps {
    authState: AuthState;
    signIn: (userData: AuthState) => void;
    logOut: () => void;
    changeUserName: (userName: string) => void;
    changeUserImage: (userImage: string) => void;
    changeUserKey: (userKey: string) => void;
    changeTypeUser: (typeUser: string) => void;
    updateUser: (userData: Partial<AuthState>) => void;
}

// Creación del contexto
export const AuthContext = createContext<AuthContextProps>({} as AuthContextProps);

// Componente proveedor del contexto
export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [authState, dispatch] = useReducer(AuthReducer, AuthInitialState);

    const signIn = (userData: AuthState): void => {
        dispatch({ type: "signIn", payload: userData });
    };

    const logOut = (): void => {
        dispatch({ type: "logOut" });
    };

    const changeUserName = (userName: string): void => {
        dispatch({ type: "changeUserName", payload: userName });
    };

    const changeUserImage = (userImage: string): void => {
        dispatch({ type: "changeUserImage", payload: userImage });
    };

    const changeUserKey = (userKey: string): void => {
        dispatch({ type: "changeUserKey", payload: userKey });
    };

    const changeTypeUser = (typeUser: string): void => {
        dispatch({ type: "changeTypeUser", payload: typeUser });
    };

    const updateUser = (userData: Partial<AuthState>): void => {
        dispatch({ type: "updateUser", payload: userData });
    };

    return (
        <AuthContext.Provider
            value={{
                authState,
                signIn,
                logOut,
                changeUserName,
                changeUserImage,
                changeUserKey,
                changeTypeUser,
                updateUser,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};

// Hook personalizado para usar el contexto
export const useAuth = () => useContext(AuthContext);
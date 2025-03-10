import React, { createContext, ReactNode, useContext, useReducer } from "react";
import { AuthReducer } from "./AuthReducer";

// Definición del estado de autenticación
export interface AuthState {
    isLoggenIn: boolean;
    username?: string;
    userKey?: string;
    userImage?: string;
    type_user?: string;
    program?: string;
}

// Estado inicial
export const AuthInitialState: AuthState = {
    isLoggenIn: false,
    username: undefined,
    userImage: undefined,
    userKey: undefined,
    type_user: undefined,
    program: "Programa Ejemplo",
}

// Tipos del contexto
export interface AuthContextProps {
    authState: AuthState;
    signIn: () => void;
    logOut: () => void;
    changeUserName: (userName: string) => void;
    changeUserImage: (sourceImage: string) => void;
    changeUserKey: (userKey: string) => void;
    changeTypeUser: (typeUser: string) => void;
}

// Creación del contexto
export const AuthContext = createContext({} as AuthContextProps);

// Componente proveedor del contexto
export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [authState, dispatch] = useReducer(AuthReducer, AuthInitialState);

    const signIn = (): void => dispatch({ type: "signIn" });
    const logOut = (): void => dispatch({ type: "logOut" });
    const changeUserName = (userName: string): void => dispatch({ type: "changeUserName", payload: userName });
    const changeUserImage = (userImage: string): void => dispatch({ type: "changeUserImage", payload: userImage });
    const changeUserKey = (userKey: string): void => dispatch({ type: "changeUserKey", payload: userKey });
    const changeTypeUser = (typeUser: string): void => dispatch({ type: "changeTypeUser", payload: typeUser });

    return (
        <AuthContext.Provider
            value={{
                authState,
                signIn,
                logOut,
                changeUserImage,
                changeUserName,
                changeUserKey,
                changeTypeUser
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};

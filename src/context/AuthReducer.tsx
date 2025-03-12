import { AuthState } from "./AuthContext";

// Tipos de acciones para el reducer
type Action =
    | { type: "signIn"; payload: AuthState } // Iniciar sesión con todos los datos del usuario
    | { type: "logOut" } 
    | { type: "changeUserName"; payload: string } 
    | { type: "changeUserImage"; payload: string } 
    | { type: "changeUserKey"; payload: string } 
    | { type: "changeTypeUser"; payload: string } 
    | { type: "updateUser"; payload: Partial<AuthState> }; 

// Reducer para manejar el estado de autenticación
export const AuthReducer = (state: AuthState, action: Action): AuthState => {
    switch (action.type) {
        case "signIn":
            // Actualiza el estado con todos los datos del usuario
            return { ...state, isLoggenIn: true, ...action.payload };
        case "logOut":
            // Restablece el estado al estado inicial
            return {
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
        case "changeUserName":
            return { ...state, name: action.payload };
        case "changeUserImage":
            return { ...state, image: action.payload };
        case "changeUserKey":
            return { ...state, userKey: action.payload };
        case "changeTypeUser":
            return { ...state, type_user: action.payload };
        case "updateUser":
            // Actualiza varios campos del usuario
            return { ...state, ...action.payload };
        default:
            return state;
    }
};
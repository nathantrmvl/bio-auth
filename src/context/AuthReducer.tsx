import { AuthState } from "./AuthContext";

// Tipos de acciones para el reducer
type Action =
    | { type: "signIn" }
    | { type: "logOut" }
    | { type: "changeUserName", payload: string }
    | { type: "changeUserImage", payload: string }
    | { type: "changeUserKey", payload: string }
    | { type: "changeTypeUser", payload: string };

export const AuthReducer = (state: AuthState, action: Action): AuthState => {
    switch (action.type) {
        case "signIn":
            return { ...state, isLoggenIn: true };
        case "logOut":
            return { ...state, isLoggenIn: false, username: undefined, userKey: undefined, userImage: undefined, type_user: undefined };
        case "changeUserName":
            return { ...state, username: action.payload };
        case "changeUserImage":
            return { ...state, userImage: action.payload };
        case "changeUserKey":
            return { ...state, userKey: action.payload };
        case "changeTypeUser":
            return { ...state, type_user: action.payload };
        default:
            return state;
    }
};

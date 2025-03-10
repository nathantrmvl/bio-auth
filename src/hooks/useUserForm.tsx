import { useReducer, useCallback } from "react";
import { useUserApi } from "../hooks/useUserApi";

export interface UserForm {
  _id?: string; // Hacer opcional para evitar errores en handleSubmit y handleDelete
  name: string;
  f_surname: string;
  m_surname: string;
  image: string;
  email: string;
  userKey: string;
  program: string;
  password: string;
  type_user: string;
  position: string;  // Nuevo parámetro
  department: string; // Nuevo parámetro
  status: string; // Nuevo parámetro
}

const initialState: UserForm = {
  name: '',
  f_surname: '',
  m_surname: '',
  image: '',
  email: '',
  userKey: '',
  program: '',
  password: '',
  type_user: '',
  position: 'sin definir', // Valor por defecto
  department: 'sin asignar', // Valor por defecto
  status: '', // Valor por defecto
};

type Action =
  | { type: "HANDLE_INPUT_CHANGE"; payload: { fieldName: keyof UserForm; value: string | boolean } }
  | { type: "RESET_FORM" };

const formReducer = (state: UserForm, action: Action): UserForm => {
  switch (action.type) {
    case "HANDLE_INPUT_CHANGE":
      return {
        ...state,
        [action.payload.fieldName]: action.payload.value,
      };
    case "RESET_FORM":
      return initialState;
    default:
      return state;
  }
};

export const useUserForm = () => {
  const { createUser, updateUser, deleteUser } = useUserApi();
  const [state, dispatch] = useReducer(formReducer, initialState);

  const handleInputChange = (fieldName: keyof UserForm, value: string | boolean) => {
    dispatch({ type: "HANDLE_INPUT_CHANGE", payload: { fieldName, value } });
  };

  const handleSubmit = useCallback(async () => {
    const { _id, userKey, ...userData } = state;

    if (_id) {
      // Si tiene _id, es una actualización
      await updateUser(userKey, state);  
    } else {
      // Si no tiene _id, es un nuevo usuario
      await createUser(state);  
    }
  }, [state, createUser, updateUser]);

  const handleDelete = useCallback(() => {
    if (state.userKey) {
      deleteUser(state.userKey);
    }
  }, [state.userKey, deleteUser]);

  const handleReset = () => {
    dispatch({ type: "RESET_FORM" });
  };

  return {
    state,
    handleInputChange,
    handleSubmit,
    handleDelete,
    handleReset,
  };
};

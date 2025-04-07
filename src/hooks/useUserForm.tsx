import { useReducer, useCallback } from "react";
import { crearUsuario, editarUsuario, eliminarUsuario } from "../api/bioapi";

export interface UserForm {
  _id?: string;
  name: string;
  f_surname: string;
  m_surname: string;
  image: string;
  email: string;
  userKey: string;
  password?: string | null;
  type_user: string;
  position: string;
  department: string;
  status: string;
}

const initialState: UserForm = {
  name: '',
  f_surname: '',
  m_surname: '',
  image: '',
  email: '',
  userKey: '',
  password: '',
  type_user: '',
  position: '',
  department: '',
  status: 'Activo',
};

type Action =
  | { type: "HANDLE_INPUT_CHANGE"; payload: { fieldName: keyof UserForm; value: string | null } }
  | { type: "SET_FORM_DATA"; payload: Partial<UserForm> }
  | { type: "RESET_FORM" };

const formReducer = (state: UserForm, action: Action): UserForm => {
  switch (action.type) {
    case "HANDLE_INPUT_CHANGE":
      return {
        ...state,
        [action.payload.fieldName]: action.payload.value,
      };
    case "SET_FORM_DATA":
      return {
        ...state,
        ...action.payload,
      };
    case "RESET_FORM":
      return initialState;
    default:
      return state;
  }
};

export const useUserForm = () => {
  const [state, dispatch] = useReducer(formReducer, initialState);

  const handleInputChange = (fieldName: keyof UserForm, value: string | null) => {
    dispatch({ type: "HANDLE_INPUT_CHANGE", payload: { fieldName, value } });
  };

  const setFormData = (data: Partial<UserForm>) => {
    dispatch({ type: "SET_FORM_DATA", payload: data });
  };

  const handleSubmit = useCallback(async (formData: UserForm) => {
    const { _id, ...userData } = formData;

    if (_id) {
      return await editarUsuario(_id, userData);
    } else {
      if (!userData.password) {
        throw new Error("La contraseña es requerida para nuevos usuarios");
      }
      return await crearUsuario(userData as Required<UserForm>);
    }
  }, []);

  const handleDelete = useCallback(async (id: string) => {
    return await eliminarUsuario(id);
  }, []);

  const handleReset = () => {
    dispatch({ type: "RESET_FORM" });
  };

  return {
    state,
    handleInputChange,
    setFormData,
    handleSubmit,
    handleDelete,
    handleReset,
  };
};
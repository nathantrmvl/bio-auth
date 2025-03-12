import { useReducer, useCallback } from "react";
import { useUserApi } from "../hooks/useUserApi";

export interface UserForm {
  _id?: string;
  name: string;
  f_surname: string;
  m_surname: string;
  image: string;
  email: string;
  userKey: string;
  password: string;
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
  position: 'sin definir',
  department: 'sin asignar',
  status: '',
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
    const { _id, ...userData } = state;

    if (_id) {
      // Si tiene _id, actualizar usuario
      await updateUser(_id, userData);  
    } else {
      // Si no tiene _id, crear usuario
      await createUser(state);  
    }
  }, [state, createUser, updateUser]);

  const handleDelete = useCallback(() => {
    if (state._id) {
      deleteUser(state._id);
    }
  }, [state._id, deleteUser]);

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

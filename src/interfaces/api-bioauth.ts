export interface UserResponse {
  _id: string;
  name:         string;
    f_surname:     string;
    m_surname:     string;
    image:          string;
    userKey:        string;
    email:          string;
    password:       string;
    type_user:      string;
    department: string;
    position: string;
    status: string;
}

export interface UserForm {
    userKey: string;
    password: string;
    name: string;
    email: string;
    f_surname: string;
    m_surname: string;
    image: string;
    type_user: string;
    department: string;
    position: string;
    status: string;
  }
  
export type RequestLogin = UserResponse | false;

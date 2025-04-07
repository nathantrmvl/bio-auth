// Interfaces de usuario y autenticación
export interface UserResponse {
  _id: string;
  name: string;
  f_surname: string;
  m_surname: string;
  image: string;
  userKey: string;
  email: string;
  password: string;
  type_user: string;
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

// Interfaces para QR
export interface QRData {
  name: string;
  f_surname: string;
  m_surname: string;
  userKey: string;
  position: string;
  department: string;
  status: string;
  timestamp?: number;
}

export interface DynamicQRProps {
  userData: QRData;
}

// Interfaces para Noticias
export interface NewsItem {
  id: string;
  title: string;
  summary: string;
  date: string;
  image: string;
  content: string;
  isFeatured?: boolean;
}

// Interfaces para Calendario
export interface CalendarEvent {
  id: string;
  title: string;
  time: string;
  location: string;
  description: string;
  type: 'meeting' | 'appointment' | 'workshop' | 'deadline' | string;
}

// Interfaces para Chat
export interface ChatMessage {
  id: string;
  text: string;
  sender: 'user' | 'support';
  time: string;
  read?: boolean;
  type?: 'text' | 'image' | 'document';
  attachmentUrl?: string;
}

export interface SupportAgent {
  id: string;
  name: string;
  avatar: string;
  status: 'online' | 'offline' | 'busy';
  department: string;
}

export interface ChatSession {
  id: string;
  agent: SupportAgent;
  messages: ChatMessage[];
  createdAt: string;
  updatedAt: string;
  status: 'active' | 'resolved' | 'pending';
}
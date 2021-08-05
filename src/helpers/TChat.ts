/* eslint-disable camelcase */
import TUser from './TUser';

export type Message = {
  chat_id: number;
  time: string;
  type: string;
  user_id: string;
  content: string;
  file?: {
    id: number;
    user_id: number;
    path: string;
    filename: string;
    content_type: string;
    content_size: number;
    upload_date: string;
  };
};

type TChat = {
  id: number;
  token: string;
  title?: string;
  avatar?: string;
  unread_count?: number;
  last_message?: {
    user: TUser;
    time: string;
    content: string;
  };
  users: TUser[];
  messages: Message[];
};

export default TChat;

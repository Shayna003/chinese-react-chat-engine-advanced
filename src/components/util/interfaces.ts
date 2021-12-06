export interface AttachmentProps {
  id: number;
  file: string;
  created: string;
}

export interface PersonProps {
  username: string;
  first_name: string | null;
  last_name: string | null;
  avatar: string | null;
  custom_json: string | object | null;
  is_online: boolean;
}
export interface MessageProps {
  id?: number;
  text: string | null;
  sender_username: string;
  created: string;
  attachments: Array<AttachmentProps>;
  custom_json: object | string;
  sender?: PersonProps; // Empty messages have no sender
}

export interface MessagesProps {
  [created: string]: MessageProps
}

export interface ChatPersonProps extends PersonProps {
  chat_updated: string | null;
  last_read: number | null;
}
export interface ChatProps {
  id: number;
  title: string;
  created: string;
  is_direct_chat: boolean;
  custom_json: object | string;
  last_message: MessageProps;
  attachments: Array<AttachmentProps>;
  people: Array<ChatPersonProps>;
}

export interface ChatsProps {
  [id: number]: ChatProps
}
import { SingleValue } from "react-select";

export interface Conversation {
  conversation_id: string;
  status: string;
  name: string;
  last_message: string;
  not_read_messages: number;
}

export interface ConversationsListProps {
  setCreateOpen: (value: boolean) => void;
  setJoinOpen: (value: boolean) => void;
  findUsersNotInConversation: (conversationId: string | undefined) => any;
  user: IMembers;
  list: IConversation[];
  type: string;
  loading: boolean;
  setLoading: (params: any) => any;
}

export interface ChatAreaProps {
  user : IMembers;
  conversation: IConversation | null;
  loading: boolean;
  handleSelectedRoom: (value: IConversation) => void;
  getConversationsList: () => void;
  setManageOpen: (value: boolean) => void;
}

export interface ChatAreaDmProps {
  conversation: IConversation | null;
  loading: boolean;
  user: IMembers;
  getConversationsList: () => void;
}

export interface IConversation {
  conversation_id: string;
  name: string;
  type: string;
  status: string;
  members: IMembers[];
  admins: IMembers[];
  last_message?: IMessageConversation;
  createdAt: string;
}

export interface IMembers {
  intra_id: number;
  first_name: string;
  last_name: string;
  user_name: string;
  image_url: string;
  profile: {
    status: string;
  }
}

export interface IConversationContext {
  conversations: IConversation[];
  setConversations: (params: any) => any;
  messages: IMessage[];
  setMessages: (params: any) => any;
  selectedConversation: IConversation | null;
  setSelectedConversation: (params: any) => any;
}

export interface IMessage {
  message_id: string;
  conversation_id: string;
  body: string;
  sentAt: Date;
  sent_by: IMembers;
}

export interface IMessageBody {
  sent_by: number;
  conversationId: string | undefined;
  body: string;
  type: string;
}

export interface IMessageConversation {
  conversation_id: string;
  message_id: string;
  body: string;
  sentAt: string;
}

export interface IRoom {
  name: string;
  status: SingleValue;
  members: SingleValue[];
  password?: string;
}

export interface ICreateRoom {
  name: string;
  status: SingleValue;
  members: string[];
  password?: string;
}

export interface IEditRoom {
  name?: string;
  status?: string;
  password?: string;
}

export interface IRemoveMember {
  user: string;
  conversationId: string | undefined;
}

export interface IBanMember {
  user: string | undefined;
  conversationId: string | undefined;
  duration: number;
}

export interface ConversationsListDmsProps {
  user: IMembers;
  list: IConversation[];
  type: string;
  loading: boolean;
  setStartDmOpen: (value: boolean) => void;
  setLoading: (params: any) => any;
}
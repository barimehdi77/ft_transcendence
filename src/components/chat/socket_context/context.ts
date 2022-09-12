import React, { createContext } from "react"; 
import { IConversationContext } from "../../typings";

const SocketContext = createContext<IConversationContext>({
  conversations: [],
  setConversations: () => {},
  messages: [],
  setMessages: () => {},
  selectedConversation: null,
  setSelectedConversation: () => {}
}); 
export default SocketContext;
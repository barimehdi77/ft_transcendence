import io from "socket.io-client";
import { IConversationContext } from "../typings";
import { socketEvents } from "./events";

let token: string | null = "";
if (typeof window !== "undefined") {
  token = localStorage.getItem("token");
}

export const socket = io("http://192.168.0.159:8080", {
  extraHeaders: {
    Authorization: "Bearer " + token,
  },
  path: "/socket",
});

export const initSockets = ({
  setConversations,
  conversations,
  messages,
  setMessages,
  selectedConversation,
  setSelectedConversation,
}: IConversationContext) => {
  socketEvents({
    setConversations,
    conversations,
    messages,
    setMessages,
    selectedConversation,
    setSelectedConversation,
  });
  // setValue    ^ is passed on to be used by socketEvents
};

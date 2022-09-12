import React, { useState, useEffect } from "react";
import SocketContext from "./context";
import { initSockets } from "../../socket";
import { IConversation } from "../../typings";
//       ^ initSockets is shown later on
const SocketProvider = (props: any) => {
  const [conversations, setConversations] = useState([]);
  const [selectedConversation, setSelectedConversation] =
    useState<IConversation | null>(null);
  const [messages, setMessages] = useState([]);

  useEffect(
    () =>
      initSockets({
        setConversations,
        conversations,
        messages,
        setMessages,
        selectedConversation,
        setSelectedConversation,
      }),
    [initSockets]
  );
  // Note, we are passing setValue ^ to initSockets
  return (
    <SocketContext.Provider
      value={{
        conversations,
        setConversations,
        messages,
        setMessages,
        selectedConversation,
        setSelectedConversation,
      }}
    >
      {props.children}
    </SocketContext.Provider>
  );
};
export default SocketProvider;

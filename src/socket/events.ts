import { IConversationContext, IMessage } from "../typings";
import { socket } from "./index";


export const socketEvents = ({ setConversations, setMessages }: IConversationContext) => {
  
  // socket.on("receiveMessage", (data) => {
  //   console.log('data received from socket', data)
  //   setMessages((prevState: IMessage[]) => [...prevState, data])
  // });
};


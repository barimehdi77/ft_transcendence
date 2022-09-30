import { IMessageBody } from "../typings";
import { socket } from "./index";

export const joinConversation = (conversationId: string | undefined) => {
  socket.emit("joinConversation", { conversationId }, (data: any) => {
    console.log("Joined: ", data);
  });
};

export const sendMessage = (body: IMessageBody) => {
  return new Promise((resolve, reject) => {
    socket.emit("sendMessage", body, (data: any) => {
      if (data.status === "success") {
        resolve(data.message);
      } else reject(data.msg);
    });
  });
};

import moment from "moment";
import { useContext, useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";
import { sendMessage } from "../../socket/emit";
import {
  ChatAreaProps,
  IConversationContext,
  IMessage,
  IMessageBody,
} from "../../typings";
import SocketContext from "./socket_context/context";
import { leaveConversation } from "../../services/conversations";
import Link from "next/link";
import { getStatus } from "../../helpers";

const ChatArea = ({
  user,
  conversation,
  loading,
  handleSelectedRoom,
  getConversationsList,
  setManageOpen,
}: ChatAreaProps) => {
  const { messages, setSelectedConversation } =
    useContext<IConversationContext>(SocketContext);
  const [message, setMessage] = useState<string>("");
  const messagesEndRef = useRef<HTMLHeadingElement>(null);
  const [leaveLoader, setLeaveLoader] = useState(false);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(scrollToBottom, [messages]);

  const submitMessage = (e: any) => {
    e.preventDefault();
    if (message.trim() !== "" && message.length <= 1000) {
      const body: IMessageBody = {
        conversationId: conversation?.conversation_id,
        body: message,
        type: "room",
      };
      sendMessage(body)
        .then((res) => {
          setMessage("");
        })
        .catch((error: string) => {
          toast.error(error);
        });
    } else {
      toast.error("Message must be not empty & less than 1000 characters");
    }
  };

  if (!conversation) {
    return (
      <div className="chat-area flex-1 flex flex-col border border-grey-800 rounded bg-gray-200">
        <h3 className="m-auto">
          {loading ? (
            <div className="loader"></div>
          ) : (
            "You can select a conversation to show the chat"
          )}
        </h3>
      </div>
    );
  }

  const leaveRoom = async (conversationId: string) => {
    try {
      setLeaveLoader(true);
      const res: any = await leaveConversation(conversationId);
      if (res.status === "success") {
        setLeaveLoader(false);
        getConversationsList();
        setSelectedConversation(null);
        toast.success("You are successfully left the conversation");
      } else {
        toast.error(res.msg);
        setLeaveLoader(false);
      }
    } catch (error: any) {
      setLeaveLoader(false);
      if (error?.response?.data?.message[0])
        toast.error(error.response.data.message[0]);
      else if (error?.response?.data?.message)
        toast.error(error.response.data.message);
      else toast.error("Something went wrong");
    }
  };

  return (
    <div className="chat-area flex-1 flex flex-col">
      <div className="flex justify-between">
        <div className="flex-3">
          <h2 className="text-xl py-1 mb-8 border-b-2 border-gray-200">
            Room: <b className="uppercase">{conversation.name}</b>
          </h2>
        </div>
        <div className="flex space-x-2">
          {conversation.admins.some(
            (admin) => admin.intra_id === user.intra_id
          ) && (
            <>
              <div className="flex-1">
                <button
                  onClick={() => handleSelectedRoom(conversation)}
                  className="bg-sky-800 w-10 h-10 rounded-full inline-block transition duration-100 hover:scale-110 hover:bg-sky-700"
                >
                  <span className="inline-block align-text-center mt-1">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="w-5 h-5 text-white"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                      />
                    </svg>
                  </span>
                </button>
              </div>
              <div className="flex-1">
                <button
                  onClick={() => setManageOpen(true)}
                  className="bg-sky-800 w-10 h-10 rounded-full inline-block transition duration-100 hover:scale-110 hover:bg-sky-700"
                >
                  <span className="inline-block align-text-center mt-1">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="w-5 h-5 text-white"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
                      />
                    </svg>
                  </span>
                </button>
              </div>
            </>
          )}
          <div className="flex-1">
            <button
              disabled={leaveLoader}
              onClick={() => leaveRoom(conversation.conversation_id)}
              className="bg-sky-800 w-10 h-10 rounded-full inline-block transition duration-100 hover:scale-110 hover:bg-sky-700"
            >
              <span className="inline-block align-text-center mt-1">
                {leaveLoader ? (
                  <div
                    className="loader mx-auto"
                    style={{
                      width: "20px",
                      height: "20px",
                      border: "3px solid #f3f3f3",
                      borderTop: "3px solid rgb(7 89 133)",
                    }}
                  ></div>
                ) : (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-5 h-5 text-white"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                    />
                  </svg>
                )}
              </span>
            </button>
          </div>
        </div>
      </div>

      <div className="messages flex-1 overflow-auto">
        {messages.map((message: IMessage) => {
          const isMe = message.sent_by.intra_id === user.intra_id;
          return (
            <div
              key={message.message_id}
              className={`message mb-4 flex ${isMe ? "me text-right" : ""}`}
            >
              {!isMe ? (
                <div className="flex-2">
                  <div className="w-12 h-12 relative">
                    <Link href={`/profile/${message.sent_by.user_name}`}>
                      <img
                        className="w-12 h-12 rounded-full mx-auto object-cover cursor-pointer"
                        src={message.sent_by.image_url}
                        alt="chat-user"
                      />
                    </Link>
                    <span
                      className={`absolute w-4 h-4 ${
                        getStatus(message.sent_by.profile?.status).color
                      } rounded-full right-0 bottom-0 border-2 border-white`}
                    ></span>
                  </div>
                </div>
              ) : null}

              <div className="flex-1 px-2">
                <div
                  className={`inline-block  rounded-full p-2 px-6 ${
                    isMe ? "bg-sky-800 text-white" : "bg-gray-300 text-gray-700"
                  }`}
                >
                  <span>{message.body}</span>
                </div>
                <div className={`${isMe ? "pr-4" : "pl-4"}`}>
                  <small className="text-gray-500">
                    {moment(message.sentAt).fromNow()}
                  </small>
                </div>
              </div>
            </div>
          );
        })}
        <div ref={messagesEndRef} />
      </div>
      <div className="flex-2 pt-4 pb-10">
        <form onSubmit={submitMessage}>
          <div className="write bg-white shadow flex rounded-lg">
            <div className="flex-3 flex content-center items-center text-center p-4 pr-0">
              <span className="block text-center text-gray-400 hover:text-gray-800">
                <svg
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  className="h-6 w-6"
                >
                  <path d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                </svg>
              </span>
            </div>

            <div className="flex-1">
              <input
                name="message"
                className="w-full block outline-none py-4 px-4 bg-transparent"
                placeholder="Type a message..."
                autoFocus
                value={message}
                onChange={(e) => setMessage(e.target.value)}
              />
            </div>
            <div className="flex-2 w-32 p-2 flex content-center items-center">
              <div className="flex-1 text-center">
                <span className="text-gray-400 hover:text-gray-800">
                  <span className="inline-block align-text-bottom">
                    <svg
                      fill="none"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      className="w-6 h-6"
                    >
                      <path d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13"></path>
                    </svg>
                  </span>
                </span>
              </div>
              <div className="flex-1">
                <button
                  // type="submit"
                  onClick={submitMessage}
                  className="bg-sky-800 w-10 h-10 rounded-full inline-block transition duration-100 hover:scale-110 hover:bg-sky-700"
                >
                  <span className="inline-block align-text-center mt-1">
                    <svg
                      fill="none"
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      viewBox="0 0 24 24"
                      className="w-4 h-4 text-white"
                    >
                      <path d="M5 13l4 4L19 7"></path>
                    </svg>
                  </span>
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ChatArea;

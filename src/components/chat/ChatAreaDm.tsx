import moment from "moment";
import { useContext, useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";
import { sendMessage } from "../../socket/emit";
import {
  ChatAreaDmProps,
  IConversationContext,
  IMessage,
  IMessageBody,
} from "../../typings";
import SocketContext from "./socket_context/context";
import { getMember, getStatus } from "../../helpers";
import Link from "next/link";

const ChatAreaDm = ({
  conversation,
  loading,
  user,
  getConversationsList,
}: ChatAreaDmProps) => {
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
        type: "dm",
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

  return (
    <div className="chat-area flex-1 flex flex-col">
      <div className="flex justify-between">
        <div className="flex-3">
          <h2 className="text-xl py-1 mb-8 border-b-2 border-gray-200">
            User:{" "}
            <Link
              href={`/profile/${
                getMember(user.intra_id, conversation.members)?.user_name
              }`}
            >
              <b className="uppercase cursor-pointer">{`${
                getMember(user.intra_id, conversation.members)?.first_name
              } ${
                getMember(user.intra_id, conversation.members)?.last_name
              }`}</b>
            </Link>
          </h2>
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
                  className={`break-words inline-block text-center rounded-full ${message.body.length <= 300 ? 'p-2 px-6' : 'p-5 px-14'} ${
                    isMe ? "bg-sky-800 text-white" : "bg-gray-300 text-gray-700"
                  }`}
                >
                  <p className="break-words">{message.body}</p>
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

export default ChatAreaDm;

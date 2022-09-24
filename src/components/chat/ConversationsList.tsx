import moment from "moment";
import Link from "next/link";
import { useContext, useState } from "react";
import Avatar from "react-avatar";
import { toast } from "react-toastify";
import {
  checkConversationPassword,
  getConversationMessages,
} from "../../services/conversations";
import { joinConversation } from "../../socket/emit";
import {
  ConversationsListProps,
  IConversation,
  IConversationContext,
} from "../../typings";
import PasswordPopup from "./PasswordPopup";
import SocketContext from "./socket_context/context";

const ConversationsList = ({
  user,
  list,
  type,
  setCreateOpen,
  setLoading,
  setJoinOpen,
  findUsersNotInConversation,
}: ConversationsListProps) => {
  const { setMessages, setSelectedConversation } =
    useContext<IConversationContext>(SocketContext);
  const [conversation, setConversation] = useState<IConversation | null>(null);
  const [passLoading, setPassLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const handleClickConversation = async (conversation: IConversation) => {
    try {
      setSelectedConversation(null);
      setConversation(null);
      if (conversation.type === "room" && conversation.status === "locked") {
        setConversation(conversation);
        setIsOpen(true);
      } else {
        setLoading(true);
        const res: any = await getConversationMessages(
          conversation.conversation_id
        );
        if (res.status === "success") {
          // console.log('iiiii', conversation);

          findUsersNotInConversation(conversation.conversation_id);
          setMessages(res.messages);
          joinConversation(conversation.conversation_id);
          setSelectedConversation(conversation);
          setLoading(false);
        } else {
          toast.error(res.msg);
          setLoading(false);
        }
      }
    } catch (error: any) {
      toast.error(error.message);
      setLoading(false);
    }
  };

  const checkPassword = async (password: string) => {
    // check password
    if (!password || !password.trim().length)
      toast.error("Please enter a password");
    else {
      setPassLoading(true);
      try {
        const res: any = await checkConversationPassword(
          conversation?.conversation_id,
          password
        );
        if (res.status === "success" && res.pass) {
          setLoading(true);

          const resp: any = await getConversationMessages(
            conversation?.conversation_id
          );
          if (resp.status === "success") {
            setMessages(resp.messages);
            joinConversation(conversation?.conversation_id);
            setSelectedConversation(conversation);
            setLoading(false);
            setConversation(null);
            setPassLoading(false);
            setIsOpen(false);
          } else {
            toast.error(resp.msg);
            setIsOpen(false);
            setLoading(false);
          }
        } else {
          toast.error(res.msg);
          setPassLoading(false);
        }
      } catch (error: any) {
        toast.error(error.message);
        setPassLoading(false);
      }
    }
  };

  return (
    <>
      <div
        className={`sidebar ${
          type === "normal" ? "hidden lg:flex w-1/3 flex-2 flex-col pr-6" : ""
        }`}
      >
        <div className="flex justify-between pb-6 px-2">
          <div className="flex">
            <div className="flex-2">
              <div className="w-12 h-12 relative">
                <Link href={`/profile/${user.user_name}`}>
                  <img
                    className="w-12 h-12 rounded-full mx-auto object-cover cursor-pointer"
                    src={user.image_url}
                    alt="chat-user"
                  />
                </Link>
                <span
                  className={`absolute w-4 h-4 ${
                    user ? "bg-green-400" : "bg-gray-400"
                  } rounded-full right-0 bottom-0 border-2 border-white`}
                ></span>
              </div>
            </div>
            <div className="flex-1 px-2">
              <div className="truncate w-32">
                <span className="text-gray-800">
                  {user.first_name} {user.last_name}
                </span>
              </div>
              <div>
                <small className="text-gray-600">
                  {user ? "Online" : "Offline"}
                </small>
              </div>
            </div>
          </div>

          {/* Create room modal */}

          <div className="flex space-x-2">
            <div className="flex-1">
              <button
                className="bg-sky-800 w-10 h-10 rounded-full inline-block transition duration-100 hover:scale-110 hover:bg-sky-700"
                onClick={() => setJoinOpen(true)}
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
                      d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                    />
                  </svg>
                </span>
              </button>
            </div>
            <div className="flex-1">
              <button
                onClick={() => setCreateOpen(true)}
                className="bg-sky-800 w-10 h-10 rounded-full inline-block transition duration-100 hover:scale-110 hover:bg-sky-700"
              >
                <span className="inline-block align-text-center mt-1">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-6 h-6 text-white"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </span>
              </button>
            </div>
          </div>
        </div>
        <div className="flex-1 overflow-y-scroll h-screen px-2">
          {list.map((conversation, idx) => (
            <div
              key={idx}
              className="entry cursor-pointer transform hover:scale-105 duration-300 transition-transform bg-white mb-4 rounded p-4 flex shadow-md"
              onClick={() => handleClickConversation(conversation)}
            >
              <div className="flex-2">
                <div className="w-12 h-12 relative">
                  <Avatar size="45" name={conversation.name} round={true} />
                  <span
                    className={`absolute w-4 h-4 ${
                      user ? "bg-green-400" : "bg-gray-400"
                    } rounded-full right-0 bottom-0 border-2 border-white`}
                  ></span>
                </div>
              </div>
              <div className="flex-1 px-2">
                <div className="truncate w-32">
                  <span className="text-gray-800">{conversation.name}</span>
                </div>
                <div>
                  <small className="text-gray-600">
                    {conversation.last_message?.body
                      ? conversation.last_message?.body
                      : "No message yet"}
                  </small>
                </div>
              </div>
              <div className="flex-2 text-right">
                <div>
                  <small className="text-gray-500">
                    {conversation.last_message?.sentAt
                      ? moment(conversation.last_message?.sentAt).fromNow()
                      : moment(conversation.createdAt).fromNow()}
                  </small>
                </div>
                {/* {conversation.not_read_messages > 0 && ( */}
                {/* <div>
                  <small className="text-xs bg-red-500 text-white rounded-full h-6 w-6 leading-6 text-center inline-block">
                    8
                  </small>
                </div> */}
                {/* )} */}
              </div>
            </div>
          ))}
        </div>
      </div>

      <PasswordPopup
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        loading={passLoading}
        checkPassword={checkPassword}
      />
    </>
  );
};

export default ConversationsList;

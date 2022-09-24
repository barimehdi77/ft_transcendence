import moment from "moment";
import Link from "next/link";
import { useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { getMember } from "../../helpers";
import { getConversationMessagesDm } from "../../services/conversations";
import { joinConversation } from "../../socket/emit";
import {
  ConversationsListDmsProps,
  IConversation,
  IConversationContext,
} from "../../typings";
import SocketContext from "./socket_context/context";

const ConversationsListDms = ({
  user,
  list,
  type,
  setStartDmOpen,
}: ConversationsListDmsProps) => {
  const { setMessages, setSelectedConversation, selectedConversation } =
    useContext<IConversationContext>(SocketContext);

  const handleClickConversation = async (
    conversation: IConversation | null
  ) => {
    try {
      setSelectedConversation(null);
      const res: any = await getConversationMessagesDm(
        conversation?.conversation_id
      );
      if (res.status === "success") {
        setMessages(res.messages);
        joinConversation(conversation?.conversation_id);
        setSelectedConversation(conversation);
      } else {
        toast.error(res.msg);
      }
    } catch (error: any) {
      toast.error(error.message);
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

          <div className="flex space-x-2">
            <div className="flex-1">
              <button
                onClick={() => setStartDmOpen(true)}
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
                      d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z"
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
                  <img
                    className="w-12 h-12 rounded-full mx-auto object-cover"
                    src={
                      getMember(user.intra_id, conversation.members)?.image_url
                    }
                    alt="chat-user"
                  />
                  <span
                    className={`absolute w-4 h-4 ${
                      user ? "bg-green-400" : "bg-gray-400"
                    } rounded-full right-0 bottom-0 border-2 border-white`}
                  ></span>
                </div>
              </div>
              <div className="flex-1 px-2">
                <div className="truncate w-32">
                  <span className="text-gray-800">{`${
                    getMember(user.intra_id, conversation.members)?.first_name
                  } ${
                    getMember(user.intra_id, conversation.members)?.last_name
                  }`}</span>
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
    </>
  );
};

export default ConversationsListDms;

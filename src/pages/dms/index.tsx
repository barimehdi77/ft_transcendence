import React, { useEffect, useState, useContext } from "react";
import { toast } from "react-toastify";
import ChatArea from "../../components/ChatArea";
import {
  createDmCOnversation,
  getConversationMessagesDm,
  getConversationsDms,
} from "../../services/conversations";
import {
  IConversation,
  IConversationContext,
  IMembers,
  IMessage,
} from "../../typings";
import SocketContext from "../../components/socket_context/context";
import { socket } from "../../socket";
import ConversationsListDms from "../../components/ConversationsListDms";
import ChatAreaDm from "../../components/ChatAreaDm";
import NewDm from "../../components/NewDm";
import { getAllUsers } from "../../services/users";
import { joinConversation } from "../../socket/emit";

// This temporary, before link user to chat
let userId: number | null = 39523;
if (typeof window !== "undefined") {
  userId = parseInt(localStorage.getItem("userId_temp") as string, 10);
}

const user: IMembers = {
  intra_id: userId,
  first_name: "Erraghay",
  last_name: "Ayoub",
  user_name: "aerragha",
  image_url:
    "https://media-exp1.licdn.com/dms/image/C4D03AQGqS4EMHscvNA/profile-displayphoto-shrink_800_800/0/1582996860869?e=1665619200&v=beta&t=neltvz5Bmj1dNtLfjIvs48g4Cg3UBGsU1xGgDaq-76A",
};

const dm = () => {
  const {
    conversations,
    setConversations,
    selectedConversation,
    setMessages,
    setSelectedConversation,
  } = useContext<IConversationContext>(SocketContext);
  const [showSidebar, setShowSidebar] = useState<boolean>(false);
  const [loading, setLoading] = useState(false);
  const [startDmLoader, setStartDmLoader] = useState<boolean>(false);
  const [startDmOpen, setStartDmOpen] = useState<boolean>(false);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    getConversationsList();
    findUsers();
  }, []);

  useEffect(() => {
    socket.on("receiveMessage", (data) => {
      console.log("data received from socket", data);
      if (data.conversation_id === selectedConversation?.conversation_id) {
        setMessages((prevMessages: IMessage[]) => [...prevMessages, data]);
      }
      setConversations((prevConversations: IConversation[]) => {
        const newConversations = prevConversations
          .map((conversation) => {
            if (conversation.conversation_id === data.conversation_id) {
              conversation.last_message = data;
            }
            return conversation;
          })
          .sort((a: any, b: any) => {
            return (
              new Date(b.last_message?.sentAt).getTime() -
              new Date(a.last_message?.sentAt).getTime()
            );
          });
        return newConversations;
      });
    });

    return () => {
      socket.off("receiveMessage");
    };
  }),
    [];

  const findUsers = async () => {
    try {
      const res: any = await getAllUsers();
      setUsers(
        res.map((user: IMembers) => ({
          label: `${user.first_name} ${user.last_name} (${user.user_name})`,
          value: user.intra_id,
        }))
      );
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  const getConversationsList = async () => {
    try {
      const res: any = await getConversationsDms();
      if (res.status === "success") {
        setConversations(
          res.conversations.sort((a: any, b: any) => {
            return (
              new Date(b.last_message?.sentAt).getTime() -
              new Date(a.last_message?.sentAt).getTime()
            );
          })
        );
      } else {
        toast.error(res.msg);
      }
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  const handleStartDm = async (userId: number) => {
    setStartDmLoader(true);
    try {
      const res: any = await createDmCOnversation(userId);
      if (res.status === "success") {
        getMessagesDm(res.conversation.conversation_id);
        if (res.type === "exist") {
          setSelectedConversation(
            conversations.find(
              (conversation) =>
                conversation.conversation_id ===
                res.conversation.conversation_id
            )
          );
        } else if (res.type === "new") {
          setSelectedConversation(res.conversation);
        }
        joinConversation(res.conversation?.conversation_id);

        getConversationsList();
        setStartDmLoader(false);
        setStartDmOpen(false);
      } else {
        setStartDmLoader(false);
        toast.error(res.msg);
      }
    } catch (error: any) {
      setStartDmLoader(false);
      if (error?.response?.data?.message[0])
        toast.error(error.response.data.message[0]);
      else if (error?.response?.data?.message)
        toast.error(error.response.data.message);
      else toast.error("Something went wrong");
    }
  };

  const getMessagesDm = async (conversation_id: string) => {
    try {
      const res: any = await getConversationMessagesDm(conversation_id);
      if (res.status === "success") {
        setMessages(res.messages);
      } else {
        toast.error(res.msg);
      }
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  return (
    <div className="w-full h-screen">
      <div className="flex h-full">
        <div className="flex-1 bg-gray-100 w-full h-full">
          <div className="main-body container m-auto w-11/12 h-full flex flex-col">
            <div className="py-4 flex-2 flex flex-row">
              <div className="flex-1">
                <span className="lg:hidden inline-block text-gray-700 hover:text-gray-900 align-bottom cursor-pointer">
                  <span className="block h-6 w-6 p-1 rounded-full hover:bg-gray-400">
                    {showSidebar ? (
                      <svg
                        onClick={() => setShowSidebar(false)}
                        xmlns="http://www.w3.org/2000/svg"
                        className="w-4 h-4"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth="2"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M6 18L18 6M6 6l12 12"
                        />
                      </svg>
                    ) : (
                      <svg
                        onClick={() => setShowSidebar(true)}
                        className="w-4 h-4"
                        fill="none"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M4 6h16M4 12h16M4 18h16"></path>
                      </svg>
                    )}
                  </span>
                </span>
              </div>
              <div className="flex-1 text-right">
                <span className="inline-block text-gray-700">
                  Status:{" "}
                  <span className="inline-block align-middle w-4 h-4 bg-green-400 rounded-full border-2 border-white"></span>{" "}
                  <b>Online</b>
                </span>
              </div>
            </div>

            {/* Responsive Sidebar */}
            <div
              className={`top-0 right-0 w-5/6 lg:hidden bg-gray-300  p-10 text-white fixed h-full z-30  ease-in-out duration-300 ${
                showSidebar ? "translate-x-0 px-0" : "translate-x-full"
              }`}
            >
              <ConversationsListDms
                setStartDmOpen={setStartDmOpen}
                user={user}
                loading={loading}
                setLoading={setLoading}
                list={conversations}
                type="resp"
              />
            </div>

            {/* Chat area */}
            <div className="main flex-1 flex flex-col mt-7 h-3/4">
              <div className="flex-1 flex h-full">
                <ConversationsListDms
                  setStartDmOpen={setStartDmOpen}
                  user={user}
                  loading={loading}
                  setLoading={setLoading}
                  list={conversations}
                  type="normal"
                />
                <ChatAreaDm
                  conversation={selectedConversation}
                  getConversationsList={getConversationsList}
                  loading={loading}
                  user={user}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <NewDm
        isOpen={startDmOpen}
        setIsOpen={setStartDmOpen}
        loading={startDmLoader}
        startDM={handleStartDm}
        users={users}
      />
    </div>
  );
};

export default dm;

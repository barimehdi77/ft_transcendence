import React, { useEffect, useState, useContext } from "react";
import { toast } from "react-toastify";
import ChatArea from "../../components/chat/ChatArea";
import ConversationsList from "../../components/chat/ConversationsList";
import {
  addNewAdmin,
  addNewMember,
  banUser,
  createConversation,
  editConversation,
  getConversations,
  getPublicConversations,
  joinConversation,
  removeAdminFromConversation,
  removeMemberFromConversation,
} from "../../services/conversations";
import {
  IConversation,
  IConversationContext,
  ICreateRoom,
  IEditRoom,
  IMembers,
  IMessage,
  IRoom,
} from "../../typings";
import SocketContext from "../../components/chat/socket_context/context";
import { socket } from "../../socket";
import Modal from "../../components/chat/Modal";
import Select from "react-select";
import { getAllUsers, getUsersNotInConversation } from "../../services/users";
import Avatar from "react-avatar";
import AddUserPopUp from "../../components/chat/AddUserPopUp";
import BanUserPopUp from "../../components/chat/BanUserPopUp";
import { UserContext } from "../../contexts/userContext";
import Head from "next/head";
import Link from "next/link";
import { getStatus } from "../../helpers";

// This temporary, before link user to chat
let userId: number | null = 39523;
if (typeof window !== "undefined") {
  userId = parseInt(localStorage.getItem("userId_temp") as string, 10);
}
///

const options = [
  { value: "public", label: "Public" },
  { value: "private", label: "Private" },
  { value: "locked", label: "Locked" },
];

const rooms = () => {
  const { userInfo }: any = useContext(UserContext);
  const {
    conversations,
    setConversations,
    selectedConversation,
    setMessages,
    setSelectedConversation,
  } = useContext<IConversationContext>(SocketContext);
  const [showSidebar, setShowSidebar] = useState<boolean>(false);
  const [loading, setLoading] = useState(false);
  const [createOpen, setCreateOpen] = useState(false);
  const [users, setUsers] = useState([]);
  const [joinOpen, setJoinOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
  const [manageOpen, setManageOpen] = useState(false);
  const [durationLoader, setDurationLoader] = useState(false);
  const [durationOpen, setDurationOpen] = useState(false);
  const [joinLoader, setJoinLoader] = useState("");
  const [removeLoader, setRemoveLoader] = useState<number>(0);
  const [adminLoader, setAdminLoader] = useState<number>(0);
  const [removeAdminLoader, setRemoveAdminLoader] = useState<number>(0);
  const [usersNotInConversation, setUsersNotInConversation] = useState([]);
  const [selectedUser, setSelectedUser] = useState<IMembers>();
  const [usersNotInConversationList, setUsersNotInConversationList] = useState(
    []
  );
  const [addMemberLoader, setAddMemberLoader] = useState<boolean>(false);
  const [addMemberOpen, setAddMemberOpen] = useState<boolean>(false);
  const [publicConversations, setPublicConversations] = useState<
    IConversation[]
  >([]);

  const [room, setRoom] = useState<IRoom>({
    name: "",
    status: {
      value: "public",
      label: "Public",
    },
    members: [],
    password: "",
  });

  const [selectedRoom, setSelectedRoom] = useState<IRoom>({
    name: "",
    status: {
      value: "public",
      label: "Public",
    },
    members: [],
    password: "",
  });

  const [selectedRoomEdit, setSelectedRoomEdit] = useState<IRoom>({
    name: "",
    status: {
      value: "public",
      label: "Public",
    },
    members: [],
    password: "",
  });

  useEffect(() => {
    setSelectedConversation(null);
    getConversationsList();
    findUsers();
    findPublicConversations();
  }, []);

  useEffect(() => {
    socket.on("receiveMessage", (data: any) => {
      console.log("data received from socket", data);
      if (userInfo.blockedUsers.includes(data.sent_by.intra_id)) {
        return;
      } else {
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
      }
    });

    return () => {
      socket.off("receiveMessage");
    };
  }),
    [];

  const getConversationsList = async () => {
    try {
      const res: any = await getConversations();
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

  const findUsersNotInConversation = async (
    conversationId: string | undefined
  ) => {
    try {
      const res: any = await getUsersNotInConversation(conversationId);
      setUsersNotInConversationList(res);
      setUsersNotInConversation(
        res.map((user: IMembers) => ({
          label: `${user.first_name} ${user.last_name} (${user.user_name})`,
          value: user.intra_id,
        }))
      );
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  const findPublicConversations = async () => {
    try {
      const res: any = await getPublicConversations();
      if (res.status === "success") {
        setPublicConversations(res.conversations);
      } else {
        toast.error(res.msg);
      }
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  const submitRoom = async (e: any) => {
    e.preventDefault();
    if (room.name === "") {
      toast.error("Please enter room name");
    } else if (room.members.length === 0) {
      toast.error("Please select at least 1 member");
    } else if (room.status.value === "locked" && room.password === "") {
      toast.error("Please enter a password");
    } else {
      const newRoom: ICreateRoom = {
        name: room.name,
        status: room.status.value,
        members: room.members.map((member: any) => member.value.toString()),
      };

      if (room.status.value === "locked") {
        newRoom.password = room.password;
      }

      try {
        const res: any = await createConversation(newRoom);
        if (res.status === "success") {
          setCreateOpen(false);
          setRoom({
            name: "",
            status: {
              value: "public",
              label: "Public",
            },
            members: [],
            password: "",
          });
          getConversationsList();
          toast.success("Room created successfully");
        } else {
          toast.error(res.msg);
        }
      } catch (error: any) {
        if (error?.response?.data?.message[0]) {
          toast.error(error.response.data.message[0]);
        } else {
          toast.error("Something went wrong");
        }
      }
    }
  };

  const onMembersChange = (value: any) => {
    setRoom((prevRoom: IRoom) => {
      return { ...prevRoom, members: value };
    });
  };

  const joinToConversation = async (conversationId: string) => {
    try {
      setJoinLoader(conversationId);
      const res: any = await joinConversation(conversationId);
      if (res.status === "success") {
        setJoinLoader("");
        setJoinOpen(false);
        getConversationsList();
        toast.success("You are successfully joined to the conversation");
      } else {
        setJoinLoader("");
        toast.error(res.msg);
      }
    } catch (error: any) {
      setJoinLoader("");
      if (error?.response?.data?.message[0])
        toast.error(error.response.data.message[0]);
      else if (error?.response?.data?.message)
        toast.error(error.response.data.message);
      else toast.error("Something went wrong");
    }
  };

  const submitEditRoom = async (e: any) => {
    e.preventDefault();

    const newRoom: IEditRoom = {
      name: selectedRoomEdit.name,
      status: selectedRoomEdit.status.value,
      password: selectedRoomEdit.password,
    };

    if (newRoom.name === selectedRoom.name) delete newRoom.name;
    if (newRoom.status === selectedRoom.status.value) {
      delete newRoom.status;
      delete newRoom.password;
    }

    if (Object.keys(newRoom).length === 0) {
      toast.error("Please make some changes");
    } else {
      try {
        const res: any = await editConversation(
          selectedConversation?.conversation_id,
          newRoom
        );
        if (res.status === "success") {
          setEditOpen(false);
          getConversationsList();
          setSelectedConversation(null);
          setSelectedRoom({
            name: "",
            status: {
              value: "public",
              label: "Public",
            },
            members: [],
            password: "",
          });
          setSelectedRoomEdit({
            name: "",
            status: {
              value: "public",
              label: "Public",
            },
            members: [],
            password: "",
          });
          toast.success("Room edited successfully");
        } else {
          toast.error(res.msg);
        }
      } catch (error: any) {
        if (error?.response?.data?.message[0])
          toast.error(error.response.data.message[0]);
        else if (error?.response?.data?.message)
          toast.error(error.response.data.message);
        else toast.error("Something went wrong");
      }
    }
  };

  const handleSelectedRoom = (conversation: IConversation) => {
    const selConversation = {
      ...conversation,
      status: {
        value: conversation.status,
        label: options.find(
          (option: any) => option.value === conversation.status
        )?.label,
      },
    };
    setSelectedRoom(selConversation);
    setSelectedRoomEdit(selConversation);
    setEditOpen(true);
  };

  const removeMember = async (intra_id: number) => {
    try {
      setRemoveLoader(intra_id);
      const res: any = await removeMemberFromConversation(
        intra_id,
        selectedConversation?.conversation_id
      );
      if (res.status === "success") {
        setRemoveLoader(0);
        getConversationsList();
        findUsersNotInConversation(selectedConversation?.conversation_id);
        setSelectedConversation((prevConversation: IConversation) => {
          return {
            ...prevConversation,
            members: prevConversation.members.filter(
              (member: any) => member.intra_id !== intra_id
            ),
            admins: prevConversation.admins.filter(
              (admin: any) => admin.intra_id !== intra_id
            ),
          };
        });
        toast.success("Member removed successfully");
      } else {
        setRemoveLoader(0);
        toast.error(res.msg);
      }
    } catch (error: any) {
      setRemoveLoader(0);
      if (error?.response?.data?.message[0])
        toast.error(error.response.data.message[0]);
      else if (error?.response?.data?.message)
        toast.error(error.response.data.message);
      else toast.error("Something went wrong");
    }
  };

  const removeAdmin = async (intra_id: number) => {
    try {
      setRemoveAdminLoader(intra_id);
      const res: any = await removeAdminFromConversation(
        intra_id,
        selectedConversation?.conversation_id
      );
      if (res.status === "success") {
        setRemoveAdminLoader(0);
        getConversationsList();
        findUsersNotInConversation(selectedConversation?.conversation_id);
        setSelectedConversation((prevConversation: IConversation) => {
          return {
            ...prevConversation,
            admins: prevConversation.admins.filter(
              (admin: any) => admin.intra_id !== intra_id
            ),
          };
        });
        toast.success("Admin removed successfully");
      } else {
        setRemoveAdminLoader(0);
        toast.error(res.msg);
      }
    } catch (error: any) {
      setRemoveAdminLoader(0);
      if (error?.response?.data?.message[0])
        toast.error(error.response.data.message[0]);
      else if (error?.response?.data?.message)
        toast.error(error.response.data.message);
      else toast.error("Something went wrong");
    }
  };

  const addMember = async (intra_id: number) => {
    try {
      setAddMemberLoader(true);
      const res: any = await addNewMember(
        intra_id,
        selectedConversation?.conversation_id
      );
      if (res.status === "success") {
        setAddMemberLoader(false);
        getConversationsList();
        setSelectedConversation((prevConversation: IConversation) => {
          return {
            ...prevConversation,
            members: [
              ...prevConversation.members,
              usersNotInConversationList.find(
                (member: IMembers) => member.intra_id === intra_id
              ),
            ],
          };
        });
        setAddMemberOpen(false);
        findUsersNotInConversation(selectedConversation?.conversation_id);
        toast.success("Member added successfully");
      } else {
        setAddMemberLoader(false);
        toast.error(res.msg);
      }
    } catch (error: any) {
      setAddMemberLoader(false);
      if (error?.response?.data?.message[0])
        toast.error(error.response.data.message[0]);
      else if (error?.response?.data?.message)
        toast.error(error.response.data.message);
      else toast.error("Something went wrong");
    }
  };

  const addAdmin = async (intra_id: number) => {
    try {
      setAdminLoader(intra_id);
      const res: any = await addNewAdmin(
        intra_id,
        selectedConversation?.conversation_id
      );
      if (res.status === "success") {
        setAdminLoader(0);
        getConversationsList();
        setSelectedConversation((prevConversation: IConversation) => {
          return {
            ...prevConversation,
            admins: [
              ...prevConversation.admins,
              selectedConversation?.members.find(
                (member: IMembers) => member.intra_id === intra_id
              ),
            ],
          };
        });
        toast.success("The user is now an admin");
      } else {
        setAdminLoader(0);
        toast.error(res.msg);
      }
    } catch (error: any) {
      setAdminLoader(0);
      if (error?.response?.data?.message[0])
        toast.error(error.response.data.message[0]);
      else if (error?.response?.data?.message)
        toast.error(error.response.data.message);
      else toast.error("Something went wrong");
    }
  };

  const banUserHandler = async (duration: string) => {
    try {
      if (
        !parseInt(duration) ||
        parseInt(duration) < 1 ||
        parseInt(duration) > 43800
      )
        toast.error("Invalid duration: must be between 1 and 43800");
      else {
        setDurationLoader(true);
        console.log("duration", duration);
        const res: any = await banUser(
          selectedUser?.intra_id,
          selectedConversation?.conversation_id,
          parseInt(duration)
        );
        if (res.status === "success") {
          setDurationLoader(false);
          setDurationOpen(false);
          getConversationsList();
          toast.success("User banned successfully");
        } else {
          setDurationLoader(false);
          toast.error(res.msg);
        }
      }
    } catch (error: any) {
      setDurationLoader(false);
      if (error?.response?.data?.message[0])
        toast.error(error.response.data.message[0]);
      else if (error?.response?.data?.message)
        toast.error(error.response.data.message);
      else toast.error("Something went wrong");
    }
  };

  return (
    <div className="w-full h-screen">
      <Head>
        <title>Chat rooms</title>
      </Head>
      <div className="flex h-full">
        <div className="flex-1 bg-gray-100 w-full h-5/6 mt-20">
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
                  <span
                    className={`inline-block align-middle w-4 h-4 ${
                      getStatus(userInfo?.profile?.status).color
                    } rounded-full border-2 border-white`}
                  ></span>{" "}
                  <b>{getStatus(userInfo?.profile?.status).text}</b>
                </span>
              </div>
            </div>

            {/* Responsive Sidebar */}
            <div
              className={`top-0 right-0 w-5/6 lg:hidden bg-gray-300  p-10 text-white fixed h-full z-30  ease-in-out duration-300 ${
                showSidebar ? "translate-x-0 px-0" : "translate-x-full"
              }`}
            >
              <ConversationsList
                setCreateOpen={setCreateOpen}
                setJoinOpen={setJoinOpen}
                findUsersNotInConversation={findUsersNotInConversation}
                user={userInfo}
                loading={loading}
                setLoading={setLoading}
                list={conversations}
                type="resp"
              />
            </div>

            {/* Chat area */}
            <div className="main flex-1 flex flex-col mt-7 h-3/4">
              <div className="flex-1 flex h-full">
                <ConversationsList
                  setCreateOpen={setCreateOpen}
                  setJoinOpen={setJoinOpen}
                  findUsersNotInConversation={findUsersNotInConversation}
                  user={userInfo}
                  loading={loading}
                  setLoading={setLoading}
                  list={conversations}
                  type="normal"
                />
                <ChatArea
                  user={userInfo}
                  conversation={selectedConversation}
                  handleSelectedRoom={handleSelectedRoom}
                  getConversationsList={getConversationsList}
                  setManageOpen={setManageOpen}
                  loading={loading}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Create room  */}
      <Modal open={createOpen} onClose={() => setCreateOpen(false)}>
        <h1 className="mt-2">
          <b>Create Conversation</b>
        </h1>

        <div className="w-full">
          <form onSubmit={submitRoom}>
            <div className="my-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="name"
              >
                Name:
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="name"
                type="text"
                value={room.name}
                onChange={(e) => setRoom({ ...room, name: e.target.value })}
                placeholder="Room Name"
              />
            </div>
            <div className="my-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="members"
              >
                Members:
              </label>
              <Select
                instanceId={"members"}
                name="members"
                options={users}
                isMulti={true}
                onChange={onMembersChange}
                value={room.members}
              />
            </div>
            <div className="my-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="status"
              >
                Status:
              </label>
              <Select
                instanceId="status"
                options={options}
                name="status"
                value={room.status}
                onChange={(value) => setRoom({ ...room, status: value })}
              />
            </div>
            {room.status.value === "locked" && (
              <div className="mb-6">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="password"
                >
                  Password:
                </label>
                <input
                  className="shadow appearance-none border border-red-500 rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                  id="password"
                  type="password"
                  value={room.password}
                  onChange={(e) =>
                    setRoom({ ...room, password: e.target.value })
                  }
                  placeholder="**************"
                />
                <p className="text-red-500 text-xs italic">
                  Please choose a password.
                </p>
              </div>
            )}
            <div className="flex items-center justify-between">
              <button
                onClick={submitRoom}
                className="bg-sky-700 hover:bg-sky-800 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                type="button"
              >
                Submit
              </button>
            </div>
          </form>
        </div>
      </Modal>

      {/* Join to a room */}
      <Modal open={joinOpen} onClose={() => setJoinOpen(false)}>
        <h1 className="mt-2">
          <b>Join to conversation</b>
        </h1>

        <div className="w-full mt-4">
          {publicConversations.length
            ? publicConversations.map((conversation, idx) => (
                <div
                  key={idx}
                  className="entry cursor-pointer  bg-white mb-4 rounded p-4 flex shadow-md"
                >
                  <div className="flex-2">
                    <div className="w-12 h-12 relative">
                      <Avatar size="45" name={conversation.name} round={true} />
                    </div>
                  </div>
                  <div className="flex-1 px-2">
                    <div className="truncate w-50">
                      <span className="text-gray-800">{conversation.name}</span>
                    </div>
                    <div>
                      <small className="text-gray-600">
                        {conversation.members.length}{" "}
                        {`${
                          conversation.members.length > 1 ? "members" : "member"
                        }`}
                      </small>
                    </div>
                  </div>
                  <div className="flex-2">
                    <button
                      disabled={joinLoader ? true : false}
                      onClick={() =>
                        joinToConversation(conversation.conversation_id)
                      }
                      className="text-xs bg-sky-800 text-white rounded-full h-10 w-10 leading-6 text-center inline-block transition duration-100 hover:scale-110 hover:bg-sky-700"
                    >
                      {joinLoader &&
                      joinLoader === conversation.conversation_id ? (
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
                          className="w-4 h-4 text-white mx-auto"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          strokeWidth="2"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z"
                          />
                        </svg>
                      )}
                    </button>
                  </div>
                </div>
              ))
            : "No public conversations found"}
        </div>
      </Modal>

      {/* Edit room  */}
      <Modal open={editOpen} onClose={() => setEditOpen(false)}>
        <h1 className="mt-2">
          <b>Edit conversation infos</b>
        </h1>

        <div className="w-full">
          <form onSubmit={submitEditRoom}>
            <div className="my-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="editName"
              >
                Name:
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="editName"
                type="text"
                value={selectedRoomEdit.name}
                onChange={(e) =>
                  setSelectedRoomEdit({
                    ...selectedRoomEdit,
                    name: e.target.value,
                  })
                }
                placeholder="Room Name"
              />
            </div>

            <div className="my-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="editStatus"
              >
                Status:
              </label>
              <Select
                instanceId="editStatus"
                options={options}
                name="editStatus"
                value={selectedRoomEdit.status}
                onChange={(value) =>
                  setSelectedRoomEdit({ ...selectedRoomEdit, status: value })
                }
              />
            </div>
            {selectedRoomEdit.status.value === "locked" && (
              <div className="mb-6">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="editPassword"
                >
                  Password:
                </label>
                <input
                  className="shadow appearance-none border border-red-500 rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                  id="editPassword"
                  type="password"
                  value={selectedRoom.password}
                  onChange={(e) =>
                    setSelectedRoomEdit({
                      ...selectedRoomEdit,
                      password: e.target.value,
                    })
                  }
                  placeholder="**************"
                />
                <p className="text-red-500 text-xs italic">
                  Please choose a password.
                </p>
              </div>
            )}
            <div className="flex items-center justify-between">
              <button
                onClick={submitEditRoom}
                className="bg-sky-700 hover:bg-sky-800 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                type="button"
              >
                Submit
              </button>
            </div>
          </form>
        </div>
      </Modal>

      {/* Manage members */}
      <Modal open={manageOpen} onClose={() => setManageOpen(false)}>
        <div className="flex justify-between mt-7">
          <h1 className="my-auto">
            <b>Manage members</b>
          </h1>
          <button
            onClick={() => setAddMemberOpen(true)}
            className="bg-sky-700 hover:bg-sky-800 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Add member
          </button>
        </div>

        <div className="w-full mt-4 h-2/5 overflow-scroll p-3 bg-gray-100">
          {selectedConversation
            ? selectedConversation.members.map((member, idx) => (
                <div
                  key={idx}
                  className="entry cursor-pointer  bg-white mb-4 rounded p-4 flex shadow-md"
                >
                  <div className="flex-2">
                    <div className="w-12 h-12 relative">
                      <Link href={`/profile/${member.user_name}`}>
                        <img
                          className="w-12 h-12 rounded-full mx-auto object-cover cursor-pointer"
                          src={member.image_url}
                          alt="chat-user"
                        />
                      </Link>
                    </div>
                  </div>
                  <div className="flex-1 px-2">
                    <div className="truncate w-50">
                      <span className="text-gray-800">
                        {member.first_name} {member.last_name}
                      </span>
                    </div>
                    <div>
                      <small className="text-gray-600">
                        {member.user_name}
                      </small>
                    </div>
                  </div>
                  {!(userInfo.intra_id === member.intra_id) ? (
                    <div className="flex-2 space-x-2">
                      {!selectedConversation.admins.find(
                        (admin) => admin.intra_id === member.intra_id
                      ) && (
                        <button
                          disabled={adminLoader !== 0 ? true : false}
                          onClick={() => addAdmin(member.intra_id)}
                          className="text-xs bg-sky-800 text-white rounded-full h-10 w-10 leading-6 text-center inline-block transition duration-100 hover:scale-110 hover:bg-sky-700"
                        >
                          {adminLoader !== 0 &&
                          adminLoader === member.intra_id ? (
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
                              className="w-6 h-6 text-white mx-auto"
                              viewBox="0 0 20 20"
                              fill="currentColor"
                            >
                              <path d="M8 9a3 3 0 100-6 3 3 0 000 6zM8 11a6 6 0 016 6H2a6 6 0 016-6zM16 7a1 1 0 10-2 0v1h-1a1 1 0 100 2h1v1a1 1 0 102 0v-1h1a1 1 0 100-2h-1V7z" />
                            </svg>
                          )}
                        </button>
                      )}

                      <button
                        onClick={() => {
                          setSelectedUser(member);
                          setDurationOpen(true);
                        }}
                        className="text-xs bg-sky-800 text-white rounded-full h-10 w-10 leading-6 text-center inline-block transition duration-100 hover:scale-110 hover:bg-sky-700"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="w-6 h-6 text-white mx-auto"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          strokeWidth={2}
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636"
                          />
                        </svg>
                      </button>

                      <button
                        disabled={removeLoader !== 0 ? true : false}
                        onClick={() => removeMember(member.intra_id)}
                        className="text-xs bg-sky-800 text-white rounded-full h-10 w-10 leading-6 text-center inline-block transition duration-100 hover:scale-110 hover:bg-sky-700"
                      >
                        {removeLoader !== 0 &&
                        removeLoader === member.intra_id ? (
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
                            className="w-6 h-6 text-white mx-auto"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            strokeWidth={2}
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
                            />
                          </svg>
                        )}
                      </button>
                    </div>
                  ) : (
                    ""
                  )}
                </div>
              ))
            : "No members found for this conversation"}
        </div>

        <div className="flex justify-between mt-4">
          <h1 className="my-auto">
            <b>Manage admins</b>
          </h1>
          <button className="bg-sky-700 hover:bg-sky-800 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
            Add admin
          </button>
        </div>

        <div className="w-full mt-4 h-2/5 overflow-scroll p-3 bg-gray-100">
          {selectedConversation
            ? selectedConversation.admins.map((member, idx) => (
                <div
                  key={idx}
                  className="entry cursor-pointer  bg-white mb-4 rounded p-4 flex shadow-md"
                >
                  <div className="flex-2">
                    <div className="w-12 h-12 relative">
                      <Link href={`/profile/${member.user_name}`}>
                        <img
                          className="w-12 h-12 rounded-full mx-auto object-cover cursor-pointer"
                          src={member.image_url}
                          alt="chat-user"
                        />
                      </Link>
                    </div>
                  </div>
                  <div className="flex-1 px-2">
                    <div className="truncate w-50">
                      <span className="text-gray-800">
                        {member.first_name} {member.last_name}
                      </span>
                    </div>
                    <div>
                      <small className="text-gray-600">
                        {member.user_name}
                      </small>
                    </div>
                  </div>
                  {!(userInfo.intra_id === member.intra_id) && (
                    <div className="flex-2">
                      <button
                        disabled={removeAdminLoader !== 0 ? true : false}
                        onClick={() => removeAdmin(member.intra_id)}
                        className="text-xs bg-sky-800 text-white rounded-full h-10 w-10 leading-6 text-center inline-block transition duration-100 hover:scale-110 hover:bg-sky-700"
                      >
                        {removeAdminLoader !== 0 &&
                        removeAdminLoader === member.intra_id ? (
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
                            className="w-6 h-6 text-white mx-auto"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            strokeWidth={2}
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
                            />
                          </svg>
                        )}
                      </button>
                    </div>
                  )}
                </div>
              ))
            : "No admins found for this conversation"}
        </div>
      </Modal>

      <AddUserPopUp
        isOpen={addMemberOpen}
        setIsOpen={setAddMemberOpen}
        loading={addMemberLoader}
        addMember={addMember}
        users={usersNotInConversation}
      />

      <BanUserPopUp
        isOpen={durationOpen}
        setIsOpen={setDurationOpen}
        loading={durationLoader}
        banUserHandler={banUserHandler}
      />
    </div>
  );
};

export default rooms;

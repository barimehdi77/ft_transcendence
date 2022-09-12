import { IBanMember, ICreateRoom, IEditRoom, IRemoveMember } from "../typings";
import Api from "./api";

export const getConversations = () =>
  new Promise((resolve, reject) => {
    Api()
      .get("/conversations/room/me")
      .then((response) => {
        resolve(response.data);
      })
      .catch((error) => reject(error));
  });

export const getConversationsDms = () =>
  new Promise((resolve, reject) => {
    Api()
      .get("/conversations/dm/me")
      .then((response) => {
        resolve(response.data);
      })
      .catch((error) => reject(error));
  });

export const getConversationMessages = (id: string | undefined) =>
  new Promise((resolve, reject) => {
    Api()
      .get(`/conversations/messages/${id}`)
      .then((response) => {
        resolve(response.data);
      })
      .catch((error) => reject(error));
  });

export const getConversationMessagesDm = (id: string | undefined) =>
  new Promise((resolve, reject) => {
    Api()
      .get(`/conversations/dm/messages/${id}`)
      .then((response) => {
        resolve(response.data);
      })
      .catch((error) => reject(error));
  });

export const getPublicConversations = () =>
  new Promise((resolve, reject) => {
    Api()
      .get("/conversations/room/find")
      .then((response) => {
        resolve(response.data);
      })
      .catch((error) => reject(error));
  });

export const checkConversationPassword = (
  conversation_id: string | undefined,
  password: string
) =>
  new Promise((resolve, reject) => {
    Api()
      .post("/conversations/checkPassword", {
        conversationId: conversation_id,
        password: password,
      })
      .then((response) => {
        resolve(response.data);
      })
      .catch((error) => reject(error));
  });

export const createConversation = (body: ICreateRoom) =>
  new Promise((resolve, reject) => {
    Api()
      .post("/conversations/room", body)
      .then((response) => {
        resolve(response.data);
      })
      .catch((error) => reject(error));
  });

export const joinConversation = (conversationId: string) =>
  new Promise((resolve, reject) => {
    Api()
      .post("/conversations/room/members/join", { conversationId })
      .then((response) => {
        resolve(response.data);
      })
      .catch((error) => reject(error));
  });

export const editConversation = (
  conversationId: string | undefined,
  data: IEditRoom
) =>
  new Promise((resolve, reject) => {
    Api()
      .patch(`/conversations/room/edit/${conversationId}`, data)
      .then((response) => {
        resolve(response.data);
      })
      .catch((error) => reject(error));
  });

export const leaveConversation = (conversationId: string) =>
  new Promise((resolve, reject) => {
    Api()
      .post("/conversations/room/members/leave", { conversationId })
      .then((response) => {
        resolve(response.data);
      })
      .catch((error) => reject(error));
  });

export const removeMemberFromConversation = (
  intra_id: number,
  conversationId: string | undefined
) =>
  new Promise((resolve, reject) => {
    const body: IRemoveMember = {
      user: intra_id.toString(),
      conversationId,
    };
    Api()
      .post("/conversations/room/members/remove", body)
      .then((response) => {
        resolve(response.data);
      })
      .catch((error) => reject(error));
  });

export const removeAdminFromConversation = (
  intra_id: number,
  conversationId: string | undefined
) =>
  new Promise((resolve, reject) => {
    const body: IRemoveMember = {
      user: intra_id.toString(),
      conversationId,
    };
    Api()
      .post("/conversations/room/admins/remove", body)
      .then((response) => {
        resolve(response.data);
      })
      .catch((error) => reject(error));
  });

export const addNewMember = (
  intra_id: number,
  conversationId: string | undefined
) =>
  new Promise((resolve, reject) => {
    const body: IRemoveMember = {
      user: intra_id.toString(),
      conversationId,
    };
    Api()
      .post("/conversations/room/members/add", body)
      .then((response) => {
        resolve(response.data);
      })
      .catch((error) => reject(error));
  });

export const addNewAdmin = (
  intra_id: number,
  conversationId: string | undefined
) =>
  new Promise((resolve, reject) => {
    const body: IRemoveMember = {
      user: intra_id.toString(),
      conversationId,
    };
    Api()
      .post("/conversations/room/admins/add", body)
      .then((response) => {
        resolve(response.data);
      })
      .catch((error) => reject(error));
  });

export const banUser = (
  intra_id: number | undefined,
  conversationId: string | undefined,
  duration: number
) =>
  new Promise((resolve, reject) => {
    const body: IBanMember = {
      user: intra_id?.toString(),
      conversationId,
      duration,
    };
    Api()
      .post("/conversations/room/members/ban", body)
      .then((response) => {
        resolve(response.data);
      })
      .catch((error) => reject(error));
  });

export const createDmCOnversation = (user: number) =>
  new Promise((resolve, reject) => {
    Api()
      .post("/conversations/dm", {
        user: user.toString(),
      })
      .then((response) => {
        resolve(response.data);
      })
      .catch((error) => reject(error));
  });

import Api from "./api";

export const getAllUsers = () =>
  new Promise((resolve, reject) => {
    Api()
      .get("/user/find")
      .then((response) => {
        resolve(response.data);
      })
      .catch((error) => reject(error));
  });

export const getUsersNotInConversation = (conversationId: string | undefined) =>
  new Promise((resolve, reject) => {
    console.log("conversationId", conversationId);
    Api()
      .get(`/user/findConversation/${conversationId}`)
      .then((response) => {
        resolve(response.data);
      })
      .catch((error) => reject(error));
  });

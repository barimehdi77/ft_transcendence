import { IMembers } from "../typings";

export const getMember = (intra_id: number, members: IMembers[]) => {
  return members?.find((member) => member.intra_id !== intra_id);
};

export const getStatus = (status: string | undefined) => {
  console.log('---', status);
  switch (status) {
    case "ONLINE":
      return {
        color: "bg-green-400",
        text: "Online",
      };
    case "OFFLINE":
      return {
        color: "bg-gray-400",
        text: "Offline",
      };
    case "INGAME":
      return {
        color: "bg-sky-800",
        text: "In Game",
      };
    default:
      return {
        color: "hidden",
        text: "",
      };
  }
};

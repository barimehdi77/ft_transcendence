import axios from "axios";

interface IData {
  baseURL: string;
  headers: any;
}

const api = () => {
  let data: IData = {
    baseURL: "http://localhost:8080/api",
    headers: {
      "Content-Type": "application/json",
    },
  };

  // const token = localStorage.getItem("token");
  let token: string | null = "";
  if (typeof window !== "undefined") {
    token = localStorage.getItem("token");
  }
  if (token) data.headers["Authorization"] = "Bearer " + token;

  return axios.create(data);
};

export default api;

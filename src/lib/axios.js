import axios from "axios";

const instance = axios.create({
  baseURL: "http://localhost:3000", // ✅ No trailing slash
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

export default instance;

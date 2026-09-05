import axios from "axios";

const api = axios.create({
  baseURL: `${process.env.NEXT_PUBLIC_SERVER_URL}/api/v1`,
  withCredentials: true,
});

export default api;

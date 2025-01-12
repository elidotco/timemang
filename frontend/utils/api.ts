// src/axiosInstance.ts

import axios from "axios";
import { useAuth } from "../app/context/AuthContext";

const useAxios = () => {
  const { token } = useAuth();
  console.log(token);

  const api = axios.create({
    baseURL: "http://localhost:5000/api", // Replace with your API base URL
    headers: {
      Authorization: token ? `Bearer ${token}` : "",
    },
  });

  return api;
};

export default useAxios;

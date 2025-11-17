import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://the-book-haven-server-plum.vercel.app",
});

const useAxios = () => {
  return axiosInstance;
};

export default useAxios;

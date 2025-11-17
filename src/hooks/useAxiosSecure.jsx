import axios from "axios";
import useAuth from "./useAuth"; 
import { useEffect } from "react";

const axiosInstance = axios.create({
  baseURL: "https://the-book-haven-server-plum.vercel.app",
});

const useAxiosSecure = () => {
  const { user } = useAuth();

  useEffect(() => {
     const requestInterceptor = axiosInstance.interceptors.request.use((config) => {
      if(!user){
        return;
      }
      const token = user.accessToken;
      if(token){
        config.headers.authorization = `Bearer ${token}`;
      }
      return config;
    });

    return () => {
      axiosInstance.interceptors.request.eject(requestInterceptor);
    };
  }, [user]);

  return axiosInstance;
};

export default useAxiosSecure;



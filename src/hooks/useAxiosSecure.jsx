import axios from "axios";
import useAuth from "./useAuth"; 
import { useEffect } from "react";

const axiosInstance = axios.create({
  baseURL: "http://localhost:3000",
});

const useAxiosSecure = () => {
  const { user } = useAuth();

  useEffect(() => {
     const requestInterceptor = axiosInstance.interceptors.request.use((config) => {
      const token = user.accessToken;
      if(token){
        config.headers.authorization = `Bearer ${token}`;
      }
      console.log(config)
      return config;
    });

    return () => {
      axiosInstance.interceptors.request.eject(requestInterceptor);
    };
  }, [user]);

  return axiosInstance;
};

export default useAxiosSecure;



import axios from "axios";
import { useNavigate } from "react-router";
import useAuth from "./useAuth"; 
import { useEffect } from "react";
// import { useEffect } from "react";

const axiosSecure = axios.create({
  baseURL: "https://the-book-haven-api.vercel.app",
});

const useAxiosSecure = () => {
  const { user, logOutUser } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    // request interceptor
    const reqInterceptor = axiosSecure.interceptors.request.use((config) => {
      const token = user?.accessToken;
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    });

     // response interceptor
    const resInterceptor = axiosSecure.interceptors.response.use(
      (response) => {
        return response;
      },
      (error) => {
        console.log(error);
        const statusCode = error.status;
        if(statusCode === 403){
            navigate("/")
        }
        if(statusCode === 401){
            logOutUser()
            .then(()=>{
                navigate("/login")
            })
        }
        return Promise.reject(error);
      }
    );

    // Cleanup old interceptor when user changes
    return () => {
      axiosSecure.interceptors.request.eject(reqInterceptor);
      axiosSecure.interceptors.request.eject(resInterceptor);
    };
  }, [user, logOutUser, navigate]);

  return axiosSecure;
};

export default useAxiosSecure;



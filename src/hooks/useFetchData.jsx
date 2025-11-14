import { useState, useEffect } from "react";
import useAxios from "./useAxios";

const useFetchData = (url) => {
  const axiosInstance = useAxios();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await axiosInstance.get(url);
        setData(response.data);
        setError(null);
      } catch (err) {
        setError(err.message || "Something went wrong");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [url, axiosInstance]);

  return { data, loading, error };
};

export default useFetchData;

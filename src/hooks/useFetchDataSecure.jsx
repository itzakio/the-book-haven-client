import { useState, useEffect } from "react";
import useAxiosSecure from "./useAxiosSecure";

const useFetchDataSecure = (url) => {
  const axiosSecure = useAxiosSecure()
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await axiosSecure.get(url);
        setData(response.data);
        setError(null);
      } catch (err) {
        setError(err.message || "Something went wrong");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [url, axiosSecure]);

  return { data, loading, error };
};

export default useFetchDataSecure;

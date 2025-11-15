import React from "react";
import useFetchData from "../hooks/useFetchData";
import useAuth from "../hooks/useAuth";
import Loading from "../components/Loading";
import ErrorPage from "../components/ErrorPage";
import MyTableRow from "../components/MyTableRow";
import { useLocation } from "react-router";

const MyBooks = () => {
  const { user } = useAuth();
  const location = useLocation();

  const {
    data: books,
    loading,
    error,
  } = useFetchData(`/books?email=${user.email}`);
  if (loading) {
    return <Loading />;
  }
  if (error) {
    return <ErrorPage />;
  }
  return (
    <div className="max-w-[1440px] mx-auto margin-y">
      <h2 className="headline">My Books</h2>
      <div className="margin-top overflow-x-auto p-4 xl:px-0">
        <table className="table table-zebra w-full">
          <thead className="bg-primary text-white text-base">
            <tr>
              <th>#</th>
              <th>Cover</th>
              <th>Name</th>
              <th>Author</th>
              <th>Genre</th>
              <th>Rating</th>
              <th className="text-center">Action</th>
            </tr>
          </thead>

          <tbody>
            {books.map((book, index) => (
              <MyTableRow location={location} key={book._id} book={book} index={index} />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MyBooks;

import React, { useEffect, useState } from "react";
import useFetchData from "../hooks/useFetchData";
import useAuth from "../hooks/useAuth";
import Loading from "../components/Loading";
import ErrorPage from "../components/ErrorPage";
import MyTableRow from "../components/MyTableRow";
import { useLocation } from "react-router";
import Swal from "sweetalert2";
import toast from "react-hot-toast";

const MyBooks = () => {
  const { user } = useAuth();
  const location = useLocation();
  const {
    data: userBooks,
    loading,
    error,
  } = useFetchData(`/books?email=${user.email}`);
  const [books, setBooks] = useState(userBooks || []);

  useEffect(() => {
    if (userBooks) {
      setBooks(userBooks);
    }
  }, [userBooks]);

  const bookDeleteHandler = (id) => {
    Swal.fire({
      title: "Are you sure ?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        fetch(`http://localhost:3000/books/${id}`, {
          method: "DELETE",
        })
          .then((res) => res.json())
          .then((data) => {
            if (data.deletedCount) {
              Swal.fire({
                title: "Deleted!",
                text: "Your Book has been deleted.",
                icon: "success",
              });
              const remainingBooks = books.filter((book) => book._id !== id);
              setBooks(remainingBooks);
            }
          })
          .catch(() => {});
      }
    });
  };

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
              <MyTableRow
                bookDeleteHandler={bookDeleteHandler}
                location={location}
                key={book._id}
                book={book}
                index={index}
              />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MyBooks;

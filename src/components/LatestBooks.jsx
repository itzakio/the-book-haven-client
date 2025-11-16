import React from "react";
import { Link } from "react-router";
import useFetchData from "../hooks/useFetchData";
import Loading from "./Loading";
import ErrorPage from "./ErrorPage";
import Card from "./Card";

const LatestBooks = () => {
  const { data: books, loading, error } = useFetchData("/latest-books");
  console.log(books);

  if (loading) {
    return <Loading />;
  }
  if (error) {
    return <ErrorPage />;
  }
  return (
    <div className="max-w-[1440px] mx-auto margin-y flex flex-col items-center">
      <h2 className="headline">Latest Books</h2>
      <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-6 gap-4 md:gap-8 p-4 md:p-8 xl:p-0 margin-y">
        {books.map((book) =>(
            <Card key={book._id} book={book}/>
        ))}
      </div>
      <Link
        to="/all-books"
        className="btn rounded-none btn-outline btn-primary"
      >
        Show All Books
      </Link>
    </div>
  );
};

export default LatestBooks;

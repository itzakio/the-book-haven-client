import { useEffect, useState } from "react";
import Loading from "../components/Loading";
import ErrorPage from "../components/ErrorPage";
import TableRow from "../components/TableRow";
import useFetchDataSecure from "../hooks/useFetchDataSecure";

const AllBooks = () => {
  const { data: allBooks, loading, error } = useFetchDataSecure("/books");
  const [books, setBooks] = useState([]);
  const [sortOrder, setSortOrder] = useState("default");

  useEffect(() => {
    if (allBooks) {
      setBooks(allBooks);
    }
  }, [allBooks]);

  if (loading) return <Loading />;
  if (error) return <ErrorPage />;

  let sortedBooks = [...books];

  if (sortOrder === "high-to-low") {
    sortedBooks.sort((a, b) => b.rating - a.rating);
  }

  if (sortOrder === "low-to-high") {
    sortedBooks.sort((a, b) => a.rating - b.rating);
  }

  return (
    <div className="max-w-[1440px] mx-auto margin-y">
      <h2 className="headline">All Books</h2>

      <div className="flex justify-center md:justify-end mt-4 px-5">
        <select
          className="select select-bordered w-48 max-w-xs"
          value={sortOrder}
          onChange={(e) => setSortOrder(e.target.value)}
        >
          <option value="default">Sort by Rating</option>
          <option value="high-to-low">High to Low</option>
          <option value="low-to-high">Low to High</option>
        </select>
      </div>

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
            {sortedBooks.map((book, index) => (
              <TableRow key={book._id} book={book} index={index} />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AllBooks;

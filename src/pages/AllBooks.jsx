import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useLocation } from "react-router";
import Loading from "../components/Loading";
import ErrorPage from "../components/ErrorPage";
import TableRow from "../components/TableRow";
import useAxiosSecure from "../hooks/useAxiosSecure";

const LIMIT = 10;

const AllBooks = () => {
  const axiosSecure = useAxiosSecure();
  const location = useLocation();

  // 🔹 state
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [rating, setRating] = useState("");
  const [sort, setSort] = useState("date");
  const [page, setPage] = useState(1);

  // 🔹 debounce search
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(search);
      setPage(1);
    }, 500);

    return () => clearTimeout(timer);
  }, [search]);

  // 🔹 fetch books
  const {
    data,
    isLoading,
    isFetching,
    error,
  } = useQuery({
    queryKey: ["books", debouncedSearch, rating, sort, page],
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/books?search=${debouncedSearch}&rating=${rating}&sort=${sort}&page=${page}&limit=${LIMIT}`
      );
      return res.data;
    },
    keepPreviousData: true,
    refetchOnWindowFocus: false,
  });

  // ✅ only FIRST load blocks the page
  if (isLoading && !data) return <Loading />;
  if (error) return <ErrorPage />;

  const books = data?.books || [];
  const totalPages = data?.totalPages || 0;

  return (
    <div className="max-w-[1440px] mx-auto margin-y">
      <h2 className="headline">All Books</h2>

      {/* 🔍 SEARCH & FILTER BAR */}
      <div className="flex flex-col md:flex-row gap-4 justify-between items-center mt-6 px-5">
        {/* Search */}
        <input
          type="text"
          placeholder="Search by book title..."
          className="input input-bordered w-full md:max-w-xs"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        {/* Filters */}
        <div className="flex gap-3">
          {/* Rating */}
          <select
            className="select select-bordered"
            value={rating}
            onChange={(e) => {
              setRating(e.target.value);
              setPage(1);
            }}
          >
            <option value="">All Ratings</option>
            <option value="5">5+</option>
            <option value="4">4+</option>
            <option value="3">3+</option>
          </select>

          {/* Sort */}
          <select
            className="select select-bordered"
            value={sort}
            onChange={(e) => {
              setSort(e.target.value);
              setPage(1);
            }}
          >
            <option value="date">Newest</option>
            <option value="rating">Top Rated</option>
          </select>
        </div>
      </div>

      {/* 📚 TABLE */}
      <div className="margin-top overflow-x-auto p-4 xl:px-0">
        <table className="table table-zebra w-full">
          <thead className="bg-primary text-white text-base">
            <tr>
              <th>#</th>
              <th>Cover</th>
              <th>Title</th>
              <th>Author</th>
              <th>Genre</th>
              <th>Rating</th>
              <th className="text-center">Action</th>
            </tr>
          </thead>

          <tbody>
            {/* 🔄 table-only loading */}
            {isFetching ? (
              <tr>
                <td colSpan="7" className="text-center py-10">
                  <Loading/>
                </td>
              </tr>
            ) : books.length === 0 && debouncedSearch ? (
              <tr>
                <td colSpan="7" className="text-center py-10">
                  No books found
                </td>
              </tr>
            ) : (
              books.map((book, index) => (
                <TableRow
                  key={book._id}
                  book={book}
                  index={(page - 1) * LIMIT + index + 1}
                  location={location}
                />
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* 🔢 PAGINATION */}
      {totalPages > 1 && (
        <div className="flex justify-center gap-2 mt-8">
          {[...Array(totalPages).keys()].map((num) => (
            <button
              key={num}
              className={`btn btn-sm ${
                page === num + 1 ? "btn-primary" : "btn-outline"
              }`}
              disabled={isFetching}
              onClick={() => setPage(num + 1)}
            >
              {num + 1}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default AllBooks;

import useFetchData from "../hooks/useFetchData";
import Loading from "../components/Loading";
import TableRow from "../components/TableRow";
import ErrorPage from "../components/ErrorPage";


const AllBooks = () => {
  const { data: books, loading, error } = useFetchData("/books");


  if (loading) {
    return <Loading />;
  }
  if (error) {
    return <ErrorPage />;
  }
  
  return (
    <div className="max-w-[1440px] mx-auto margin-y">
      <h2 className="headline">All Books</h2>
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
              <TableRow  key={book._id} book={book} index={index} />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AllBooks;

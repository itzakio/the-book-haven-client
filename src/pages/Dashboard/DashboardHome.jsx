import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import useAuth from "../../hooks/useAuth";
import Loading from "../../components/Loading";
import StatCard from "../../components/StatCard";
import TableRow from "../../components/TableRow";
import { LiaBookSolid } from "react-icons/lia";
import { BiBookAdd } from "react-icons/bi";

const DashboardHome = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();


  const { data: stats, isLoading } = useQuery({
    queryKey: ["dashboard-stats", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/dashboard/stats?email=${user.email}`
      );
      return res.data;
    },
    enabled: !!user?.email,
  });


const { data: myBooks = [], isLoading: myBooksLoading } = useQuery({
  queryKey: ["my-books"],
  queryFn: async () => {
    const res = await axiosSecure.get("/my-books?limit=5");
    return res.data;
  },
  enabled: !!user,
});


  if (isLoading || myBooksLoading) return <Loading />;

  return (
    <div className="space-y-8">

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <StatCard title="Total Books" value={stats.totalBooks} />
        <StatCard title="My Books" value={stats.myBooks} />
        <StatCard title="Avg Rating" value={stats.avgRating?.toFixed(1)} />
        <StatCard title="Added This Month" value={stats.thisMonth} />
      </div>


      <div className="flex flex-wrap gap-4">
        <Link to="/dashboard/add-book" className="btn btn-primary">
          <LiaBookSolid size={16} />  Add Book
        </Link>
        <Link to="/all-books" className="btn btn-outline">
          <BiBookAdd size={16} /> View All Books
        </Link>
      </div>

      {/* 🔹 My Books */}
      <div className="card bg-base-100 shadow">
        <div className="card-body">
          <h3 className="text-xl font-semibold mb-4">
            My Recent Books
          </h3>

          {myBooks.length === 0 ? (
            <p className="text-gray-500">No books added yet.</p>
          ) : (
            <table className="table table-zebra w-full">
  <thead className="bg-primary text-white">
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
    {myBooks.length === 0 ? (
      <tr>
        <td colSpan="7" className="text-center py-8">
          No books found
        </td>
      </tr>
    ) : (
      myBooks.map((book, index) => (
        <TableRow
          key={book._id}
          book={book}
          index={index + 1}
        />
      ))
    )}
  </tbody>
</table>

          )}
        </div>
      </div>
    </div>
  );
};

export default DashboardHome;

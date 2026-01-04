import React from "react";
import useAxios from "../hooks/useAxios";
import { useQuery } from "@tanstack/react-query";
import { Link, useNavigate, useParams } from "react-router";
import Loading from "../components/Loading";
import ErrorPage from "../components/ErrorPage";
import { MdOutlineKeyboardDoubleArrowLeft } from "react-icons/md";
import useAuth from "../hooks/useAuth";
import Swal from "sweetalert2";
import useAxiosSecure from "../hooks/useAxiosSecure";

const BookDetails = () => {
  const axiosInstance = useAxios();
  const axiosSecure = useAxiosSecure();
  const { id } = useParams();
  const { user } = useAuth();
  const navigate = useNavigate();

  const {
    data: book = {},
    isLoading,
    error,
  } = useQuery({
    queryKey: ["book", id],
    queryFn: async () => {
      const res = await axiosInstance.get(`/books/${id}`);
      return res.data;
    },
  });

  const {
    title,
    author,
    genre,
    rating,
    summary,
    coverImage,
    userEmail,
    created_at,
  } = book;



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
        axiosSecure
          .delete(`/books/${id}`)
          .then((data) => {
            if (data.data.deletedCount) {
              Swal.fire({
                title: "Deleted!",
                text: "Your Book has been deleted.",
                icon: "success",
              });
              navigate('/dashboard/my-books')
            }
          })
          .catch((error) => {
            if (error) {
              Swal.fire({
                position: "center",
                icon: "error",
                title: "Failed to delete book",
                showConfirmButton: false,
                timer: 1500,
              });
            }
          });
      }
    });
  };

  if (isLoading) {
    return <Loading />;
  }
  if (error) {
    return <ErrorPage />;
  }

  return (
    <section className="max-w-6xl mx-auto px-6 py-12">
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10 items-start">
        {/* LEFT: Cover Image */}
        <div className="w-full">
          <img
            src={coverImage}
            alt={title}
            className="rounded-2xl shadow-xl w-full object-cover"
          />
        </div>

        {/* RIGHT: Book Info */}
        <div className="col-span-1 lg:col-span-2">
          <Link
            to={location.state || "/all-books"}
            className="py-2 px-3 font-medium btn rounded-none btn-outline btn-primary mb-4"
          >
            <MdOutlineKeyboardDoubleArrowLeft size={20} />
            Go Back
          </Link>
          <h1 className="text-4xl text-primary font-bold mb-3">{title}</h1>

          <div className="space-y-2 text-lg text-gray-700">
            <p className="text-accent">
              <span className="font-semibold">Author:</span> {author}
            </p>
            <p className="text-accent">
              <span className="font-semibold">Genre:</span> {genre}
            </p>

            <p className="flex items-center gap-2 text-accent">
              <span className="font-semibold">Rating:</span>
              <span className="badge badge-primary text-lg p-3">
                {rating} ⭐
              </span>
            </p>

            <p className="text-accent">
              <span className="font-semibold">Added By:</span> {userEmail}
            </p>

            <p className="text-accent">
              <span className="font-semibold">Created At:</span>{" "}
              {new Date(created_at).toLocaleDateString()}
            </p>
          </div>

          <hr className="my-6" />

          {/* Summary Section */}
          <h2 className="text-2xl font-semibold mb-3 text-primary">Summary</h2>
          <p className="leading-relaxed text-lg text-accent ">{summary}</p>

          {/* Buttons */}
          <div className="mt-8 flex gap-4">
            <button className="py-2 px-3 font-medium btn rounded-none bg-primary cursor-pointer text-white">
              Read Book
            </button>
            <button className="py-2 px-3 font-medium btn rounded-none btn-outline btn-primary">
              Add to Wishlist
            </button>
          </div>
          {user && (
            <div className="mt-4 flex gap-4">
              <Link
                state={location.pathname}
                className="py-2 px-3 font-medium btn rounded-none bg-primary cursor-pointer text-white"
                data-tip="Edit Book"
                to={`/update-book/${book?._id}`}
              >
                Update
              </Link>
              <button
                onClick={() => bookDeleteHandler(book?._id)}
                className="py-2 px-3 font-medium btn rounded-none btn-outline btn-error hover:text-white"
              >
                Delete
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default BookDetails;

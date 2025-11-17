import React, { useEffect, useState } from "react";
import useFetchData from "../hooks/useFetchData";
import { Link, useLocation, useNavigate, useParams } from "react-router";
import Loading from "../components/Loading";
import ErrorPage from "../components/ErrorPage";
import { MdOutlineKeyboardDoubleArrowLeft } from "react-icons/md";
import { IoMdSend } from "react-icons/io";
import useAuth from "../hooks/useAuth";
import useAxiosSecure from "../hooks/useAxiosSecure";
import toast from "react-hot-toast";
import useFetchDataSecure from "../hooks/useFetchDataSecure";
import Swal from "sweetalert2";

const BookDetails = () => {
  const axiosSecure = useAxiosSecure();
  const location = useLocation();
  const navigate = useNavigate();
  const { id } = useParams();
  const { user, userLoading } = useAuth();
  const { data: book, loading, error } = useFetchData(`/books/${id}`);
  const {
    data: comments,
    loading: commentsLoading,
    error: commentError,
  } = useFetchDataSecure(`/comments/${id}`);
  const [allComments, setAllComments] = useState([]);
  useEffect(() => {
    if (comments) {
      setAllComments(comments);
    }
  }, [comments]);

  const {
    title,
    author,
    genre,
    rating,
    summary,
    coverImage,
    userEmail,
    created_at,
  } = book || {};

  const handleCommentSubmit = (e) => {
    e.preventDefault();
    const newComment = {
      userName: user.displayName,
      userPhoto: user.photoURL,
      userComment: e.target.comment.value,
      bookId: id,
      created_at: new Date().toISOString(),
    };
    axiosSecure
      .post("comments", newComment)
      .then((data) => {
        if (data.data.insertedId) {
          newComment._id = data.data.insertedId
          toast.success("Commented successfully!");
          e.target.reset();
          setAllComments([newComment, ...comments]);
        }
      })
      .catch(() => toast.error("Failed to comment!"));
  };

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
        // fetch(`http://localhost:3000/books/${id}`, {
        //   method: "DELETE",
        // })
        //   .then((res) => res.json())
        axiosSecure
          .delete(`/books/${id}`)
          .then((data) => {
            if (data.data.deletedCount) {
              Swal.fire({
                title: "Deleted!",
                text: "Your Book has been deleted.",
                icon: "success",
              });
              navigate(location.state ? location.state : "/all-books");
            }
          })
          .catch((error) => {
            if (error) {
              toast.error("Failed to Delete!");
            }
          });
      }
    });
  };

  if (loading || commentsLoading || userLoading) {
    return <Loading />;
  }
  if (error || commentError) {
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
          {user.email === userEmail && (
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
      {/* comment section */}
      <div>
        <div className=" margin-top">
          <form
            onSubmit={handleCommentSubmit}
            className="w-full  mx-auto mt-4 flex gap-2"
          >
            <input
              type="text"
              name="comment"
              placeholder="Write a comment..."
              className="flex-1 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary transition"
            />
            <button type="submit" className="btn btn-primary">
              <IoMdSend size={20} />
            </button>
          </form>
        </div>
        {/* all comments */}
        <div className="max-h-96 overflow-y-auto mt-4">
          {allComments.map((comment) => (
            <div key={comment._id} className=" mt-4 flex gap-4 bg-base-100 p-2">
              <img
                src={comment.userPhoto}
                className="size-12 object-cover"
                alt={comment.userName}
              />
              <div>
                <h4 className="font-semibold text-primary">
                  {comment.userName}
                </h4>
                <p className="text-accent">{comment.userComment}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BookDetails;

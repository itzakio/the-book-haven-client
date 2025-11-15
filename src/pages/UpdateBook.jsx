import React, { useState } from "react";
import toast from "react-hot-toast";
import useAuth from "../hooks/useAuth";
import Particles from "../components/Particles";
import useFetchData from "../hooks/useFetchData";
import { useParams } from "react-router";
import Loading from "../components/Loading";
import ErrorPage from "../components/ErrorPage";

const UpdateBook = () => {
  const [loading, setLoading] = useState(false);
  const {id} = useParams();
  const {data:book, loading:dataLoading, error} = useFetchData(`/books/${id}`);
  const { user } = useAuth();

  const updateBookHandler = (e) => {
    e.preventDefault();
    setLoading(true);

    const form = e.target;
    const newBook = {
      title: form.title.value,
      author: form.author.value,
      genre: form.genre.value,
      rating: form.rating.value,
      summary: form.summary.value,
      coverImage: form.coverImage.value,
      userEmail: user.email,
      created_at: new Date().toISOString(),
    };

    fetch("http://localhost:3000/books", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(newBook),
    })
      .then((res) => res.json())
      .then((data) => {
        toast.success("Book added successfully!");
        form.reset();
        console.log("after book added", data);
      })
      .catch(() => toast.error("Failed to add book!"))
      .finally(() => setLoading(false));
  };

  if (dataLoading) {
    return <Loading />;
  }
  if (error) {
    return <ErrorPage />;
  }

  return (
    <div className="relative">
      <div
        className="absolute top-0 -z-999"
        style={{ width: "100%", height: "100%" }}
      >
        <Particles
          particleColors={["#ffffff", "#ffffff"]}
          particleCount={200}
          particleSpread={10}
          speed={0.1}
          particleBaseSize={100}
          moveParticlesOnHover={true}
          alphaParticles={false}
          disableRotation={false}
        />
      </div>
      <div className="max-w-2xl mx-auto p-6 margin-y ">
        <h2 className="headline margin-bottom">Update Your Book Info</h2>

        <form onSubmit={updateBookHandler} className="space-y-4 text-primary z-999">
          {/* Title */}
          <div className="form-control">
            <label className="text-base label font-semibold">Book Title</label>
            <input
              type="text"
              name="title"
              defaultValue={book.title}
              required
              placeholder="Enter book title"
              className="input bg-[#E8F0FE] w-full placeholder:text-accent"
            />
          </div>

          {/* Author */}
          <div className="form-control">
            <label className="text-base label font-semibold">Author</label>
            <input
              type="text"
              name="author"
              defaultValue={book.author}
              required
              placeholder="Enter author's name"
              className="input bg-[#E8F0FE] w-full placeholder:text-accent"
            />
          </div>

          {/* Genre */}
          <div className="form-control">
            <label className="text-base label font-semibold">Genre</label>
            <input
              type="text"
              name="genre"
              defaultValue={book.genre}
              required
              placeholder="Fantasy, Sci-Fi, Romance..."
              className="input bg-[#E8F0FE] w-full placeholder:text-accent"
            />
          </div>

          {/* Rating */}
          <div className="form-control">
            <label className="text-base label font-semibold">
              Rating (1–5)
            </label>
            <input
              type="number"
              name="rating"
              defaultValue={book.rating}
              step="0.1"
              min="0"
              max="5"
              placeholder="Rating (e.g. 4.3)"
              className="input bg-[#E8F0FE] w-full placeholder:text-accent"
            />
          </div>

          {/* Summary */}
          <div className="form-control">
            <label className="text-base label font-semibold ">Summary</label>
            <textarea
              name="summary"
              defaultValue={book.summary}
              required
              placeholder="Write a short description..."
              className="textarea bg-[#E8F0FE] w-full h-28 placeholder:text-accent"
            ></textarea>
          </div>

          {/* Cover Image */}
          <div className="form-control">
            <label className="text-base label font-semibold">
              Cover Image URL
            </label>
            <input
              type="text"
              name="coverImage"
              defaultValue={book.coverImage}
              required
              placeholder="Image URL"
              className="input bg-[#E8F0FE] w-full placeholder:text-accent"
            />
          </div>

          {/* Submit Button */}
          <div className="form-control mt-3">
            <button
              className="btn btn-primary w-full"
              type="submit"
              disabled={loading}
            >
              {loading ? (
                <span className="loading loading-spinner"></span>
              ) : (
                "Update Book"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateBook;

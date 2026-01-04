import React, { useState } from "react";
import toast from "react-hot-toast";
import Particles from "../components/Particles";
import useFetchData from "../hooks/useFetchData";
import { useLocation, useNavigate, useParams } from "react-router";
import Loading from "../components/Loading";
import ErrorPage from "../components/ErrorPage";
import useAxiosSecure from "../hooks/useAxiosSecure";
import axios from "axios";

const UpdateBook = () => {
  const axiosSecure = useAxiosSecure();
  const [loading, setLoading] = useState(false);
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();

  const {
    data: book,
    loading: dataLoading,
    error,
  } = useFetchData(`/books/${id}`);

  const updateBookHandler = async (e) => {
    e.preventDefault();
    setLoading(true);

    const form = e.target;
    let coverImageUrl = book.coverImage;

    const newImage = form.coverImage.files[0];

    try {
      if (newImage) {
        if (!newImage.type.startsWith("image/")) {
          toast.error("Only image files are allowed");
          setLoading(false);
          return;
        }

        const formData = new FormData();
        formData.append("image", newImage);

        const imgRes = await axios.post(
          `https://api.imgbb.com/1/upload?key=${
            import.meta.env.VITE_image_host_key
          }`,
          formData
        );

        coverImageUrl = imgRes.data.data.url;
      }

      const updatedBook = {
        title: form.title.value,
        author: form.author.value,
        genre: form.genre.value,
        rating: form.rating.value,
        summary: form.summary.value,
        coverImage: coverImageUrl,
      };

      const res = await axiosSecure.put(`/book/${id}`, updatedBook);

      if (res.data.modifiedCount) {
        toast.success("Book updated successfully!");
        navigate(`/book-details/${id}`, { state: location.state });
      }
    } catch (error) {
      toast.error(error.message || "Failed to update book!");
    } finally {
      setLoading(false);
    }
  };

  if (dataLoading) return <Loading />;
  if (error) return <ErrorPage />;

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

      <div className="max-w-2xl mx-auto p-6 margin-y">
        <h2 className="headline margin-bottom">Update Your Book Info</h2>

        <form onSubmit={updateBookHandler} className="space-y-4 text-primary">
          {/* Title */}
          <div className="flex flex-col">
            <label className="label font-semibold">Book Title</label>
            <input
              type="text"
              name="title"
              defaultValue={book.title}
              required
              className="input bg-[#E8F0FE] w-full"
            />
          </div>

          {/* Author */}
          <div className="flex flex-col">
            <label className="label font-semibold">Author</label>
            <input
              type="text"
              name="author"
              defaultValue={book.author}
              required
              className="input bg-[#E8F0FE] w-full"
            />
          </div>

          {/* Genre */}
          <div className="flex flex-col">
            <label className="label font-semibold">Genre</label>
            <input
              type="text"
              name="genre"
              defaultValue={book.genre}
              required
              className="input bg-[#E8F0FE] w-full"
            />
          </div>

          {/* Rating */}
          <div className="flex flex-col">
            <label className="label font-semibold">Rating (1–5)</label>
            <input
              type="number"
              step="0.1"
              min="0"
              max="5"
              name="rating"
              defaultValue={book.rating}
              className="input bg-[#E8F0FE] w-full"
            />
          </div>

          {/* Summary */}
          <div className="flex flex-col">
            <label className="label font-semibold">Summary</label>
            <textarea
              name="summary"
              defaultValue={book.summary}
              required
              className="textarea bg-[#E8F0FE] h-28 w-full"
            />
          </div>

          {/* Cover Image */}
          <div className="flex flex-col w-full">
            <label className="label font-semibold">
              Cover Image (optional)
            </label>
            <input
              type="file"
              name="coverImage"
              className="file-input w-full"
            />
            <p className="text-xs mt-1 text-gray-500">
              Leave empty to keep existing image
            </p>
          </div>

          {/* Submit */}
          <button className="btn btn-primary w-full" disabled={loading}>
            {loading ? (
              <span className="loading loading-spinner"></span>
            ) : (
              "Update Book"
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default UpdateBook;

import React, { useState } from "react";
import toast from "react-hot-toast";
import useAuth from "../hooks/useAuth";
import Particles from "../components/Particles";
import useAxiosSecure from "../hooks/useAxiosSecure";
import axios from "axios";

const AddBook = () => {
  const [loading, setLoading] = useState(false);
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const handleAddBook = async (e) => {
    e.preventDefault();
    setLoading(true);

    const form = e.target;
    const photo = form.coverImage.files[0];

    // image validation
    if (!photo) {
      toast.error("Please select a profile image");
      return;
    }

    if (!photo.type.startsWith("image/")) {
      toast.error("Only image files are allowed");
      return;
    }

    try {
      // upload image
      const formData = new FormData();
      formData.append("image", photo);

      const imageRes = await axios.post(
        `https://api.imgbb.com/1/upload?key=${
          import.meta.env.VITE_image_host_key
        }`,
        formData
      );

      const coverImage = imageRes.data.data.url;

      const newBook = {
        title: form.title.value,
        author: form.author.value,
        genre: form.genre.value,
        rating: form.rating.value,
        summary: form.summary.value,
        coverImage,
        userEmail: user.email,
        created_at: new Date().toISOString(),
      };

      axiosSecure
        .post("/books", newBook)
        .then((data) => {
          if (data.data.insertedId) {
            toast.success("Book added successfully!");
            form.reset();
          }
        })
        .catch(() => toast.error("Failed to add book!"))
        .finally(() => setLoading(false));
    } catch (error) {
      toast.error(error.message || "Something went wrong. Please try again.");
    }
  };

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
        <h2 className="headline margin-bottom">Add a New Book</h2>

        <form onSubmit={handleAddBook} className="space-y-4 text-primary z-999">
          {/* Title */}
          <div className="form-control">
            <label className="text-base label font-semibold">Book Title</label>
            <input
              type="text"
              name="title"
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
              required
              placeholder="Write a short description..."
              className="textarea bg-[#E8F0FE] w-full h-28 placeholder:text-accent"
            ></textarea>
          </div>

          {/* Cover Image */}
          <div className="form-control">
            <label className="text-base label font-semibold">
              Cover Image
            </label>
            {/* <input
              type="text"
              name="coverImage"
              required
              placeholder="Image URL"
              className="input bg-[#E8F0FE] w-full placeholder:text-accent"
            /> */}
            <input
              name="coverImage"
              type="file"
              className="file-input w-full placeholder:text-accent"
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
                "Add Book"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddBook;

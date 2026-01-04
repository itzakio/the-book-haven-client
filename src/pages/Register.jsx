import React, { useState } from "react";
import { FaGoogle } from "react-icons/fa";
import { HiEye, HiEyeOff } from "react-icons/hi";
import { Link, useLocation, useNavigate } from "react-router";
import Particles from "../components/Particles";
import useAuth from "../hooks/useAuth";
import toast from "react-hot-toast";
import axios from "axios";
import useAxiosSecure from "../hooks/useAxiosSecure";

const Register = () => {
  const { createUser, setUser, updateUser, googleSignIn } = useAuth();
  const [show, setShow] = useState(false);
  const [err, setErr] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  const axiosSecure = useAxiosSecure();

  const registerHandler = async (e) => {
    e.preventDefault();
    const form = e.target;

    const name = form.name.value || "User";
    const email = form.email.value;
    const password = form.password.value;
    const profileImage = form.photo.files[0];

    // image validation
    if (!profileImage) {
      toast.error("Please select a profile image");
      return;
    }

    if (!profileImage.type.startsWith("image/")) {
      toast.error("Only image files are allowed");
      return;
    }

    try {
      // create firebase user
      const result = await createUser(email, password);
      const user = result.user;

      // upload image
      const formData = new FormData();
      formData.append("image", profileImage);

      const imageRes = await axios.post(
        `https://api.imgbb.com/1/upload?key=${
          import.meta.env.VITE_image_host_key
        }`,
        formData
      );

      const photoURL = imageRes.data.data.url;

      // update firebase profile
      await updateUser({ displayName: name, photoURL });
      setUser({ ...user, displayName: name, photoURL });

      // save user to DB
      await axiosSecure.post("/users", {
        name,
        email,
        photoURL,
      });

      form.reset();
      toast.success("SignUp Successful!");
      navigate(location.state || "/");
    } catch (error) {
      toast.error(error.message || "Something went wrong");
    }
  };

  const googleSignInHandler = async () => {
    try {
      const result = await googleSignIn();
      const user = result.user;

      setUser(user);
      toast.success("Sign in successful");

      const user_info = {
        email: user.email,
        name: user.displayName,
        photoURL: user.photoURL,
      };

      await axiosSecure.post("/users", user_info);

      navigate(location.state || "/");
    } catch (error) {
      toast.error(error.message || "Something went wrong. Please try again.");
    }
  };

  return (
    <div className="p-4 relative">
      <div className="absolute top-0" style={{ width: "98%", height: "100%" }}>
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

      <div className="card bg-color-secondary text-primary w-full margin-y max-w-sm shrink-0 mx-auto">
        <div className="card-body">
          <form onSubmit={registerHandler} >
            <h3 className="text-3xl font-bold text-center">Register Now</h3>
            <fieldset className="fieldset ">
              {/* name */}
              <label className="label text-base font-semibold">Name</label>
              <input
                name="name"
                type="text"
                className="input w-full placeholder:text-accent"
                placeholder="Enter Your Name"
              />
              {/* photoUrl */}
              <label className="label text-base font-semibold">Photo</label>
              <input
                name="photo"
                type="file"
                className="file-input w-full placeholder:text-accent"
                placeholder="Enter Your Photo URL"
              />
              {/* email */}
              <label className="label text-base  font-semibold">Email</label>
              <input
                name="email"
                type="email"
                className="input w-full placeholder:text-accent"
                required
                placeholder="Enter Your Email"
              />
              {/* password */}
              <label className="label text-base font-semibold">Password</label>
              <div className="relative">
                <input
                  name="password"
                  type={show ? "text" : "password"}
                  className="input w-full placeholder:text-accent"
                  required
                  placeholder="Enter Your Password"
                />
                <p
                  onClick={() => setShow(!show)}
                  className="absolute right-4 top-2.5 z-99"
                >
                  {show ? <HiEye size={20} /> : <HiEyeOff size={20} />}
                </p>
              </div>
              <div className="mt-2 text-red-700">{err}</div>
              <div className="flex flex-col items-center mt-2">
                <button
                  type="submit"
                  className="btn bg-primary w-full text-white"
                >
                  Register
                </button>
              </div>
            </fieldset>
          </form>

          <p className="text-center text-base">or</p>
          <div className="flex flex-col items-center">
            <button
              onClick={googleSignInHandler}
              className="flex items-center justify-center gap-1 cursor-pointer active:scale-98  w-full btn bg-primary text-white"
            >
              <FaGoogle size={16} /> <span>Login with Google</span>
            </button>
          </div>
          <p className="mt-2 text-center text-base">
            Already have an account?{" "}
            <Link to="/login" className="hover:underline text-primary">
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;

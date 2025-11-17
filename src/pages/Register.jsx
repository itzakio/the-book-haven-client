import React, { useState } from "react";
import { FaGoogle } from "react-icons/fa";
import { HiEye, HiEyeOff } from "react-icons/hi";
import { Link, useLocation, useNavigate } from "react-router";
import Particles from "../components/Particles";
import useAuth from "../hooks/useAuth";
import toast from "react-hot-toast";

const Register = () => {
  const { createUser, setUser, updateUser, googleSignIn } = useAuth();
  const [show, setShow] = useState(false);
  const [err, setErr] = useState("");
  const navigate = useNavigate();
  const location = useLocation();


  const registerHandler = (e) => {
    e.preventDefault();
     const form = e.target;
    const name = form.name.value?form.name.value:"User";
    const photo = form.photo.value;
    const email = form.email.value;
    const password = form.password.value;

    const regex = /^(?=.*[a-z])(?=.*[A-Z]).{6,}$/;

    if (!regex.test(password)) {
      if (password.length < 6) {
        setErr("Password must be at least 6 characters long.");
        return;
      }
      if (!/[A-Z]/.test(password)) {
        setErr("Password must contain at least one uppercase letter (A–Z).");
        return;
      }
      if (!/[a-z]/.test(password)) {
        setErr("Password must contain at least one lowercase letter (a–z).");
        return;
      }
    }

    setErr("");

    createUser(email, password)
      .then((result) => {
        const user = result.user;
        updateUser({ displayName: name, photoURL: photo })
          .then(() => {
            form.reset();
            setUser({ ...user, displayName: name, photoURL: photo });
          })
          .catch((error) => {
            setUser(user);
            toast.error(
              error.message || "Something went wrong. Please try again."
            );
          });
        toast.success("SignUp Successful!");
        navigate(`${location.state ? location.state : "/"}`);
      })
      .catch((error) => {
        if (error.code === "auth/email-already-in-use") {
          toast.error(
            "This email is already registered. Try logging in instead."
          );
        } else if (error.code === "auth/invalid-email") {
          toast.error("Invalid email address. Please check and try again.");
        } else if (error.code === "auth/weak-password") {
          toast.error(
            "Password is too weak. Use at least 6 characters with a upperCase and a lowerCase letters and numbers."
          );
        } else if (error.code === "auth/missing-password") {
          toast.error("Please enter a password before proceeding.");
        } else if (error.code === "auth/user-not-found") {
          toast.error(
            "No account found with this email. Please sign up first."
          );
        } else if (error.code === "auth/wrong-password") {
          toast.error("Incorrect password. Please try again.");
        } else if (error.code === "auth/too-many-requests") {
          toast.error("Too many failed attempts. Please try again later.");
        } else if (error.code === "auth/network-request-failed") {
          toast.error("Network error. Please check your internet connection.");
        } else if (error.code === "auth/popup-closed-by-user") {
          toast.error("Sign-in popup was closed before completion.");
        } else if (error.code === "auth/operation-not-allowed") {
          toast.error("This sign-in method is not enabled in Firebase.");
        } else {
          toast.error(
            error.message || "Something went wrong. Please try again."
          );
        }
      });
  };

  const googleSignInHandler = (e) => {
    e.preventDefault();
    googleSignIn()
      .then((result) => {
        const user = result.user;
        setUser(user);
        toast.success("SignUp successfully");
        navigate(`${location.state ? location.state : "/"}`);
      })
      .catch((error) => {
        toast.error(error.message || "Something went wrong. Please try again.");
      });
  };
  return (
    <div className="p-4 relative">
      <div
        className="absolute top-0"
        style={{ width: "98%", height: "100%" }}
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

      <div className="card bg-color-secondary text-primary w-full margin-y max-w-sm shrink-0 mx-auto">
        <form onSubmit={registerHandler} className="card-body">
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
            <label className="label text-base font-semibold">Photo URL</label>
            <input
              name="photo"
              type="text"
              className="input w-full placeholder:text-accent"
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
          </fieldset>
        </form>
      </div>
    </div>
  );
};

export default Register;

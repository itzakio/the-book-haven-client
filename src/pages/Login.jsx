import React, { useState } from "react";
import { FaGoogle } from "react-icons/fa";
import { HiEye, HiEyeOff } from "react-icons/hi";
import { Link, useLocation, useNavigate } from "react-router";
import Particles from "../components/Particles";
import useAuth from "../hooks/useAuth";
import toast from "react-hot-toast";

const Login = () => {
  const { logIn, googleSignIn, setUser } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [show, setShow] = useState(false);

  const loginHandler = (e) => {
    e.preventDefault();
    const form = e.target;
    const email = form.email.value;
    const password = form.password.value;
    logIn(email, password)
      .then((result) => {
        const user = result.user;
        setUser(user);
        toast.success("Logged In Successfully!");
        form.reset();
        navigate(`${location.state ? location.state : "/"}`);
      })
      .catch((error) => {
        if (error.code === "auth/invalid-email") {
          toast.error("Invalid email address. Please check and try again.");
        } else if (error.code === "auth/missing-password") {
          toast.error("Please enter your password.");
        } else if (error.code === "auth/user-not-found") {
          toast.error("No account found with this email.");
        } else if (error.code === "auth/wrong-password") {
          toast.error("Incorrect password. Please try again.");
        } else if (error.code === "auth/invalid-credential") {
          toast.error("Incorrect email or password. Please try again.");
        } else if (error.code === "auth/too-many-requests") {
          toast.error("Too many attempts. Try again later.");
        } else if (error.code === "auth/network-request-failed") {
          toast.error("Network error. Check your internet connection.");
        } else if (error.code === "auth/popup-closed-by-user") {
          toast.error("Popup closed before completion.");
        } else if (error.code === "auth/operation-not-allowed") {
          toast.error("This sign-in method is disabled.");
        } else {
          toast.error(
            error.message || "Something went wrong. Please try again."
          );
        }
      });
  };

  const googleSignInHandler = () => {
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
    <div className="p-4 relative ">
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

      <div className=" card text-primary w-full margin-y max-w-sm shrink-0 mx-auto">
        <div className="card-body">
          <form onSubmit={loginHandler}>
            <h3 className="text-3xl font-bold text-center">Login Now</h3>
            <fieldset className="fieldset ">
              {/* email */}
              <label className="text-base label font-semibold">Email</label>
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
              <div className="mt-2">
                <Link>Forgot password?</Link>
              </div>
              <div className="flex flex-col items-center">
                <button
                  type="submit"
                  className="btn bg-primary w-full text-white"
                >
                  Login
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
            Don't have an account?{" "}
            <Link
              state={location.state}
              to="/register"
              className="hover:underline text-primary "
            >
              Register
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;

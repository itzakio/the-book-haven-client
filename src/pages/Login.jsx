import React, { useState } from "react";
import { FaGoogle } from "react-icons/fa";
import { HiEye, HiEyeOff } from "react-icons/hi";
import { Link, useLocation, useNavigate } from "react-router";
import Particles from "../components/Particles";
import useAuth from "../hooks/useAuth";
import toast from "react-hot-toast";
import useAxiosSecure from "../hooks/useAxiosSecure";

const Login = () => {
  const { logIn, googleSignIn, setUser } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const axiosSecure = useAxiosSecure();


  const [show, setShow] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");


  const fillDemoCredentials = () => {
    setEmail("akio@gmail.com");
    setPassword("Akio@2001");
  };


  const loginHandler = (e) => {
    e.preventDefault();

    logIn(email, password)
      .then((result) => {
        const user = result.user;
        setUser(user);
        toast.success("Logged In Successfully!");
        setEmail("");
        setPassword("");
        navigate(location.state || "/");
      })
      .catch((error) => {
        if (error.code === "auth/invalid-email") {
          toast.error("Invalid email address.");
        } else if (error.code === "auth/user-not-found") {
          toast.error("No account found with this email.");
        } else if (error.code === "auth/wrong-password") {
          toast.error("Incorrect password.");
        } else if (error.code === "auth/too-many-requests") {
          toast.error("Too many attempts. Try again later.");
        } else {
          toast.error(error.message || "Login failed.");
        }
      });
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
      toast.error(error.message || "Something went wrong.");
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

      <div className="card text-primary w-full margin-y max-w-sm shrink-0 mx-auto">
        <div className="card-body">
          <form onSubmit={loginHandler}>
            <h3 className="text-3xl font-bold text-center mb-3">
              Login Now
            </h3>

            {/* DEMO USER BUTTON */}
            <button
              type="button"
              onClick={fillDemoCredentials}
              className="btn btn-outline btn-primary w-full mb-4"
            >
              👤 Use Demo User
            </button>

            <fieldset className="fieldset">
              {/* Email */}
              <label className="label font-semibold">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="input w-full placeholder:text-accent"
                placeholder="Enter Your Email"
                required
              />

              {/* Password */}
              <label className="label font-semibold">Password</label>
              <div className="relative">
                <input
                  type={show ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="input w-full placeholder:text-accent"
                  placeholder="Enter Your Password"
                  required
                />
                <p
                  onClick={() => setShow(!show)}
                  className="absolute right-4 top-2.5 cursor-pointer"
                >
                  {show ? <HiEye size={20} /> : <HiEyeOff size={20} />}
                </p>
              </div>

              <div className="mt-2">
                <Link className="hover:underline">Forgot password?</Link>
              </div>

              <button
                type="submit"
                className="btn bg-primary w-full text-white mt-3"
              >
                Login
              </button>
            </fieldset>
          </form>

          <p className="text-center text-base my-3">or</p>

          <button
            onClick={googleSignInHandler}
            className="flex items-center justify-center gap-2 w-full btn bg-primary text-white"
          >
            <FaGoogle size={16} /> Login with Google
          </button>

          <p className="mt-3 text-center text-base">
            Don't have an account?{" "}
            <Link
              state={location.state}
              to="/register"
              className="hover:underline text-primary"
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

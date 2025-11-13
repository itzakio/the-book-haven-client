import React, { useState } from "react";
import { FaGoogle } from "react-icons/fa";
import { HiEye, HiEyeOff } from "react-icons/hi";
import { Link } from "react-router";

const Login = () => {
    const [show, setShow] = useState(false);
  return (
    <div className="p-4 ">




      <div className=" card text-primary w-full margin-y max-w-sm shrink-0 shadow-2xl md:mx-auto">
        <form  className="card-body">
          <h3 className="text-3xl font-bold text-center">Login Now</h3>
          <fieldset className="fieldset ">
            {/* email */}
            <label className="text-base label font-semibold">
              Email
            </label>
            <input
              name="email"
              type="email"
              className="input w-full placeholder:text-accent"
              required
              placeholder="Enter Your Email"
            />
            {/* password */}
            <label className="label text-base font-semibold">
              Password
            </label>
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
              <Link
               
              >
                Forgot password?
              </Link>
            </div>
            <div className="flex flex-col items-center">
              <button
                type="submit"
                className="btn bg-primary w-full text-white"
              >
                Login
              </button>
            </div>
            <p className="text-center text-base">or</p>
            <div className="flex flex-col items-center">
              <button
                
                className="flex items-center justify-center gap-1 cursor-pointer active:scale-98  w-full btn bg-primary text-white"
              >
                <FaGoogle  size={16} /> <span>Login with Google</span>
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
          </fieldset>
        </form>
      </div>
    </div>
  );
};

export default Login;

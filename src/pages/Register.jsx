import React, { useState } from "react";
import { FaGoogle } from "react-icons/fa";
import { HiEye, HiEyeOff } from "react-icons/hi";
import { Link } from "react-router";
import Particles from "../components/Particles";

const Register = () => {
  const [show, setShow] = useState(false);
  return (
    <div  className="p-4 relative">
        <div className="absolute top-0" style={{ width: "100%", height: "600px" }}>
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


      <div className="card bg-color-secondary text-primary w-full margin-y max-w-sm shrink-0  md:mx-auto">
        <form className="card-body">
          <h3 className="text-3xl font-bold text-center">Register Now</h3>
          <fieldset className="fieldset ">
            {/* name */}
            <label className="label text-base font-semibold">
              Name
            </label>
            <input
              name="name"
              type="text"
              className="input w-full placeholder:text-accent"
              placeholder="Enter Your Name"
            />
            {/* photoUrl */}
            <label className="label text-base font-semibold">
              Photo URL
            </label>
            <input
              name="photo"
              type="text"
              className="input w-full placeholder:text-accent"
              placeholder="Enter Your Photo URL"
            />
            {/* email */}
            <label className="label text-base  font-semibold">
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
            {/* <div className="mt-2 text-red-700">{err}</div> */}
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
              <button className="flex items-center justify-center gap-1 cursor-pointer active:scale-98  w-full btn bg-primary text-white">
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

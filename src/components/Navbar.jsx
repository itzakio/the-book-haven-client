import { useEffect, useState } from "react";
import { BiSolidBookAdd } from "react-icons/bi";
import { CgProfile } from "react-icons/cg";
import { MdHome } from "react-icons/md";
import { PiAddressBookFill } from "react-icons/pi";
import { RiBookShelfFill, RiMenuFill } from "react-icons/ri";
import { TiHome } from "react-icons/ti";
import { Link, NavLink } from "react-router";
import logo from "/logo.png";
import { RxCrossCircled } from "react-icons/rx";
import useAuth from "../hooks/useAuth";
import toast from "react-hot-toast";

const Navbar = () => {
  const { user, logOut } = useAuth();
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");
  const [show, setShow] = useState(false);
  const logOutHandler = () => {
    logOut()
      .then(() => {
        toast.success("Logged Out Successfully");
      })
      .catch((error) => {
        toast.error(error.message || "Something went wrong. Please try again.");
      });
  };

  useEffect(() => {
    const html = document.querySelector("html");
    html.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  const themeHandler = (checked) => {
    setTheme(checked ? "dark" : "light");
  };

  const links = (
    <>
      <NavLink className="navLinks" to="/">
        <MdHome size={20} />
        Home
      </NavLink>
      <NavLink className="navLinks" to="/all-books">
        <RiBookShelfFill size={20} /> All Books
      </NavLink>
      <NavLink className="navLinks" to="/add-book">
        <BiSolidBookAdd size={20} /> Add Book
      </NavLink>
      <NavLink className="navLinks" to="/my-books">
        <PiAddressBookFill size={20} /> My Books
      </NavLink>
    </>
  );
  return (
    <nav className="bg-base-100 shadow-sm">
      <div className="navbar z-999  max-w-[1440px] mx-auto px-4 ">
        <div className="navbar-start">
          <div className="flex gap-1 items-center">
            <img className="size-12" src={logo} alt="" />
            <div className="hidden md:block">
              <h3 className="text-xl text-primary font-bold signika-font">
                The Book Haven
              </h3>
              <p className="text-xs text-gray-500">
                Explore Knowledge. Anytime. Anywhere.
              </p>
            </div>
          </div>
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1 hidden xl:flex signika-font ">
            {links}
            {/* main links */}
          </ul>
        </div>

        <div className=" navbar-end flex items-center gap-2">
          <div className="hidden lg:flex items-center gap-2">
            <div>
              {/* theme toggle button */}
              <label className="toggle text-base-content">
                <input
                  onClick={(e) => themeHandler(e.target.checked)}
                  defaultChecked={theme === "dark" ? true : false}
                  type="checkbox"
                  value="synthwave"
                  className="theme-controller"
                />

                <svg
                  aria-label="sun"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                >
                  <g
                    strokeLinejoin="round"
                    strokeLinecap="round"
                    strokeWidth="2"
                    fill="none"
                    stroke="currentColor"
                  >
                    <circle cx="12" cy="12" r="4"></circle>
                    <path d="M12 2v2"></path>
                    <path d="M12 20v2"></path>
                    <path d="m4.93 4.93 1.41 1.41"></path>
                    <path d="m17.66 17.66 1.41 1.41"></path>
                    <path d="M2 12h2"></path>
                    <path d="M20 12h2"></path>
                    <path d="m6.34 17.66-1.41 1.41"></path>
                    <path d="m19.07 4.93-1.41 1.41"></path>
                  </g>
                </svg>

                <svg
                  aria-label="moon"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                >
                  <g
                    strokeLinejoin="round"
                    strokeLinecap="round"
                    strokeWidth="2"
                    fill="none"
                    stroke="currentColor"
                  >
                    <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"></path>
                  </g>
                </svg>
              </label>
            </div>
            <div>
              {user && user.photoURL ? (
                <img
                  onClick={() => setShow(!show)}
                  title={user.displayName}
                  className="size-10 object-cover rounded-full border cursor-pointer"
                  src={user.photoURL}
                  alt=""
                />
              ) : (
                <CgProfile onClick={() => setShow(!show)} size={40} />
              )}
            </div>
            {user ? (
              <button
                onClick={logOutHandler}
                className="py-2 px-3 cursor-pointer font-medium bg-primary text-white"
              >
                Logout
              </button>
            ) : (
              <Link
                to="/login"
                className="py-2 px-3 font-medium bg-primary text-white"
              >
                Login
              </Link>
            )}
          </div>
          <RiMenuFill
            onClick={() => setShow(!show)}
            size={24}
            className="xl:hidden"
          />
        </div>
      </div>

      {/* aside bar */}

      <aside
        className={`bg-base-100 w-80 h-screen p-8 absolute top-0 z-999 flex flex-col items-center transition-all duration-300 shadow-2xl ${
          show ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex justify-between items-center w-full mb-4">
          <div
            className="bg-primary p-2 rounded-full text-white"
            onClick={() => setShow(!show)}
          >
            <RxCrossCircled size={24} />
          </div>
          <label className="toggle lg:hidden text-base-content">
            <input
              onClick={(e) => themeHandler(e.target.checked)}
              defaultChecked={theme === "dark" ? true : false}
              type="checkbox"
              value="synthwave"
              className="theme-controller"
            />

            <svg
              aria-label="sun"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
            >
              <g
                strokeLinejoin="round"
                strokeLinecap="round"
                strokeWidth="2"
                fill="none"
                stroke="currentColor"
              >
                <circle cx="12" cy="12" r="4"></circle>
                <path d="M12 2v2"></path>
                <path d="M12 20v2"></path>
                <path d="m4.93 4.93 1.41 1.41"></path>
                <path d="m17.66 17.66 1.41 1.41"></path>
                <path d="M2 12h2"></path>
                <path d="M20 12h2"></path>
                <path d="m6.34 17.66-1.41 1.41"></path>
                <path d="m19.07 4.93-1.41 1.41"></path>
              </g>
            </svg>

            <svg
              aria-label="moon"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
            >
              <g
                strokeLinejoin="round"
                strokeLinecap="round"
                strokeWidth="2"
                fill="none"
                stroke="currentColor"
              >
                <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"></path>
              </g>
            </svg>
          </label>
        </div>
        <div className="flex flex-col gap-4 items-center">
          <div>
            {user ? (
              <img
                title={user.displayName}
                className="size-28 object-cover rounded-full border"
                src={user.photoURL}
                alt=""
              />
            ) : (
              <CgProfile size={112} />
            )}
          </div>
          <div className="text-xl font-semibold">
            {user ? <p>{user.displayName}</p> : <p>User</p>}
          </div>
          {user ? (
            <Link className="py-2 px-3 font-medium bg-primary text-white">
              View Profile
            </Link>
          ) : (
            <Link
              to="/login"
              className="py-2 px-3 font-medium bg-primary text-white"
            >
              Login
            </Link>
          )}
        </div>
        <div className="mt-8 xl:hidden">
          <h4 className="text-center mb-4">Menu</h4>
          <div>{links}</div>
        </div>
        {user && (
          <button
            onClick={logOutHandler}
            className="py-2 px-3 cursor-pointer font-medium bg-primary text-white absolute bottom-8"
          >
            Logout
          </button>
        )}
      </aside>
    </nav>
  );
};

export default Navbar;

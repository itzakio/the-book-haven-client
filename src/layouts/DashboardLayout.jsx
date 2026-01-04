import React, { useEffect, useState } from "react";
import logo from "/logo.png";
import { Link, NavLink, Outlet } from "react-router";
import { BiBookAdd } from "react-icons/bi";
import { LiaAddressBookSolid } from "react-icons/lia";
import useAuth from "../hooks/useAuth";
import { CgProfile } from "react-icons/cg";
import { Toaster } from "react-hot-toast";

const DashboardLayout = () => {
  const { user, logOut } = useAuth();
  const [show, setShow] = useState(false);
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");
  
  useEffect(() => {
    const html = document.querySelector("html");
    html.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  const themeHandler = (checked) => {
    setTheme(checked ? "dark" : "light");
  };


  useEffect(() => {
    const handleOutside = () => setShow(false);
    if (show) document.addEventListener("click", handleOutside);
    return () => document.removeEventListener("click", handleOutside);
  }, [show]);

  return (
    <div className="drawer lg:drawer-open">
      <input id="my-drawer-4" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content">
        {/* Navbar */}
        <nav className="navbar  w-full bg-base-300 flex justify-between pr-4">
          <div className="flex">
            <label
              htmlFor="my-drawer-4"
              aria-label="open sidebar"
              className="btn btn-square btn-ghost"
            >
              {/* Sidebar toggle icon */}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                strokeLinejoin="round"
                strokeLinecap="round"
                strokeWidth="2"
                fill="none"
                stroke="currentColor"
                className="my-1.5 inline-block size-4"
              >
                <path d="M4 4m0 2a2 2 0 0 1 2 -2h12a2 2 0 0 1 2 2v12a2 2 0 0 1 -2 2h-12a2 2 0 0 1 -2 -2z"></path>
                <path d="M9 4v16"></path>
                <path d="M14 10l2 2l-2 2"></path>
              </svg>
            </label>

            <div className="flex gap-1 items-center">
              <img className="size-12" src={logo} alt="" />
              <div className="hidden md:block">
                <h3 className="text-xl text-primary font-bold ">
                  The Book Haven
                </h3>
                <p className="text-xs text-gray-500">
                  Explore Knowledge. Anytime. Anywhere.
                </p>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-2">
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
            {/* profile */}
           <div
      className="relative"
      onClick={(e) => e.stopPropagation()}
    >
      {/* Avatar */}
      {user?.photoURL ? (
        <img
          onClick={() => setShow(!show)}
          title={user.displayName}
          className="size-10 object-cover rounded-full border cursor-pointer"
          src={user.photoURL}
          alt="profile"
        />
      ) : (
        <CgProfile
          onClick={() => setShow(!show)}
          size={40}
          className="cursor-pointer"
        />
      )}

      {/* Dropdown */}
      {show && (
        <div className="absolute right-0 mt-3 w-38 bg-base-100 border border-primary shadow-lg z-50 font-semibold">
          <ul className="menu p-2 text-sm">
            <li>
              <Link to="/dashboard" onClick={() => setShow(false)}>
                Profile
              </Link>
            </li>

            <li>
              <Link to="/dashboard" onClick={() => setShow(false)}>
                Dashboard
              </Link>
            </li>

            <li>
              <Link to="/" onClick={() => setShow(false)}>
                Home
              </Link>
            </li>

            <li className="border-t mt-1 pt-1">
              <button
                onClick={() => {
                  logOut();
                  setShow(false);
                }}
                className="rounded-none text-white bg-primary"
              >
                Logout
              </button>
            </li>
          </ul>
        </div>
      )}
    </div>
          </div>
        </nav>
        {/* Page content here */}
        <div className="p-4">
          <Outlet />
        </div>
      </div>

      <div className="drawer-side is-drawer-close:overflow-visible dashboard-nav">
        <label
          htmlFor="my-drawer-4"
          aria-label="close sidebar"
          className="drawer-overlay"
        ></label>
        <div className="flex min-h-full flex-col items-start bg-base-200 is-drawer-close:w-14 is-drawer-open:w-64">
          {/* Sidebar content here */}
          <ul className="menu w-full grow">
            {/* List item */}
            <li>
              <NavLink
                to={"/dashboard"}
                className="is-drawer-close:tooltip is-drawer-close:tooltip-right active:bg-primary"
                data-tip="Homepage"
                end
              >
                {/* Home icon */}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  strokeLinejoin="round"
                  strokeLinecap="round"
                  strokeWidth="2"
                  fill="none"
                  stroke="currentColor"
                  className="my-1.5 inline-block size-4"
                >
                  <path d="M15 21v-8a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v8"></path>
                  <path d="M3 10a2 2 0 0 1 .709-1.528l7-5.999a2 2 0 0 1 2.582 0l7 5.999A2 2 0 0 1 21 10v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
                </svg>
                <span className="is-drawer-close:hidden">Homepage</span>
              </NavLink>
            </li>
            {/* add book */}
            <li>
              <NavLink
                to={"/dashboard/add-book"}
                className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
                data-tip="Add Book"
              >
                {/* Home icon */}
                <BiBookAdd size={18} />
                <span className="is-drawer-close:hidden">Add Book</span>
              </NavLink>
            </li>
            {/* my-books */}
            <li>
              <NavLink
                to={"/dashboard/my-books"}
                className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
                data-tip="My Books"
              >
                {/* Home icon */}
                <LiaAddressBookSolid size={20} />
                <span className="is-drawer-close:hidden">My Books</span>
              </NavLink>
            </li>

            {/* List item */}
            <li>
              <button
                className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
                data-tip="Settings"
              >
                {/* Settings icon */}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  strokeLinejoin="round"
                  strokeLinecap="round"
                  strokeWidth="2"
                  fill="none"
                  stroke="currentColor"
                  className="my-1.5 inline-block size-4"
                >
                  <path d="M20 7h-9"></path>
                  <path d="M14 17H5"></path>
                  <circle cx="17" cy="17" r="3"></circle>
                  <circle cx="7" cy="7" r="3"></circle>
                </svg>
                <span className="is-drawer-close:hidden">Settings</span>
              </button>
            </li>
          </ul>
        </div>
      </div>
      <Toaster position="top-center" reverseOrder={false} />
    </div>
  );
};

export default DashboardLayout;

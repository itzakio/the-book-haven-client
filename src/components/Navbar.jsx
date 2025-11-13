import { BiSolidBookAdd } from "react-icons/bi";
import { CgProfile } from "react-icons/cg";
import { MdHome } from "react-icons/md";
import { PiAddressBookFill } from "react-icons/pi";
import { RiBookShelfFill, } from "react-icons/ri";
import { TiHome } from "react-icons/ti";
import { Link, NavLink } from "react-router";


const Navbar = () => {
 
//   const logOutHandler = () => {
//     logOut()
//       .then(() => {
//         toast.success("Logged Out Successfully");
//       })
//       .catch((error) => {
//         toast.error(error.message || "Something went wrong. Please try again.");
//       });
//   };

  const links = (
    <>
      <NavLink className="navLinks" to="/">
        <MdHome size={20}/>Home
      </NavLink>
      <NavLink className="navLinks" to="/all-books">
        <RiBookShelfFill size={20}/> All Books
      </NavLink>
      <NavLink className="navLinks" to="/add-book">
        <BiSolidBookAdd size={20}/> Add Book
      </NavLink>
      <NavLink className="navLinks" to="/my-books">
        <PiAddressBookFill size={20}/> My Books
      </NavLink>
      
    </>
  );
  return (
    <nav className="bg-base-100 shadow-sm">
      <div className="navbar z-999  max-w-[1440px] mx-auto px-4 ">
        <div className="navbar-start">
          <div className="dropdown">
            <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                {" "}
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />{" "}
              </svg>
            </div>
            <ul
              tabIndex="-1"
              className="menu space-y-4 menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
            >
              {links}
            </ul>
          </div>
          <div className="flex gap-1 items-center">
            {/* <img className="size-12" src={logoBlack} alt="" /> */}
            <div className="hidden md:block">
              <h3 className="text-xl text-primary font-bold signika-font">
                The Book Haven
              </h3>
              <p className="text-xs text-gray-500">
                Your pet’s second favorite home.
              </p>
            </div>
          </div>
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1 flex signika-font">
            {links}
            {/* main links */}
          </ul>
        </div>

        <div className="navbar-end flex items-center gap-2">
         <CgProfile size={40} className="text-primary" />
         <Link to="/login" className="p-2 font-medium bg-primary text-white">Login</Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

import React from "react";
import logo from "/logo.png";
import { IoCall } from "react-icons/io5";
import { IoMdMail } from "react-icons/io";
import { FaFacebook } from "react-icons/fa";
import { PiInstagramLogoFill } from "react-icons/pi";
import { FaXTwitter } from "react-icons/fa6";
import { TbBrandYoutubeFilled } from "react-icons/tb";

const Footer = () => {
  return (
    <div className=" p-10 max-w-[1440px] mx-auto margin-top">
      <div className="footer sm:footer-horizontal border-t border-accent pt-8">
        <div>
        <img className="size-28" src={logo} alt="" />
        <p className="text-4xl font-bold mb-2 text-primary">The Book Haven</p>
        <p className="text-accent">Explore Knowledge. Anytime. Anywhere.</p>
      </div>

      <div>
        <h6 className="title-footer">Library</h6>
        <a className="footer-link">Genres</a>
        <a className="footer-link">Languages</a>
        <a className="footer-link">Authors</a>
      </div>

      <div>
        <h6 className="title-footer">Community</h6>
        <a className="footer-link">Articles</a>
        <a className="footer-link">Author Interviews</a>
        <a className="footer-link">Newsletter</a>
      </div>

      <div className="text-black/70">
        <h6 className="title-footer">Follow</h6>

        <div className="flex items-center gap-6 mt-1 text-accent">
          <div className="tooltip" data-tip="Facebook" >
            <FaFacebook className="cursor-pointer "  size={28} />
          </div>
         <div className="tooltip" data-tip="Instagram">
             <PiInstagramLogoFill className="cursor-pointer"  size={28} />
         </div>
          <div className="tooltip" data-tip="X">
            <FaXTwitter className="cursor-pointer"  size={28} />
          </div>
          <div className="tooltip" data-tip="Youtube">
            <TbBrandYoutubeFilled className="cursor-pointer"  size={28} />
          </div>
        </div>
      </div>
      </div>
      <p className="text-accent text-center mt-8 border-t border-accent pt-8 text-xs lg:text-base">© 2025 The Book Haven. All Rights Reserved.</p>
    </div>
  );
};

export default Footer;

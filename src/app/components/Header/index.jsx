"use client";
import React, { useState, useMemo } from "react";
import Button from "@mui/material/Button";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { MdOutlineEmail } from "react-icons/md";
import { FaFacebookF, FaInstagram, FaLinkedinIn, FaTwitter } from "react-icons/fa";
import Image from "next/image";
import { useAuth } from "../../../context/AuthContext"; // Adjust path as needed
import { useSiteContext } from "@/context/siteContext";
import { RiMenu3Line } from "react-icons/ri";

const Header = () => {

  const [isOpenNav, setIsOpenNav] = useState(false);

  const router = useRouter();
  const { user, logout } = useAuth();
  const { siteSettings, loading, error } = useSiteContext();

  // State to manage the visibility of the dropdown menu
  const [isDropdownOpen, setDropdownOpen] = useState(false);

  const handleLogout = () => {
    logout();
    router.push("/department-login"); // Optional: redirect to login after logout
  };

  const socialLinks = useMemo(() => {
    const links = [];

    if (siteSettings.facebook) {
      links.push({ icon: <FaFacebookF />, href: siteSettings.facebook, name: "Facebook" });
    }
    if (siteSettings.instagram) {
      links.push({ icon: <FaInstagram />, href: siteSettings.instagram, name: "Instagram" });
    }
    if (siteSettings.twitter) {
      links.push({ icon: <FaTwitter />, href: siteSettings.twitter, name: "Twitter" });
    }
    if (siteSettings.linkedin) {
      links.push({ icon: <FaLinkedinIn />, href: siteSettings.linkedin, name: "LinkedIn" });
    }

    return links;
  }, [siteSettings.facebook, siteSettings.instagram, siteSettings.twitter, siteSettings.linkedin]);


  const menu = [
    { title: "Home", href: "/" },
    { title: "About Us", href: "/about" },
    { title: "Career", href: "/career" },
    { title: "Contact Us", href: "/contact" },
    { title: "Faq", href: "/faq" }
  ];

  return (
    <div className="header sticky top-0 z-[100]">
      {/* Top strip */}
      <div className="top-strip w-full flex items-center h-auto py-2 bg-secondary">
        <div className="container">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-5 w-full">
              <Link href="#" className="text-gray-200 text-[14px] flex items-center gap-1 hover:text-white space-x-3">
                <p>Technical Helpline : 1112233344</p>
                <p>Timing: Mon-Fri 10:00 AM to 6:00 PM</p>
              </Link>

              <div className="socials flex items-center gap-2 ml-auto">
                {socialLinks.length > 0 && (
                  <>

                    <ul className="flex items-center gap-2">
                      {socialLinks.map((item, idx) => (
                        <li key={idx}>
                          <Link
                            href={item.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="w-[35px] h-[35px] rounded-full border border-[rgba(0,0,0,0.2)] flex items-center justify-center group hover:bg-primary transition-all"
                            title={item.name}
                          >
                            <span className="text-[17px] text-gray-200 group-hover:text-white">
                              {item.icon}
                            </span>
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Header section */}
      <header className="py-4 bg-white">
        <div className="container">
          <div className="flex items-center justify-between gap-5">
            <div className="logo">
              <Link href="/">
                <Image
                  src="/logo.png"
                  alt="Logo"
                  width={150}
                  height={50}
                  className="w-[150px] h-auto"
                />
              </Link>
            </div>

            <div className="ml-auto flex items-center gap-10">
              <nav className={`flex items-center gap-8 fixed top-0 ${isOpenNav === true && 'open'}  lg:static z-[100] bg-white h-full lg:h-auto flex-col lg:flex-row w-[80%] lg:w-max transition-all`}>
                {menu.map((item) => (
                  <Link href={item.href} key={item.title} className="w-full lg:w-auto block"  onClick={() => setIsOpenNav(false)}>
                    <Button className="!text-gray-600 !font-[600] hover:!text-primary lg:!px-0 ">
                      {item.title}
                    </Button>
                  </Link>
                ))}



                {/* More Button with Dropdown */}
                <div className=" relative w-full lg:w-auto hidden">
                  <Button
                    className="!text-gray-600 !font-[600] hover:!text-primary lg:!px-0 "
                    onClick={() => setDropdownOpen((prev) => !prev)}
                  >
                    More
                  </Button>

                  {isDropdownOpen && (
                    <div className="absolute top-full left-0 mt-2 w-48 bg-white shadow-lg rounded-md z-[200]">
                      <Link href="/">
                        <p className="block px-4 py-2 text-gray-600 hover:bg-gray-100 hover:text-primary">
                          FAQ
                        </p>
                      </Link>
                    </div>
                  )}
                </div>


                <div className="lg:hidden w-full lg:w-auto flex items-center gap-5 flex-col">
                  {user ? (
                    <div className="w-full lg:w-auto pl-2 ">
                      <Link href="/add-jobs"  onClick={() => setIsOpenNav(false)}>
                        <Button className="!text-gray-600 !font-[600] hover:!text-primary !px-0">
                          Add Job
                        </Button>
                      </Link>
                      <Button className="rounded-full btn-custom" onClick={handleLogout}>
                        <span>Logout</span>
                      </Button>
                    </div>
                  ) : (
                    <Link href="/department-login"  onClick={() => setIsOpenNav(false)}>
                      <div className="flex btn-wrap">
                        <Button className="rounded-full btn-custom">
                          <span>Department Login</span>
                        </Button>
                      </div>
                    </Link>
                  )}
                </div>


              </nav>


              {
                isOpenNav === true &&
                <div className="nav-overlay w-full h-full fixed top-0 left-0 bg-[rgba(0,0,0,0.6)] z-[99]" onClick={() => setIsOpenNav(false)}></div>
              }




              <div className="hidden lg:flex w-full lg:w-auto  items-center gap-5">
                {user ? (
                  <>
                    <Link href="/add-jobs">
                      <Button className="!text-gray-600 !font-[600] hover:!text-primary !px-0">
                        Add Job
                      </Button>
                    </Link>
                    <Button className="rounded-full btn-custom" onClick={handleLogout}>
                      <span>Logout</span>
                    </Button>
                  </>
                ) : (
                  <Link href="/department-login">
                    <Button className="rounded-full btn-custom">
                      <span>Department Login</span>
                    </Button>
                  </Link>
                )}
              </div>


              <div className="navbarToggle lg:hidden block" onClick={() => setIsOpenNav(true)}>
                <RiMenu3Line size={25} />
              </div>

            </div>
          </div>
        </div>
      </header>
    </div>
  );
};

export default Header;

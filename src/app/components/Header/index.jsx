"use client";
import React from "react";
import Button from "@mui/material/Button";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { MdOutlineEmail } from "react-icons/md";
import { FaFacebookF, FaInstagram, FaLinkedinIn, FaTwitter } from "react-icons/fa";
import Image from "next/image";
import { useAuth } from "../../../context/AuthContext"; // Adjust path as needed

const Header = () => {
  const router = useRouter();
  const { user, logout } = useAuth();

  const handleLogout = () => {
    logout();
    router.push("/department-login"); // Optional: redirect to login after logout
  };

  const menu = [
    { title: "Home", href: "/" },
    { title: "About Us", href: "/about" },
    { title: "Career", href: "/career" },
    { title: "Contact Us", href: "/contact" },
    { title: "More", href: "/" },
    { title: "ChatBot", href: "/" }
  ];

  return (
    <div className="header sticky top-0 z-[100]">
      {/* Top strip */}
      <div className="top-strip w-full flex items-center h-auto py-2 bg-secondary">
        <div className="container">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-5 w-full">
              <Link href="#" className="text-gray-200 text-[14px] flex items-center gap-1 hover:text-white">
                <MdOutlineEmail size={18} className="text-primary" />
                test@gmail.com
              </Link>

              <div className="socials flex items-center gap-2 ml-auto">
                {[FaFacebookF, FaInstagram, FaLinkedinIn, FaTwitter].map((Icon, idx) => (
                  <Link
                    href="#"
                    key={idx}
                    className="flex items-center justify-center w-[30px] h-[30px] rounded-full text-white"
                  >
                    <Icon />
                  </Link>
                ))}
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
              <nav className="flex items-center gap-8">
                {menu.map((item) => (
                  <Link href={item.href} key={item.title}>
                    <Button className="!text-gray-600 !font-[600] hover:!text-primary !px-0">
                      {item.title}
                    </Button>
                  </Link>
                ))}
              </nav>

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
          </div>
        </div>
      </header>
    </div>
  );
};

export default Header;

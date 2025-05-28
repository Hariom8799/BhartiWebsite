// "use client";
// import React from "react";
// import Button from "@mui/material/Button";
// import Link from "next/link";
// import { MdOutlineEmail } from "react-icons/md";
// import { FaFacebookF } from "react-icons/fa";
// import { FaInstagram } from "react-icons/fa";
// import { FaLinkedinIn } from "react-icons/fa";
// import { FaTwitter } from "react-icons/fa";

// // import Logo from "/logo.png"
// import Image from "next/image";

// const Header = () => {
//   const menu = [
//     {
//       title: "Home",
//       href: "/",
//     },
//     {
//       title: "About Us",
//       href: "/about",
//     },
//     {
//       title: "Career",
//       href: "/career",
//     },
//     {
//       title: "Contact Us",
//       href: "/contact",
//     },
//     {
//       title: "More",
//       href: "/",
//     },
//     {
//       title: "ChatBot",
//       href: "/",
//     },
//   ];

//   return (
//     <div className="header sticky top-0 z-[100]">
//       <div className="top-strip w-full flex items-center h-auto py-2 bg-secondary">
//         <div className="container">
//           <div className="flex items-center justify-between">
//             <div className="flex items-center gap-5 w-full">
//               <Link
//                 href="#"
//                 className="text-gray-200 text-[14px] flex items-center gap-1 hover:text-white"
//               >
//                 <MdOutlineEmail size={18} className="text-primary" />
//                 test@gmail.com
//               </Link>

//               <div className="socials flex items-center gap-2 ml-auto">
//                 <Link
//                   href="#"
//                   className="flex items-center justify-center w-[30px] h-[30px] rounded-full text-white"
//                 >
//                   <FaFacebookF />
//                 </Link>

//                 <Link
//                   href="#"
//                   className="flex items-center justify-center w-[30px] h-[30px] rounded-full text-white"
//                 >
//                   <FaInstagram />
//                 </Link>

//                 <Link
//                   href="#"
//                   className="flex items-center justify-center w-[30px] h-[30px] rounded-full text-white"
//                 >
//                   <FaLinkedinIn />
//                 </Link>

//                 <Link
//                   href="#"
//                   className="flex items-center justify-center w-[30px] h-[30px] rounded-full text-white"
//                 >
//                   <FaTwitter />
//                 </Link>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//       <header className="py-4 bg-white">
//         <div className="container">
//           <div className="flex items-center justify-between gap-5">
//             <div className="logo">
//               <Link href="/">
//                 <Image
//                   src={"/logo.png"}
//                   alt="Logo"
//                   width={150}
//                   height={50}
//                   className="w-[150px] h-auto"
//                 />
//               </Link>
//             </div>

//             <div className="ml-auto flex items-center gap-10">
//               <nav className="flex items-center gap-8">
//                 {menu?.length !== 0 &&
//                   menu?.map((item) => {
//                     return (
//                       <Link href={item?.href} key={item?.title}>
//                         <Button className="!text-gray-600 !font-[600] hover:!text-primary !px-0">
//                           {item?.title}
//                         </Button>
//                       </Link>
//                     );
//                   })}
//               </nav>

//               <Link href="/department-login">
//                 <Button className="rounded-full btn-custom">
//                   <span>Department Login</span>
//                 </Button>
//               </Link>
//             </div>
//           </div>
//         </div>
//       </header>
//     </div>
//   );
// };

// export default Header;
"use client";
import React, { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { MdOutlineEmail } from "react-icons/md";
import { FaFacebookF } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
import { FaLinkedinIn } from "react-icons/fa";
import { FaTwitter } from "react-icons/fa";
import Image from "next/image";

const Header = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const router = useRouter();

  // Function to check login status from localStorage
  const checkLoginStatus = () => {
    const user = localStorage.getItem("user");
    setIsLoggedIn(!!user); // Set true if user exists, false otherwise
  };

  // Check localStorage on mount and listen for storage events
  useEffect(() => {
    checkLoginStatus(); // Initial check on mount
    window.addEventListener("storage", checkLoginStatus);
    return () => window.removeEventListener("storage", checkLoginStatus);
  }, []);

  // Handle logout
  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("authToken");
    setIsLoggedIn(false);
    router.push("/");
  };

  const menu = [
    {
      title: "Home",
      href: "/",
    },
    {
      title: "About Us",
      href: "/about",
    },
    {
      title: "Career",
      href: "/career",
    },
    {
      title: "Contact Us",
      href: "/contact",
    },
    {
      title: "More",
      href: "/",
    },
    {
      title: "ChatBot",
      href: "/",
    },
  ];

  return (
    <div className="header sticky top-0 z-[100]">
      <div className="top-strip w-full flex items-center h-auto py-2 bg-secondary">
        <div className="container">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-5 w-full">
              <Link
                href="#"
                className="text-gray-200 text-[14px] flex items-center gap-1 hover:text-white"
              >
                <MdOutlineEmail size={18} className="text-primary" />
                test@gmail.com
              </Link>

              <div className="socials flex items-center gap-2 ml-auto">
                <Link
                  href="#"
                  className="flex items-center justify-center w-[30px] h-[30px] rounded-full text-white"
                >
                  <FaFacebookF />
                </Link>

                <Link
                  href="#"
                  className="flex items-center justify-center w-[30px] h-[30px] rounded-full text-white"
                >
                  <FaInstagram />
                </Link>

                <Link
                  href="#"
                  className="flex items-center justify-center w-[30px] h-[30px] rounded-full text-white"
                >
                  <FaLinkedinIn />
                </Link>

                <Link
                  href="#"
                  className="flex items-center justify-center w-[30px] h-[30px] rounded-full text-white"
                >
                  <FaTwitter />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
      <header className="py-4 bg-white">
        <div className="container">
          <div className="flex items-center justify-between gap-5">
            <div className="logo">
              <Link href="/">
                <Image
                  src={"/logo.png"}
                  alt="Logo"
                  width={150}
                  height={50}
                  className="w-[150px] h-auto"
                />
              </Link>
            </div>

            <div className="ml-auto flex items-center gap-10">
              <nav className="flex items-center gap-8">
                {menu?.length !== 0 &&
                  menu?.map((item) => {
                    return (
                      <Link href={item?.href} key={item?.title}>
                        <Button className="!text-gray-600 !font-[600] hover:!text-primary !px-0">
                          {item?.title}
                        </Button>
                      </Link>
                    );
                  })}
              </nav>

              {isLoggedIn ? (
                <Button
                  className="rounded-full btn-custom"
                  onClick={handleLogout}
                >
                  <span>Logout</span>
                </Button>
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

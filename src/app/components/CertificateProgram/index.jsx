"use client";
import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import { Button } from "@mui/material";
import Link from "next/link";
import { MdArrowRightAlt } from "react-icons/md";

const CertificateProgram = () => {
    const [certificates, setCertificates] = useState([]);

    useEffect(() => {
        const fetchCertificates = async () => {
            try {
                const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/state-certificates`);
                const json = await res.json();
                if (json.success) {
                    setCertificates(json.data);
                } else {
                    console.error("Failed to fetch certificate programs");
                }
            } catch (err) {
                console.error("Error fetching data:", err);
            }
        };

        fetchCertificates();
    }, []);

    return (
        <section className="py-10 upcomingEvents relative" id="certificate-programs">
            <div className="container">
                <div className="wrapper relative z-[99]">
                    <div className="flex items-center justify-between">
                        <div className="col1">
                            <h2 className="text-white text-[30px] font-bold">Certificate Programs</h2>
                            <p className="text-[16px] text-gray-100">
                                Read our latest news. Be always in trend with daily news.
                            </p>
                        </div>
                        <Link href="/all-cards?type=certificate">
                        <Button className="btn-custom" >
                            <span>View All</span>
                        </Button>
                        </Link>
                    </div>

                    <div className="card bg-white p-5 shadow-md rounded-md mt-2">
                        <Swiper
                            navigation={true}
                            slidesPerView={4}
                            spaceBetween={20}
                            pagination={false}
                            modules={[Navigation, Pagination, Autoplay]}
                            className="blogSlider mt-5"
                        >
                            {certificates.map((item) => (
                                <SwiperSlide key={item._id}>
                                    <div className="card bg-white shadow-md rounded-md overflow-hidden group">
                                  <Link href={`/details-page/${item._id}?type=certificate`}>
                                            <div className="img rounded-md overflow-hidden relative">
                                                <img
                                                    src={item.thumbnail}
                                                    alt={item.title}
                                                    className="w-full transition-all group-hover:scale-105"
                                                />
                                                <span className="bg-primary py-1 px-2 inline-block absolute bottom-2 right-2 z-50 rounded-md text-white text-[12px] font-bold">
                                                    {new Date(item.createdAt).toISOString().split("T")[0]}
                                                </span>
                                            </div>
                                        </Link>

                                        <div className="info p-4 flex flex-col gap-3">
                                    <Link href={`/details-page/${item._id}?type=certificate`}>
                                                <h3 className="text-[15px] font-bold text-gray-700 hover:!text-primary">
                                                    {item.title}
                                                </h3>
                                            </Link>
                                            <p className="text-[13px] text-gray-600">
                                                {item.shortDescription.slice(0, 80)}...
                                            </p>
                                            <Link
                                      href={`/details-page/${item._id}?type=certificate`}
                                                className="text-[14px] font-bold text-gray-700 hover:text-primary flex items-center gap-1"
                                            >
                                                Read More <MdArrowRightAlt size={25} />
                                            </Link>
                                        </div>
                                    </div>
                                </SwiperSlide>
                            ))}
                        </Swiper>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default CertificateProgram;

// "use client";
// import React from "react";
// import { Swiper, SwiperSlide } from "swiper/react";
// import "swiper/css";
// import "swiper/css/navigation";
// import "swiper/css/pagination";
// import { Navigation, Pagination, Autoplay } from "swiper/modules";
// import { Button } from "@mui/material";
// import Link from "next/link";
// import { MdArrowRightAlt } from "react-icons/md";

// const CertificateProgram = () => {
//   const certificates = [
//     {
//       _id: "1",
//       title: "National Urban Learning Platform",
//       thumbnail: "/demo.jpg",
//       shortDescription:
//         "Master the essentials of web development with HTML, CSS, and JavaScript.",
//       createdAt: "2025-01-15T00:00:00.000Z",
//     },
//     {
//       _id: "2",
//       title: "National Institute of Disaster Management Learning Platform",
//       thumbnail: "/demo.jpg",
//       shortDescription:
//         "Learn data analysis, visualization, and machine learning basics.",
//       createdAt: "2025-02-01T00:00:00.000Z",
//     },
//     {
//       _id: "3",
//       title: "National Programme on Technology Enhanced Learning (NPTEL)",
//       thumbnail: "/demo.jpg",
//       shortDescription:
//         "Create user-friendly interfaces with modern design techniques.",
//       createdAt: "2025-03-10T00:00:00.000Z",
//     },
//     {
//       _id: "4",
//       title: "Water Sanitation and Hygiene Institute (WASHi)",
//       thumbnail: "/demo.jpg",
//       shortDescription:
//         "Understand cloud infrastructure and deployment strategies.",
//       createdAt: "2025-04-20T00:00:00.000Z",
//     },
//     {
//       _id: "5",
//       title: "The National Programme on Technology Enhanced Learning (NPTEL)",
//       thumbnail: "/demo.jpg",
//       shortDescription:
//         "Understand cloud infrastructure and deployment strategies.",
//       createdAt: "2025-04-20T00:00:00.000Z",
//     },
//   ];

//   return (
//     <section className="py-10 upcomingEvents relative">
//       <div className="container">
//         <div className="wrapper relative z-[99]">
//           <div className="flex items-center justify-between">
//             <div className="col1">
//               <h2 className="text-white text-[30px] font-bold">
//                 Certificate Programs
//               </h2>
//               <p className="text-[16px] text-gray-100">
//                 Read our latest news. Be always in trend with daily news.
//               </p>
//             </div>
//             <Link href="/all-cards?type=certificate">
//               <Button className="btn-custom">
//                 <span>View All</span>
//               </Button>
//             </Link>
//           </div>

//           <div className="card bg-white p-5 shadow-md rounded-md mt-2">
//             <Swiper
//               navigation={true}
//               slidesPerView={4}
//               spaceBetween={20}
//               pagination={false}
//               modules={[Navigation, Pagination, Autoplay]}
//               className="blogSlider mt-5"
//             >
//               {certificates.map((item) => (
//                 <SwiperSlide key={item._id}>
//                   <div className="card bg-white shadow-md rounded-md overflow-hidden group">
//                     <Link href={`/blog/${item._id}`}>
//                       <div className="img rounded-md overflow-hidden relative">
//                         <img
//                           src={item.thumbnail}
//                           alt={item.title}
//                           className="w-full transition-all group-hover:scale-105"
//                         />
//                         <span className="bg-primary py-1 px-2 inline-block absolute bottom-2 right-2 z-50 rounded-md text-white text-[12px] font-bold">
//                           {new Date(item.createdAt).toISOString().split("T")[0]}
//                         </span>
//                       </div>
//                     </Link>

//                     <div className="info p-4 flex flex-col gap-3">
//                       <Link
//                         //   href={`/blog/${item._id}`}
//                         href={`#`}
//                       >
//                         <h3 className="text-[15px] font-bold text-gray-700 hover:!text-primary">
//                           {item.title}
//                         </h3>
//                       </Link>
//                       <p className="text-[13px] text-gray-600">
//                         {item.shortDescription.slice(0, 80)}...
//                       </p>
//                       <Link
//                         // href={`/blog/${item._id}`}
//                         href={`#`}
//                         className="text-[14px] font-bold text-gray-700 hover:text-primary flex items-center gap-1"
//                       >
//                         Read More <MdArrowRightAlt size={25} />
//                       </Link>
//                     </div>
//                   </div>
//                 </SwiperSlide>
//               ))}
//             </Swiper>
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// };

// export default CertificateProgram;

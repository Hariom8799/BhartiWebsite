"use client";
import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import { Button } from "@mui/material";
import Link from "next/link";
import { useSiteContext } from "@/context/siteContext"; 

const HomeSlider = () => {
  const { sliderData, loading, error } = useSiteContext(); 
  const [counts, setCounts] = useState({
    publishedCount2024: 0,
    filledCount2024: 0,
  });

  useEffect(() => {
    const fetchCounts = async () => {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_BASE_URL}/api/get-job-counts?year=2024-2025`
        );
        const data = await res.json();

        if (data.success) {
          setCounts({
            publishedCount2024: data.publishedCount || 0,
            filledCount2024: data.filledCount || 0,
          });
        } else {
          console.error("Failed to fetch 2024-2025 job counts");
        }
      } catch (error) {
        console.error("Error fetching job counts:", error);
      }
    };

    fetchCounts();
  }, []);

  return (
    <>
      <div className="flex gap-4 py-8">
        <div className="container flex gap-4 flex-col lg:flex-row ">
          <div className="col1 w-[100%]  lg:w-[15%] order-2 lg:order-1 ">
            <div className="overflow-hidden rounded-md">
              {/* 2024-2025 JOBS (Dynamic) */}
              <h4 className="bg-primary text-gray-200 p-2 text-center text-[14px] font-bold">
                2024-2025 JOBS
              </h4>
              <div className="flex items-center gap-0">
                <div className="w-[50%] bg-gray-700 border border-[rgba(255,255,255,0.1)] border-t-0 border-b-0 border-l-0 py-1">
                  <h4 className="flex items-center text-gray-200 p-2 text-center bg-gray-700 text-[14px] justify-center">
                    Published
                  </h4>
                  <h5 className="bg-gray-700 flex items-center text-white text-center justify-center text-[18px] pb-2 transform scale-75">
                    {counts.publishedCount2024}
                  </h5>
                </div>
                <div className="w-[50%] bg-gray-700 py-1">
                  <h4 className="flex items-center text-gray-200 p-2 text-center bg-gray-700 text-[14px] justify-center">
                    Filled
                  </h4>
                  <h5 className="bg-gray-700 flex items-center text-white text-center justify-center text-[18px] pb-2 transform scale-75">
                    {counts.filledCount2024}
                  </h5>
                </div>
              </div>

              {/* 2023-2024 JOBS (Static) */}
              <h4 className="bg-primary text-gray-200 p-2 text-center text-[14px] font-bold">
                2023-2024 JOBS
              </h4>
              <div className="flex items-center gap-0">
                <div className="w-[50%] bg-gray-700 border border-[rgba(255,255,255,0.1)] border-t-0 border-b-0 border-l-0 py-1">
                  <h4 className="flex items-center text-gray-200 p-2 text-center bg-gray-700 text-[14px] justify-center">
                    Published
                  </h4>
                  <h5 className="bg-gray-700 flex items-center text-white text-center justify-center text-[18px] pb-2 transform scale-75">
                    22,1234
                  </h5>
                </div>
                <div className="w-[50%] bg-gray-700 py-1">
                  <h4 className="flex items-center text-gray-200 p-2 text-center bg-gray-700 text-[14px] justify-center">
                    Filled
                  </h4>
                  <h5 className="bg-gray-700 flex items-center text-white text-center justify-center text-[18px] pb-2 transform scale-75">
                    19,1233
                  </h5>
                </div>
              </div>

              {/* 2022-2023 JOBS (Static) */}
              <h4 className="bg-primary text-gray-200 p-2 text-center text-[14px] font-bold">
                2022-23 JOBS
              </h4>
              <div className="flex items-center gap-0">
                <div className="w-[50%] bg-gray-700 border border-[rgba(255,255,255,0.1)] border-t-0 border-b-0 border-l-0">
                  <h4 className="flex items-center text-gray-200 p-2 text-center bg-gray-700 text-[14px] justify-center">
                    Published
                  </h4>
                  <h5 className="bg-gray-700 flex items-center text-white text-center justify-center text-[18px] pb-2 transform scale-75">
                    18,1233
                  </h5>
                </div>
                <div className="w-[50%] bg-gray-700">
                  <h4 className="flex items-center text-gray-200 p-2 text-center bg-gray-700 text-[14px] justify-center">
                    Filled
                  </h4>
                  <h5 className="bg-gray-700 flex items-center text-white text-center justify-center text-[18px] pb-2 transform scale-75">
                    15,1233
                  </h5>
                </div>
              </div>
            </div>
          </div>

          <div className="homeBanner overflow-hidden rounded-md  w-[100%] lg:w-[70%] order-1 lg:order-2">
            {loading.sliderData ? (
              <p className="text-white text-center py-10">Loading sliders...</p>
            ) : error.sliderData ? (
              <p className="text-red-500 text-center py-10">{error.sliderData}</p>
            ) : sliderData.length === 0 ? (
              <p className="text-gray-400 text-center py-10">No active slides available.</p>
            ) : (
              <Swiper
                navigation={false}
                loop={true}
                pagination={{ clickable: true }}
                autoplay={{ delay: 2500, disableOnInteraction: false }}
                modules={[Navigation, Pagination, Autoplay]}
                className="mySwiper"
              >
                {sliderData.map((slide) => (
                  <SwiperSlide key={slide._id}>
                    <img
                      src={slide.mainImg}
                      alt={slide.title}
                      className="w-full object-cover"
                    />
                    {/* <div className="absolute bottom-4 left-4 bg-black bg-opacity-50 text-white p-4 rounded">
                      <h3 className="text-lg font-semibold">{slide.title}</h3>
                      <p className="text-sm">{slide.description}</p>
                    </div> */}
                  </SwiperSlide>
                ))}
              </Swiper>
            )}
          </div>

          <div className="col1  w-[100%] lg:w-[15%] flex flex-col gap-3 order-3 lg:order-3">
            <div className="bg-gray-700 p-4 h-[342px] rounded-md flex flex-col gap-3">
              <Link href={"/recent-jobs"}>
              <Button className="w-full !bg-gray-700 hover:!bg-primary !text-white !font-[600] !capitalize !text-[12px]">
                Recent Jobs
              </Button>
              </Link>
              <Link href={"/all-cards?type=skills"} >
                <Button className="w-full !bg-gray-600 hover:!bg-primary !text-white !font-[600] !capitalize !text-[12px]">
                Skill Development Programs
                </Button>
              </Link>
              <Link href={"/all-cards?type=certificate"} >
                <Button className="w-full !bg-gray-700 hover:!bg-primary !text-white !font-[600] !capitalize !text-[12px]">
                Certificate Programs
                </Button>
              </Link>
              <Link href={"#footer"} >
                <Button className="w-full !bg-gray-600 hover:!bg-primary !text-white !font-[600] !capitalize !text-[12px]">
                External Links
                </Button>
              </Link>
              <Link href={"/gallery"} >
                <Button className="w-full !bg-gray-700 hover:!bg-primary !text-white !font-[600] !capitalize !text-[12px]">
                Social Media
                </Button>
              </Link>
              <Link href={"/feedback"}>
              <Button className="w-full !bg-gray-600 hover:!bg-primary !text-white !font-[600] !capitalize !text-[12px]">
                Feedback & Complaints
              </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default HomeSlider;

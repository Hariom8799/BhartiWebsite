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

const SkillsDevelopmentProgrames = () => {
    const [programs, setPrograms] = useState([]);

    useEffect(() => {
        const fetchPrograms = async () => {
            try {
                const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/skill-development`);
                const json = await res.json();
                if (json.success) {
                    setPrograms(json.data);
                } else {
                    console.error("Failed to fetch skill development programs");
                }
            } catch (err) {
                console.error("Error fetching data:", err);
            }
        };

        fetchPrograms();
    }, []);

    return (
        <section className="py-10 upcomingEvents relative bg-secondary" id="skills-development-programs">
            <div className="container">
                <div className="wrapper relative z-[99]">
                    <div className="flex items-center justify-between">
                        <div className="col1">
                            <h2 className="text-[30px] font-bold text-white">Skill Development Program</h2>
                            <p className="text-[16px] text-gray-300">
                                Read our latest news. Be always in trend with daily news.
                            </p>
                        </div>
                        <Link href="/all-cards?type=skills" >
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
                            className="details-pageSlider mt-5"
                        >
                            {programs.map((program) => (
                                <SwiperSlide key={program._id}>
                                    <div className="card bg-white shadow-md rounded-md overflow-hidden group">
                                        <Link href={`/details-page/${program._id}?type=skills`}>
                                            <div className="img rounded-md overflow-hidden relative">
                                                <img
                                                    src={program.thumbnail}
                                                    alt={program.title}
                                                    className="w-full transition-all group-hover:scale-105"
                                                />
                                                <span className="bg-primary py-1 px-2 inline-block absolute bottom-2 right-2 z-50 rounded-md text-white text-[12px] font-bold">
                                                    {new Date(program.createdAt).toISOString().split("T")[0]}
                                                </span>
                                            </div>
                                        </Link>

                                        <div className="info p-4 flex flex-col gap-3">
                                            <Link href={`/details-page/${program._id}?type=skills`}>
                                                <h3 className="text-[15px] font-bold text-gray-700 hover:!text-primary">
                                                    {program.title}
                                                </h3>
                                            </Link>
                                            <p className="text-[13px] text-gray-600">
                                                {program.shortDescription.slice(0, 80)}...
                                            </p>
                                            <Link
                                                href={`/details-page/${program._id}?type=skills`}
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

export default SkillsDevelopmentProgrames;

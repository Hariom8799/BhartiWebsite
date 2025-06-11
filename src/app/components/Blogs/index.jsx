"use client"
import React from 'react'
import { Swiper, SwiperSlide } from 'swiper/react';
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import { Button } from '@mui/material';
import Link from 'next/link';
import { MdArrowRightAlt } from "react-icons/md";

const Blog = () => {
    return (
        <section className="blog py-8">
            <div className="container">
                <div className="flex items-center justify-between">
                    <div className='left'>
                        <h2 className='text-[30px] font-bold text-gray-800'>Recent Job Related News </h2>
                        <p className='text-[16px] text-gray-600'>Read our latest news. Be always in trend with daily news.</p>
                    </div>


                    <Button variant="text" className='!font-bold gap-1 !text-gray-700 !bg-gray-300 hover:!bg-gray-200'><span>View All </span><MdArrowRightAlt size={25} /></Button>

                </div>


                <Swiper
                    navigation={true}
                    slidesPerView={4}
                    spaceBetween={20}
                   pagination={false}
                    modules={[Navigation, Pagination, Autoplay]}
                    className="blogSlider mt-5"
                >
                    <SwiperSlide>
                        <div className='card bg-white shadow-md rounded-md overflow-hidden group'>

                            <Link href="/blog/474854858">
                                <div className='img rounded-md overflow-hidden relative'>
                                    <img src="https://serviceapi.spicezgold.com/download/1741759053899_5-2.jpg" className='w-full transition-all group-hover:scale-105' />

                                    <span className='bg-primary py-1 px-2 inline-block absolute bottom-2 right-2 z-50 rounded-md text-white text-[12px] font-bold'>2025-03-02</span>
                                </div>
                            </Link>


                            <div className='info p-4 flex flex-col gap-3'>
                                <Link href="/blog/474854858">
                                    <h3 className='text-[15px] font-bold text-gray-700 hover:!text-primary'>Explore sustainable living through cutting-edge prefabricated homes</h3>
                                </Link>
                                <p className='text-[13px] text-gray-600'>Give lady of they such they sure it. Me contained explained my education. Vulgar as hearts by g...</p>


                                 <Link href="/blog/474854858" className='text-[14px] font-bold text-gray-700 hover:text-primary flex items-center gap-1'>Read More <MdArrowRightAlt size={25} /></Link>

                            </div>

                        </div>
                    </SwiperSlide>


                      <SwiperSlide>
                        <div className='card bg-white shadow-md rounded-md overflow-hidden group'>

                            <Link href="/blog/474854858">
                                <div className='img rounded-md overflow-hidden relative'>
                                    <img src="https://serviceapi.spicezgold.com/download/1741759053899_5-2.jpg" className='w-full transition-all group-hover:scale-105' />

                                    <span className='bg-primary py-1 px-2 inline-block absolute bottom-2 right-2 z-50 rounded-md text-white text-[12px] font-bold'>2025-03-02</span>
                                </div>
                            </Link>


                            <div className='info p-4 flex flex-col gap-3'>
                                <Link href="/blog/474854858">
                                    <h3 className='text-[15px] font-bold text-gray-700 hover:!text-primary'>Explore sustainable living through cutting-edge prefabricated homes</h3>
                                </Link>
                                <p className='text-[13px] text-gray-600'>Give lady of they such they sure it. Me contained explained my education. Vulgar as hearts by g...</p>


                                 <Link href="/blog/474854858" className='text-[14px] font-bold text-gray-700 hover:text-primary flex items-center gap-1'>Read More <MdArrowRightAlt size={25} /></Link>

                            </div>

                        </div>
                    </SwiperSlide>



                                        <SwiperSlide>
                        <div className='card bg-white shadow-md rounded-md overflow-hidden group'>

                            <Link href="/blog/474854858">
                                <div className='img rounded-md overflow-hidden relative'>
                                    <img src="https://serviceapi.spicezgold.com/download/1741759053899_5-2.jpg" className='w-full transition-all group-hover:scale-105' />

                                    <span className='bg-primary py-1 px-2 inline-block absolute bottom-2 right-2 z-50 rounded-md text-white text-[12px] font-bold'>2025-03-02</span>
                                </div>
                            </Link>


                            <div className='info p-4 flex flex-col gap-3'>
                                <Link href="/blog/474854858">
                                    <h3 className='text-[15px] font-bold text-gray-700 hover:!text-primary'>Explore sustainable living through cutting-edge prefabricated homes</h3>
                                </Link>
                                <p className='text-[13px] text-gray-600'>Give lady of they such they sure it. Me contained explained my education. Vulgar as hearts by g...</p>


                                 <Link href="/blog/474854858" className='text-[14px] font-bold text-gray-700 hover:text-primary flex items-center gap-1'>Read More <MdArrowRightAlt size={25} /></Link>

                            </div>

                        </div>
                    </SwiperSlide>


                      <SwiperSlide>
                        <div className='card bg-white shadow-md rounded-md overflow-hidden group'>

                            <Link href="/blog/474854858">
                                <div className='img rounded-md overflow-hidden relative'>
                                    <img src="https://serviceapi.spicezgold.com/download/1741759053899_5-2.jpg" className='w-full transition-all group-hover:scale-105' />

                                    <span className='bg-primary py-1 px-2 inline-block absolute bottom-2 right-2 z-50 rounded-md text-white text-[12px] font-bold'>2025-03-02</span>
                                </div>
                            </Link>


                            <div className='info p-4 flex flex-col gap-3'>
                                <Link href="/blog/474854858">
                                    <h3 className='text-[15px] font-bold text-gray-700 hover:!text-primary'>Explore sustainable living through cutting-edge prefabricated homes</h3>
                                </Link>
                                <p className='text-[13px] text-gray-600'>Give lady of they such they sure it. Me contained explained my education. Vulgar as hearts by g...</p>


                                 <Link href="/blog/474854858" className='text-[14px] font-bold text-gray-700 hover:text-primary flex items-center gap-1'>Read More <MdArrowRightAlt size={25} /></Link>

                            </div>

                        </div>
                    </SwiperSlide>



                                        <SwiperSlide>
                        <div className='card bg-white shadow-md rounded-md overflow-hidden group'>

                            <Link href="/blog/474854858">
                                <div className='img rounded-md overflow-hidden relative'>
                                    <img src="https://serviceapi.spicezgold.com/download/1741759053899_5-2.jpg" className='w-full transition-all group-hover:scale-105' />

                                    <span className='bg-primary py-1 px-2 inline-block absolute bottom-2 right-2 z-50 rounded-md text-white text-[12px] font-bold'>2025-03-02</span>
                                </div>
                            </Link>


                            <div className='info p-4 flex flex-col gap-3'>
                                <Link href="/blog/474854858">
                                    <h3 className='text-[15px] font-bold text-gray-700 hover:!text-primary'>Explore sustainable living through cutting-edge prefabricated homes</h3>
                                </Link>
                                <p className='text-[13px] text-gray-600'>Give lady of they such they sure it. Me contained explained my education. Vulgar as hearts by g...</p>


                                 <Link href="/blog/474854858" className='text-[14px] font-bold text-gray-700 hover:text-primary flex items-center gap-1'>Read More <MdArrowRightAlt size={25} /></Link>

                            </div>

                        </div>
                    </SwiperSlide>


                      <SwiperSlide>
                        <div className='card bg-white shadow-md rounded-md overflow-hidden group'>

                            <Link href="/blog/474854858">
                                <div className='img rounded-md overflow-hidden relative'>
                                    <img src="https://serviceapi.spicezgold.com/download/1741759053899_5-2.jpg" className='w-full transition-all group-hover:scale-105' />

                                    <span className='bg-primary py-1 px-2 inline-block absolute bottom-2 right-2 z-50 rounded-md text-white text-[12px] font-bold'>2025-03-02</span>
                                </div>
                            </Link>


                            <div className='info p-4 flex flex-col gap-3'>
                                <Link href="/blog/474854858">
                                    <h3 className='text-[15px] font-bold text-gray-700 hover:!text-primary'>Explore sustainable living through cutting-edge prefabricated homes</h3>
                                </Link>
                                <p className='text-[13px] text-gray-600'>Give lady of they such they sure it. Me contained explained my education. Vulgar as hearts by g...</p>


                                 <Link href="/blog/474854858" className='text-[14px] font-bold text-gray-700 hover:text-primary flex items-center gap-1'>Read More <MdArrowRightAlt size={25} /></Link>

                            </div>

                        </div>
                    </SwiperSlide>

                </Swiper>

            </div>
        </section>
    )
}

export default Blog
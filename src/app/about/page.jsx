import React from 'react';
import { IoMdCheckmarkCircleOutline } from "react-icons/io";

const AboutPage = () => {
    return (
        <>
            <div className='innerBanner flex items-center justify-center'>
                <div className='container'>
                    <h1 className='text-center text-gray-100 text-[35px] font-bold'>About Us</h1>
                </div>
            </div>

            <div className="homeSection3 mb-16 mt-10">
                <div className="container">
                    <div className="flex items-center gap-10">
                        <div className="left w-[40%]">
                            <div className="rounded-lg overflow-hidden group">
                                <img src={"../about-img.jpg"} className="w-full transition-all group-hover:scale-105" alt="About" />
                            </div>
                        </div>

                        <div className="right w-[60%]">
                            <span className="text-primary text-[16px] uppercase font-bold">Who we are</span>
                            <h2 className="text-[35px] font-extrabold leading-[50px] pr-5 text-gray-800">
                                Empowering Uttarakhand’s Youth Through Opportunity
                            </h2>
                            <p className="mt-4 text-[17px] text-gray-800 leading-[28px]">
                                In a progressive step towards good governance and citizen empowerment, the Government of Uttarakhand has launched the <strong>Uttarakhand Bharti Portal</strong> — a unified digital platform designed to connect the youth of the state with employment opportunities across various sectors.
                            </p>
                            <p className="mt-4 text-[17px] text-gray-800 leading-[28px]">
                                This portal serves as a centralized hub where every job seeker can explore job openings that align with their educational qualifications and professional experience. It brings all Uttarakhand government job opportunities under one roof.
                            </p>
                            <p className="mt-4 text-[17px] text-gray-800 leading-[28px]">
                                Our mission is to streamline the recruitment process for both candidates and government departments by offering real-time notifications, comprehensive job descriptions, clear application guidelines, and updated examination schedules. The portal features a user-friendly web and mobile interface, ensuring ease of access anytime, anywhere.
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            <div className='m-auto'>
                <div className='py-8 px-[250px] bg-white'>
                    <div className='py-8'>
                        <h3 className='text-[22px] font-bold text-gray-800 text-center mb-5'>Your Government at Your Door</h3>
                        <ul className='list-disc text-[18px] text-gray-700 leading-[30px] pl-5'>
                            <li>Bridging the gap between citizens and employment opportunities.</li>
                            <li>One-Stop Job Portal – Unified access to vacancies from all state departments.</li>
                            <li>Mobile & Web Access – Search and apply for jobs seamlessly through both platforms.</li>
                            <li>Transparent & Timely Updates – Ensuring accurate and up-to-date information for all users.</li>
                        </ul>
                        <p className='mt-6 text-gray-800 text-[18px] leading-[30px]'>
                            With the Uttarakhand Bharti Portal, we aim to empower the states youth, reduce unemployment, and promote a more efficient and transparent recruitment ecosystem.
                        </p>
                    </div>
                </div>
            </div>
        </>
    );
};

export default AboutPage;

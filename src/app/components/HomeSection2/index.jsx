import React from 'react'
import { FaBriefcaseMedical } from "react-icons/fa";
import { IoBagCheck } from "react-icons/io5";
import { MdOutlineEmojiTransportation } from "react-icons/md";
import { FaBusinessTime } from "react-icons/fa";
import { FaFileSignature } from "react-icons/fa";

const HomeSection2 = () => {
    return (
        <section className="homeSection2 relative  z-[50]">
            <div className='container'>
                <div className='grid grid-cols-4 gap-10'>
                    <div className='item bg-white shadow-lg px-7 py-10 h-auto rounded-lg flex flex-col gap-3 hover:bg-primary group transition-all'>

                        <span className='flex items-center justify-center w-20 h-20 bg-primary rounded-full group-hover:bg-white transition-all'>
                            <IoBagCheck size={35} className='text-white group-hover:text-primary' />
                        </span>

                        <h3 className='text-gray-900 font-bold text-[18px] group-hover:text-white transition-all'> Job & Unemployement</h3>

                        <p className='text-gray-700 text-[15px] font-light group-hover:text-white transition-all'>Lorem Ipsum is simply dummy text of the printing and typesetting industry.. </p>

                    </div>


                    <div className='item bg-white shadow-lg px-7 py-10 h-auto rounded-lg flex flex-col gap-3 hover:bg-primary group transition-all'>

                        <span className='flex items-center justify-center w-20 h-20 bg-primary rounded-full group-hover:bg-white transition-all'>
                            <MdOutlineEmojiTransportation size={50} className='text-white group-hover:text-primary' />
                        </span>

                        <h3 className='text-gray-900 font-bold text-[18px] group-hover:text-white transition-all'>Road & Transport</h3>

                        <p className='text-gray-700 text-[15px] font-light group-hover:text-white transition-all'>Lorem Ipsum is simply dummy text of the printing and typesetting industry.. </p>

                    </div>


                    <div className='item bg-white shadow-lg px-7 py-10 h-auto rounded-lg flex flex-col gap-3 hover:bg-primary group transition-all'>

                        <span className='flex items-center justify-center w-20 h-20 bg-primary rounded-full group-hover:bg-white transition-all'>
                            <FaBusinessTime size={35} className='text-white group-hover:text-primary' />
                        </span>

                        <h3 className='text-gray-900 font-bold text-[18px] group-hover:text-white transition-all'> Business & Industry</h3>

                        <p className='text-gray-700 text-[15px] font-light group-hover:text-white transition-all'>Lorem Ipsum is simply dummy text of the printing and typesetting industry.. </p>

                    </div>


                    <div className='item bg-white shadow-lg px-7 py-10 h-auto rounded-lg flex flex-col gap-3 hover:bg-primary group transition-all'>

                        <span className='flex items-center justify-center w-20 h-20 bg-primary rounded-full group-hover:bg-white transition-all'>
                           <FaFileSignature size={40} className='text-white group-hover:text-primary' />
                        </span>

                        <h3 className='text-gray-900 font-bold text-[18px] group-hover:text-white transition-all'> Culture and Recreation</h3>

                        <p className='text-gray-700 text-[15px] font-light group-hover:text-white transition-all'>Lorem Ipsum is simply dummy text of the printing and typesetting industry.. </p>

                    </div>



                </div>



            </div>
        </section>
    )
}

export default HomeSection2
"use client"
import React, { useContext } from "react";
import { LiaShippingFastSolid } from "react-icons/lia";
import { PiKeyReturnLight } from "react-icons/pi";
import { BsWallet2 } from "react-icons/bs";
import { LiaGiftSolid } from "react-icons/lia";
import { BiSupport } from "react-icons/bi";
import { IoChatboxOutline } from "react-icons/io5";

import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import { FaFacebookF } from "react-icons/fa";
import { AiOutlineYoutube } from "react-icons/ai";
import { FaPinterestP } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
import Button from "@mui/material/Button";
import Link from "next/link";
import Image from "next/image";


const Footer = () => {

    const menu = [
        {
            title: "Home",
            href: "/"
        },
        {
            title: "About Us",
            href: "/about"
        },
        {
            title: "Career",
            href: "/career"
        },
        {
            title: "Contact Us",
            href: "/"
        },
        {
            title: "More",
            href: "/"
        },
        {
            title: "ChatBot",
            href: "/"
        },
    ]


    return (
        <>
            <footer className="py-6 bg-secondary">
                <div className="container flex items-center justify-between">


                    <nav className='flex items-center gap-8'>
                        {
                            menu?.length !== 0 && menu?.map((item) => {
                                return (
                                    <Link href={item?.href}  key={item?.title}>
                                        <Button className='!text-gray-200 !font-[600] hover:!text-primary !px-0'>{item?.title}</Button>
                                    </Link>
                                )
                            })
                        }
                    </nav>



                    <ul className="flex items-center gap-2">
                        <li className="list-none">
                            <Link
                                href="/"
                                target="_blank"
                                className="w-[35px] h-[35px] rounded-full border border-[rgba(255,255,255,0.2)] flex items-center justify-center group hover:bg-primary transition-all"
                            >
                                <FaFacebookF className="text-[17px] text-gray-300 group-hover:text-white" />
                            </Link>
                        </li>

                        <li className="list-none">
                            <Link
                                href="/"
                                target="_blank"
                                className="w-[35px] h-[35px] rounded-full border border-[rgba(255,255,255,0.2)] flex items-center justify-center group hover:bg-primary transition-all"
                            >
                                <AiOutlineYoutube className="text-[17px] text-gray-300 group-hover:text-white" />
                            </Link>
                        </li>

                        <li className="list-none">
                            <Link
                                href="/"
                                target="_blank"
                                className="w-[35px] h-[35px] rounded-full border border-[rgba(255,255,255,0.2)] flex items-center justify-center group hover:bg-primary transition-all"
                            >
                                <FaPinterestP className="text-[17px] text-gray-300 group-hover:text-white" />
                            </Link>
                        </li>

                        <li className="list-none">
                            <Link
                                href="/"
                                target="_blank"
                                className="w-[35px] h-[35px] rounded-full border border-[rgba(255,255,255,0.2)] flex items-center justify-center group hover:bg-primary transition-all"
                            >
                                <FaInstagram className="text-[17px] text-gray-300 group-hover:text-white" />
                            </Link>
                        </li>
                    </ul>


                </div>
            </footer>


        </>
    );
};

export default Footer;

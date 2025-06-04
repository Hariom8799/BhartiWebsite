"use client"
import React, { useContext, useMemo } from "react";
import { LiaShippingFastSolid } from "react-icons/lia";
import { PiKeyReturnLight } from "react-icons/pi";
import { BsWallet2 } from "react-icons/bs";
import { LiaGiftSolid } from "react-icons/lia";
import { BiSupport } from "react-icons/bi";
import { IoChatboxOutline } from "react-icons/io5";

import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import { FaFacebookF, FaLinkedinIn, FaTwitter } from "react-icons/fa";
import { AiOutlineYoutube } from "react-icons/ai";
import { FaPinterestP } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
import Button from "@mui/material/Button";
import Link from "next/link";
import Image from "next/image";
import { useSiteContext } from "@/context/siteContext";


const Footer = () => {
    const { siteSettings, loading, error } = useSiteContext();


    const menu = [
        { title: "Home", href: "/" },
        { title: "About Us", href: "/about" },
        { title: "Career", href: "/career" },
        { title: "Contact Us", href: "/contact" },
        { title: "More", href: "/" },
        { title: "ChatBot", href: "/" }
    ]

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


    return (
        <>
            <footer className="py-6 bg-secondary" id="footer">
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
                                            <span className="text-[17px] text-gray-600 group-hover:text-white">
                                                {item.icon}
                                            </span>
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </>
                    )}


                </div>
            </footer>


        </>
    );
};

export default Footer;

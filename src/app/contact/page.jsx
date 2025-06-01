// pages/contact/ContactPage.js
"use client";
import React, { useState, useMemo } from "react";
import { MdOutlineEmail, MdOutlinePhone } from "react-icons/md";
import TextField from "@mui/material/TextField";
import { Button } from "@mui/material";
import { FaFacebookF, FaPinterestP, FaInstagram, FaTwitter, FaLinkedinIn } from "react-icons/fa";
import Link from "next/link";
import toast from "react-hot-toast";
import { useSiteContext } from "../../context/siteContext"; 

const ContactPage = () => {
    const { siteSettings, loading, error } = useSiteContext();

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        contactNo: "",
        message: "",
    });

    const handleChange = (e) => {
        setFormData((prev) => ({
            ...prev,
            [e.target.name]: e.target.value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const { name, email, contactNo, message } = formData;

        if (!name || !email || !contactNo || !message) {
            return toast.error("Please fill in all fields.");
        }

        const toastId = toast.loading("Sending message...");

        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/contact-us`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formData),
            });

            const data = await res.json();

            if (data.success) {
                toast.success("Message sent successfully!", { id: toastId });
                setFormData({ name: "", email: "", contactNo: "", message: "" });
            } else {
                toast.error(data.error || "Failed to send message.", { id: toastId });
            }
        } catch (err) {
            console.error(err);
            toast.error("Something went wrong!", { id: toastId });
        }
    };

    // Memoize social media links to prevent re-creation on every render
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

    if (loading.siteSettings) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
            </div>
        );
    }

    if (error.siteSettings) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <div className="text-center">
                    <p className="text-red-600 mb-4">Error loading site settings</p>
                    <button
                        onClick={() => window.location.reload()}
                        className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                    >
                        Retry
                    </button>
                </div>
            </div>
        );
    }

    return (
        <>
            <div className="innerBanner flex items-center justify-center">
                <div className="container">
                    <h1 className="text-center text-gray-100 text-[35px] font-bold">
                        Contact Us
                    </h1>
                </div>
            </div>

            <section className="py-12 bg-white">
                <div className="container">
                    <div className="flex flex-wrap md:flex-nowrap gap-10">
                        <div className="info w-full md:w-1/2">
                            <form
                                onSubmit={handleSubmit}
                                className="w-full md:w-[75%] card bg-gray-50 border border-[rgba(0,0,0,0.1)] p-5 rounded-md"
                            >
                                <h3 className="text-[20px] font-bold text-gray-800">
                                    Leave your message
                                </h3>

                                <div className="form-group w-full my-3">
                                    <TextField
                                        name="name"
                                        label="Your Name"
                                        variant="standard"
                                        className="w-full"
                                        value={formData.name}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>
                                <div className="form-group w-full my-3">
                                    <TextField
                                        name="email"
                                        label="Your Email"
                                        variant="standard"
                                        type="email"
                                        className="w-full"
                                        value={formData.email}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>
                                <div className="form-group w-full my-3">
                                    <TextField
                                        name="contactNo"
                                        label="Contact"
                                        variant="standard"
                                        className="w-full"
                                        value={formData.contactNo}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>
                                <div className="form-group w-full my-3">
                                    <TextField
                                        name="message"
                                        label="Write Your Message"
                                        variant="standard"
                                        className="w-full"
                                        multiline
                                        rows={4}
                                        value={formData.message}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>

                                <div className="form-group w-full mt-8 flex">
                                    <Button
                                        type="submit"
                                        className="btn-custom !w-[150px]"
                                        variant="contained"
                                    >
                                        <span>Submit</span>
                                    </Button>
                                </div>
                            </form>
                        </div>

                        <div className="contactInfo w-full md:w-1/2">
                            <h3 className="text-[20px] font-bold text-gray-800">
                                Get In Touch
                            </h3>

                            <p className="text-[20px] my-2 text-gray-600">
                                For any inquiries, please call or email us. Alternatively you
                                can fill in the following contact form.
                            </p>

                            {/* Dynamic Contact Information */}
                            {siteSettings.email && (
                                <p className="text-gray-800 flex items-center gap-1 my-2">
                                    <MdOutlineEmail size={22} />
                                    <a href={`mailto:${siteSettings.email}`} className="hover:text-blue-600 transition-colors">
                                        {siteSettings.email}
                                    </a>
                                </p>
                            )}

                            {siteSettings.contactNo && (
                                <p className="text-gray-800 flex items-center gap-1 my-2">
                                    <MdOutlinePhone size={22} />
                                    <a href={`tel:${siteSettings.contactNo}`} className="hover:text-blue-600 transition-colors">
                                        {siteSettings.contactNo}
                                    </a>
                                </p>
                            )}

                            {/* Dynamic Social Media Links */}
                            {socialLinks.length > 0 && (
                                <>
                                    <h4 className="text-[18px] font-bold text-gray-800 mt-5 mb-4">
                                        Follow Us
                                    </h4>

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

                            {/* Dynamic Map Iframe */}
                            {siteSettings.iframe && (
                                <div
                                    className="mt-6"
                                    dangerouslySetInnerHTML={{ __html: siteSettings.iframe }}
                                    key="map-iframe"
                                />
                            )}

                            {/* Fallback Map if no iframe is provided */}
                            {!siteSettings.iframe && (
                                <div className="mt-6">
                                    <iframe
                                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1767557.6473758828!2d77.98912350520003!3d30.08670972957029!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3909dcc202279c09%3A0x7c43b63689cc005!2sUttarakhand!5e0!3m2!1sen!2sin!4v1748175681800!5m2!1sen!2sin"
                                        style={{ width: "100%", height: "300px", border: "0px" }}
                                        allowFullScreen=""
                                        loading="lazy"
                                        referrerPolicy="no-referrer-when-downgrade"
                                        title="Location Map"
                                    ></iframe>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
};

export default ContactPage;
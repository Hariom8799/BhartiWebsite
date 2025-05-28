"use client";
import React, { useEffect, useState } from "react";
import { useParams, useSearchParams } from "next/navigation";
import Link from "next/link";

const apiMap = {
    certificate: "/api/state-certificates",
    skills: "/api/skill-development",
    jobs: "/api/recent-job-news",
};

const DetailsPage = () => {
    const { id } = useParams();
    const searchParams = useSearchParams();
    const type = searchParams.get("type") || "certificate";

    const [details, setDetails] = useState(null);
    const [relatedItems, setRelatedItems] = useState([]);

    useEffect(() => {
        const fetchDetails = async () => {
            try {
                const apiEndpoint = `${process.env.NEXT_PUBLIC_BASE_URL}${apiMap[type]}`;
                const response = await fetch(apiEndpoint);
                const json = await response.json();
                if (json.success) {
                    const matchedItem = json.data.find((item) => item._id === id);
                    const others = json.data.filter((item) => item._id !== id);
                    setDetails(matchedItem);
                    setRelatedItems(others.slice(0, 4)); // show max 4 related items
                } else {
                    console.error("Failed to fetch detail data");
                }
            } catch (err) {
                console.error("Error fetching details:", err);
            }
        };

        fetchDetails();
    }, [id, type]);

    if (!details) {
        return <p className="text-center py-10">Loading...</p>;
    }

    return (
        <section className="py-10 bg-white">
            <div className="container">
                <div className="flex gap-30">
                    <div className="details w-[65%] pr-24">
                        <h3 className="text-[28px] font-bold text-gray-700 mb-4">{details.title}</h3>

                        <div className="w-48 md:w-64 lg:w-80 aspect-square bg-gray-100 rounded-md overflow-hidden mb-6">
                            <img
                                src={details.thumbnail}
                                alt={details.title}
                                className="w-full h-full object-contain rounded-md"
                            />
                        </div>

                        <div
                            className="text-[17px] text-gray-700 my-4"
                            dangerouslySetInnerHTML={{ __html: details.longDescription || "" }}
                        ></div>
                    </div>

                    {/* Related Posts Section */}
                    <div className="relatedData w-[35%]">
                        {relatedItems.length > 0 && (
                            <>
                                <h4 className="text-[20px] font-bold text-gray-800 mb-4">Related Posts</h4>
                                {relatedItems.map((item) => (
                                    <div key={item._id} className="related flex items-center gap-6 py-2">
                                        <Link
                                            href={`/blog/${item._id}?type=${type}`}
                                            className="img rounded-md overflow-hidden group relative w-[35%]"
                                        >
                                            <img
                                                src={item.thumbnail}
                                                alt={item.title}
                                                className="w-full object-cover transition-all group-hover:scale-105 rounded-md"
                                            />
                                        </Link>

                                        <div className="info w-[65%]">
                                            <Link href={`/blog/${item._id}?type=${type}`}>
                                                <h3 className="text-[15px] font-bold text-gray-700 hover:!text-primary">
                                                    {item.title.length > 60
                                                        ? item.title.slice(0, 60) + "..."
                                                        : item.title}
                                                </h3>
                                            </Link>
                                            <p className="text-[13px] text-gray-600">
                                                {item.shortDescription?.slice(0, 60)}...
                                            </p>
                                        </div>
                                    </div>
                                ))}
                            </>
                        )}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default DetailsPage;

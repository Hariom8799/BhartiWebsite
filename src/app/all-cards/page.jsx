"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { MdArrowRightAlt } from "react-icons/md";

const typeConfig = {
  certificate: {
    title: "Certificate Programs",
    api: "/api/state-certificates",
  },
  skills: {
    title: "Skill Development Programs",
    api: "/api/skill-development",
  },
  jobs: {
    title: "Recent Job Posts",
    api: "/api/recent-job-news",
  },
};

const AllCards = () => {
  const [type, setType] = useState("certificate"); // Default type
  const [items, setItems] = useState([]);
  const [isMounted, setIsMounted] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Extract type from window.location.search after component mounts
  useEffect(() => {
    setIsMounted(true);
    if (typeof window !== "undefined") {
      const searchParams = new URLSearchParams(window.location.search);
      const typeParam = searchParams.get("type") || "certificate";
      setType(typeParam);
    }
  }, []);

  const config = typeConfig[type] || typeConfig["certificate"];

  // Fetch data based on type
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_BASE_URL}${config.api}`
        );
        const json = await res.json();
        if (json.success) {
          setItems(json.data);
        } else {
          setError("Failed to fetch data");
        }
      } catch (err) {
        setError("An error occurred while fetching data");
      } finally {
        setLoading(false);
      }
    };

    if (isMounted) {
      fetchData();
    }
  }, [type, isMounted]);

  // Render loading state during SSR or while fetching
  if (!isMounted || loading) {
    return <div>Loading...</div>;
  }

  // Render error state if fetch fails
  if (error) {
    return <div className="text-red-500 text-center">{error}</div>;
  }

  return (
    <>
      <div className="innerBanner flex items-center justify-center">
        <div className="container">
          <h1 className="text-center text-gray-100 text-[35px] font-bold">
            {config.title}
          </h1>
        </div>
      </div>

      <section className="py-0 bg-white">
        <div className="container">
          <div className="py-12 grid grid-cols-4 gap-10 w-full">
            {items.length === 0 ? (
              <p className="text-center col-span-4">No items found.</p>
            ) : (
              items.map((item) => (
                <div
                  key={item._id}
                  className="card border border-[rgba(0,0,0,0.050)] bg-gray-100 shadow-md rounded-md overflow-hidden group"
                >
                  <Link href={`/details-page/${item._id}?type=${type}`}>
                    <div className="img rounded-md overflow-hidden relative">
                      <img
                        src={item.thumbnail}
                        alt={item.title}
                        className="w-full transition-all group-hover:scale-105"
                      />
                    </div>
                  </Link>
                  <div className="info p-4 flex flex-col gap-3">
                    <Link href={`/blog/${item._id}`}>
                      <h3 className="text-[15px] font-bold text-gray-800 hover:!text-primary">
                        {item.title}
                      </h3>
                    </Link>
                    <p className="text-[13px] text-gray-600">
                      {item.shortDescription?.slice(0, 100)}...
                    </p>
                    <Link
                      href={`/details-page/${item._id}?type=${type}`}
                      className="text-[14px] font-bold text-gray-700 hover:text-primary flex items-center gap-1"
                    >
                      Read More <MdArrowRightAlt size={25} />
                    </Link>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </section>
    </>
  );
};

export default AllCards;

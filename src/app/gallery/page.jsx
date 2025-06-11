// app/gallery/page.js
"use client";
import React, { useState, useEffect } from "react";

const Gallery = () => {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch images from API
  useEffect(() => {
    const fetchImages = async () => {
      try {
        setLoading(true);
        // Using JSONPlaceholder photos API as example
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_BASE_URL}/api/socialImages`
        );

        if (!response.ok) {
          throw new Error("Failed to fetch images");
        }

        const data = await response.json();
        setImages(data.images);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchImages();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <p className="text-red-600 text-lg">Error: {error}</p>
          <button
            onClick={() => window.location.reload()}
            className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <section className="py-8 min-h-[70vh]">
      <div className="container mx-auto px-4">
        <h2 className="text-[30px] font-bold text-center text-gray-700 mb-4">
          Gallery
        </h2>
        <p className="text-center text-gray-600 text-[18px] mb-8">
          Explore our beautiful collection of images
        </p>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6 lg:gap-8 max-w-7xl mx-auto">
          {!loading && images.map((image) => (
            <div
              key={image._id}
              className="relative overflow-hidden rounded-[20px] aspect-[4/3] cursor-pointer group transition-all duration-300 hover:scale-[1.03] hover:drop-shadow-[0_0_20px_rgba(51,51,51,0.5)]"
            >
              <img
                src={image.image}
                alt={image.title}
                loading="lazy"
                className="w-full h-full object-cover  transition-all duration-300 shadow-[0_0_20px_#333]"
              />
              <figcaption className="absolute bottom-0 left-0 w-full h-[20%] px-6 py-4 text-white font-medium text-sm md:text-base opacity-0 group-hover:opacity-100 group-hover:scale-[1.03] transition-all duration-300 flex items-end bg-gradient-to-t from-black/50 to-transparent rounded-b-[10px]">
                {image.title}
              </figcaption>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Gallery;

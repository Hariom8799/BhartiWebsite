"use client"
import React from 'react';
import { useSiteContext } from "@/context/siteContext"; // Adjust path as needed

const AboutPage = () => {

    const { aboutData, loading, error } = useSiteContext();

    // Helper function to extract features from HTML content
    const extractFeaturesFromHTML = (htmlString) => {
        if (!htmlString) return [];

        // Create a temporary div to parse HTML
        const tempDiv = document.createElement('div');
        tempDiv.innerHTML = htmlString;

        // Extract list items
        const listItems = tempDiv.querySelectorAll('li');
        return Array.from(listItems).map(li => li.textContent);
    };

    // Helper function to extract mission statement from HTML
    const extractMissionFromHTML = (htmlString) => {
        if (!htmlString) return '';

        const tempDiv = document.createElement('div');
        tempDiv.innerHTML = htmlString;

        // Extract paragraph content
        const paragraph = tempDiv.querySelector('p');
        return paragraph ? paragraph.textContent : '';
    };

    // Show loading state
    if (loading.aboutData) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
                    <p className="text-gray-600">Loading...</p>
                </div>
            </div>
        );
    }

    // Show error state
    if (error.aboutData) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <div className="text-center">
                    <p className="text-red-600 mb-4">Error loading about page: {error.aboutData}</p>
                    <button
                        onClick={() => window.location.reload()}
                        className="px-4 py-2 bg-primary text-white rounded hover:bg-primary-dark"
                    >
                        Retry
                    </button>
                </div>
            </div>
        );
    }

    // Extract features and mission from longDescription
    const features = extractFeaturesFromHTML(aboutData.longDescription);
    const mission = extractMissionFromHTML(aboutData.longDescription);

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
                                <img
                                    src={aboutData.images?.[0] || "../about-img.jpg"}
                                    className="w-full transition-all group-hover:scale-105"
                                    alt="About"
                                />
                            </div>
                        </div>

                        <div className="right w-[60%]">
                            <span className="text-primary text-[16px] uppercase font-bold">Who we are</span>
                            <h2 className="text-[35px] font-extrabold leading-[50px] pr-5 text-gray-800">
                                {aboutData.title || "Empowering Uttarakhand's Youth Through Opportunity"}
                            </h2>
                            <div className="mt-4 text-[17px] text-gray-800 leading-[28px]">
                                {aboutData.shortDescription ? (
                                    aboutData.shortDescription.split('\r\n\r\n').map((paragraph, index) => (
                                        <p key={index} className={index > 0 ? "mt-4" : ""}>
                                            {paragraph.includes('Uttarakhand Bharti Portal') ? (
                                                <>
                                                    {paragraph.split('Uttarakhand Bharti Portal')[0]}
                                                    <strong>Uttarakhand Bharti Portal</strong>
                                                    {paragraph.split('Uttarakhand Bharti Portal')[1]}
                                                </>
                                            ) : (
                                                paragraph
                                            )}
                                        </p>
                                    ))
                                ) : (
                                    <p>Loading content...</p>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className='m-auto'>
                <div className='py-8 px-[250px] bg-white'>
                    <div className='py-8'>
                        <h3 className='text-[22px] font-bold text-gray-800 text-center mb-5'>
                            {aboutData.subTitle || "Your Government at Your Door"}
                        </h3>

                        {features.length > 0 && (
                            <ul className='list-disc text-[18px] text-gray-700 leading-[30px] pl-5'>
                                {features.map((feature, index) => (
                                    <li key={index}>{feature}</li>
                                ))}
                            </ul>
                        )}

                        {mission && (
                            <p className='mt-6 text-gray-800 text-[18px] leading-[30px]'>
                                {mission}
                            </p>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
};

export default AboutPage;
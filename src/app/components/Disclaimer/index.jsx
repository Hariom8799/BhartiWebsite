"use client";
import React from "react";

const Disclaimer = () => {
    return (
        <div className="bg-gray-700 text-gray-200 text-center text-sm py-4 px-4 ">
            <p className="max-w-4xl mx-auto leading-relaxed">
                {`This is the official website of the Chief Minister’s Office, Uttarakhand, Government of India.`}
            </p>
            <p className="max-w-4xl mx-auto leading-relaxed">{`The content on this website is published and managed by the Chief Minister’s Office, Uttarakhand.`}</p>
            <p className="max-w-4xl mx-auto leading-relaxed">{`For any queries related to the content or functioning of this website, please contact the Web Information Manager.`}</p>

        </div>
    );
};

export default Disclaimer;

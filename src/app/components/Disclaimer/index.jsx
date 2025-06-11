"use client";
import React from "react";

const Disclaimer = () => {
    return (
        <div className="bg-gray-700 text-gray-200 text-center text-sm py-4 px-4 ">
            <p className="max-w-4xl mx-auto leading-relaxed">
                यह चिकित्सा स्वास्थ्य एवं परिवार कल्याण विभाग, उत्तर प्रदेश की आधिकारिक वेबसाइट है।
            </p>
            <p className="max-w-4xl mx-auto leading-relaxed">इस वेबसाइट पर प्रकाशित विषयवस्तु व उसके प्रबंधन का कार्य चिकित्सा स्वास्थ्य एवं परिवार कल्याण विभाग, उत्तर प्रदेश द्वारा किया जा रहा है।</p>
            <p className="max-w-4xl mx-auto leading-relaxed">{`इस वेबसाइट के बारे में किसी भी प्रश्न के लिए, " वेब सूचना प्रबंधक " से संपर्क करें।`}</p>

        </div>
    );
};

export default Disclaimer;

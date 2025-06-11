"use client";
import React from "react";
import {
    Accordion,
    AccordionSummary,
    AccordionDetails,
    Typography,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

const faqList = [
    {
        question: "What is the Uttarakhand Bharti Portal?",
        answer:
            "The Job Bharti Portal is an online platform that provides information about the latest Uttarakhand state government job openings. It helps job seekers stay updated on recruitment notifications and important deadlines. Uttarakhand Bharti Portal also enriched with Skill development programs and certifications programs.",
    },
    {
        question: "Who can use this portal?",
        answer:
            "Anyone looking for a job, whether in Uttarakhand or elsewhere in India, can use the portal. Eligibility depends on the job notification.",
    },
    {
        question: "Is registration required to apply for jobs?",
        answer:
            "No, registration is not required. Users can directly view jobs related to their education and experience.",
    },
    {
        question: "How can I find suitable jobs?",
        answer:
            "You can search jobs by category, qualification, location, department, or job type (e.g., permanent, contract, temporary).",
    },
    {
        question: "Can I apply for jobs directly through this portal?",
        answer:
            "Yes, most job listings include a direct application link or redirect you to the official recruitment portal of the concerned departments.",
    },
    {
        question: "Does the portal provide exam syllabus, admit cards, and results?",
        answer:
            "No, this website is mainly intended to view the latest UK state government jobs only. For other job-related information, kindly refer to the department link provided.",
    },
    {
        question: "Is the information on this portal authentic?",
        answer:
            "Yes, job notifications and details are sourced from official government departments or verified sources.",
    },
    {
        question: "What are skill development programs on the Uttarakhand Bharti Portal?",
        answer:
            "Skill development programs are training courses designed to enhance the employability of job seekers by providing them with practical and industry-relevant skills in various sectors.",
    },
    {
        question: "Who can enroll in these programs?",
        answer:
            "Anyone who is eligible for the listed program and interested in upgrading their skills or learning new ones can apply. Some programs may have specific qualification criteria.",
    },
    {
        question: "Are these courses free of cost?",
        answer:
            "Many government-sponsored programs are free or subsidized. Some specialized certification courses may have a nominal fee. Fee details are mentioned in each course description.",
    },
    {
        question: "How do I register for a skill development course?",
        answer:
            "Go to the webpage of the Uttarakhand Bharti Portal, navigate to the Skill Development section, choose the course you're interested in, and click 'Apply' or 'Enroll'.",
    },
    {
        question: "Will I get a certificate after completing the program?",
        answer:
            "Yes, upon successful completion, participants receive a Government-recognized certificate or a certificate from the training partner.",
    },
    {
        question: "Are the training partners verified?",
        answer:
            "Yes, all training partners listed on the portal are approved by relevant government bodies or skill development councils.",
    },
];

const FaqPage = () => {
    return (
        <>
            <div className="innerBanner flex items-center justify-center">
                <div className="container">
                    <h1 className="text-center text-gray-100 text-[35px] font-bold">FAQs</h1>
                </div>
            </div>

            <div className="py-12 px-5 lg:px-[250px] bg-white min-h-[70vh]">
                <div className="mb-10 text-center">
                    {/* <h3 className="text-[28px] text-gray-800 font-bold">
                        Frequently Asked Questions
                    </h3> */}
                    <p className="text-[17px] text-gray-700">
                        Find answers to commonly asked questions about the Uttarakhand Bharti Portal.
                    </p>
                </div>

                <div className="space-y-4">
                    {faqList.map((faq, index) => (
                        <Accordion key={index} className="shadow-sm border border-gray-200">
                            <AccordionSummary
                                expandIcon={<ExpandMoreIcon />}
                                aria-controls={`panel${index}-content`}
                                id={`panel${index}-header`}
                            >
                                <Typography className="text-[17px] font-medium text-gray-800">
                                    {index + 1}. {faq.question}
                                </Typography>
                            </AccordionSummary>
                            <AccordionDetails>
                                <Typography className="text-[16px] text-gray-700 leading-relaxed">
                                    {faq.answer}
                                </Typography>
                            </AccordionDetails>
                        </Accordion>
                    ))}
                </div>
            </div>
        </>
    );
};

export default FaqPage;

"use client";
import React, { useEffect, useState } from "react";
import { Button } from "@mui/material";
import dayjs from "dayjs";
import axios from "axios";
import Link from "next/link";

const RecentJobs = () => {
    const [jobs, setJobs] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    const fetchVisibleJobs = async () => {
        try {
            const res = await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/api/department-jobs/all?visible=true`);
            if (res.data.success) {
                setJobs(res.data.jobs);
            }
        } catch (error) {
            console.error("Error fetching visible jobs:", error);
        } finally {
            setIsLoading(false);
        }
    };

    const isNewJob = (postedOn) => {
        return dayjs().diff(dayjs(postedOn), "day") <= 7;
    };


    useEffect(() => {
        fetchVisibleJobs();
    }, []);

    if (isLoading) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
                    <p className="text-gray-600">Loading...</p>
                </div>
            </div>
        );
    }

    return (
        <section className="section py-12 min-h-[70vh]">
            <div className="container">
                <div className="mb-10 text-center">
                    <h3 className="text-[28px] text-gray-700 font-bold">Recent Jobs</h3>
                    <p className="text-[17px] text-gray-700">Jobs currently visible to the public.</p>
                </div>

                <div className="overflow-auto bg-white shadow-md p-0 rounded-md">
                    <table className="min-w-full text-sm text-left border border-gray-200 table">
                        <thead className="bg-gray-100">
                            <tr>
                                <th className="px-2 py-2 border">S.No.</th>
                                <th className="px-2 py-2 border">Position</th>
                                <th className="px-2 py-2 border">Location</th>
                                <th className="px-2 py-2 border">Vacancies</th>
                                <th className="px-2 py-2 border">Posted</th>
                                <th className="px-2 py-2 border">Last Date</th>
                                <th className="px-2 py-2 border">Department</th>
                            </tr>
                        </thead>
                        <tbody>
                            {jobs.map((job,index) => (
                                <tr key={job._id}>
                                    <td className="px-2 py-2 border">{index+1}</td>
                                    <td className="px-2 py-2 border">
                                        <div className="flex items-center gap-2">
                                            <span>{job.nameOfPosition}</span>
                                            {isNewJob(job.postedOn) && (
                                                <Link
                                                    href={`/career/department/jobs?id=${job.departmentId?._id}&type=${job.createdBy?.departmentType}`}
                                                    title="Click to view department jobs"
                                                >
                                                    <span className="text-xs font-semibold bg-red-500 text-white px-1 py-1 rounded-full animate-pulse transition hover:bg-red-600 cursor-pointer">
                                                        New!
                                                    </span>
                                                </Link>
                                            )}
                                        </div>
                                    </td>
                                    <td className="px-2 py-2 border">{job.location}</td>
                                    <td className="px-2 py-2 border">{job.totalVacancies}</td>
                                    <td className="px-2 py-2 border">{dayjs(job.postedOn).format("DD-MM-YYYY")}</td>
                                    <td className="px-2 py-2 border">{dayjs(job.lastDateOfSubmission).format("DD-MM-YYYY")}</td>
                                    <td className="px-2 py-2 border">{job.departmentId?.name || "N/A"}</td>
                                </tr>
                            ))}
                            {jobs.length === 0 && (
                                <tr>
                                    <td colSpan="6" className="px-4 py-4 text-center text-gray-500">
                                        No visible jobs found.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </section>
    );
};

export default RecentJobs;

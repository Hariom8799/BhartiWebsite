"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import {  GetApp} from "@mui/icons-material";

const Jobs = () => {
  const [departmentId, setDepartmentId] = useState(null);
  const [departmentType, setDepartmentType] = useState(null);
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isMounted, setIsMounted] = useState(false);

  const deptMap = {
    "Govt": "GovtDept",
    "Aided": "AidedDept",
    "Public": "PublicUndertaking"
  }

  // Function to get query parameters from URL
  const getQueryParams = () => {
    if (typeof window !== "undefined") {
      const searchParams = new URLSearchParams(window.location.search);
      return {
        id: searchParams.get("id") || null,
        type: searchParams.get("type") || null,
      };
    }
    return { id: null, type: null };
  };

  // Set query parameters on mount and listen for URL changes
  useEffect(() => {
    setIsMounted(true);
    const { id, type } = getQueryParams();
    setDepartmentId(id);
    setDepartmentType(deptMap[type] || type);

    // Listen for URL changes (e.g., back/forward navigation)
    const handlePopState = () => {
      const { id, type } = getQueryParams();
      setDepartmentId(id);
      setDepartmentType(deptMap[type] || type);
    };

    window.addEventListener("popstate", handlePopState);
    return () => window.removeEventListener("popstate", handlePopState);
  }, []);

  // Fetch jobs based on departmentId and departmentType
  useEffect(() => {
    const fetchJobs = async () => {
      if (!isMounted || !departmentId || !departmentType) {
        setLoading(false);
        return;
      }

      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_BASE_URL}/api/department-jobs/getAllJobs/?departmentId=${departmentId}&departmentType=${departmentType}`
        );
        const data = await res.json();

        if (data.success) {
          setJobs(data.jobs);
        } else {
          setError("Failed to fetch jobs: " + (data.error || "Unknown error"));
        }
      } catch (error) {
        setError("An error occurred while fetching jobs");
      } finally {
        setLoading(false);
      }
    };

    fetchJobs();
  }, [departmentId, departmentType, isMounted]);

  // Function to get download link
  const getDownloadUrl = (fileData) => {
    // Handle both old format (direct URL) and new format (object with URLs)
    if (typeof fileData === 'object' && fileData.downloadUrl) {
      return fileData.downloadUrl;
    } else if (typeof fileData === 'string') {
      // For Cloudinary URLs, add fl_attachment to force download
      if (fileData.includes('cloudinary.com')) {
        if (fileData.includes('/image/upload/')) {
          return fileData.replace('/image/upload/', '/image/upload/fl_attachment/');
        } else if (fileData.includes('/raw/upload/')) {
          return fileData.replace('/raw/upload/', '/raw/upload/fl_attachment/');
        }
      }
      return fileData;
    }
    return fileData;
  };

  if (!isMounted || loading) {
    return (
      <section className="py-10 min-h-[60vh]">
        <div className="container">
          <h2 className="text-[30px] font-bold text-center text-gray-700">
            Jobs
          </h2>
          <div className="flex justify-center mt-8">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="py-10 min-h-[60vh]">
        <div className="container">
          <h2 className="text-[30px] font-bold text-center text-gray-700">
            Jobs
          </h2>
          <p className="text-center mt-5 text-red-500">{error}</p>
        </div>
      </section>
    );
  }

  return (
    <>
      <section className="py-10 min-h-[60vh]">
        <div className="container">
          <h2 className="text-[30px] font-bold text-center text-gray-700">
            Jobs
          </h2>

          { (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5 py-5">
              {jobs.map((job) => (
                <div
                  key={job._id}
                  className="card rounded-lg flex flex-col gap-1 bg-white shadow-md border-2 border-l-primary p-4"
                >
                  <h3 className="text-[16px] font-bold text-gray-600">
                    {job.nameOfPosition}
                  </h3>
                  <h4 className="text-[14px] text-gray-600">
                    Vacancies: {job.totalVacancies}
                  </h4>
                  <h4 className="text-[13px] font-bold text-gray-600">
                    <span className="bg-gray-200 inline-block py-1 px-3 rounded-full leading-4">
                      {job.location}
                    </span>
                  </h4>
                  <h4 className="text-[14px] font-semibold text-gray-600 mt-2">
                    Last Date:{" "}
                    {new Date(job.lastDateOfSubmission).toLocaleDateString()}
                  </h4>
                  <h4 className="text-[14px] text-gray-600">
                    Posted on: {new Date(job.postedOn).toLocaleDateString()}
                  </h4>
                  <h4 className="text-[14px] text-gray-600">
                    Advertisement:{" "}
                    {new Date(job.dateOfAdvertisement).toLocaleDateString()}
                  </h4>

                  <div className="flex justify-between items-center mt-3">
                    <Link
                      href="https://www.upcl.org/recruitment/"
                      className="text-primary text-[15px] font-bold hover:text-gray-800"
                    >
                      Click To Apply
                    </Link>

                    {job.jobDescriptionFile && (
                      <div className="flex gap-2">
                        {/* View Button */}
                        <Link
                          href={job.jobDescriptionFile}
                          target="_blank"
                          rel="noopener noreferrer"
                          title="View Job Description"
                         >
                        <button
                         
                          title="View Job Description"
                          className="text-primary hover:text-blue-800 p-1 transition-colors"
                        >
                          {/* {getFileIcon(job.jobDescriptionFile)} */}
                          View More
                        </button>
                        </Link>

                        {/* Download Button */}
                        <a
                          href={getDownloadUrl(job.jobDescriptionFile)}
                          download
                          title="Download Job Description"
                          className="text-primary hover:text-green-800 p-1 transition-colors"
                        >
                          <GetApp />
                        </a>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* PDF Viewer Dialog */}

    </>
  );
};

export default Jobs;
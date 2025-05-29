"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { CircularProgress, Dialog, DialogTitle, DialogContent, DialogActions, Button, IconButton } from "@mui/material";
import { Visibility, PictureAsPdf, GetApp, Close } from "@mui/icons-material";
import { Document, Page, pdfjs } from 'react-pdf';
import 'react-pdf/dist/esm/Page/AnnotationLayer.css';
import 'react-pdf/dist/esm/Page/TextLayer.css';

// Set up PDF.js worker
pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.js`;

const Jobs = () => {
  const [departmentId, setDepartmentId] = useState(null);
  const [departmentType, setDepartmentType] = useState(null);
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isMounted, setIsMounted] = useState(false);

  // PDF Viewer state
  const [pdfDialog, setPdfDialog] = useState({
    open: false,
    url: "",
    title: ""
  });
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);
  const [pdfLoading, setPdfLoading] = useState(false);
  const [pdfError, setPdfError] = useState(null);

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
    setDepartmentType(type);

    // Listen for URL changes (e.g., back/forward navigation)
    const handlePopState = () => {
      const { id, type } = getQueryParams();
      setDepartmentId(id);
      setDepartmentType(type);
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

  // PDF Document Load Success Handler
  const onDocumentLoadSuccess = ({ numPages }) => {
    setNumPages(numPages);
    setPageNumber(1);
    setPdfLoading(false);
    setPdfError(null);
  };

  // PDF Document Load Error Handler
  const onDocumentLoadError = (error) => {
    console.error('PDF load error:', error);
    setPdfError('Failed to load PDF document');
    setPdfLoading(false);
  };

  // Function to handle PDF viewing
  const handlePdfView = (fileData, jobTitle) => {
    let url = fileData;

    // Handle both old format (direct URL) and new format (object with URLs)
    if (typeof fileData === 'object' && fileData.viewUrl) {
      url = fileData.viewUrl;
    } else if (typeof fileData === 'string') {
      url = fileData;
    }

    const isPdf = url.toLowerCase().includes('.pdf') ||
      url.toLowerCase().includes('image/upload') ||
      (typeof fileData === 'object' && fileData.type === 'pdf');

    if (isPdf) {
      setPdfDialog({ open: true, url: url, title: jobTitle });
      setPdfLoading(true);
      setPdfError(null);
      setNumPages(null);
      setPageNumber(1);
    } else {
      // For images, open directly
      window.open(url, '_blank');
    }
  };

  // Function to close PDF dialog
  const closePdfDialog = () => {
    setPdfDialog({ open: false, url: "", title: "" });
    setNumPages(null);
    setPageNumber(1);
    setPdfLoading(false);
    setPdfError(null);
  };

  // Function to go to previous page
  const goToPrevPage = () => {
    setPageNumber(prevPageNumber => Math.max(prevPageNumber - 1, 1));
  };

  // Function to go to next page
  const goToNextPage = () => {
    setPageNumber(prevPageNumber => Math.min(prevPageNumber + 1, numPages || 1));
  };

  // Function to get file type icon
  const getFileIcon = (url) => {
    const isPdf = url.toLowerCase().includes('.pdf') ||
      url.toLowerCase().includes('resource_type=raw');
    return isPdf ? <PictureAsPdf /> : <Visibility />;
  };

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
            <CircularProgress />
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

          {jobs.length === 0 ? (
            <p className="text-center mt-5 text-gray-600">
              No jobs available for this department.
            </p>
          ) : (
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
                      href="#"
                      className="text-primary text-[15px] font-bold hover:text-gray-800"
                    >
                      View & Apply
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
                          {getFileIcon(job.jobDescriptionFile)}
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
      <Dialog
        open={pdfDialog.open}
        onClose={closePdfDialog}
        maxWidth="lg"
        fullWidth
        PaperProps={{
          style: {
            minHeight: '80vh',
            maxHeight: '90vh'
          }
        }}
      >
        <DialogTitle sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          paddingBottom: 1
        }}>
          <span>{pdfDialog.title}</span>
          <IconButton onClick={closePdfDialog} size="small">
            <Close />
          </IconButton>
        </DialogTitle>

        <DialogContent sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          padding: 2
        }}>
          {pdfLoading && (
            <div className="flex justify-center items-center py-8">
              <CircularProgress />
              <span className="ml-2">Loading PDF...</span>
            </div>
          )}

          {pdfError && (
            <div className="text-center py-8">
              <p className="text-red-500 mb-4">{pdfError}</p>
              <Button
                variant="contained"
                onClick={() => window.open(pdfDialog.url, '_blank')}
              >
                Open in New Tab
              </Button>
            </div>
          )}

          {pdfDialog.url && !pdfError && (
            <Document
              file={pdfDialog.url}
              onLoadSuccess={onDocumentLoadSuccess}
              onLoadError={onDocumentLoadError}
              loading={
                <div className="flex justify-center items-center py-8">
                  <CircularProgress />
                  <span className="ml-2">Loading PDF...</span>
                </div>
              }
              error={
                <div className="text-center py-8">
                  <p className="text-red-500 mb-4">Failed to load PDF</p>
                  <Button
                    variant="contained"
                    onClick={() => window.open(pdfDialog.url, '_blank')}
                  >
                    Open in New Tab
                  </Button>
                </div>
              }
            >
              <Page
                pageNumber={pageNumber}
                width={Math.min(window.innerWidth * 0.8, 800)}
                loading={
                  <div className="flex justify-center items-center py-4">
                    <CircularProgress size={24} />
                  </div>
                }
              />
            </Document>
          )}

          {/* Page Navigation */}
          {numPages && numPages > 1 && (
            <div className="flex items-center gap-4 mt-4 p-2 bg-gray-100 rounded">
              <Button
                onClick={goToPrevPage}
                disabled={pageNumber <= 1}
                variant="outlined"
                size="small"
              >
                Previous
              </Button>

              <span className="text-sm">
                Page {pageNumber} of {numPages}
              </span>

              <Button
                onClick={goToNextPage}
                disabled={pageNumber >= numPages}
                variant="outlined"
                size="small"
              >
                Next
              </Button>
            </div>
          )}
        </DialogContent>

        <DialogActions sx={{ padding: 2 }}>
          <Button
            onClick={() => window.open(pdfDialog.url, '_blank')}
            variant="outlined"
          >
            Open in New Tab
          </Button>
          <Button
            href={getDownloadUrl(pdfDialog.url)}
            download
            variant="contained"
            startIcon={<GetApp />}
          >
            Download
          </Button>
          <Button onClick={closePdfDialog}>
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default Jobs;
"use client";
import React, { useState, useEffect } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import toast from "react-hot-toast";
import { useAuth } from "../../context/AuthContext";

const AddJob = () => {
  const { user, authToken, isLoading } = useAuth();
  const [jobDescriptionFile, setJobDescriptionFile] = useState(null);
  const [editingId, setEditingId] = useState(null);
  const [jobs, setJobs] = useState([]);

  const deptMap = {
    "Govt": "Government Department",
    "Aided": "Aided Department",
    "Public": "Public Undertaking Department"
  }

  const [formFields, setFormFields] = useState({
    nameOfPosition: "",
    totalVacancies: "",
    location: "",
    lastDateOfSubmission: "",
    postedOn: "",
    dateOfAdvertisement: "",
    noOfFilledPosition: "",
  });

  useEffect(() => {
    if (user?.department?._id) {
      fetchJobs();
    }
  }, [user]);

  const fetchJobs = async () => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/department-jobs?departmentId=${user.department._id}`,
        {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        }
      );
      const data = await res.json();
      if (data.success) setJobs(data.jobs);
    } catch (err) {
      console.error(err);
      toast.error("Failed to load jobs.");
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormFields((prev) => ({ ...prev, [name]: value }));
  };

  // Updated handleSubmit function in AddJob component
  const handleSubmit = async () => {
    const {
      nameOfPosition,
      totalVacancies,
      location,
      lastDateOfSubmission,
      postedOn,
      dateOfAdvertisement,
      noOfFilledPosition,
    } = formFields;

    if (
      !nameOfPosition ||
      !totalVacancies ||
      !location ||
      !lastDateOfSubmission ||
      !postedOn ||
      !dateOfAdvertisement
    ) {
      return toast.error("Please fill in all required fields.");
    }

    const loadingToast = toast.loading(
      editingId ? "Updating..." : "Publishing..."
    );

    try {
      const formData = new FormData();

      // Add form fields
      Object.entries(formFields).forEach(([key, value]) => {
        if (key !== "noOfFilledPosition" || editingId) {
          formData.append(key, value);
        }
      });

      formData.append("departmentType", user.departmentTypeRef);
      formData.append("departmentId", user.department._id);

      // Add file if selected
      if (jobDescriptionFile) {
        console.log("Adding file to FormData:", jobDescriptionFile);
        formData.append("jobDescriptionFile", jobDescriptionFile);
      }

      // Debug: Log FormData contents
      console.log("FormData contents:");
      for (let [key, value] of formData.entries()) {
        console.log(key, value);
      }

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/department-jobs${editingId ? `/${editingId}` : ""
        }`,
        {
          method: editingId ? "PUT" : "POST",
          headers: {
            Authorization: `Bearer ${authToken}`,
            // Don't set Content-Type header - let browser set it for FormData
          },
          body: formData,
        }
      );

      const data = await res.json();
      console.log("Server response:", data);

      if (data.success) {
        toast.success(
          `Job ${editingId ? "updated" : "published"} successfully!`,
          { id: loadingToast }
        );
        resetForm();
        fetchJobs();
      } else {
        toast.error(data.message || "Operation failed", { id: loadingToast });
      }
    } catch (err) {
      console.error("Submit error:", err);
      toast.error("Something went wrong!", { id: loadingToast });
    }
  };

  // Updated file input handler
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    console.log("File selected:", file);

    if (file) {
      // Validate file type
      const allowedTypes = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
      const allowedExtensions = ['.pdf', '.doc', '.docx'];
      const fileExtension = file.name.toLowerCase().substring(file.name.lastIndexOf('.'));

      if (!allowedTypes.includes(file.type) && !allowedExtensions.includes(fileExtension)) {
        toast.error("Please select a PDF, DOC, or DOCX file");
        e.target.value = ''; // Clear the input
        return;
      }

      // Check file size (10MB limit)
      if (file.size > 10 * 1024 * 1024) {
        toast.error("File size must be less than 10MB");
        e.target.value = ''; // Clear the input
        return;
      }

      setJobDescriptionFile(file);
      console.log("File set successfully:", file.name);
    } else {
      setJobDescriptionFile(null);
    }
  };

  const resetForm = () => {
    setFormFields({
      nameOfPosition: "",
      totalVacancies: "",
      location: "",
      lastDateOfSubmission: "",
      postedOn: "",
      dateOfAdvertisement: "",
      noOfFilledPosition: "",
    });
    setJobDescriptionFile(null);
    setEditingId(null);
  };

  const handleEdit = (job) => {
    setEditingId(job._id);
    setFormFields({
      nameOfPosition: job.nameOfPosition,
      totalVacancies: job.totalVacancies,
      location: job.location,
      lastDateOfSubmission: job.lastDateOfSubmission?.split("T")[0],
      postedOn: job.postedOn?.split("T")[0],
      dateOfAdvertisement: job.dateOfAdvertisement?.split("T")[0],
      noOfFilledPosition: job.noOfFilledPosition ?? "",
    });
    setJobDescriptionFile(null);
  };

  const handleDelete = async (id) => {
    if (!confirm("Are you sure you want to delete this job?")) return;

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/department-jobs/${id}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        }
      );
      const data = await res.json();
      if (data.success) {
        toast.success("Job deleted");
        fetchJobs();
      } else {
        toast.error("Failed to delete job.");
      }
    } catch (err) {
      console.error(err);
      toast.error("Error deleting job.");
    }
  };

  if (!user) {
    return (
      <div className="flex items-center justify-center min-h-[calc(70vh)]">
        <div className="text-center">
          <p className="text-red-600 mb-4">You must be logged in to access this page.</p>
          <Button variant="contained" color="primary" onClick={() => window.location.href = "/department-login"}>
            Login
          </Button>
        </div>
      </div>
    );
  }

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
    <section className="section py-12">
      <div className="container">
        
       
          <div className="mb-5">
              <h3 className="text-[28px] text-gray-700 font-bold">
                Job Descriptions
              </h3>
              <p className="text-[17px] text-gray-700">
                Fill the form to {editingId ? "update" : "publish"} a department job
                post.
              </p>
            </div>

        <div className="mb-5 max-w-3xl">
          <div className="space-y-2 bg-white shadow-md border border-gray-200 rounded-md p-4">
            <h2 className="text-xl font-bold text-gray-800">
              Welcome back, <span className="text-blue-600">{user.name}</span>
            </h2>
            <div className="space-y-1">
              <p className="text-sm font-semibold text-gray-700">
                {deptMap[user.departmentType]}
              </p>
              <p className="text-md font-bold text-[#ed3338]">
                {user?.department?.name}
              </p>
            </div>
          </div>
        </div>

          <div className="relative">
            

          <div className="bg-white shadow-lg rounded-xl border border-gray-100 p-8 mb-10 max-w-3xl">
              <div className="border-b border-gray-100 pb-4 mb-6">
                <h4 className="text-lg font-semibold text-gray-800 flex items-center space-x-2">
                  {/* <span>{editingId ? "✏️" : "➕"}</span> */}
                  <span>{editingId ? "Edit Job Posting" : "Create New Job Posting"}</span>
                </h4>
              </div>
              <form className="w-full mt-2 flex gap-5 flex-col">
                <TextField
                  label="Name of Position"
                  name="nameOfPosition"
                  variant="standard"
                  value={formFields.nameOfPosition}
                  onChange={handleChange}
                />
                <TextField
                  label="Total Vacancies"
                  name="totalVacancies"
                  type="number"
                  variant="standard"
                  value={formFields.totalVacancies}
                  onChange={handleChange}
                />
                <TextField
                  label="Location"
                  name="location"
                  variant="standard"
                  value={formFields.location}
                  onChange={handleChange}
                />
                <TextField
                  label="Last Date of Submission"
                  name="lastDateOfSubmission"
                  type="date"
                  variant="standard"
                  InputLabelProps={{ shrink: true }}
                  value={formFields.lastDateOfSubmission}
                  onChange={handleChange}
                />
                <TextField
                  label="Posted On"
                  name="postedOn"
                  type="date"
                  variant="standard"
                  InputLabelProps={{ shrink: true }}
                  value={formFields.postedOn}
                  onChange={handleChange}
                />
                <TextField
                  label="Date of Advertisement"
                  name="dateOfAdvertisement"
                  type="date"
                  variant="standard"
                  InputLabelProps={{ shrink: true }}
                  value={formFields.dateOfAdvertisement}
                  onChange={handleChange}
                />
                {editingId && (
                  <TextField
                    label="No. of Filled Positions"
                    name="noOfFilledPosition"
                    type="number"
                    variant="standard"
                    value={formFields.noOfFilledPosition}
                    onChange={handleChange}
                  />
                )}

              <div className="mt-6 p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-[#ed3338] transition-colors">
                  <label className="block text-gray-700 font-medium text-sm mb-2">
                    📄 Job Description File (Optional)
                  </label>
                  <input
                    type="file"
                    onChange={handleFileChange}
                    accept=".pdf,.doc,.docx"
                    className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 cursor-pointer"
                  />
                  <p className="text-xs text-gray-500 mt-2">
                    Accepted formats: PDF, DOC, DOCX (Max: 10MB)
                  </p>
                  {jobDescriptionFile && (
                    <div className="mt-2 flex items-center space-x-2 text-sm text-green-600">
                      <span>✓</span>
                      <span>{jobDescriptionFile.name}</span>
                    </div>
                  )}
                </div>

                {/* <div className="flex items-center mt-5 gap-4">
                  <Button
                    onClick={handleSubmit}
                    disabled={isLoading}
                    className="btn-custom"
                  >
                    <span>
                      {isLoading
                        ? "Processing..."
                        : editingId
                          ? "Update Job"
                          : "Publish Job"}
                    </span>
                  </Button>
                  {editingId && (
                    <Button className="btn-border !font-bold" onClick={resetForm}>
                      Cancel Edit
                    </Button>
                  )}
                </div> */}
                <div className="flex items-center mt-8 gap-4 pt-4 border-t border-gray-200">
                  <Button
                    onClick={handleSubmit}
                    disabled={isLoading}
                    variant="contained"
                    size="large"
                  className="btn-custom"
                  >
                    {isLoading ? (
                      <div className="flex items-center space-x-2">
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                        <span>Processing...</span>
                      </div>
                    ) : (
                      <span>{editingId ? "🔄 Update Job" : "📝 Publish Job"}</span>
                    )}
                  </Button>
                  {editingId && (
                    <Button
                      variant="outlined"
                      size="large"
                      onClick={resetForm}
                      className="!border-gray-300 !text-gray-700 hover:!bg-gray-50 !px-6 !py-3 !rounded-lg !font-medium"
                    >
                      ✕ Cancel Edit
                    </Button>
                  )}
                </div>
              </form>
            </div>

            
            
        
            

          </div>

          

        

        <div className="mt-12">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-2xl font-bold text-gray-800 flex items-center space-x-2">
              <span>📋</span>
              <span>Department Jobs</span>
            </h3>
            <div className="text-sm text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
              {jobs.length} {jobs.length === 1 ? 'job' : 'jobs'} posted
            </div>
          </div>
          {/* <div className="overflow-auto bg-white shadow-md p-0 rounded-md">
            <table className="min-w-full text-sm text-left border border-gray-200 table">
              <thead className="bg-gray-100">
                <tr>
                  <th className="px-4 py-2 border">Position</th>
                  <th className="px-4 py-2 border">Location</th>
                  <th className="px-4 py-2 border">Vacancies</th>
                  <th className="px-4 py-2 border">Filled</th>
                  <th className="px-4 py-2 border">Posted</th>
                  <th className="px-4 py-2 border">Actions</th>
                </tr>
              </thead>
              <tbody>
                {jobs.map((job) => (
                  <tr key={job._id}>
                    <td className="px-4 py-2 border">{job.nameOfPosition}</td>
                    <td className="px-4 py-2 border">{job.location}</td>
                    <td className="px-4 py-2 border">{job.totalVacancies}</td>
                    <td className="px-4 py-2 border">
                      {job.noOfFilledPosition ?? 0}
                    </td>
                    <td className="px-4 py-2 border">
                      {job.postedOn?.split("T")[0]}
                    </td>
                    <td className="px-4 py-2 border space-x-2">
                      <Button
                        size="small"
                        variant="outlined"
                        onClick={() => handleEdit(job)}
                      >
                        Edit
                      </Button>
                      <Button
                        size="small"
                        color="error"
                        variant="outlined"
                        onClick={() => handleDelete(job._id)}
                      >
                        Delete
                      </Button>
                    </td>
                  </tr>
                ))}
                {jobs.length === 0 && (
                  <tr>
                    <td
                      colSpan="6"
                      className="px-4 py-4 text-center text-gray-500"
                    >
                      No jobs found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div> */}
          <div className="bg-white shadow-lg rounded-xl border border-gray-100 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="min-w-full text-sm">
                <thead className="bg-gradient-to-r from-gray-50 to-gray-100">
                  <tr>
                    <th className="px-6 py-4 text-left font-semibold text-gray-700 border-b border-gray-200">Position</th>
                    <th className="px-6 py-4 text-left font-semibold text-gray-700 border-b border-gray-200">Location</th>
                    <th className="px-6 py-4 text-center font-semibold text-gray-700 border-b border-gray-200">Vacancies</th>
                    <th className="px-6 py-4 text-center font-semibold text-gray-700 border-b border-gray-200">Filled</th>
                    <th className="px-6 py-4 text-center font-semibold text-gray-700 border-b border-gray-200">Posted</th>
                    <th className="px-6 py-4 text-center font-semibold text-gray-700 border-b border-gray-200">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {jobs.map((job, index) => (
                    <tr key={job._id} className={`hover:bg-gray-50 transition-colors ${index % 2 === 0 ? 'bg-white' : 'bg-gray-25'}`}>
                      <td className="px-6 py-4 font-medium text-gray-900">{job.nameOfPosition}</td>
                      <td className="px-6 py-4 text-gray-600">{job.location}</td>
                      <td className="px-6 py-4 text-center">
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                          {job.totalVacancies}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-center">
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                          {job.noOfFilledPosition ?? 0}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-center text-gray-600">
                        {new Date(job.postedOn).toLocaleDateString()}
                      </td>
                      <td className="px-6 py-4 text-center">
                        <div className="flex justify-center space-x-2">
                          <Button
                            size="small"
                            variant="outlined"
                            onClick={() => handleEdit(job)}
                            className="!text-blue-600 !border-blue-200 hover:!bg-blue-50 !text-xs !px-3 !py-1"
                          >
                            ✏️ Edit
                          </Button>
                          <Button
                            size="small"
                            color="error"
                            variant="outlined"
                            onClick={() => handleDelete(job._id)}
                            className="!text-red-600 !border-red-200 hover:!bg-red-50 !text-xs !px-3 !py-1"
                          >
                            🗑️ Delete
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                  {jobs.length === 0 && (
                    <tr>
                      <td colSpan="6" className="px-6 py-12 text-center">
                        <div className="flex flex-col items-center space-y-3">
                          <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center">
                            <span className="text-2xl">📝</span>
                          </div>
                          <p className="text-gray-500 text-lg">No jobs posted yet</p>
                          <p className="text-gray-400 text-sm">Create your first job posting to get started</p>
                        </div>
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AddJob;

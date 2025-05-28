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
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/department-jobs?departmentId=${user.department._id}`
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

  const handleFileChange = (e) => {
    setJobDescriptionFile(e.target.files[0]);
  };

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

      Object.entries(formFields).forEach(([key, value]) => {
        if (key !== "noOfFilledPosition" || editingId) {
          formData.append(key, value);
        }
      });

      formData.append("departmentType", user.departmentType);
      formData.append("departmentId", user.department._id);

      if (jobDescriptionFile) {
        formData.append("jobDescriptionFile", jobDescriptionFile);
      }

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/department-jobs${editingId ? `/${editingId}` : ""
        }`,
        {
          method: editingId ? "PUT" : "POST",
          headers: { Authorization: `Bearer ${authToken}` },
          body: formData,
        }
      );

      const data = await res.json();

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
      console.error(err);
      toast.error("Something went wrong!", { id: loadingToast });
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

  if (isLoading) return <p>Loading...</p>;
  if (!user) return <p className="text-center py-10">Please login to view jobs.</p>;


  return (
    <section className="section py-12">
      <div className="container">
        <div className="mb-10">
          <h3 className="text-[28px] text-gray-700 font-bold">
            Job Descriptions
          </h3>
          <p className="text-[17px] text-gray-700">
            Fill the form to {editingId ? "update" : "publish"} a department job
            post.
          </p>
        </div>

        <div className="card shadow-md rounded-md bg-white p-5 px-10 mb-10 max-w-4xl">
          <form className="w-full mt-5 grid grid-cols-2 gap-4">
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

            <div className="col-span-2 mt-4">
              <label className="text-gray-700 font-medium text-sm">
                Upload Job Description File (Optional)
              </label>
              <input
                type="file"
                onChange={handleFileChange}
                accept=".pdf,.doc,.docx"
                className="mt-2 block w-full text-sm"
              />
            </div>

            <div className="col-span-2 flex items-center mt-5 gap-4">
              <Button
                onClick={handleSubmit}
                disabled={isLoading}
                className="btn-custom w-full"
              >
                {isLoading
                  ? "Processing..."
                  : editingId
                    ? "Update Job"
                    : "Publish Job"}
              </Button>
              {editingId && (
                <Button variant="outlined" onClick={resetForm}>
                  Cancel Edit
                </Button>
              )}
            </div>
          </form>
        </div>

        <div className="mt-10">
          <h3 className="text-xl font-bold mb-4 text-gray-700">
            All Department Jobs
          </h3>
          <div className="overflow-auto">
            <table className="min-w-full text-sm text-left border border-gray-200">
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
          </div>
        </div>
      </div>
    </section>
  );
};

export default AddJob;

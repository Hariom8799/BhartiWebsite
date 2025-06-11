// context/SiteContext.js
"use client";
import React, { createContext, useContext, useState, useEffect } from "react";

export const SiteContext = createContext();

export const useSiteContext = () => {
  const context = useContext(SiteContext);

  if (!context) {
    throw new Error("useSiteContext must be used within a SiteProvider");
  }
  return context;
};

export const SiteProvider = ({ children }) => {
  const [siteSettings, setSiteSettings] = useState({
    email: "",
    contactNo: "",
    facebook: "",
    instagram: "",
    twitter: "",
    linkedin: "",
    iframe: "",
    siteTitle: "",
    logo: "",
  });

  const [aboutData, setAboutData] = useState({
    _id: "",
    title: "",
    shortDescription: "",
    subTitle: "",
    longDescription: "",
    images: [],
    status: "",
    createdAt: "",
    updatedAt: "",
  });

  const [loading, setLoading] = useState({
    siteSettings: true,
    aboutData: true,
  });

  const [error, setError] = useState({
    siteSettings: null,
    aboutData: null,
  });

  // Fetch site settings
  const fetchSiteSettings = async () => {
    try {
      setLoading((prev) => ({ ...prev, siteSettings: true }));
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/site-setting`
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();

      if (data.success && data.data) {
        setSiteSettings(data.data);
        setError((prev) => ({ ...prev, siteSettings: null }));
      } else {
        throw new Error(data.message || "Failed to fetch site settings");
      }
    } catch (error) {
      console.error("Error fetching site settings:", error);
      setError((prev) => ({ ...prev, siteSettings: error.message }));
    } finally {
      setLoading((prev) => ({ ...prev, siteSettings: false }));
    }
  };

  // Fetch about data
  const fetchAboutData = async () => {
    try {
      setLoading((prev) => ({ ...prev, aboutData: true }));
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/about-us`
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();

      if (data.success && data.data) {
        // Map the API response to our state structure
        setAboutData({
          _id: data.data._id || "",
          title: data.data.title || "",
          shortDescription: data.data.shortDescription || "",
          subTitle: data.data.subTitle || "",
          longDescription: data.data.longDescription || "",
          images: data.data.images || [],
          status: data.data.status || "",
          createdAt: data.data.createdAt || "",
          updatedAt: data.data.updatedAt || "",
        });
        setError((prev) => ({ ...prev, aboutData: null }));
      } else {
        throw new Error(data.message || "Failed to fetch about data");
      }
    } catch (error) {
      console.error("Error fetching about data:", error);
      setError((prev) => ({ ...prev, aboutData: error.message }));
    } finally {
      setLoading((prev) => ({ ...prev, aboutData: false }));
    }
  };

  // Fetch data on mount
  useEffect(() => {
    fetchSiteSettings();
    fetchAboutData();
  }, []);

  // Refresh functions for manual data refresh
  const refreshSiteSettings = () => {
    fetchSiteSettings();
  };

  const refreshAboutData = () => {
    fetchAboutData();
  };

  const refreshAllData = () => {
    fetchSiteSettings();
    fetchAboutData();
  };

  const value = {
    // Data
    siteSettings,
    aboutData,

    // Loading states
    loading,

    // Error states
    error,

    // Refresh functions
    refreshSiteSettings,
    refreshAboutData,
    refreshAllData,

    // Update functions (for optimistic updates)
    setSiteSettings,
    setAboutData,
  };

  return <SiteContext.Provider value={value}>{children}</SiteContext.Provider>;
};

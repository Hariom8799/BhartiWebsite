// "use client";

// import { useSearchParams } from "next/navigation";
// import React, { useEffect, useState } from "react";
// import Link from "next/link";
// import Image from "next/image";
// import { CircularProgress } from "@mui/material";

// const Department = () => {
//   const searchParams = useSearchParams();
//   const type = searchParams.get("type");

//   const [departments, setDepartments] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchDepartments = async () => {
//       if (!type) return;

//       try {
//         const res = await fetch(
//           `${process.env.NEXT_PUBLIC_BASE_URL}/api/departments?type=${type}`
//         );
//         const data = await res.json();

//         if (data.success) {
//           setDepartments(data.departments);
//         } else {
//           console.error("Failed to fetch departments:", data.error);
//         }
//       } catch (error) {
//         console.error("Error fetching departments:", error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchDepartments();
//   }, [type]);

//   const getTitle = () => {
//     switch (type) {
//       case "govt":
//         return "Government Departments";
//       case "aided":
//         return "Aided Departments";
//       case "public":
//         return "Public Undertakings";
//       default:
//         return "Departments";
//     }
//   };

//   return (
//     <section className="py-8 min-h-[70vh]">
//       <div className="container">
//         <h2 className="text-[30px] font-bold text-center text-gray-700">
//           {getTitle()}
//         </h2>

//         {loading ? (
//           <div className="flex justify-center mt-8">
//             <CircularProgress />
//           </div>
//         ) : (
//           <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mt-6">
//             {departments.map((dept) => {
//               const hasJobs = dept.jobCount > 0;
//               const CardContent = (
//                 <div
//                   className={`h-full card bg-white shadow-md p-5 rounded-lg flex flex-col justify-between items-center text-center
//                                     ${
//                                       !hasJobs
//                                         ? "opacity-50 cursor-not-allowed"
//                                         : "hover:shadow-lg"
//                                     }`}
//                 >
//                   <div className="flex flex-col items-center gap-3">
//                     <Image
//                       src={dept.mainImg || "/logo2.png"}
//                       alt={dept.name}
//                       width={80}
//                       height={80}
//                       className="rounded-full"
//                     />
//                     <h3 className="font-bold text-gray-700 text-[16px] text-center">
//                       {dept.name}
//                     </h3>
//                   </div>
//                   <span className="mt-4 text-primary text-[15px] font-bold">
//                     {hasJobs ? "View Jobs" : "No Jobs Available"}
//                   </span>
//                 </div>
//               );

//               return hasJobs ? (
//                 <Link
//                   key={dept._id}
//                   href={{
//                     pathname: "/career/department/jobs",
//                     query: { id: dept._id, type: dept.type },
//                   }}
//                   className="h-full"
//                 >
//                   {CardContent}
//                 </Link>
//               ) : (
//                 <div key={dept._id} className="h-full">
//                   {CardContent}
//                 </div>
//               );
//             })}
//           </div>
//         )}
//       </div>
//     </section>
//   );
// };

// export default Department;

"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { CircularProgress } from "@mui/material";

const Department = () => {
  const [type, setType] = useState(null);
  const [departments, setDepartments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isMounted, setIsMounted] = useState(false);

  // Function to get type from URL
  const getTypeFromUrl = () => {
    if (typeof window !== "undefined") {
      const searchParams = new URLSearchParams(window.location.search);
      return searchParams.get("type") || null;
    }
    return null;
  };

  // Set type on mount and listen for URL changes
  useEffect(() => {
    setIsMounted(true);
    setType(getTypeFromUrl());

    // Listen for URL changes (e.g., back/forward navigation)
    const handlePopState = () => {
      setType(getTypeFromUrl());
    };

    window.addEventListener("popstate", handlePopState);
    return () => window.removeEventListener("popstate", handlePopState);
  }, []);

  // Fetch departments based on type
  useEffect(() => {
    const fetchDepartments = async () => {
      if (!isMounted || !type) {
        setLoading(false);
        return;
      }

      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_BASE_URL}/api/departments?type=${type}`
        );
        const data = await res.json();

        if (data.success) {
          setDepartments(data.departments);
        } else {
          setError(
            "Failed to fetch departments: " + (data.error || "Unknown error")
          );
        }
      } catch (error) {
        setError("An error occurred while fetching departments");
      } finally {
        setLoading(false);
      }
    };

    fetchDepartments();
  }, [type, isMounted]);

  const getTitle = () => {
    switch (type) {
      case "govt":
        return "Government Departments";
      case "aided":
        return "Aided Departments";
      case "public":
        return "Public Undertakings";
      default:
        return "Departments";
    }
  };

  // Render loading state during SSR or while fetching
  if (!isMounted || loading) {
    return (
      <section className="py-8 min-h-[70vh]">
        <div className="container">
          <h2 className="text-[30px] font-bold text-center text-gray-700">
            {getTitle()}
          </h2>
          <div className="flex justify-center mt-8">
            <CircularProgress />
          </div>
        </div>
      </section>
    );
  }

  // Render error state if fetch fails
  if (error) {
    return (
      <section className="py-8 min-h-[70vh]">
        <div className="container">
          <h2 className="text-[30px] font-bold text-center text-gray-700">
            {getTitle()}
          </h2>
          <p className="text-center mt-5 text-red-500">{error}</p>
        </div>
      </section>
    );
  }

  return (
    <section className="py-8 min-h-[70vh]">
      <div className="container">
        <h2 className="text-[30px] font-bold text-center text-gray-700">
          {getTitle()}
        </h2>

        {departments.length === 0 ? (
          <p className="text-center mt-5 text-gray-600">
            No departments available.
          </p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mt-6">
            {departments.map((dept) => {
              const hasJobs = dept.jobCount > 0;
              const CardContent = (
                <div
                  className={`h-full card bg-white shadow-md p-5 rounded-lg flex flex-col justify-between items-center text-center 
                  ${
                    !hasJobs
                      ? "opacity-50 cursor-not-allowed"
                      : "hover:shadow-lg"
                  }`}
                >
                  <div className="flex flex-col items-center gap-3">
                    <Image
                      // src={dept.mainImg || "/logo2.png"}
                      src={"/logo2.png"}
                      alt={dept.name}
                      width={80}
                      height={80}
                      className="rounded-full"
                    />
                    <h3 className="font-bold text-gray-700 text-[16px] text-center">
                      {dept.name}
                    </h3>
                  </div>
                  <span className="mt-4 text-primary text-[15px] font-bold">
                    {hasJobs ? "View Jobs" : ""}
                  </span>
                </div>
              );

              return hasJobs ? (
                <Link
                  key={dept._id}
                  href={{
                    pathname: "/career/department/jobs",
                    query: { id: dept._id, type: dept.type },
                  }}
                  className="h-full"
                >
                  {CardContent}
                </Link>
              ) : (
                <div key={dept._id} className="h-full">
                  {CardContent}
                </div>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
};

export default Department;

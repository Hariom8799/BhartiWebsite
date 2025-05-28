// app/career/page.js (or wherever this is located)
import Link from "next/link";
import React from "react";

const Career = () => {
  return (
    <section className="py-8 min-h-[70vh]">
      <div className="container">
        <h2 className="text-[30px] font-bold text-center text-gray-700">
          Career
        </h2>
        <p className="text-center text-gray-600 text-[18px]">
          Facilitate easy access to job opportunities in Uttarakhand.
        </p>
        <div className="flex items-center justify-center gap-14 mt-6">
          <Link href="/career/department?type=govt">
            <div className="card w-[230px] cursor-pointer bg-white shadow-md p-5 rounded-lg flex items-center justify-center flex-col gap-3">
              <img src="/logo2.png" alt="" />
              <h3 className="text-center font-bold text-gray-700 text-[16px]">
                Government Department
              </h3>
            </div>
          </Link>

          <Link href="/career/department?type=aided">
            <div className="card w-[230px] cursor-pointer bg-white shadow-md p-5 rounded-lg flex items-center justify-center flex-col gap-3">
              <img src="/logo2.png" alt="" />
              <h3 className="text-center font-bold text-gray-700 text-[16px]">
                Aided Department
              </h3>
            </div>
          </Link>

          <Link href="/career/department?type=public">
            <div className="card w-[230px] cursor-pointer bg-white shadow-md p-5 rounded-lg flex items-center justify-center flex-col gap-3">
              <img src="/logo2.png" alt="" />
              <h3 className="text-center font-bold text-gray-700 text-[16px]">
                Public Undertaking
              </h3>
            </div>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Career;

"use client";
import { Button } from "@mui/material";
import HomeSlider from "./components/HomeSlider";
import SkillsDevelopmentProgrames from "./components/SkillsDevelopmentProgrames";
import RecentJobs from "./components/CertificateProgram";
export default function Home() {
  return (
    <>
      <HomeSlider />

      <div className="homeSection3 mb-16 mt-10">
        <div className="container">
          <div className="flex items-center gap-10">
            <div className="left w-[40%]">
              <div className="rounded-lg overflow-hidden group">
                <img
                  src={"../about-img.jpg"}
                  className="w-full transition-all group-hover:scale-105"
                  alt="image"
                />
              </div>
            </div>

            <div className="right w-[60%]">
              <span className="text-primary text-[16px] uppercase font-bold">
                Who we are
              </span>

              <h2 className="text-[35px] font-extrabold leading-[50px] pr-5 text-gray-800">
                Empowering Uttarakhand’s Youth Through Opportunity
              </h2>

              <p className="mt-4 text-[17px] text-gray-800 leading-[28px]">
                In a progressive step towards good governance and citizen
                empowerment, the Government of Uttarakhand has launched the{" "}
                <strong>Uttarakhand Bharti Portal</strong> — a unified digital
                platform designed to connect the youth of the state with
                employment opportunities across various sectors.
              </p>

              <br />

              <Button className="btn-custom" href="/about">
                <span>About Us</span>
              </Button>
            </div>
          </div>
        </div>
      </div>

      <RecentJobs />

      {
        //   <div className="homeSection4 none">
        //   <div className="container">
        //     <div className="grid grid-cols-4 boxWrapper">
        //       <div className="col flex items-center justify-center p-5 flex-col gap-0">
        //         <CountUp delay={2} end={89957} className="count" />
        //         <h5 className="text-white">People in the city</h5>
        //       </div>
        //       <div className="col flex items-center justify-center p-5 flex-col gap-0">
        //         <CountUp delay={2} end={22000} className="count" />
        //         <h5 className="text-white">Square of city</h5>
        //       </div>
        //       <div className="col flex items-center justify-center p-5 flex-col gap-0">
        //         <CountUp delay={2} end={400} className="count" />
        //         <h5 className="text-white">Year of foundation</h5>
        //       </div>
        //       <div className="col flex items-center justify-center p-5 flex-col gap-0">
        //         <CountUp delay={2} end={875} className="count" />
        //         <h5 className="text-white">Successful programs</h5>
        //       </div>
        //     </div>
        //   </div>
        // </div>
      }

      <SkillsDevelopmentProgrames />
    </>
  );
}

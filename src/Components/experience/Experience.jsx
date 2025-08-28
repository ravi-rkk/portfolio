import React from "react";

export default function Experience() {
  return (
    <div>
      <section
        id="experience"
        className="text-gray-600 body-font  bg-[#D4A373]"
      >
        <div className="container px-5 py-24 mx-auto">
          <div className="flex flex-col text-center w-full mb-20">
            <h1
              data-aos="fade-up"
              data-aos-delay="300"
              className="sm:text-3xl text-3xl font-bold title-font mb-4 text-[#432818]"
            >
              My Experience
            </h1>
            {/* Updated paragraph based on your resume summary */}
            <p
              data-aos="fade-up"
              data-aos-delay="400"
              className="lg:w-2/3 mx-auto leading-relaxed text-base text-[#432818]"
            >
              Results-driven Full-Stack Developer with 3 months of professional
              experience in building and deploying web applications using
              React.js, Django, and PostgreSQL. Complemented by a strong
              foundation in mobile development with Kotlin, Jetpack Compose, and
              React Native. Passionate about creating seamless user experiences
              across both web and mobile platforms and leveraging technical
              expertise to deliver high-quality, scalable solutions
            </p>
          </div>
          <div
            data-aos="fade-up"
            data-aos-delay="500"
            className="flex flex-wrap -m-4 text-center"
          >
            {/* Stat 1: Updated to reflect your actual months of professional experience */}
            <div className="p-4 md:w-1/4 sm:w-1/2 w-full">
              <div className="border-2 border-blue-200 px-4 py-6 rounded-lg">
                <h2 className="title-font font-medium text-3xl text-gray-900">
                  3+
                </h2>
                <p className="leading-relaxed">Months Experience</p>
              </div>
            </div>
            {/* Stat 2: Updated with the number of projects from your resume */}
            <div className="p-4 md:w-1/4 sm:w-1/2 w-full">
              <div className="border-2 border-blue-200 px-4 py-6 rounded-lg">
                <h2 className="title-font font-medium text-3xl text-gray-900">
                  2+
                </h2>
                <p className="leading-relaxed">Completed Projects</p>
              </div>
            </div>
            {/* Stat 3: Added to highlight the number of technologies you know */}
            <div className="p-4 md:w-1/4 sm:w-1/2 w-full">
              <div className="border-2 border-blue-200 px-4 py-6 rounded-lg">
                <h2 className="title-font font-medium text-3xl text-gray-900">
                  10+
                </h2>
                <p className="leading-relaxed">Key Technologies</p>
              </div>
            </div>
            {/* Stat 4: Added to showcase your Hacktoberfest participation */}
            <div className="p-4 md:w-1/4 sm:w-1/2 w-full">
              <div className="border-2 border-blue-200 px-4 py-6 rounded-lg">
                <h2 className="title-font font-medium text-3xl text-gray-900">
                  1+
                </h2>
                <p className="leading-relaxed">Open Source Events</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

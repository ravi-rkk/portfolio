import React from "react";
import { FaStar, FaRegStar } from "react-icons/fa";
import CV from "../../assets/Resume2025.pdf";

const skills = [
  { name: "Java", rating: 4.5 },
  { name: "JavaScript", rating: 5 },
  { name: "Spring Boot", rating: 3.5 },
  { name: "React js", rating: 4 },
  { name: "MongoDB", rating: 4 },
  { name: "MySQL", rating: 4 },
  { name: "Kotlin", rating: 4 },
  { name: "Android Development", rating: 4 },
  { name: "React-native", rating: 5 },
  { name: "Django", rating: 4.5 },
  { name: "PostgreSql", rating: 4 },
  { name: "GitHub", rating: 4.5 },
];

export default function Skills() {
  return (
    <section id="skills" className="text-gray-900 bg-[#FAEDCD] body-font">
      <div className="container px-5 py-11 mx-auto">
        <div
          data-aos="fade-up"
          data-aos-delay="300"
          className="flex flex-col text-center w-full mb-10"
        >
          <h1 className="text-3xl font-semibold text-[#432818] mb-4">
            My Skills
          </h1>
          <p className="text-base text-[#432818] leading-relaxed mx-auto max-w-3xl">
            I have experience with front-end and back-end technologies,
            including JavaScript frameworks, databases, and mobile development.
            My expertise spans full-stack development, Android applications, and
            cloud-based solutions.
          </p>
        </div>

        {/* Skills Grid */}
        <div
          data-aos="fade-up"
          data-aos-delay="400"
          className="flex flex-wrap justify-center -m-4"
        >
          {skills.map((skill, index) => (
            <div key={index} className="p-4 md:w-1/3 sm:w-1/2 w-full">
              <div className="bg-white shadow-md rounded-lg p-6 flex justify-between items-center">
                <span className="text-lg font-medium text-gray-900">
                  {skill.name}
                </span>
                <div className="flex">
                  {[...Array(5)].map((_, i) =>
                    i < skill.rating ? (
                      <FaStar key={i} className="text-yellow-500" />
                    ) : (
                      <FaRegStar key={i} className="text-gray-400" />
                    )
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Download CV Button */}
        <div className="flex justify-center mt-6">
          <a href={CV} download>
            <button
              type="button"
              data-aos="fade-up"
              data-aos-delay="500"
              className="text-white bg-blue-950 hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-700 font-semibold rounded-full text-sm px-4 py-2 text-center"
            >
              Download CV
            </button>
          </a>
        </div>
      </div>
    </section>
  );
}

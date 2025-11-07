import HeroImg from "@/assets/images/my-image.jpg";
import Footer from "@/components/Footer"; // ✅ Import Footer component
import Skills from "@/pages/Skills/Skills"; // ✅ Import Skills component
import React from "react";
import Experience from "@/pages/Experience/Experience"; // ✅ Import Experience component
import Projects from "@/pages/Projects/Projects"; // ✅ Import Projects component
import Education from "@/pages/Education/Education"; // ✅ Import Education component
import Contact from "@/pages/Contact/Contact"; // ✅ Import Contact component

export default function About() {
  return (
    <>
      <section id="about" className="py-16 md:py-32 text-white bg-[#04081A]">
        <div className="mx-auto max-w-5xl space-y-8 px-6 md:space-y-16">
          <h2 className="relative z-10 max-w-xl text-4xl font-bold lg:text-5xl bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent tracking-wide shadow-lg">
            AI + IoT Enthusiast | Python Developer | 3× Hackathon Winner
          </h2>

          <div className="grid gap-6 sm:grid-cols-2 md:gap-12 lg:gap-24">
            {/* Image Section */}
            <div className="group relative mb-6 sm:mb-0 shadow-2xl rounded-2xl">
              <div className="bg-gradient-to-b from-blue-400 to-purple-500 aspect-76/59 relative rounded-2xl p-px transition-all duration-500 ease-in-out group-hover:p-0.5 group-hover:shadow-lg group-hover:shadow-purple-500/50">
                <img
                  src={HeroImg}
                  className="rounded-[15px] shadow-xl block transform transition duration-500 ease-in-out group-hover:scale-105 ring-1 ring-zinc-100/20"
                  alt="Palavala Dinesh Kumar Reddy profile"
                  width={1000}
                  height={929}
                />
              </div>
            </div>

            {/* Text Section */}
            <div className="relative space-y-6 bg-gray-900/50 p-8 rounded-2xl border border-gray-700/50 shadow-xl">
              <div className="text-lg font-medium text-gray-300">
                <p>
                  👨‍💻 <strong>AI + IoT Enthusiast</strong> | 💡 <strong>Python Developer</strong> | 🧑‍🎓Final Year IT Student at SVCET, Chittoor
                </p>
              </div>

              <div className="space-y-4 text-gray-400">
                <p>
                  Hi, I'm a highly motivated and tech-driven B.Tech student specializing in Information Technology, with hands-on experience in AI, IoT, and cloud-based systems. Demonstrated leadership by building real-time agricultural solutions and winning national-level hackathons.
                </p>
                <p>
                  Beyond tech, I'm a lifelong learner and passionate about applying technical and leadership skills to solve real-world challenges and grow in a fast-paced, learning-oriented environment.
                </p>
              </div>

              <div className="p-6 rounded-lg bg-gray-800/50 border border-gray-700">
                <h3 class="text-xl font-semibold text-white mb-4">I'm passionate about</h3>
                <p className="text-gray-400">
                  🧠 AI-Powered IoT Systems, Real-Time Monitoring, Cloud-Native Apps (GCP/Firebase), Full-Stack Deployment, Smart Agriculture & Agri-Tech Innovation, Edge-to-Cloud Sensor Data Integration, and Agentic AI.
                </p>
              </div>

              <div className="p-6 rounded-lg bg-gray-800/50 border border-gray-700">
                <h3 class="text-xl font-semibold text-white mb-4">My recent work includes</h3>
                <p className="text-gray-400">
                  🌾 Building sophisticated agricultural technology solutions including the <a href="https://crop-monitoring-system-demo.com" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">Crop Monitoring System</a> and <a href="https://project-kisan-demo.com" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">Project Kisan</a> - an AI-powered smart farming assistant.
                </p>
              </div>

              <p className="text-gray-400">
                I'm constantly seeking opportunities to learn, grow, and contribute, with a vision to turn ideas into real-world impact.
              </p>

              <div className="pt-6">
                <blockquote className="border-l-4 border-blue-400 pl-4 italic text-gray-400">
                  <p>
                    A highly motivated and tech-driven B.Tech student specializing in Information Technology, with hands-on experience in AI, IoT, and cloud-based systems. Demonstrated leadership by building real-time agricultural solutions and winning national-level hackathons. Skilled in Python, Google Cloud, and machine learning tools. Passionate about applying technical and leadership skills to solve real-world challenges and grow in a fast-paced, learning-oriented environment.
                  </p>
                </blockquote>
              </div>
            </div>
          </div>
        </div>
        {/* ✅ Footer Section */}
        <Skills />
        <Experience />
        <Projects />
        <Education />
        <Contact />

        <Footer />
      </section>
    </>
  );
}
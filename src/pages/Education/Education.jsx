import React, { useState } from "react";
import { BookOpen, Calendar, Trophy, Award, GraduationCap, Target } from "lucide-react";
import { motion, useMotionValue, useTransform, useSpring } from "framer-motion";

// Enhanced Tilt Card Component for Education
const EducationTiltCard = ({ children, onClick, index }) => {
  const ref = React.useRef(null);
  const x = useMotionValue(0.5);
  const y = useMotionValue(0.5);

  const rotateX = useSpring(useTransform(y, [0, 1], [8, -8]), { stiffness: 100 });
  const rotateY = useSpring(useTransform(x, [0, 1], [-8, 8]), { stiffness: 100 });

  const handleMouseMove = (e) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width;
    const py = (e.clientY - rect.top) / rect.height;
    x.set(px);
    y.set(py);
  };

  const handleMouseLeave = () => {
    x.set(0.5);
    y.set(0.5);
  };

  return (
    <motion.div
      ref={ref}
      style={{
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="transition-transform duration-300 cursor-pointer hover:scale-[1.02]"
      onClick={onClick}
    >
      {children}
    </motion.div>
  );
};

const educationData = [
  {
    degree: "B-Tech, Information Technology",
    school: "Sri Venkateswara College of Engineering and Technology",
    mascot: "📘",
    year: "2022 - 2026",
    achievements: [
      "CGPA: 8.37",
      "3x Hackathon winner",
      "Winner: Impact X Hackathon (2025) & Bit Bash Hackathon (2025)",
    ],
    skills: ["DSA", "OS", "JAVA", "CN", "DBMS", "AI"],
    description:
      "Gained practical knowledge in software development and problem-solving through projects and coursework, while honing teamwork and communication skills.",
    onClick: () => console.log("B-Tech Information Technology clicked")
  },
  {
    degree: "Intermediate (MPC)",
    school: "AP Model Junior College, Rayachoty",
    mascot: "📗",
    year: "2020-2022",
    achievements: [
      "Percentage: 75%",
      "Completed MPC with Physics, Chemistry, and Mathematics",
    ],
    skills: ["Physics", "Chemistry", "Mathematics", "Analytical Thinking"],
    description:
      "Developed strong analytical and critical thinking skills through comprehensive study of mathematics, physics, and chemistry.",
    onClick: () => console.log("Intermediate MPC clicked")
  },
  {
    degree: "Secondary School Certificate (SSC)",
    school: "AP Model School, Rayachoty",
    mascot: "📗",
    year: "2020",
    achievements: ["Percentage: 90%", "Completed 10th grade with优异 academic performance"],
    skills: ["Maths", "English", "Science", "Social"],
    description:
      "Developed strong analytical thinking, problem-solving skills, and a disciplined learning approach during school years.",
    onClick: () => console.log("SSC clicked")
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.2 },
  },
};

const cardVariants = {
  hidden: { y: 50, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

const floatingVariants = {
  animate: {
    y: [0, -15, 0],
    transition: { duration: 3, repeat: Infinity, ease: "easeInOut" },
  },
};

const FloatingEmoji = ({ icon, className, delay = 0 }) => (
  <motion.div
    className={`absolute text-3xl md:text-4xl opacity-25 pointer-events-none glowing-text ${className}`}
    variants={floatingVariants}
    animate="animate"
    style={{ animationDelay: `${delay}s` }}
  >
    {icon}
  </motion.div>
);

export default function Education() {
  const [hoveredIndex, setHoveredIndex] = useState(null);

  return (
    <section className="min-h-screen relative overflow-hidden py-40 bg-[#04081A]">
      {/* Glowing floating emojis */}
      <FloatingEmoji icon="📘" className="top-10 left-8" />
      <FloatingEmoji icon="🎓" className="bottom-12 right-10" delay={0.5} />
      <FloatingEmoji icon="🧠" className="top-1/4 right-1/4" delay={1} />
      <FloatingEmoji icon="🏆" className="top-5 left-1/2" delay={1.5} />
      <FloatingEmoji icon="📚" className="bottom-1/3 left-12" delay={2} />
      <FloatingEmoji icon="✍️" className="top-1/2 right-5" delay={2.5} />
      <FloatingEmoji icon="📖" className="bottom-5 right-1/3" delay={3} />

      {/* Glowing text style */}
      <style>
        {`
          .glowing-text {
            text-shadow: 0 0 6px rgba(255,255,255,0.5), 0 0 12px rgba(255,255,255,0.3);
          }
        `}
      </style>

      {/* Grid Background + Overlay */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-grid-white/[0.05] bg-[length:50px_50px]" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#04081A] via-transparent to-[#04081A]" />
        <div className="absolute inset-0 border border-white/[0.05] grid grid-cols-2 md:grid-cols-4" />
      </div>

      <div className="max-w-6xl mx-auto px-4 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-teal-400 to-blue-500 bg-clip-text text-transparent mb-6">
            Educational Journey
          </h2>
          <p className="text-gray-300 max-w-2xl mx-auto text-lg">
            Discover how academic excellence shapes innovative thinking and
            professional growth.
          </p>
        </motion.div>

        {/* Cards */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 md:grid-cols-2 gap-8"
        >
          {educationData.map((edu, index) => (
            <EducationTiltCard key={index} onClick={edu.onClick} index={index}>
              <motion.div
                variants={cardVariants}
                className={`relative border rounded-xl p-8 transition-all duration-300 bg-gray-900/50 backdrop-blur-sm shadow-2xl ${
                  hoveredIndex === index
                    ? "border-teal-500 scale-[1.02] shadow-teal-500/40"
                    : "border-blue-400/20"
                }`}
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
                whileHover={{ y: -10 }}
                whileTap={{ scale: 0.98 }}
              >
                <div className="space-y-6">
                  <div className="space-y-2">
                    <div className="flex items-center gap-3">
                      <span className="text-3xl">{edu.mascot}</span>
                      <h3 className="text-2xl font-bold text-white">
                        {edu.degree}
                      </h3>
                    </div>
                    <p className="text-lg text-gray-300 flex items-center gap-2">
                      <BookOpen className="w-5 h-5 text-teal-500" />
                      {edu.school}
                    </p>
                    <p className="text-gray-400 flex items-center gap-2">
                      <Calendar className="w-4 h-4" />
                      {edu.year}
                    </p>
                  </div>

                  <p className="text-gray-300 text-sm italic border-l-4 border-teal-500 pl-3 leading-relaxed">
                    {edu.description}
                  </p>

                  <div className="space-y-3">
                    <h4 className="text-sm font-semibold text-white flex items-center gap-2">
                      <Trophy className="w-4 h-4 text-yellow-500" />
                      Key Achievements
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {edu.achievements.map((achievement, i) => (
                        <div
                          key={i}
                          className="px-3 py-1 rounded-full bg-gradient-to-r from-teal-500/20 to-cyan-500/20 text-teal-400 flex items-center gap-2 text-sm border border-teal-500/30"
                        >
                          <Award className="w-4 h-4" />
                          <span>{achievement}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-2 pt-2">
                    {edu.skills.map((skill, i) => (
                      <span
                        key={i}
                        className="px-3 py-1 text-xs rounded-full bg-gradient-to-r from-blue-500/20 to-indigo-500/20 text-blue-300 border border-blue-500/30"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            </EducationTiltCard>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

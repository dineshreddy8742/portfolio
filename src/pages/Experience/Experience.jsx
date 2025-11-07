import React, { useRef, useState } from "react";
import { Code2, Network, Layers, Award, Trophy, Star, Medal } from "lucide-react";
import { motion, useMotionValue, useTransform, useSpring } from "framer-motion";

// --- Custom Interactive Tilt Card ---
const TiltCard = ({ children, onClick, className = "", onMouseEnter, onMouseLeave }) => {
  const ref = useRef(null);
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
    if (onMouseLeave) onMouseLeave();
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
      onMouseEnter={onMouseEnter}
      className={`transition-transform duration-300 cursor-pointer ${className} ${onClick ? 'hover:scale-[1.02]' : ''}`}
      onClick={onClick}
    >
      {children}
    </motion.div>
  );
};

const ExperienceCard = ({ title, company, period, description, icon: Icon, onClick }) => {
  const [isHovered, setIsHovered] = useState(false);
  
  return (
    <TiltCard 
      onClick={onClick} 
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="group relative overflow-hidden transition-all duration-500">
        <div className="absolute -inset-[2px] bg-gradient-to-r from-[#00d2ff] via-[#3a47d5] to-[#00d2ff] rounded-lg blur-xl opacity-30 group-hover:opacity-60 animate-pulse" />
        <div className="relative bg-[#0f172a]/80 backdrop-blur-xl rounded-xl border border-white/10 shadow-2xl z-10 p-8 h-full transition-all duration-300 group-hover:shadow-[0_0_40px_rgba(59,130,246,0.4)]">
          <motion.div
            animate={{ y: [0, -6, 0] }}
            transition={{ repeat: Infinity, duration: 3 }}
            className="relative mb-6"
          >
            <div className="absolute -inset-6 bg-gradient-to-tr from-cyan-500/20 to-purple-500/20 rounded-full blur-2xl group-hover:blur-2xl transition-all" />
            <Icon className="w-12 h-12 text-cyan-400 relative z-10" />
          </motion.div>
          <div className="space-y-3">
            <motion.h3 
              className="text-2xl font-bold text-transparent bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 bg-clip-text animate-text-glow"
              animate={{ scale: isHovered ? 1.02 : 1 }}
              transition={{ duration: 0.2 }}
            >
              {title}
            </motion.h3>
            <div className="flex justify-between items-center text-gray-400">
              <span className="font-semibold text-blue-400">{company}</span>
              <span className="text-xs bg-blue-400/10 px-3 py-1 rounded-full font-mono">
                {period}
              </span>
            </div>
            <motion.p 
              className="text-gray-300 border-l-4 border-blue-500/50 pl-4 leading-relaxed"
              animate={{ paddingLeft: isHovered ? 16 : 16 }}
            >
              {description}
            </motion.p>
          </div>
        </div>
      </div>
    </TiltCard>
  );
};

// Award Card Component
const AwardCard = ({ 
  title, 
  issuer, 
  period, 
  icon: Icon, 
  onClick,
  status = "award" // "award", "achievement", "winner", "finalist"
}) => {
  const [isHovered, setIsHovered] = useState(false);
  
  // Different colors based on status
  const getStatusColors = () => {
    switch(status) {
      case "winner":
        return "from-yellow-500/20 to-amber-500/20 border-yellow-500/30";
      case "finalist":
        return "from-blue-500/20 to-cyan-500/20 border-blue-500/30";
      case "achievement":
        return "from-purple-500/20 to-pink-500/20 border-purple-500/30";
      default:
        return "from-green-500/20 to-teal-500/20 border-green-500/30";
    }
  };
  
  return (
    <TiltCard 
      onClick={onClick}
      className={`transition-all duration-300 ${isHovered ? 'scale-[1.03] z-20' : ''}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="group relative overflow-hidden transition-all duration-300">
        <div className={`absolute -inset-[2px] bg-gradient-to-r from-[#00d2ff] via-[#3a47d5] to-[#00d2ff] rounded-lg blur-xl opacity-30 group-hover:opacity-60 animate-pulse`} />
        <div className={`relative bg-[#0f172a]/80 backdrop-blur-xl rounded-xl border border-white/10 shadow-2xl z-10 p-6 h-full cursor-pointer transition-all duration-300 group-hover:shadow-[0_0_30px_rgba(59,130,246,0.3)]`}>
          <div className="flex items-start gap-4">
            <div className="flex-shrink-0">
              <motion.div
                animate={{ y: [0, -4, 0] }}
                transition={{ repeat: Infinity, duration: 2 }}
                className="w-12 h-12 rounded-full bg-gradient-to-br from-cyan-500/20 to-purple-500/20 flex items-center justify-center"
              >
                <Icon className="w-6 h-6 text-cyan-400" />
              </motion.div>
            </div>
            <div className="flex-1 min-w-0">
              <motion.h3 
                className="text-lg font-bold text-white mb-1 truncate"
                animate={{ scale: isHovered ? 1.02 : 1 }}
                transition={{ duration: 0.2 }}
              >
                {title}
              </motion.h3>
              <p className="text-sm text-gray-400 mb-2">{issuer}</p>
              <div className="flex items-center justify-between">
                <span className="text-xs bg-blue-400/10 text-blue-300 px-2 py-1 rounded-full">
                  {period}
                </span>
                <span className={`text-xs px-2 py-1 rounded-full capitalize ${
                  status === 'winner' ? 'bg-gradient-to-r from-yellow-500/20 to-amber-500/20 text-yellow-400 border border-yellow-500/30' :
                  status === 'finalist' ? 'bg-gradient-to-r from-blue-500/20 to-cyan-500/20 text-blue-400 border border-blue-500/30' :
                  status === 'achievement' ? 'bg-gradient-to-r from-purple-500/20 to-pink-500/20 text-purple-400 border border-purple-500/30' :
                  'bg-gradient-to-r from-green-500/20 to-teal-500/20 text-green-400 border border-green-500/30'
                }`}>
                  {status}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </TiltCard>
  );
};

const ExperienceSection = () => {
  const experiences = [
    {
      icon: Network,
      title: "GeeksforGeeks Campus Ambassador",
      company: "GeeksforGeeks & Institution's Innovation Council",
      period: "2024 - Present",
      description:
        "Organized technical content, organized events, and engaged peers with DSA & coding initiatives. Advocated innovation and entrepreneurship on campus and enhanced student engagement in IIC initiatives.",
      onClick: () => console.log("GeeksforGeeks Campus Ambassador clicked")
    },
    {
      icon: Layers,
      title: "Hackathon Coordinator",
      company: "College Technical Fest",
      period: "2024 - Present",
      description:
        "Led planning, outreach, and execution of inter-college hackathon, ensuring high participation and smooth event flow.",
      onClick: () => console.log("Hackathon Coordinator clicked")
    },
    {
      icon: Code2,
      title: "Campus Ambassador - Institution's Innovation Council",
      company: "Institution's Innovation Council",
      period: "2024 - Present",
      description:
        "Advocated innovation and entrepreneurship on campus, organized events, and enhanced student engagement in IIC initiatives.",
      onClick: () => console.log("IIC Campus Ambassador clicked")
    },
  ];

  // Detailed Awards and Honors
  const awards = [
    {
      title: "Google Cloud Agentic AI Day Grand Finale",
      issuer: "Hack2skill",
      period: "Jul 2025",
      icon: Trophy,
      status: "finalist",
      onClick: () => console.log("Google Cloud Agentic AI Finalist clicked")
    },
    {
      title: "Bit Bash Hackathon Winners",
      issuer: "SVCET College",
      period: "Apr 2025",
      icon: Award,
      status: "winner",
      onClick: () => console.log("Bit Bash Hackathon Winner clicked")
    },
    {
      title: "Idea Hackathon Finalists",
      issuer: "HBSU University Mumbai",
      period: "Apr 2025",
      icon: Medal,
      status: "finalist",
      onClick: () => console.log("Idea Hackathon Finalist clicked")
    },
    {
      title: "Impact X Hackathon Winner",
      issuer: "Madanapalli Institute of Technology and Science",
      period: "Apr 2025",
      icon: Trophy,
      status: "winner",
      onClick: () => console.log("Impact X Hackathon Winner clicked")
    },
    {
      title: "Dynamic Hackathon Finalists",
      issuer: "Heft Cranes and Dynamic Crabe Engineers",
      period: "Mar 2025",
      icon: Star,
      status: "finalist",
      onClick: () => console.log("Dynamic Hackathon Finalist clicked")
    },
    {
      title: "Smart India Hackathon Finalists 2024",
      issuer: "Department of Education Council",
      period: "Dec 2024",
      icon: Award,
      status: "finalist",
      onClick: () => console.log("Smart India Hackathon Finalist clicked")
    },
    {
      title: "Pro Solvo Hackathon Finalists",
      issuer: "SVCET College collaboration with SIE Cell",
      period: "Aug 2024",
      icon: Medal,
      status: "finalist",
      onClick: () => console.log("Pro Solvo Hackathon Finalist clicked")
    },
    {
      title: "AIgnite Hackathon Winner",
      issuer: "Department of CSE and SIE Cell",
      period: "Mar 2024",
      icon: Trophy,
      status: "winner",
      onClick: () => console.log("AIgnite Hackathon Winner clicked")
    },
    {
      title: "Azure Hackathon Finalists",
      issuer: "Bee Koder",
      period: "Mar 2024",
      icon: Star,
      status: "finalist",
      onClick: () => console.log("Azure Hackathon Finalist clicked")
    },
  ];

  const honors = [
    {
      title: "Preplexity Campus Partner",
      issuer: "Perplexity",
      period: "Oct 2025 - Present",
      icon: Star,
      status: "achievement",
      onClick: () => console.log("Preplexity Campus Partner clicked")
    },
    {
      title: "Campus Ambassador",
      issuer: "GeeksforGeeks",
      period: "Jul 2024 - Present",
      icon: Award,
      status: "achievement",
      onClick: () => console.log("GeeksforGeeks Campus Ambassador clicked")
    },
    {
      title: "Innovation Ambassador",
      issuer: "Institution's Innovation Council",
      period: "Jun 2024 - Present",
      icon: Medal,
      status: "achievement",
      onClick: () => console.log("Innovation Ambassador clicked")
    },
    {
      title: "Team Lead – Purdue EPICS Collaboration",
      issuer: "EPICS at Purdue",
      period: "May 2024 - Present",
      icon: Star,
      status: "achievement",
      onClick: () => console.log("Purdue EPICS Team Lead clicked")
    },
    {
      title: "Hackathon Team Lead",
      issuer: "Hack2skill",
      period: "Mar 2024 - Present",
      icon: Trophy,
      status: "achievement",
      onClick: () => console.log("Hack2skill Team Lead clicked")
    },
    {
      title: "Team Lead & Finalist – Software Edition",
      issuer: "Smart India Hackathon",
      period: "Dec 2023 - Present",
      icon: Medal,
      status: "finalist",
      onClick: () => console.log("Smart India Hackathon Team Lead clicked")
    },
  ];

  return (
    <section className="relative bg-[#0a0f1f] min-h-screen pt-24 pb-32 overflow-hidden">
      {/* Glowing Background Elements */}
      <div className="absolute inset-0 z-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-[#0a0f1f] via-[#0a1a2f] to-[#0a0f1f] animate-pulse" />
      <div className="absolute top-20 left-20 w-80 h-80 bg-cyan-500/20 rounded-full blur-[140px] animate-float" />
      <div className="absolute bottom-20 right-20 w-80 h-80 bg-purple-500/20 rounded-full blur-[140px] animate-float delay-300" />

      {/* Section Heading */}
      <motion.div
        initial={{ opacity: 0, y: -30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="relative z-10 text-center space-y-4 mb-20"
      >
        <h2 className="text-5xl md:text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 animate-gradient-x">
          Experiences & Honors
        </h2>
        <p className="text-lg text-gray-400 max-w-2xl mx-auto">
          Transforming passion into progress through every role.
        </p>
      </motion.div>

      {/* Awards Section */}
      <div className="relative z-10 container mx-auto px-6 mb-20">
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center space-y-4 mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 animate-gradient-x">
            Honors & Awards
          </h2>
          <p className="text-lg text-gray-400 max-w-3xl mx-auto">
            Notable accomplishments and recognition in the field of technology and innovation.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {awards.map((award, index) => (
            <AwardCard key={index} {...award} />
          ))}
        </div>
      </div>

      {/* Honors Section */}
      <div className="relative z-10 container mx-auto px-6 mb-20">
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center space-y-4 mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-cyan-500 to-teal-500 animate-gradient-x">
            Professional Honors
          </h2>
          <p className="text-lg text-gray-400 max-w-3xl mx-auto">
            Recognition and titles received in professional roles.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {honors.map((honor, index) => (
            <AwardCard key={index} {...honor} />
          ))}
        </div>
      </div>

      {/* Experience Cards Grid */}
      <div className="relative z-10 container mx-auto px-6 mb-20">
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center space-y-4 mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 animate-gradient-x">
            Professional Experience
          </h2>
          <p className="text-lg text-gray-400 max-w-3xl mx-auto">
            Professional roles and responsibilities.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {experiences.map((exp, index) => (
            <ExperienceCard key={index} {...exp} />
          ))}
        </div>
      </div>

      {/* Illustration */}
      <motion.img
        initial={{ opacity: 0, x: -40 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 1 }}
        src="https://cdni.iconscout.com/illustration/premium/thumb/remote-working-3463728-2912020.png"
        alt="Laptop Illustration"
        className="absolute left-0 bottom-0 w-[300px] md:w-[400px] animate-float-slow"
      />
    </section>
  );
};

export default ExperienceSection;

import React, { useEffect, memo, useMemo } from "react"
import { FileText, Code, Award, Globe, ArrowUpRight, Sparkles, UserCheck } from "lucide-react"
import AOS from 'aos'
import 'aos/dist/aos.css'

// Memoized Components
const Header = memo(() => (
  <div className="text-center lg:mb-8 mb-2 px-[5%]">
    <div className="inline-block relative group">
      <h2 
        className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#6366f1] to-[#a855f7]" 
        data-aos="zoom-in-up"
        data-aos-duration="600"
      >
        About Me
      </h2>
    </div>
    <p 
      className="mt-2 text-gray-400 max-w-2xl mx-auto text-base sm:text-lg flex items-center justify-center gap-2"
      data-aos="zoom-in-up"
      data-aos-duration="800"
    >
      <Sparkles className="w-5 h-5 text-purple-400" />
      Transforming ideas into digital experiences
      <Sparkles className="w-5 h-5 text-purple-400" />
    </p>
  </div>
));

const ProfileImage = memo(() => (
  <div className="flex justify-end items-center sm:p-12 sm:py-0 sm:pb-0 p-0 py-2 pb-2">
    <div 
      className="relative group" 
      data-aos="fade-up"
      data-aos-duration="1000"
    >
      {/* Optimized gradient backgrounds with reduced complexity for mobile */}
      <div className="absolute -inset-6 opacity-[25%] z-0 hidden sm:block">
        <div className="absolute inset-0 bg-gradient-to-r from-violet-600 via-indigo-500 to-purple-600 rounded-full blur-2xl animate-spin-slower" />
      </div>
      
      <div className="absolute -inset-3 opacity-30 z-10 block sm:hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-purple-500 rounded-full blur-lg" />
      </div>

      <div className="relative z-20 overflow-hidden rounded-full border-4 border-white/10 group-hover:border-white/20 transition-all duration-500 shadow-2xl">
        <img
          src="/Photo.jpg"
          alt="Ritesh Raj Arul Selvan"
          className="w-72 h-72 sm:w-80 sm:h-80 lg:w-96 lg:h-96 object-cover transition-transform duration-700 group-hover:scale-110"
          loading="lazy"
        />
        
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      </div>

      <div className="absolute -bottom-4 -right-4 z-30 bg-gradient-to-r from-[#6366f1] to-[#a855f7] rounded-full p-3 shadow-lg animate-pulse">
        <Sparkles className="w-6 h-6 text-white" />
      </div>
    </div>
  </div>
));

const StatCard = memo(({ icon: Icon, color, value, label, description, animation }) => (
  <div className="relative group cursor-pointer">
    <div 
      className="relative bg-white/5 backdrop-blur-xl rounded-2xl p-6 border border-white/10 hover:border-white/20 transition-all duration-500 group-hover:scale-105 overflow-hidden"
      data-aos={animation}
      data-aos-duration="1200"
      data-aos-anchor-placement="top-bottom"
    >
      <div className={`absolute -z-10 inset-0 bg-gradient-to-br ${color} opacity-10 group-hover:opacity-20 transition-opacity duration-300`}></div>
      
      <div className="flex items-center justify-between mb-4">
        <div className="w-16 h-16 rounded-full flex items-center justify-center bg-white/10 transition-transform group-hover:rotate-6">
          <Icon className="w-8 h-8 text-white" />
        </div>
        <span 
          className="text-4xl font-bold text-white"
          data-aos="fade-up-left"
          data-aos-duration="1500"
          data-aos-anchor-placement="top-bottom"
        >
          {value}
        </span>
      </div>

      <div>
        <p 
          className="text-sm uppercase tracking-wider text-gray-300 mb-2"
          data-aos="fade-up"
          data-aos-duration="800"
          data-aos-anchor-placement="top-bottom"
        >
          {label}
        </p>
        <div className="flex items-center justify-between">
          <p 
            className="text-xs text-gray-400"
            data-aos="fade-up"
            data-aos-duration="1000"
            data-aos-anchor-placement="top-bottom"
          >
            {description}
          </p>
          <ArrowUpRight className="w-4 h-4 text-white/50 group-hover:text-white transition-colors" />
        </div>
      </div>
    </div>
  </div>
));

const AboutPage = () => {
  // Memoized calculations
  const { totalProjects, totalCertificates, YearExperience } = useMemo(() => {
    const storedProjects = JSON.parse(localStorage.getItem("projects") || "[]");
    const storedCertificates = JSON.parse(localStorage.getItem("certificates") || "[]");
    
    const startDate = new Date("2020-06-01");
    const today = new Date();
    const experience = today.getFullYear() - startDate.getFullYear() -
      (today < new Date(today.getFullYear(), startDate.getMonth(), startDate.getDate()) ? 1 : 0);

    return {
      totalProjects: storedProjects.length || 3,
      totalCertificates: storedCertificates.length || 8,
      YearExperience: experience
    };
  }, []);

  // Optimized AOS initialization
  useEffect(() => {
    const initAOS = () => {
      AOS.init({
        once: false, 
      });
    };

    initAOS();
    
    // Debounced resize handler
    let resizeTimer;
    const handleResize = () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(initAOS, 250);
    };

    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
      clearTimeout(resizeTimer);
    };
  }, []);

  // Memoized stats data
  const statsData = useMemo(() => [
    {
      icon: Code,
      color: "from-[#6366f1] to-[#a855f7]",
      value: totalProjects,
      label: "Total Projects",
      description: "Innovative solutions crafted",
      animation: "fade-right",
    },
    {
      icon: Award,
      color: "from-[#a855f7] to-[#6366f1]",
      value: totalCertificates,
      label: "Certificates",
      description: "Professional skills validated",
      animation: "fade-up",
    },
    {
      icon: Globe,
      color: "from-[#6366f1] to-[#a855f7]",
      value: YearExperience,
      label: "Years of Experience",
      description: "Continuous learning journey",
      animation: "fade-left",
    },
  ], [totalProjects, totalCertificates, YearExperience]);

  return (
    <div
      className="h-auto pb-[10%] text-white overflow-hidden px-[5%] sm:px-[5%] lg:px-[10%] mt-10 sm-mt-0" 
      id="About"
    >
      <Header />

      <div className="w-full mx-auto pt-8 sm:pt-12 relative">
        <div className="flex flex-col-reverse lg:grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          <div className="space-y-6 text-center lg:text-left">
            <h2 
              className="text-3xl sm:text-4xl lg:text-5xl font-bold"
              data-aos="fade-right"
              data-aos-duration="1000"
            >
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#6366f1] to-[#a855f7]">
                Hello, I'm
              </span>
              <span 
                className="block mt-2 text-gray-200"
                data-aos="fade-right"
                data-aos-duration="1300"
              >
                Ritesh Raj Arul Selvan
              </span>
            </h2>
            
            <p 
              className="text-base sm:text-lg lg:text-xl text-gray-400 leading-relaxed text-justify pb-4 sm:pb-0"
              data-aos="fade-right"
              data-aos-duration="1500"
            >
             As a passionate robotics enthusiast and high school student at Rochester High School in Rochester, Michigan, I've been actively involved in FIRST Robotics Competition (FRC) for several years. This experience has allowed me to develop strong foundations in programming languages like Python, C++, and Java, as well as gain hands-on experience in mechanical design, project management, and problem-solving. Currently, I'm particularly excited about delving deeper into artificial intelligence, machine learning, and cybersecurity, finding these fields incredibly fascinating as I work on developing intelligent systems and secure applications.
            </p>

            <div className="space-y-4 text-gray-300" data-aos="fade-right" data-aos-duration="1700">
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                <span>🤖 FIRST Robotics Competition (FRC) Participant</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 bg-purple-400 rounded-full"></div>
                <span>⚡ Passionate about AI, Machine Learning & Robotics</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                <span>🌐 Full-Stack Developer & Open Source Contributor</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 bg-yellow-400 rounded-full"></div>
                <span>🔐 Cybersecurity & Ethical Hacking Certified</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 bg-red-400 rounded-full"></div>
                <span>📱 Mobile App Developer (Flutter & Dart)</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 bg-indigo-400 rounded-full"></div>
                <span>🎨 VFX Artist & Creative Designer</span>
              </div>
            </div>

            <div className="bg-white/5 backdrop-blur-md rounded-2xl p-6 border border-white/20" data-aos="fade-right" data-aos-duration="1800">
              <h3 className="text-lg font-semibold text-white mb-4">🏆 Certifications & Skills</h3>
              <div className="space-y-3 text-gray-300">
                <p>🔐 NIKISTIAN Master Cyber Security (Aug 2024)</p>
                <p>☕ HackerRank: Python, Java & JavaScript Certified</p>
                <p>🌐 freeCodeCamp Responsive Web Design</p>
                <p>🗄️ SQL and Relational Databases Expert (Jun 2025)</p>
                <p>📱 Altair IoT Certified Developer (Jun 2024)</p>
                <p>🎨 Adobe Photoshop & Creative Skills</p>
                <p>🤖 Building ScoutOps Suite for FRC teams</p>
                <p>📚 Working on Programmer's Handbook & Project Pyintel</p>
              </div>
            </div>
            
            <div className="text-gray-300 mt-6" data-aos="fade-right" data-aos-duration="2000">
              <p>🌟 I believe in the power of technology to change the world</p>
              <p>🤝 Open to collaboration and networking opportunities</p>
              <p>💡 Always eager to learn new technologies and solve complex problems</p>
            </div>
            
            <div className="flex flex-col lg:flex-row items-center lg:items-start gap-4 lg:gap-4 lg:px-0 w-full">
              <a href="https://drive.google.com/drive/folders/1BOm51Grsabb3zj6Xk27K-iRwI1zITcpo" className="w-full lg:w-auto">
                <button 
                  data-aos="fade-up"
                  data-aos-duration="800"
                  className="group relative w-full lg:w-auto overflow-hidden rounded-2xl"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-[#6366f1] to-[#a855f7] blur-lg opacity-50 group-hover:opacity-75 transition-opacity duration-300"></div>
                  <div className="relative bg-gradient-to-r from-[#6366f1] to-[#a855f7] px-8 py-3 rounded-2xl text-white font-semibold flex items-center gap-2 group-hover:scale-105 transition-transform duration-300">
                    <FileText className="w-5 h-5" />
                    Download Resume
                  </div>
                </button>
              </a>
              
              <a href="https://www.linkedin.com/in/riteshraj/" className="w-full lg:w-auto">
                <button 
                  data-aos="fade-up"
                  data-aos-duration="1000"
                  className="group relative w-full lg:w-auto overflow-hidden rounded-2xl"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-[#a855f7] to-[#6366f1] blur-lg opacity-50 group-hover:opacity-75 transition-opacity duration-300"></div>
                  <div className="relative bg-gradient-to-r from-[#a855f7] to-[#6366f1] px-8 py-3 rounded-2xl text-white font-semibold flex items-center gap-2 group-hover:scale-105 transition-transform duration-300">
                    <UserCheck className="w-5 h-5" />
                    Let's Connect
                  </div>
                </button>
              </a>
            </div>
          </div>

          <ProfileImage />
        </div>
      </div>

      <div className="mt-20 sm:mt-24 lg:mt-32">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {statsData.map((stat, index) => (
            <StatCard key={index} {...stat} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default memo(AboutPage);

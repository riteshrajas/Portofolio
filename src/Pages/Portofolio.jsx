import React, { useEffect, useState, useCallback } from "react";
import { db, collection } from "../firebase";
import { getDocs } from "firebase/firestore";
import PropTypes from "prop-types";
import { useTheme } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import CardProject from "../components/CardProject";
import TechStackIcon from "../components/TechStackIcon";
import AOS from "aos";
import "aos/dist/aos.css";
import Certificate from "../components/Certificate_enhanced";
import { Code, Award, Boxes } from "lucide-react";

// Separate ShowMore/ShowLess button component
const ToggleButton = ({ onClick, isShowingMore }) => (
  <button
    onClick={onClick}
    className="
      px-3 py-1.5
      text-slate-300 
      hover:text-white 
      text-sm 
      font-medium 
      transition-all 
      duration-300 
      ease-in-out
      flex 
      items-center 
      gap-2
      bg-white/5 
      hover:bg-white/10
      rounded-md
      border 
      border-white/10
      hover:border-white/20
      backdrop-blur-sm
      group
      relative
      overflow-hidden
    "
  >
    <span className="relative z-10 flex items-center gap-2">
      {isShowingMore ? "See Less" : "See More"}
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className={`
          transition-transform 
          duration-300 
          ${isShowingMore ? "group-hover:-translate-y-0.5" : "group-hover:translate-y-0.5"}
        `}
      >
        <polyline points={isShowingMore ? "18 15 12 9 6 15" : "6 9 12 15 18 9"}></polyline>
      </svg>
    </span>
    <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-purple-500/50 transition-all duration-300 group-hover:w-full"></span>
  </button>
);

function TabPanel({ children, value, index, ...other }) {
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: { xs: 1, sm: 3 } }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `full-width-tab-${index}`,
    "aria-controls": `full-width-tabpanel-${index}`,
  };
}

const techStacks = [
  { icon: "javascript.svg", language: "JavaScript" },
  { icon: "reactjs.svg", language: "ReactJS" },
  { icon: "nodejs.svg", language: "Node JS" },
  { icon: "html.svg", language: "HTML" },
  { icon: "css.svg", language: "CSS" },
  { icon: "tailwind.svg", language: "Tailwind CSS" },
  { icon: "firebase.svg", language: "Firebase" },
  { icon: "bootstrap.svg", language: "Bootstrap" },
  { icon: "vite.svg", language: "Vite" },
  { icon: "MUI.svg", language: "Material UI" },
  { icon: "vercel.svg", language: "Vercel" },
  { icon: "SweetAlert.svg", language: "SweetAlert2" },
];

// Local projects data based on your actual repositories
const localProjects = [
  {
    id: "pyintel-suite",
    Title: "Pyintel AI Assistant Suite",
    Description: "A comprehensive AI assistant ecosystem featuring natural language processing, voice recognition, and automation capabilities. Built with Python, TypeScript, and JavaScript.",
    Img: "/project-images/pyintel.jpg",
    Link: "https://github.com/riteshrajas/PYINTEL",
    TechStack: ["Python", "JavaScript", "TypeScript", "AI/ML", "NLP"],
    featured: true,
    category: "AI & Machine Learning"
  },
  {
    id: "scout-ops-suite",
    Title: "Scout-Ops: FRC Scouting Platform",
    Description: "Complete scouting application suite for FIRST Robotics Competition with Android app, server backend, and Windows application. Multi-platform data collection and analysis.",
    Img: "/project-images/scout-ops.jpg",
    Link: "https://github.com/riteshrajas/Scout-Ops-Android",
    TechStack: ["Kotlin", "Java", "Dart", "JavaScript", "HTML"],
    featured: true,
    category: "Robotics & FRC"
  },
  {
    id: "stewie-robot-2024",
    Title: "STEWIE 2024 - FRC Robot Code",
    Description: "Competition-ready robot code for Team STEWIE's 2024 FRC season. Features autonomous routines, teleoperated controls, and advanced drivetrain systems.",
    Img: "/project-images/stewie-robot.jpg",
    Link: "https://github.com/riteshrajas/STEWIE2024-After-Season",
    TechStack: ["Java", "Robotics", "FRC", "Control Systems"],
    featured: true,
    category: "Robotics & FRC"
  },
  {
    id: "mosimbuilder",
    Title: "MoSimBuilder - Robot Simulation",
    Description: "Advanced robot modeling and simulation platform built in C#. Enables virtual testing and validation of robot designs before physical implementation.",
    Img: "/project-images/mosimbuilder.jpg",
    Link: "https://github.com/riteshrajas/MoSimBuilder-Stable",
    TechStack: ["C#", ".NET", "Simulation", "3D Modeling"],
    featured: false,
    category: "Robotics & FRC"
  },
  {
    id: "vit-transcription",
    Title: "VIT - Natural Language Transcriber",
    Description: "AI-powered transcription application that converts speech to text with high accuracy. Part of the Pyintel ecosystem for voice processing.",
    Img: "/project-images/vit-transcription.jpg",
    Link: "https://github.com/riteshrajas/VIT",
    TechStack: ["Python", "Machine Learning", "Speech Recognition", "NLP"],
    featured: false,
    category: "AI & Machine Learning"
  },
  {
    id: "wake-word-detection",
    Title: "Wake Word Detection Engine",
    Description: "Custom wake word detection system for voice assistants. Implements machine learning algorithms to recognize specific trigger phrases with low latency.",
    Img: "/project-images/wake-word.jpg",
    Link: "https://github.com/riteshrajas/WakeWordDetection",
    TechStack: ["Python", "Machine Learning", "Audio Processing", "TensorFlow"],
    featured: false,
    category: "AI & Machine Learning"
  },
  {
    id: "cs-club-website",
    Title: "Computer Science Club Website",
    Description: "Official website for the CS Club I founded at my high school. Features event management, member registration, and educational resources.",
    Img: "/project-images/cs-club-website.jpg",
    Link: "https://github.com/riteshrajas/CS-CLUB-WEBSITE",
    TechStack: ["HTML", "CSS", "JavaScript", "Web Development"],
    featured: false,
    category: "Web Development"
  },
  {
    id: "portfolio-website",
    Title: "Personal Portfolio Website",
    Description: "This very website! A modern, responsive portfolio showcasing my projects, achievements, and technical skills. Built with React and modern web technologies.",
    Img: "/project-images/portfolio.jpg",
    Link: "https://github.com/riteshrajas/Portofolio",
    TechStack: ["React", "JavaScript", "Tailwind CSS", "Firebase"],
    featured: false,
    category: "Web Development"
  },
  {
    id: "robosaurus-rex",
    Title: "RoboSaurus Rex - Competition Robot",
    Description: "Advanced robotics project featuring autonomous navigation, sensor integration, and competition-ready design. Developed for robotics competitions.",
    Img: "/project-images/robosaurus-rex.jpg",
    Link: "https://github.com/riteshrajas/RoboSaurus_Rex",
    TechStack: ["Jupyter Notebook", "Python", "Robotics", "Machine Learning"],
    featured: false,
    category: "Robotics & FRC"
  }
];

const localCertificates = [
  {
    id: "sql-db-2025",
    title: "SQL and Relational Databases 101",
    issuer: "Cognitive Class",
    issueDate: "June 2025",
    credentialId: "7e27ca07c7b0463b8e4adf8a36fbbca9",
    Img: "/certificates/sql-databases.jpg",
    skills: ["SQL", "Database Management", "Data Analysis"],
    description: "Comprehensive course covering SQL fundamentals, database design, and relational database concepts."
  },
  {
    id: "cyber-security-2024",
    title: "NIKISTIAN Master Cyber Security",
    issuer: "NIKISTIAN MEDIA PRIVATE LIMITED",
    issueDate: "August 2024",
    credentialId: "cyber-security-2024",
    Img: "/certificates/cyber-security.jpg",
    skills: ["Ethical Hacking", "Security Onion", "Cybersecurity"],
    description: "Advanced cybersecurity training covering ethical hacking, security tools, and threat detection."
  },
  {
    id: "altair-iot-2024",
    title: "Altair IoT Certified",
    issuer: "Altair",
    issueDate: "June 2024",
    credentialId: "altair-iot-2024",
    Img: "/certificates/altair-iot.jpg",
    skills: ["Internet of Things (IoT)", "Smart Systems", "Device Connectivity"],
    description: "Certification in IoT technologies, smart systems integration, and device connectivity solutions."
  },
  {
    id: "adobe-skills-2024",
    title: "Certifying Adobe Skills in Your Classroom",
    issuer: "Adobe Education",
    issueDate: "June 2024",
    credentialId: "69f50fe6-d1e6-4770-ab9a-8e87e88e53f5",
    Img: "/certificates/adobe-skills.jpg",
    skills: ["Adobe Photoshop", "Creative Design", "Digital Arts"],
    description: "Professional certification in Adobe Creative Suite, focusing on design principles and digital content creation."
  },
  {
    id: "java-basics-2024",
    title: "Java Basics",
    issuer: "HackerRank",
    issueDate: "June 2024",
    credentialId: "93f495714d71",
    Img: "/certificates/java-basics.jpg",
    skills: ["Java Programming", "Object-Oriented Programming", "Software Development"],
    description: "Fundamental Java programming concepts including OOP principles, data structures, and algorithms."
  },
  {
    id: "responsive-web-2024",
    title: "Responsive Web Design Certification",
    issuer: "freeCodeCamp",
    issueDate: "June 2024",
    credentialId: "freecodecamp-rwd-2024",
    Img: "/certificates/responsive-web.jpg",
    skills: ["Responsive Web Design", "HTML5", "CSS3", "Web Development"],
    description: "Comprehensive web development certification covering responsive design, HTML5, CSS3, and modern web standards."
  },
  {
    id: "javascript-basic-2023",
    title: "JavaScript (Basic)",
    issuer: "HackerRank",
    issueDate: "June 2023",
    credentialId: "54bf40507c00",
    Img: "/certificates/javascript-basic.jpg",
    skills: ["JavaScript", "Programming", "Web Development"],
    description: "Essential JavaScript programming skills including DOM manipulation, event handling, and modern JS features."
  },
  {
    id: "python-basic-2023",
    title: "Python (Basic) Certificate",
    issuer: "HackerRank",
    issueDate: "May 2023",
    credentialId: "4d0940ad32d5",
    Img: "/certificates/python-basic.jpg",
    skills: ["Python Programming", "Programming Fundamentals", "Software Development"],
    description: "Foundation Python programming covering syntax, data structures, functions, and basic algorithms."
  }
];

export default function FullWidthTabs() {
  const theme = useTheme();
  const [value, setValue] = useState(0);
  const [projects, setProjects] = useState([]);
  const [certificates, setCertificates] = useState([]);
  const [showAllProjects, setShowAllProjects] = useState(false);
  const [showAllCertificates, setShowAllCertificates] = useState(false);
  const isMobile = window.innerWidth < 768;
  const initialItems = isMobile ? 4 : 6;

  useEffect(() => {
    // Initialize AOS once
    AOS.init({
      once: false, // This will make animations occur only once
    });
  }, []);

  const fetchData = useCallback(async () => {
    try {
      const projectCollection = collection(db, "projects");
      const certificateCollection = collection(db, "certificates");

      const [projectSnapshot, certificateSnapshot] = await Promise.all([
        getDocs(projectCollection),
        getDocs(certificateCollection),
      ]);

      const projectData = projectSnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
        TechStack: doc.data().TechStack || [],
      }));

      const certificateData = certificateSnapshot.docs.map((doc) => doc.data());

      // Combine Firebase projects with local projects, prioritizing local projects
      const combinedProjects = [...localProjects, ...projectData];
      
      setProjects(combinedProjects);
      setCertificates(certificateData.length > 0 ? certificateData : localCertificates);

      // Store in localStorage
      localStorage.setItem("projects", JSON.stringify(combinedProjects));
      localStorage.setItem("certificates", JSON.stringify(certificateData.length > 0 ? certificateData : localCertificates));
    } catch (error) {
      console.error("Error fetching data from Firebase, using local data:", error);
      
      // Fallback to local data if Firebase fails
      const storedProjects = JSON.parse(localStorage.getItem("projects") || "[]");
      const storedCertificates = JSON.parse(localStorage.getItem("certificates") || "[]");
      
      // Use local projects if no stored projects or if stored projects are empty
      const fallbackProjects = storedProjects.length > 0 ? storedProjects : localProjects;
      
      setProjects(fallbackProjects);
      setCertificates(storedCertificates.length > 0 ? storedCertificates : localCertificates);
      
      // Store local data in localStorage if none exist
      if (storedProjects.length === 0) {
        localStorage.setItem("projects", JSON.stringify(localProjects));
      }
      if (storedCertificates.length === 0) {
        localStorage.setItem("certificates", JSON.stringify(localCertificates));
      }
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const toggleShowMore = useCallback((type) => {
    if (type === 'projects') {
      setShowAllProjects(prev => !prev);
    } else {
      setShowAllCertificates(prev => !prev);
    }
  }, []);

  const displayedProjects = showAllProjects ? projects : projects.slice(0, initialItems);
  const displayedCertificates = showAllCertificates ? certificates : certificates.slice(0, initialItems);

  return (
    <div className="md:px-[10%] px-[5%] w-full sm:mt-0 mt-[3rem] bg-[#030014] overflow-hidden" id="Portofolio">
      {/* Header section - unchanged */}
      <div className="text-center pb-10" data-aos="fade-up" data-aos-duration="1000">
        <h2 className="inline-block text-3xl md:text-5xl font-bold text-center mx-auto text-transparent bg-clip-text bg-gradient-to-r from-[#6366f1] to-[#a855f7]">
          <span style={{
            color: '#6366f1',
            backgroundImage: 'linear-gradient(45deg, #6366f1 10%, #a855f7 93%)',
            WebkitBackgroundClip: 'text',
            backgroundClip: 'text',
            WebkitTextFillColor: 'transparent'
          }}>
            Portfolio Showcase
          </span>
        </h2>
        <p className="text-slate-400 max-w-2xl mx-auto text-sm md:text-base mt-2">
          From Pyintel AI to FRC robotics - explore my journey of innovation, leadership, and technical excellence. 
          Each project represents my commitment to open-source development and community impact.
        </p>
      </div>

      <Box sx={{ width: "100%" }}>
        {/* AppBar and Tabs section - unchanged */}
        <AppBar
          position="static"
          elevation={0}
          sx={{
            bgcolor: "transparent",
            border: "1px solid rgba(255, 255, 255, 0.1)",
            borderRadius: "20px",
            position: "relative",
            overflow: "hidden",
            "&::before": {
              content: '""',
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              background: "linear-gradient(180deg, rgba(139, 92, 246, 0.03) 0%, rgba(59, 130, 246, 0.03) 100%)",
              backdropFilter: "blur(10px)",
              zIndex: 0,
            },
          }}
          className="md:px-4"
        >
          {/* Tabs remain unchanged */}
          <Tabs
            value={value}
            onChange={handleChange}
            textColor="secondary"
            indicatorColor="secondary"
            variant="fullWidth"
            sx={{
              // Existing styles remain unchanged
              minHeight: "70px",
              "& .MuiTab-root": {
                fontSize: { xs: "0.9rem", md: "1rem" },
                fontWeight: "600",
                color: "#94a3b8",
                textTransform: "none",
                transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
                padding: "20px 0",
                zIndex: 1,
                margin: "8px",
                borderRadius: "12px",
                "&:hover": {
                  color: "#ffffff",
                  backgroundColor: "rgba(139, 92, 246, 0.1)",
                  transform: "translateY(-2px)",
                  "& .lucide": {
                    transform: "scale(1.1) rotate(5deg)",
                  },
                },
                "&.Mui-selected": {
                  color: "#fff",
                  background: "linear-gradient(135deg, rgba(139, 92, 246, 0.2), rgba(59, 130, 246, 0.2))",
                  boxShadow: "0 4px 15px -3px rgba(139, 92, 246, 0.2)",
                  "& .lucide": {
                    color: "#a78bfa",
                  },
                },
              },
              "& .MuiTabs-indicator": {
                height: 0,
              },
              "& .MuiTabs-flexContainer": {
                gap: "8px",
              },
            }}
          >
            <Tab
              icon={<Code className="mb-2 w-5 h-5 transition-all duration-300" />}
              label="Projects"
              {...a11yProps(0)}
            />
            <Tab
              icon={<Award className="mb-2 w-5 h-5 transition-all duration-300" />}
              label="Certificates"
              {...a11yProps(1)}
            />
            <Tab
              icon={<Boxes className="mb-2 w-5 h-5 transition-all duration-300" />}
              label="Tech Stack"
              {...a11yProps(2)}
            />
          </Tabs>
        </AppBar>

        <div style={{ padding: '20px 0' }}>
          <TabPanel value={value} index={0} dir={theme.direction}>
            <div className="container mx-auto flex justify-center items-center overflow-hidden">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 2xl:grid-cols-3 gap-5">
                {displayedProjects.map((project, index) => (
                  <div
                    key={project.id || index}
                    data-aos={index % 3 === 0 ? "fade-up-right" : index % 3 === 1 ? "fade-up" : "fade-up-left"}
                    data-aos-duration={index % 3 === 0 ? "1000" : index % 3 === 1 ? "1200" : "1000"}
                  >
                    <CardProject
                      Img={project.Img}
                      Title={project.Title}
                      Description={project.Description}
                      Link={project.Link}
                      id={project.id}
                    />
                  </div>
                ))}
              </div>
            </div>
            {projects.length > initialItems && (
              <div className="mt-6 w-full flex justify-start">
                <ToggleButton
                  onClick={() => toggleShowMore('projects')}
                  isShowingMore={showAllProjects}
                />
              </div>
            )}
          </TabPanel>

          <TabPanel value={value} index={1} dir={theme.direction}>
            <div className="container mx-auto flex justify-center items-center overflow-hidden">
              <div className="grid grid-cols-1 md:grid-cols-3 md:gap-5 gap-4">
                {displayedCertificates.map((certificate, index) => (
                  <div
                    key={certificate.id || index}
                    data-aos={index % 3 === 0 ? "fade-up-right" : index % 3 === 1 ? "fade-up" : "fade-up-left"}
                    data-aos-duration={index % 3 === 0 ? "1000" : index % 3 === 1 ? "1200" : "1000"}
                  >
                    <Certificate ImgSertif={certificate.Img} certificate={certificate} />
                  </div>
                ))}
              </div>
            </div>
            {certificates.length > initialItems && (
              <div className="mt-6 w-full flex justify-start">
                <ToggleButton
                  onClick={() => toggleShowMore('certificates')}
                  isShowingMore={showAllCertificates}
                />
              </div>
            )}
          </TabPanel>

          <TabPanel value={value} index={2} dir={theme.direction}>
            <div className="container mx-auto flex justify-center items-center overflow-hidden pb-[5%]">
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 lg:gap-8 gap-5">
                {techStacks.map((stack, index) => (
                  <div
                    key={index}
                    data-aos={index % 3 === 0 ? "fade-up-right" : index % 3 === 1 ? "fade-up" : "fade-up-left"}
                    data-aos-duration={index % 3 === 0 ? "1000" : index % 3 === 1 ? "1200" : "1000"}
                  >
                    <TechStackIcon TechStackIcon={stack.icon} Language={stack.language} />
                  </div>
                ))}
              </div>
            </div>
          </TabPanel>
        </div>
      </Box>
    </div>
  );
}
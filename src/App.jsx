import { BrowserRouter, Routes, Route } from "react-router-dom";
import React, { useState } from 'react';
import { Github, Linkedin, Instagram } from 'lucide-react';
import "./index.css";
import Home from "./Pages/Home";
import About from "./Pages/About";
import AnimatedBackground from "./components/Background";
import Navbar from "./components/Navbar";
import Portofolio from "./Pages/Portofolio";
import ContactPage from "./Pages/Contact";
import ProjectDetails from "./components/ProjectDetail";
import WelcomeScreen from "./Pages/WelcomeScreen";
import { AnimatePresence } from 'framer-motion';
import notfound from "./Pages/404";
import NotFoundPage from "./Pages/404";

const LandingPage = ({ showWelcome, setShowWelcome }) => {
  return (
    <>
      <AnimatePresence mode="wait">
        {showWelcome && (
          <WelcomeScreen onLoadingComplete={() => setShowWelcome(false)} />
        )}
      </AnimatePresence>

      {!showWelcome && (
        <>
          <Navbar />
          <AnimatedBackground />
          <Home />
          <About />
          <Portofolio />
          <ContactPage />
          <footer className="bg-gradient-to-r from-gray-900 to-black border-t border-white/10">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="py-12">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                  {/* Brand Section */}
                  <div className="md:col-span-2">
                    <h3 className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-600 bg-clip-text text-transparent mb-4">
                      🌌 Ritesh Raj Arul Selvan
                    </h3>
                    <p className="text-gray-400 mb-4 leading-relaxed">
                      High School Student at Rochester High School passionate about Robotics, AI, ML, and creating innovative solutions. 
                      FIRST Robotics Competition participant with expertise in cybersecurity and mobile app development, building the future of technology!
                    </p>
                    <div className="flex space-x-4">
                      <a href="https://github.com/riteshrajas" target="_blank" rel="noopener noreferrer" 
                         className="text-gray-400 hover:text-white transition-colors">
                        <Github className="w-5 h-5" />
                      </a>
                      <a href="https://www.linkedin.com/in/riteshraj/" target="_blank" rel="noopener noreferrer" 
                         className="text-gray-400 hover:text-white transition-colors">
                        <Linkedin className="w-5 h-5" />
                      </a>
                      <a href="https://www.instagram.com/ritesh_raj/" target="_blank" rel="noopener noreferrer" 
                         className="text-gray-400 hover:text-white transition-colors">
                        <Instagram className="w-5 h-5" />
                      </a>
                    </div>
                  </div>

                  {/* Quick Links */}
                  <div>
                    <h4 className="text-white font-semibold mb-4">Quick Links</h4>
                    <ul className="space-y-2">
                      <li><a href="#Home" className="text-gray-400 hover:text-white transition-colors">Home</a></li>
                      <li><a href="#About" className="text-gray-400 hover:text-white transition-colors">About</a></li>
                      <li><a href="#Portofolio" className="text-gray-400 hover:text-white transition-colors">Portfolio</a></li>
                      <li><a href="#Contact" className="text-gray-400 hover:text-white transition-colors">Contact</a></li>
                    </ul>
                  </div>

                  {/* Contact Info */}
                  <div>
                    <h4 className="text-white font-semibold mb-4">Get in Touch</h4>
                    <div className="space-y-2">
                      <p className="text-gray-400">📧 riteshrajarul@gmail.com</p>
                      <p className="text-gray-400">🌐 github.com/riteshrajas</p>
                      <p className="text-gray-400">📍 Rochester, Michigan</p>
                      <p className="text-gray-400">🎓 Rochester High School</p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="border-t border-white/10 py-6">
                <div className="flex flex-col md:flex-row justify-between items-center">
                  <p className="text-gray-400 text-sm">
                    © 2025 Ritesh Raj Arul Selvan. All rights reserved. Built with ❤️ and lots of ☕
                  </p>
                  <div className="flex items-center space-x-2 mt-4 md:mt-0">
                    <span className="text-gray-400 text-sm">Made with</span>
                    <span className="text-blue-400">React</span>
                    <span className="text-gray-400">•</span>
                    <span className="text-purple-400">Tailwind</span>
                    <span className="text-gray-400">•</span>
                    <span className="text-green-400">Love</span>
                  </div>
                </div>
              </div>
            </div>
          </footer>
        </>
      )}
    </>
  );
};

const ProjectPageLayout = () => (
  <>
    <ProjectDetails />
    <footer>
      <center>
        <hr className="my-3 border-gray-400 opacity-15 sm:mx-auto lg:my-6 text-center" />
        <span className="block text-sm pb-4 text-gray-500 text-center dark:text-gray-400">
          © 2023{" "}
          <a href="https://flowbite.com/" className="hover:underline">
            EkiZR™
          </a>
          . All Rights Reserved.
        </span>
      </center>
    </footer>
  </>
);

function App() {
  const [showWelcome, setShowWelcome] = useState(true);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage showWelcome={showWelcome} setShowWelcome={setShowWelcome} />} />
        <Route path="/project/:id" element={<ProjectPageLayout />} />
         <Route path="*" element={<NotFoundPage />} /> {/* Ini route 404 */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
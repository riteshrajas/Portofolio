import React, { useState, useEffect, memo } from 'react';
import { motion } from 'framer-motion';
import { Code, Brain, Zap, Coffee, Terminal, Lightbulb } from 'lucide-react';

const CodeBlock = memo(() => {
  const [currentLine, setCurrentLine] = useState(0);
  
  const codeLines = [
    'const eki = {',
    '  name: "Eki Zulfar Rachman",',
    '  location: "Indonesia 🇮🇩",',
    '  education: "Network & Telecommunications",',
    '  role: "Frontend Developer",',
    '  ',
    '  passions: [',
    '    "💻 Web Development",',
    '    "🎨 UI/UX Design",',
    '    "📱 Mobile Apps",',
    '    "🚀 Innovation"',
    '  ],',
    '  ',
    '  currentlyLearning: [',
    '    "Advanced React Patterns",',
    '    "Next.js 14",',
    '    "TypeScript",',
    '    "System Design"',
    '  ],',
    '  ',
    '  goals2024: [',
    '    "Build 10+ Amazing Projects",',
    '    "Master Full-Stack Development",',
    '    "Contribute to Open Source",',
    '    "Launch SaaS Product"',
    '  ],',
    '  ',
    '  funFact: "I debug with coffee ☕"',
    '};',
    '',
    'console.log("Let\'s build something amazing! 🚀");'
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentLine(prev => (prev + 1) % codeLines.length);
    }, 150);

    return () => clearInterval(interval);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, x: -50 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.8 }}
      className="bg-gray-900/80 backdrop-blur-md rounded-2xl p-6 border border-white/20 font-mono text-sm overflow-hidden"
    >
      <div className="flex items-center gap-2 mb-4">
        <div className="w-3 h-3 bg-red-500 rounded-full" />
        <div className="w-3 h-3 bg-yellow-500 rounded-full" />
        <div className="w-3 h-3 bg-green-500 rounded-full" />
        <span className="text-gray-400 ml-2">about-me.js</span>
      </div>
      
      <div className="space-y-1">
        {codeLines.map((line, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0 }}
            animate={{ opacity: index <= currentLine ? 1 : 0.3 }}
            transition={{ duration: 0.3 }}
            className="flex items-center gap-2"
          >
            <span className="text-gray-500 w-6 text-right">
              {index + 1}
            </span>
            <span className={`${
              line.includes('const') || line.includes('console') 
                ? 'text-purple-400' 
                : line.includes('"') 
                ? 'text-green-400' 
                : line.includes('//') 
                ? 'text-gray-500' 
                : 'text-gray-300'
            }`}>
              {line}
            </span>
            {index === currentLine && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: [0, 1, 0] }}
                transition={{ duration: 1, repeat: Infinity }}
                className="w-2 h-4 bg-blue-400"
              />
            )}
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
});

const FloatingIcon = memo(({ Icon, position, delay = 0, color = "text-blue-400" }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ 
      opacity: [0, 1, 0],
      y: [20, -20, 20],
      rotate: [0, 360, 0]
    }}
    transition={{ 
      duration: 4,
      delay,
      repeat: Infinity,
      ease: "easeInOut"
    }}
    className={`absolute ${position} ${color}`}
  >
    <Icon className="w-8 h-8" />
  </motion.div>
));

const StatCounter = memo(({ value, label, delay = 0 }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => {
      let start = 0;
      const end = parseInt(value);
      const duration = 2000;
      const increment = end / (duration / 16);

      const counter = setInterval(() => {
        start += increment;
        if (start >= end) {
          setCount(end);
          clearInterval(counter);
        } else {
          setCount(Math.floor(start));
        }
      }, 16);

      return () => clearInterval(counter);
    }, delay);

    return () => clearTimeout(timer);
  }, [value, delay]);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.6, delay }}
      className="text-center"
    >
      <div className="text-3xl font-bold text-white mb-2">{count}</div>
      <div className="text-sm text-gray-400">{label}</div>
    </motion.div>
  );
});

const AnimatedIntro = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="w-full py-16 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Floating Icons */}
      <FloatingIcon Icon={Code} position="top-10 left-10" delay={0} color="text-blue-400" />
      <FloatingIcon Icon={Brain} position="top-20 right-20" delay={0.5} color="text-purple-400" />
      <FloatingIcon Icon={Zap} position="bottom-20 left-20" delay={1} color="text-yellow-400" />
      <FloatingIcon Icon={Coffee} position="bottom-10 right-10" delay={1.5} color="text-orange-400" />
      <FloatingIcon Icon={Terminal} position="top-1/2 left-1/4" delay={2} color="text-green-400" />
      <FloatingIcon Icon={Lightbulb} position="top-1/3 right-1/3" delay={2.5} color="text-pink-400" />

      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Side - Code Block */}
          <div className="space-y-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="space-y-4"
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-full border border-white/20">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                <span className="text-sm font-medium text-white">Available for opportunities</span>
              </div>
              
              <h1 className="text-4xl md:text-5xl font-bold text-white leading-tight">
                Meet the Developer
                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-600">
                  Behind the Code
                </span>
              </h1>
              
              <p className="text-xl text-gray-400 leading-relaxed">
                Transforming ideas into elegant digital solutions with creativity and precision
              </p>
            </motion.div>

            <CodeBlock />

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 20 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="grid grid-cols-3 gap-8 bg-white/5 backdrop-blur-md rounded-2xl p-6 border border-white/20"
            >
              <StatCounter value="50" label="Projects Built" delay={0.8} />
              <StatCounter value="15" label="Technologies" delay={1.2} />
              <StatCounter value="3" label="Years Experience" delay={1.6} />
            </motion.div>
          </div>

          {/* Right Side - Interactive Elements */}
          <div className="space-y-8">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="relative"
            >
              {/* Main Card */}
              <div className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-md rounded-3xl p-8 border border-white/20 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-purple-500/10 rounded-3xl" />
                
                <div className="relative z-10 space-y-6">
                  <div className="flex items-center gap-4">
                    <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center">
                      <Code className="w-8 h-8 text-white" />
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold text-white">Frontend Developer</h3>
                      <p className="text-gray-400">Creating Amazing Web Experiences</p>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-blue-500/20 rounded-lg flex items-center justify-center">
                        <Zap className="w-4 h-4 text-blue-400" />
                      </div>
                      <span className="text-gray-300">React & Next.js Specialist</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-purple-500/20 rounded-lg flex items-center justify-center">
                        <Brain className="w-4 h-4 text-purple-400" />
                      </div>
                      <span className="text-gray-300">UI/UX Design Enthusiast</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-green-500/20 rounded-lg flex items-center justify-center">
                        <Coffee className="w-4 h-4 text-green-400" />
                      </div>
                      <span className="text-gray-300">Coffee-Driven Developer</span>
                    </div>
                  </div>

                  <div className="pt-4 border-t border-white/10">
                    <p className="text-sm text-gray-400 italic">
                      "Code is not just my profession, it's my passion. Let's create something amazing together!"
                    </p>
                  </div>
                </div>
              </div>

              {/* Floating Elements */}
              <div className="absolute -top-4 -right-4 w-24 h-24 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full opacity-20 blur-xl animate-pulse" />
              <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full opacity-20 blur-xl animate-pulse delay-1000" />
            </motion.div>

            {/* Skills Preview */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
              className="grid grid-cols-2 gap-4"
            >
              {['React', 'JavaScript', 'Tailwind', 'Node.js'].map((skill, index) => (
                <div
                  key={skill}
                  className="bg-white/5 backdrop-blur-md rounded-xl p-4 border border-white/20 text-center hover:bg-white/10 transition-all duration-300 hover:scale-105"
                >
                  <div className="text-lg font-medium text-white">{skill}</div>
                  <div className="text-sm text-gray-400 mt-1">Expert</div>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default memo(AnimatedIntro);

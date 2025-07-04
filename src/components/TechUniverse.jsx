import React, { useState, useEffect, memo } from 'react';
import { motion } from 'framer-motion';
import { Code, Database, Server, Smartphone, Cloud, Settings, Globe, Layers, Cpu, Package, Zap, Monitor } from 'lucide-react';

const TECH_CATEGORIES = {
  "Core Languages": {
    icon: Code,
    color: "from-blue-500 to-purple-600",
    techs: ["JavaScript", "Python", "Java", "C++", "TypeScript", "HTML5", "CSS3"]
  },
  "Web Development": {
    icon: Globe,
    color: "from-green-500 to-blue-500",
    techs: ["React", "Next.js", "Vue.js", "Angular", "Node.js", "Express", "Tailwind CSS", "Bootstrap"]
  },
  "AI & Machine Learning": {
    icon: Cpu,
    color: "from-purple-500 to-pink-500",
    techs: ["TensorFlow", "PyTorch", "Keras", "OpenCV", "Scikit-learn", "Pandas", "NumPy", "Matplotlib"]
  },
  "Mobile & Cross-Platform": {
    icon: Smartphone,
    color: "from-orange-500 to-red-500",
    techs: ["React Native", "Flutter", "Kotlin", "Swift", "Ionic", "Xamarin"]
  },
  "Cloud & DevOps": {
    icon: Cloud,
    color: "from-cyan-500 to-blue-600",
    techs: ["AWS", "Azure", "GCP", "Docker", "Kubernetes", "Jenkins", "GitLab CI/CD", "Terraform"]
  },
  "Databases": {
    icon: Database,
    color: "from-yellow-500 to-orange-500",
    techs: ["MongoDB", "PostgreSQL", "MySQL", "Redis", "Firebase", "Supabase", "DynamoDB"]
  },
  "Development Tools": {
    icon: Settings,
    color: "from-indigo-500 to-purple-500",
    techs: ["VS Code", "Git", "GitHub", "Figma", "Postman", "Webpack", "Vite", "ESLint"]
  }
};

const TechBadge = memo(({ tech, delay = 0 }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5, delay }}
    className="group relative overflow-hidden"
  >
    <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-full blur-md group-hover:blur-sm transition-all duration-300" />
    <div className="relative px-4 py-2 bg-white/10 backdrop-blur-md rounded-full border border-white/20 hover:border-white/40 transition-all duration-300 cursor-default">
      <span className="text-sm font-medium text-gray-200 group-hover:text-white transition-colors">
        {tech}
      </span>
    </div>
  </motion.div>
));

const CategorySection = memo(({ category, data, isVisible }) => {
  const { icon: Icon, color, techs } = data;
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 30 }}
      transition={{ duration: 0.6, delay: 0.1 }}
      className="space-y-4"
    >
      <div className="flex items-center gap-3 mb-6">
        <div className={`p-3 rounded-xl bg-gradient-to-r ${color} bg-opacity-20`}>
          <Icon className="w-6 h-6 text-white" />
        </div>
        <h3 className="text-xl font-semibold text-white">{category}</h3>
      </div>
      
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
        {techs.map((tech, index) => (
          <TechBadge key={tech} tech={tech} delay={index * 0.1} />
        ))}
      </div>
    </motion.div>
  );
});

const TechUniverse = () => {
  const [activeCategory, setActiveCategory] = useState("Core Languages");
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      { threshold: 0.1 }
    );

    const element = document.getElementById('tech-universe');
    if (element) observer.observe(element);

    return () => observer.disconnect();
  }, []);

  const categories = Object.keys(TECH_CATEGORIES);

  return (
    <div id="tech-universe" className="w-full py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : -20 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-600 mb-4">
            🛠️ My Tech Universe
          </h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Explore the technologies and tools I use to build amazing digital experiences
          </p>
        </motion.div>

        {/* Category Tabs */}
        <div className="flex flex-wrap justify-center gap-2 mb-12">
          {categories.map((category) => {
            const isActive = activeCategory === category;
            const { icon: Icon, color } = TECH_CATEGORIES[category];
            
            return (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`
                  relative px-4 py-2 rounded-full transition-all duration-300
                  ${isActive 
                    ? 'bg-white/20 border-white/30 text-white' 
                    : 'bg-white/5 border-white/10 text-gray-400 hover:bg-white/10 hover:text-white'
                  }
                  border backdrop-blur-md
                `}
              >
                <div className="flex items-center gap-2">
                  <Icon className="w-4 h-4" />
                  <span className="text-sm font-medium">{category}</span>
                </div>
                {isActive && (
                  <motion.div
                    layoutId="activeTab"
                    className={`absolute inset-0 bg-gradient-to-r ${color} opacity-20 rounded-full`}
                    initial={false}
                    transition={{ duration: 0.3 }}
                  />
                )}
              </button>
            );
          })}
        </div>

        {/* Active Category Content */}
        <div className="relative min-h-[300px]">
          <CategorySection
            category={activeCategory}
            data={TECH_CATEGORIES[activeCategory]}
            isVisible={isVisible}
          />
        </div>

        {/* Floating Elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-20 left-10 w-2 h-2 bg-blue-500 rounded-full animate-pulse" />
          <div className="absolute top-40 right-20 w-1 h-1 bg-purple-500 rounded-full animate-ping" />
          <div className="absolute bottom-20 left-20 w-1.5 h-1.5 bg-green-500 rounded-full animate-bounce" />
          <div className="absolute bottom-40 right-10 w-2 h-2 bg-pink-500 rounded-full animate-pulse" />
        </div>
      </div>
    </div>
  );
};

export default memo(TechUniverse);

import React, { useState, useEffect, memo } from 'react';
import { motion } from 'framer-motion';
import { Code, Coffee, BookOpen, Zap, Clock, TrendingUp } from 'lucide-react';

const CodingActivity = () => {
  const [weeklyData, setWeeklyData] = useState([]);
  const [currentWeek, setCurrentWeek] = useState(0);
  
  // Mock weekly coding data
  const weeklyStats = [
    { day: 'Monday', hours: 8, language: 'React', project: 'Portfolio Enhancement', mood: '🚀' },
    { day: 'Tuesday', hours: 6, language: 'JavaScript', project: 'E-commerce App', mood: '💪' },
    { day: 'Wednesday', hours: 10, language: 'TypeScript', project: 'Blog Platform', mood: '🔥' },
    { day: 'Thursday', hours: 4, language: 'Next.js', project: 'SaaS Dashboard', mood: '⚡' },
    { day: 'Friday', hours: 12, language: 'Python', project: 'Data Analysis', mood: '🎯' },
    { day: 'Saturday', hours: 3, language: 'CSS', project: 'UI Components', mood: '🎨' },
    { day: 'Sunday', hours: 5, language: 'Node.js', project: 'API Development', mood: '😎' }
  ];

  const languages = [
    { name: 'JavaScript', hours: 25, color: '#f1e05a', percentage: 35 },
    { name: 'React', hours: 18, color: '#61dafb', percentage: 25 },
    { name: 'TypeScript', hours: 12, color: '#3178c6', percentage: 17 },
    { name: 'Python', hours: 10, color: '#3572A5', percentage: 14 },
    { name: 'CSS', hours: 7, color: '#1572B6', percentage: 9 }
  ];

  useEffect(() => {
    setWeeklyData(weeklyStats);
  }, []);

  const ActivityBar = memo(({ day, hours, language, project, mood, delay = 0 }) => {
    const maxHours = 12;
    const heightPercentage = (hours / maxHours) * 100;
    
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay }}
        className="group relative"
      >
        <div className="bg-white/5 backdrop-blur-md rounded-xl p-4 border border-white/20 hover:border-white/40 transition-all duration-300 hover:scale-105">
          <div className="text-center mb-4">
            <div className="text-2xl mb-1">{mood}</div>
            <div className="text-sm font-medium text-white">{day}</div>
          </div>
          
          <div className="relative h-32 bg-white/10 rounded-lg overflow-hidden">
            <motion.div
              initial={{ height: 0 }}
              animate={{ height: `${heightPercentage}%` }}
              transition={{ duration: 1, delay: delay + 0.3 }}
              className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-blue-500 to-purple-500 rounded-lg"
            />
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-white font-bold text-lg">{hours}h</span>
            </div>
          </div>
          
          <div className="mt-4 text-center">
            <div className="text-xs text-gray-300 mb-1">{language}</div>
            <div className="text-xs text-gray-400 truncate">{project}</div>
          </div>
        </div>
      </motion.div>
    );
  });

  const LanguageProgress = memo(({ language, hours, color, percentage, delay = 0 }) => (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5, delay }}
      className="space-y-2"
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full" style={{ backgroundColor: color }} />
          <span className="text-sm font-medium text-gray-300">{language}</span>
        </div>
        <div className="text-sm text-gray-400">{hours}h ({percentage}%)</div>
      </div>
      <div className="h-2 bg-white/10 rounded-full overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${percentage}%` }}
          transition={{ duration: 1, delay: delay + 0.3 }}
          className="h-full rounded-full"
          style={{ backgroundColor: color }}
        />
      </div>
    </motion.div>
  ));

  const totalHours = weeklyData.reduce((sum, day) => sum + day.hours, 0);
  const avgHours = totalHours / weeklyData.length;

  return (
    <div className="w-full py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-red-600 mb-4">
            📊 This Week I Spent My Time On
          </h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            A breakdown of my coding activities and learning journey
          </p>
        </motion.div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="bg-white/5 backdrop-blur-md rounded-2xl p-6 border border-white/20 text-center"
          >
            <div className="flex items-center justify-center mb-4">
              <div className="p-3 bg-blue-500/20 rounded-xl">
                <Clock className="w-6 h-6 text-blue-400" />
              </div>
            </div>
            <div className="text-2xl font-bold text-white mb-2">{totalHours}h</div>
            <div className="text-sm text-gray-400">Total Hours</div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="bg-white/5 backdrop-blur-md rounded-2xl p-6 border border-white/20 text-center"
          >
            <div className="flex items-center justify-center mb-4">
              <div className="p-3 bg-purple-500/20 rounded-xl">
                <TrendingUp className="w-6 h-6 text-purple-400" />
              </div>
            </div>
            <div className="text-2xl font-bold text-white mb-2">{avgHours.toFixed(1)}h</div>
            <div className="text-sm text-gray-400">Daily Average</div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="bg-white/5 backdrop-blur-md rounded-2xl p-6 border border-white/20 text-center"
          >
            <div className="flex items-center justify-center mb-4">
              <div className="p-3 bg-green-500/20 rounded-xl">
                <Zap className="w-6 h-6 text-green-400" />
              </div>
            </div>
            <div className="text-2xl font-bold text-white mb-2">{weeklyData.length}</div>
            <div className="text-sm text-gray-400">Active Days</div>
          </motion.div>
        </div>

        {/* Weekly Activity Chart */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="bg-white/5 backdrop-blur-md rounded-2xl p-6 border border-white/20">
            <h3 className="text-xl font-semibold text-white mb-6 flex items-center gap-2">
              <Code className="w-5 h-5" />
              Daily Coding Activity
            </h3>
            <div className="grid grid-cols-7 gap-2">
              {weeklyData.map((day, index) => (
                <ActivityBar
                  key={day.day}
                  {...day}
                  delay={index * 0.1}
                />
              ))}
            </div>
          </div>

          <div className="bg-white/5 backdrop-blur-md rounded-2xl p-6 border border-white/20">
            <h3 className="text-xl font-semibold text-white mb-6 flex items-center gap-2">
              <BookOpen className="w-5 h-5" />
              Languages This Week
            </h3>
            <div className="space-y-4">
              {languages.map((lang, index) => (
                <LanguageProgress
                  key={lang.name}
                  {...lang}
                  delay={index * 0.1}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Quote Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="text-center mt-12"
        >
          <div className="bg-gradient-to-r from-white/10 to-white/5 backdrop-blur-md rounded-3xl p-8 border border-white/20">
            <div className="flex items-center justify-center mb-4">
              <Coffee className="w-8 h-8 text-orange-400" />
            </div>
            <blockquote className="text-xl text-gray-300 italic mb-4">
              "Code is not just my profession, it's my passion. Every line of code is a step towards building something amazing!"
            </blockquote>
            <div className="text-gray-400">- Eki Zulfar Rachman</div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default memo(CodingActivity);

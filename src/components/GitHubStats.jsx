import React, { useState, useEffect, memo } from 'react';
import { motion } from 'framer-motion';
import { Github, GitBranch, Star, Code, TrendingUp, Calendar, Users, BookOpen } from 'lucide-react';

const GitHubStats = () => {
  const [stats, setStats] = useState({
    totalRepos: 0,
    totalStars: 0,
    totalForks: 0,
    totalCommits: 0,
    contributionStreak: 0,
    languagesUsed: []
  });
  const [isLoading, setIsLoading] = useState(true);

  // Mock data for demonstration - replace with actual GitHub API calls
  useEffect(() => {
    const mockStats = {
      totalRepos: 42,
      totalStars: 168,
      totalForks: 23,
      totalCommits: 1250,
      contributionStreak: 87,
      languagesUsed: [
        { name: 'JavaScript', percentage: 35, color: '#f1e05a' },
        { name: 'Python', percentage: 25, color: '#3572A5' },
        { name: 'React', percentage: 20, color: '#61dafb' },
        { name: 'Java', percentage: 15, color: '#b07219' },
        { name: 'Other', percentage: 5, color: '#858585' }
      ]
    };

    // Simulate API loading
    setTimeout(() => {
      setStats(mockStats);
      setIsLoading(false);
    }, 1000);
  }, []);

  const StatCard = memo(({ icon: Icon, title, value, color, delay = 0 }) => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      className="group relative overflow-hidden"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-white/5 rounded-2xl backdrop-blur-md" />
      <div className="relative p-6 rounded-2xl border border-white/20 hover:border-white/40 transition-all duration-300 hover:scale-105">
        <div className="flex items-center justify-between mb-4">
          <div className={`p-3 rounded-xl bg-gradient-to-r ${color} bg-opacity-20`}>
            <Icon className="w-6 h-6 text-white" />
          </div>
          <div className="text-right">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: delay + 0.2 }}
              className="text-2xl font-bold text-white"
            >
              {isLoading ? (
                <div className="animate-pulse bg-white/20 h-8 w-16 rounded" />
              ) : (
                <CountUp end={value} duration={2} delay={delay} />
              )}
            </motion.div>
            <p className="text-sm text-gray-400">{title}</p>
          </div>
        </div>
        <div className="h-1 bg-white/10 rounded-full overflow-hidden">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: '100%' }}
            transition={{ duration: 1, delay: delay + 0.5 }}
            className={`h-full bg-gradient-to-r ${color} rounded-full`}
          />
        </div>
      </div>
    </motion.div>
  ));

  const CountUp = ({ end, duration, delay }) => {
    const [count, setCount] = useState(0);

    useEffect(() => {
      let startTimestamp = null;
      const step = (timestamp) => {
        if (!startTimestamp) startTimestamp = timestamp;
        const progress = Math.min((timestamp - startTimestamp) / (duration * 1000), 1);
        setCount(Math.floor(progress * end));
        if (progress < 1) {
          window.requestAnimationFrame(step);
        }
      };
      
      setTimeout(() => {
        window.requestAnimationFrame(step);
      }, delay * 1000);
    }, [end, duration, delay]);

    return count;
  };

  const LanguageBar = memo(({ language, percentage, color, delay }) => (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5, delay }}
      className="space-y-2"
    >
      <div className="flex justify-between text-sm">
        <span className="text-gray-300">{language}</span>
        <span className="text-gray-400">{percentage}%</span>
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

  const ContributionGraph = memo(() => {
    const weeks = Array.from({ length: 52 }, (_, i) => i);
    const days = Array.from({ length: 7 }, (_, i) => i);

    return (
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-white">Contribution Activity</h3>
        <div className="grid grid-cols-[repeat(52,1fr)] gap-1">
          {weeks.map((week) => (
            <div key={week} className="space-y-1">
              {days.map((day) => {
                const intensity = Math.floor(Math.random() * 5);
                const getColor = () => {
                  switch (intensity) {
                    case 0: return 'bg-white/10';
                    case 1: return 'bg-green-500/30';
                    case 2: return 'bg-green-500/50';
                    case 3: return 'bg-green-500/70';
                    case 4: return 'bg-green-500/90';
                    default: return 'bg-white/10';
                  }
                };

                return (
                  <motion.div
                    key={`${week}-${day}`}
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.3, delay: (week + day) * 0.01 }}
                    className={`w-3 h-3 rounded-sm ${getColor()} transition-all duration-300 hover:scale-125`}
                    title={`Week ${week + 1}, Day ${day + 1}`}
                  />
                );
              })}
            </div>
          ))}
        </div>
        <div className="flex items-center justify-between text-xs text-gray-400">
          <span>Less</span>
          <div className="flex gap-1">
            <div className="w-3 h-3 rounded-sm bg-white/10" />
            <div className="w-3 h-3 rounded-sm bg-green-500/30" />
            <div className="w-3 h-3 rounded-sm bg-green-500/50" />
            <div className="w-3 h-3 rounded-sm bg-green-500/70" />
            <div className="w-3 h-3 rounded-sm bg-green-500/90" />
          </div>
          <span>More</span>
        </div>
      </div>
    );
  });

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
          <h2 className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-blue-600 mb-4">
            📈 GitHub Analytics
          </h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            A glimpse into my coding journey and open source contributions
          </p>
        </motion.div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          <StatCard
            icon={BookOpen}
            title="Repositories"
            value={stats.totalRepos}
            color="from-blue-500 to-purple-600"
            delay={0.1}
          />
          <StatCard
            icon={Star}
            title="Stars Earned"
            value={stats.totalStars}
            color="from-yellow-500 to-orange-500"
            delay={0.2}
          />
          <StatCard
            icon={GitBranch}
            title="Forks"
            value={stats.totalForks}
            color="from-green-500 to-blue-500"
            delay={0.3}
          />
          <StatCard
            icon={Code}
            title="Commits"
            value={stats.totalCommits}
            color="from-purple-500 to-pink-500"
            delay={0.4}
          />
        </div>

        {/* Languages and Contributions */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Language Usage */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="bg-white/5 backdrop-blur-md rounded-2xl p-6 border border-white/20"
          >
            <h3 className="text-lg font-semibold text-white mb-6">Language Usage</h3>
            <div className="space-y-4">
              {stats.languagesUsed.map((lang, index) => (
                <LanguageBar
                  key={lang.name}
                  language={lang.name}
                  percentage={lang.percentage}
                  color={lang.color}
                  delay={index * 0.1}
                />
              ))}
            </div>
          </motion.div>

          {/* Contribution Graph */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="bg-white/5 backdrop-blur-md rounded-2xl p-6 border border-white/20"
          >
            <ContributionGraph />
          </motion.div>
        </div>

        {/* GitHub Link */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="text-center mt-12"
        >
          <a
            href="https://github.com/EkiZR"
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-gray-800 to-gray-900 rounded-xl text-white font-medium hover:from-gray-700 hover:to-gray-800 transition-all duration-300 hover:scale-105"
          >
            <Github className="w-6 h-6 group-hover:rotate-12 transition-transform" />
            <span>View on GitHub</span>
            <TrendingUp className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </a>
        </motion.div>
      </div>
    </div>
  );
};

export default memo(GitHubStats);

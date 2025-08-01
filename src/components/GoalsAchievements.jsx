import React, { useState, useEffect, memo } from 'react';
import { motion } from 'framer-motion';
import { Target, Trophy, Calendar, Zap, CheckCircle, Circle, TrendingUp, Star, Award, Rocket } from 'lucide-react';

const GOALS_2024 = [
  {
    id: 1,
    title: "Launch Pyintel v2",
    description: "Rebuild and optimize my AI assistant with new features and improved NLP.",
    progress: 90,
    status: "in-progress",
    category: "Projects",
    icon: Rocket,
    color: "from-purple-500 to-indigo-600"
  },
  {
    id: 2,
    title: "Mentor 10+ Students in Robotics",
    description: "Teach programming and electronics through workshops and peer mentoring.",
    progress: 75,
    status: "in-progress",
    category: "Community",
    icon: Zap,
    color: "from-blue-500 to-cyan-500"
  },
  {
    id: 3,
    title: "Expand CS & Engineering Clubs",
    description: "Grow participation and host new STEM outreach events.",
    progress: 80,
    status: "in-progress",
    category: "Leadership",
    icon: TrendingUp,
    color: "from-green-500 to-blue-500"
  },
  {
    id: 4,
    title: "Win Robotics Programming Award",
    description: "Lead team to excellence through technical innovation.",
    progress: 100,
    status: "completed",
    category: "Achievements",
    icon: Trophy,
    color: "from-yellow-500 to-orange-500"
  },
  {
    id: 5,
    title: "Publish a Technical Blog Series",
    description: "Share tutorials and insights on AI, robotics, and embedded systems.",
    progress: 60,
    status: "in-progress",
    category: "Career",
    icon: Star,
    color: "from-pink-500 to-purple-600"
  },
  {
    id: 6,
    title: "Build a Cross-Platform Scouting App",
    description: "Develop and release a production-ready FRC scouting tool.",
    progress: 50,
    status: "in-progress",
    category: "Projects",
    icon: Award,
    color: "from-cyan-500 to-blue-600"
  }
];

const ACHIEVEMENTS = [
  {
    id: 1,
    title: "Started Engineering Club",
    description: "Founded the club to expand STEM outreach at my high school.",
    date: "2025-03-01",
    icon: TrendingUp,
    color: "from-green-500 to-blue-500"
  },
  {
    id: 2,
    title: "Built Pyintel AI",
    description: "Created a personal AI assistant using NLP and automation features.",
    date: "2024-03-15",
    icon: Rocket,
    color: "from-purple-500 to-pink-500"
  },
  {
    id: 3,
    title: "Won Programming Division Award",
    description: "Recognized for leading FRC programming efforts.",
    date: "2024-04-20",
    icon: Trophy,
    color: "from-yellow-500 to-orange-500"
  },
  {
    id: 4,
    title: "Published First Blog Post",
    description: "Wrote and shared a tutorial on embedded systems and robotics.",
    date: "2024-06-10",
    icon: Star,
    color: "from-blue-500 to-purple-600"
  }
];




const GoalCard = memo(({ goal, delay = 0 }) => {
  const { title, description, progress, status, category, icon: Icon, color } = goal;
  const isCompleted = status === 'completed';

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      className="group relative overflow-hidden"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-white/5 rounded-2xl backdrop-blur-md" />
      <div className="relative p-6 rounded-2xl border border-white/20 hover:border-white/40 transition-all duration-300 hover:scale-105">
        {/* Header */}
        <div className="flex items-start justify-between mb-4">
          <div className={`p-3 rounded-xl bg-gradient-to-r ${color} bg-opacity-20`}>
            <Icon className="w-6 h-6 text-white" />
          </div>
          <div className="flex items-center gap-2">
            <span className={`px-3 py-1 rounded-full text-xs font-medium ${
              isCompleted 
                ? 'bg-green-500/20 text-green-300' 
                : 'bg-blue-500/20 text-blue-300'
            }`}>
              {category}
            </span>
            {isCompleted ? (
              <CheckCircle className="w-5 h-5 text-green-400" />
            ) : (
              <Circle className="w-5 h-5 text-gray-400" />
            )}
          </div>
        </div>

        {/* Content */}
        <div className="space-y-3">
          <h3 className="text-lg font-semibold text-white group-hover:text-blue-300 transition-colors">
            {title}
          </h3>
          <p className="text-sm text-gray-400 leading-relaxed">
            {description}
          </p>
        </div>

        {/* Progress Bar */}
        <div className="mt-4 space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-gray-300">Progress</span>
            <span className="text-gray-400">{progress}%</span>
          </div>
          <div className="h-2 bg-white/10 rounded-full overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 1, delay: delay + 0.3 }}
              className={`h-full bg-gradient-to-r ${color} rounded-full`}
            />
          </div>
        </div>
      </div>
    </motion.div>
  );
});

const AchievementCard = memo(({ achievement, delay = 0 }) => {
  const { title, description, date, icon: Icon, color } = achievement;
  const formattedDate = new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  });

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5, delay }}
      className="group relative overflow-hidden"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-white/5 rounded-xl backdrop-blur-md" />
      <div className="relative p-4 rounded-xl border border-white/20 hover:border-white/40 transition-all duration-300 hover:scale-105">
        <div className="flex items-center gap-4">
          <div className={`p-2 rounded-lg bg-gradient-to-r ${color} bg-opacity-20`}>
            <Icon className="w-5 h-5 text-white" />
          </div>
          <div className="flex-1">
            <h4 className="font-medium text-white group-hover:text-blue-300 transition-colors">
              {title}
            </h4>
            <p className="text-sm text-gray-400 mt-1">{description}</p>
            <span className="text-xs text-gray-500 mt-2 block">{formattedDate}</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
});

const ProgressOverview = memo(() => {
  const totalGoals = GOALS_2024.length;
  const completedGoals = GOALS_2024.filter(goal => goal.status === 'completed').length;
  const overallProgress = Math.round((GOALS_2024.reduce((acc, goal) => acc + goal.progress, 0) / totalGoals));

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="bg-white/5 backdrop-blur-md rounded-2xl p-6 border border-white/20"
    >
      <div className="text-center space-y-6">
        <div className="relative w-32 h-32 mx-auto">
          <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
            <circle
              cx="50"
              cy="50"
              r="45"
              fill="none"
              stroke="rgba(255,255,255,0.1)"
              strokeWidth="8"
            />
            <motion.circle
              cx="50"
              cy="50"
              r="45"
              fill="none"
              stroke="url(#gradient)"
              strokeWidth="8"
              strokeLinecap="round"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: overallProgress / 100 }}
              transition={{ duration: 2, delay: 0.5 }}
              strokeDasharray={`${2 * Math.PI * 45}`}
            />
            <defs>
              <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#6366f1" />
                <stop offset="100%" stopColor="#a855f7" />
              </linearGradient>
            </defs>
          </svg>
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-2xl font-bold text-white">{overallProgress}%</span>
          </div>
        </div>
        
        <div className="space-y-2">
          <h3 className="text-xl font-semibold text-white">2025 Goals Progress</h3>
          <p className="text-gray-400">
            {completedGoals} of {totalGoals} goals completed
          </p>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="text-center">
            <div className="text-2xl font-bold text-green-400">{completedGoals}</div>
            <div className="text-sm text-gray-400">Completed</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-blue-400">{totalGoals - completedGoals}</div>
            <div className="text-sm text-gray-400">In Progress</div>
          </div>
        </div>
      </div>
    </motion.div>
  );
});

const GoalsAchievements = () => {
  const [activeTab, setActiveTab] = useState('goals');

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
          <h2 className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600 mb-4">
            🚀 Goals & Achievements 2025
          </h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            From Gates Scholarship to tech entrepreneurship - building &quot;The New World&quot;
          </p>
        </motion.div>

        {/* Tab Navigation */}
        <div className="flex justify-center mb-12">
          <div className="flex bg-white/5 backdrop-blur-md rounded-xl p-1 border border-white/20">
            <button
              onClick={() => setActiveTab('goals')}
              className={`px-6 py-3 rounded-lg font-medium transition-all duration-300 ${
                activeTab === 'goals'
                  ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              <div className="flex items-center gap-2">
                <Target className="w-5 h-5" />
                <span>Goals</span>
              </div>
            </button>
            <button
              onClick={() => setActiveTab('achievements')}
              className={`px-6 py-3 rounded-lg font-medium transition-all duration-300 ${
                activeTab === 'achievements'
                  ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              <div className="flex items-center gap-2">
                <Trophy className="w-5 h-5" />
                <span>Achievements</span>
              </div>
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Progress Overview */}
          <div className="lg:col-span-1">
            <ProgressOverview />
          </div>

          {/* Goals/Achievements List */}
          <div className="lg:col-span-3">
            {activeTab === 'goals' ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {GOALS_2024.map((goal, index) => (
                  <GoalCard key={goal.id} goal={goal} delay={index * 0.1} />
                ))}
              </div>
            ) : (
              <div className="space-y-4">
                {ACHIEVEMENTS.map((achievement, index) => (
                  <AchievementCard key={achievement.id} achievement={achievement} delay={index * 0.1} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default memo(GoalsAchievements);

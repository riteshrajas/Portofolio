import React, { useState, useEffect, memo } from 'react';
import { motion } from 'framer-motion';
import { Quote, Sparkles, Heart, Coffee, Code, Target, Zap, Star } from 'lucide-react';

const INSPIRATIONAL_QUOTES = [
  {
    quote: "Code is not just my profession, it's my passion. Let's create magic together!",
    author: "Eki Zulfar Rachman",
    category: "Passion",
    icon: Heart,
    color: "from-red-500 to-pink-500"
  },
  {
    quote: "Every line of code is a step towards building something amazing!",
    author: "Eki Zulfar Rachman",
    category: "Progress",
    icon: Target,
    color: "from-blue-500 to-purple-500"
  },
  {
    quote: "The best code is not just functional, but also beautiful and meaningful.",
    author: "Eki Zulfar Rachman",
    category: "Quality",
    icon: Star,
    color: "from-yellow-500 to-orange-500"
  },
  {
    quote: "Learning never stops. Each day brings new possibilities to grow.",
    author: "Eki Zulfar Rachman",
    category: "Growth",
    icon: Zap,
    color: "from-green-500 to-blue-500"
  },
  {
    quote: "Innovation happens when creativity meets technology.",
    author: "Eki Zulfar Rachman",
    category: "Innovation",
    icon: Code,
    color: "from-purple-500 to-pink-500"
  },
  {
    quote: "Great designs are not just about looks, but about solving real problems.",
    author: "Eki Zulfar Rachman",
    category: "Design",
    icon: Sparkles,
    color: "from-indigo-500 to-purple-500"
  }
];

const DAILY_GOALS = [
  "🎯 Write clean, maintainable code",
  "📚 Learn something new every day",
  "🤝 Help others grow in their journey",
  "🚀 Push boundaries and innovate",
  "💡 Solve problems creatively",
  "🔧 Build tools that make life easier",
  "🌟 Inspire others through my work",
  "📱 Create amazing user experiences"
];

const DailyInspiration = () => {
  const [currentQuote, setCurrentQuote] = useState(0);
  const [currentGoal, setCurrentGoal] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    const quoteInterval = setInterval(() => {
      setIsAnimating(true);
      setTimeout(() => {
        setCurrentQuote(prev => (prev + 1) % INSPIRATIONAL_QUOTES.length);
        setIsAnimating(false);
      }, 300);
    }, 5000);

    const goalInterval = setInterval(() => {
      setCurrentGoal(prev => (prev + 1) % DAILY_GOALS.length);
    }, 3000);

    return () => {
      clearInterval(quoteInterval);
      clearInterval(goalInterval);
    };
  }, []);

  const quote = INSPIRATIONAL_QUOTES[currentQuote];
  const Icon = quote.icon;

  return (
    <div className="w-full py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-orange-600 mb-4">
            💫 Daily Inspiration
          </h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Motivation and mindset that drives my coding journey
          </p>
        </motion.div>

        {/* Main Quote Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ 
            opacity: isAnimating ? 0.7 : 1, 
            scale: isAnimating ? 0.95 : 1 
          }}
          transition={{ duration: 0.3 }}
          className="relative overflow-hidden"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-white/5 rounded-3xl backdrop-blur-md" />
          <div className={`absolute inset-0 bg-gradient-to-br ${quote.color} opacity-20 rounded-3xl`} />
          
          <div className="relative p-8 md:p-12 rounded-3xl border border-white/30">
            <div className="flex flex-col md:flex-row items-center gap-8">
              {/* Icon Section */}
              <div className="flex-shrink-0">
                <div className={`p-6 rounded-2xl bg-gradient-to-br ${quote.color} bg-opacity-20`}>
                  <Icon className="w-12 h-12 text-white" />
                </div>
              </div>

              {/* Quote Section */}
              <div className="flex-1 text-center md:text-left">
                <div className="flex items-center gap-2 mb-4">
                  <Quote className="w-6 h-6 text-gray-400" />
                  <span className={`px-3 py-1 rounded-full text-sm font-medium bg-gradient-to-r ${quote.color} bg-opacity-20 text-white`}>
                    {quote.category}
                  </span>
                </div>
                
                <blockquote className="text-2xl md:text-3xl font-medium text-white leading-relaxed mb-6">
                  "{quote.quote}"
                </blockquote>
                
                <div className="flex items-center justify-center md:justify-start gap-2 text-gray-400">
                  <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                    <span className="text-white font-bold text-lg">E</span>
                  </div>
                  <div>
                    <div className="font-medium text-white">— {quote.author}</div>
                    <div className="text-sm">Frontend Developer</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Quote Navigation */}
        <div className="flex justify-center mt-8 gap-2">
          {INSPIRATIONAL_QUOTES.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentQuote(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                index === currentQuote 
                  ? 'bg-gradient-to-r from-blue-500 to-purple-600' 
                  : 'bg-white/20 hover:bg-white/40'
              }`}
            />
          ))}
        </div>

        {/* Daily Goal Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="mt-16"
        >
          <div className="bg-white/5 backdrop-blur-md rounded-2xl p-6 border border-white/20">
            <h3 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
              <Target className="w-5 h-5" />
              Today's Focus
            </h3>
            
            <motion.div
              key={currentGoal}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className="text-lg text-gray-300 flex items-center gap-3"
            >
              <div className="w-8 h-8 bg-gradient-to-r from-green-500 to-blue-500 rounded-full flex items-center justify-center">
                <Coffee className="w-4 h-4 text-white" />
              </div>
              {DAILY_GOALS[currentGoal]}
            </motion.div>
          </div>
        </motion.div>

        {/* Motivational Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="bg-white/5 backdrop-blur-md rounded-xl p-6 border border-white/20 text-center"
          >
            <div className="text-2xl font-bold text-white mb-2">365</div>
            <div className="text-sm text-gray-400">Days of Learning</div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="bg-white/5 backdrop-blur-md rounded-xl p-6 border border-white/20 text-center"
          >
            <div className="text-2xl font-bold text-white mb-2">100%</div>
            <div className="text-sm text-gray-400">Passion Level</div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="bg-white/5 backdrop-blur-md rounded-xl p-6 border border-white/20 text-center"
          >
            <div className="text-2xl font-bold text-white mb-2">∞</div>
            <div className="text-sm text-gray-400">Growth Mindset</div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default memo(DailyInspiration);

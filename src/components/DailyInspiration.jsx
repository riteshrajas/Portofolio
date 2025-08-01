import React, { useState, useEffect, memo } from 'react';
import { motion } from 'framer-motion';
import { Quote, Sparkles, Heart, Coffee, Code, Target, Zap, Star } from 'lucide-react';

const INSPIRATIONAL_QUOTES = [
  {
    quote: "I didn’t grow up with access — I built it, wire by wire, from a busted fan to an AI assistant.",
    author: "Ritesh Raj",
    category: "Origin",
    icon: Sparkles,
    color: "from-yellow-500 to-orange-600"
  },
  {
    quote: "Leadership isn’t about commanding. It’s about creating space for others to grow.",
    author: "Ritesh Raj",
    category: "Empathy",
    icon: Heart,
    color: "from-pink-500 to-rose-500"
  },
  {
    quote: "My code isn’t just logic. It’s love—for my family, my roots, and the future I’m building.",
    author: "Ritesh Raj",
    category: "Purpose",
    icon: Code,
    color: "from-blue-500 to-indigo-600"
  },
  {
    quote: "They saw a quiet kid. I saw systems, solutions, and silent revolutions waiting to happen.",
    author: "Ritesh Raj",
    category: "Vision",
    icon: Star,
    color: "from-indigo-500 to-purple-700"
  },
  {
    quote: "I may not know where I’ll live next year, but I know what I’ll *build* today.",
    author: "Ritesh Raj",
    category: "Resilience",
    icon: Zap,
    color: "from-green-500 to-blue-500"
  },
  {
    quote: "Mentorship isn’t an act. It’s a responsibility — to pass the torch I once wished I had.",
    author: "Ritesh Raj",
    category: "Mentorship",
    icon: Target,
    color: "from-amber-500 to-red-500"
  }
];


const DAILY_GOALS = [
  "🤖 Guide one student toward building their first robot",
  "📚 Learn one thing my past self would be proud of",
  "🌍 Do one thing that makes tomorrow fairer for someone else",
  "🎯 Make Pyintel one step smarter (even if it’s small)",
  "🧠 Reflect, not react — especially under pressure",
  "🧰 Fix what’s broken, inside or outside the machine",
  "🪞Speak kindly to myself — like I would to a friend",
  "🚀 Keep building my 'New World', one commit at a time"
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
                    <div className="text-sm">Full Stack Developer</div>
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
              Today&apos;s Focus
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

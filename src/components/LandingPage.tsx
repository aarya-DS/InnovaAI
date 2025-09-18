import React, { useState } from 'react';
import { Brain, Zap, Users, Target, MessageSquare, CheckSquare, BarChart3, Rocket } from 'lucide-react';
import { User } from '../types';

interface LandingPageProps {
  onLogin: (user: User) => void;
}

const LandingPage: React.FC<LandingPageProps> = ({ onLogin }) => {
  const [showAuth, setShowAuth] = useState(false);
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (isLogin) {
      // Simulate login
      const user: User = {
        id: Date.now().toString(),
        name: formData.email.split('@')[0],
        email: formData.email
      };
      onLogin(user);
    } else {
      // Simulate registration
      const user: User = {
        id: Date.now().toString(),
        name: formData.name,
        email: formData.email
      };
      onLogin(user);
    }
  };

  const features = [
    {
      icon: <Brain className="w-8 h-8" />,
      title: "Multi-Agent AI Coaching",
      description: "Specialized AI agents for Innovation, Tech, Deadlines, Pitch, and Mentoring"
    },
    {
      icon: <Target className="w-8 h-8" />,
      title: "Smart Deadline Management",
      description: "AI-powered project tracking with dynamic progress monitoring"
    },
    {
      icon: <Zap className="w-8 h-8" />,
      title: "Real-time Q&A",
      description: "Context-aware responses tailored to your hackathon project"
    },
    {
      icon: <Users className="w-8 h-8" />,
      title: "Live Brainstorm Mode",
      description: "Collaborative idea organization with AI-guided workflows"
    },
    {
      icon: <MessageSquare className="w-8 h-8" />,
      title: "Pitch Optimization",
      description: "AI-powered pitch analysis and improvement suggestions"
    },
    {
      icon: <BarChart3 className="w-8 h-8" />,
      title: "Risk Prediction",
      description: "Proactive risk assessment and mitigation strategies"
    }
  ];

  if (showAuth) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-900 via-blue-800 to-indigo-900 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-md">
          <div className="text-center mb-6">
            <div className="flex items-center justify-center mb-4">
              <Brain className="w-10 h-10 text-blue-600 mr-2" />
              <h1 className="text-2xl font-bold text-gray-800">InnovaAI</h1>
            </div>
            <h2 className="text-xl font-semibold text-gray-700 mb-2">
              {isLogin ? 'Welcome Back' : 'Join InnovaAI'}
            </h2>
            <p className="text-gray-600">
              {isLogin ? 'Sign in to access your AI coach' : 'Create your account to get started'}
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {!isLogin && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  placeholder="Enter your full name"
                  required
                />
              </div>
            )}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                placeholder="Enter your email"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
              <input
                type="password"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                placeholder="Enter your password"
                required
              />
            </div>
            <button
              type="submit"
              className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-3 rounded-lg hover:from-blue-700 hover:to-indigo-700 transition-all transform hover:scale-105 font-semibold"
            >
              {isLogin ? 'Sign In' : 'Create Account'}
            </button>
          </form>

          <div className="text-center mt-6">
            <button
              onClick={() => setIsLogin(!isLogin)}
              className="text-blue-600 hover:text-blue-700 font-medium"
            >
              {isLogin ? "Don't have an account? Sign up" : 'Already have an account? Sign in'}
            </button>
          </div>

          <button
            onClick={() => setShowAuth(false)}
            className="w-full mt-4 text-gray-500 hover:text-gray-700 font-medium"
          >
            ← Back to Home
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-blue-800 to-indigo-900">
      {/* Header */}
      <header className="bg-black/10 backdrop-blur-sm border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <Brain className="w-8 h-8 text-white mr-3" />
              <h1 className="text-2xl font-bold text-white">InnovaAI</h1>
            </div>
            <div className="flex space-x-4">
              <button
                onClick={() => {
                  setIsLogin(false);
                  setShowAuth(true);
                }}
                className="bg-white/20 text-white px-4 py-2 rounded-lg hover:bg-white/30 transition-colors backdrop-blur-sm"
              >
                Register
              </button>
              <button
                onClick={() => {
                  setIsLogin(true);
                  setShowAuth(true);
                }}
                className="bg-white text-blue-900 px-4 py-2 rounded-lg hover:bg-gray-100 transition-colors font-semibold"
              >
                Login
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 text-center text-white">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-5xl font-bold mb-6 bg-gradient-to-r from-white to-blue-300 bg-clip-text text-transparent">
            Your AI-Powered Hackathon Companion
          </h2>
          <p className="text-xl mb-8 text-blue-100 leading-relaxed">
            Transform your hackathon experience with intelligent multi-agent coaching, 
            smart project management, and AI-guided workflows that adapt to your team's needs.
          </p>
          <button
            onClick={() => setShowAuth(true)}
            className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white px-8 py-4 rounded-xl text-lg font-semibold hover:from-blue-600 hover:to-indigo-700 transform hover:scale-105 transition-all shadow-2xl flex items-center mx-auto"
          >
            <Rocket className="w-6 h-6 mr-2" />
            Get Started
          </button>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-16 bg-white/5 backdrop-blur-sm">
        <div className="max-w-6xl mx-auto px-4">
          <h3 className="text-3xl font-bold text-center text-white mb-12">
            Intelligent Features for Winning Hackathons
          </h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="bg-white/10 backdrop-blur-sm p-6 rounded-xl border border-white/20 hover:bg-white/20 transition-all transform hover:scale-105"
              >
                <div className="text-blue-300 mb-4">{feature.icon}</div>
                <h4 className="text-xl font-semibold text-white mb-3">{feature.title}</h4>
                <p className="text-blue-100">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 text-center">
        <div className="max-w-4xl mx-auto px-4">
          <h3 className="text-3xl font-bold text-white mb-6">
            Ready to Build Something Amazing?
          </h3>
          <p className="text-xl text-blue-100 mb-8">
            Join thousands of developers who trust InnovaAI to guide their hackathon success.
          </p>
          <button
            onClick={() => setShowAuth(true)}
            className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white px-8 py-4 rounded-xl text-lg font-semibold hover:from-indigo-600 hover:to-purple-700 transform hover:scale-105 transition-all shadow-2xl"
          >
            Start Your Journey
          </button>
        </div>
      </section>
    </div>
  );
};

export default LandingPage;
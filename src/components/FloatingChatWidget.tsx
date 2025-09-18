import React, { useState, useRef, useEffect } from 'react';
import { MessageCircle, X, Send, Bot, User } from 'lucide-react';

interface ChatMessage {
  id: string;
  text: string;
  isUser: boolean;
  timestamp: string;
}

const FloatingChatWidget: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (isOpen && messages.length === 0) {
      // Initial welcome message
      const welcomeMessage: ChatMessage = {
        id: Date.now().toString(),
        text: "Hi! I'm InnovaBot, your guide to InnovaAI! 🚀 I can help you understand our features, navigate the platform, or answer any questions about how InnovaAI can boost your hackathon success. What would you like to know?",
        isUser: false,
        timestamp: new Date().toLocaleTimeString()
      };
      setMessages([welcomeMessage]);
    }
  }, [isOpen, messages.length]);

  const generateResponse = (question: string): string => {
    const questionLower = question.toLowerCase();
    
    // Feature-specific responses
    if (questionLower.includes('idea evaluation') || questionLower.includes('evaluate idea')) {
      return "Our Idea Evaluation feature uses Nova, our Innovation Agent, to analyze your hackathon ideas! 💡 It scores your concept across 5 key areas: innovation, feasibility, market potential, technical complexity, and user value. You'll get detailed feedback, strengths, improvement suggestions, and risk factors. Just describe your idea and let Nova provide expert analysis to help you build something amazing!";
    }
    
    if (questionLower.includes('tech stack') || questionLower.includes('technology') || questionLower.includes('codex')) {
      return "Tech Stack Suggestions is powered by Codex, our Tech Agent! ⚡ Simply tell us your project type (web app, mobile, AI, etc.) and requirements (real-time, database, authentication), and Codex will recommend the perfect technologies. You'll get frontend, backend, database, and deployment suggestions with difficulty ratings and timeline estimates. It's like having a senior developer guide your tech decisions!";
    }
    
    if (questionLower.includes('deadline') || questionLower.includes('project management') || questionLower.includes('tempo')) {
      return "Smart Deadline Management is handled by Tempo, our Deadline Agent! ⏰ Create projects with deadlines and watch as Tempo automatically generates smart task breakdowns with due dates. Track progress in real-time as you complete tasks, get timeline insights, and receive proactive notifications about approaching deadlines. It's intelligent project management that adapts to your hackathon pace!";
    }
    
    if (questionLower.includes('pitch') || questionLower.includes('presentation') || questionLower.includes('optimize')) {
      return "Pitch Optimization features our Pitch Agent who's an expert at making presentations shine! 🎯 Upload your pitch deck or paste your script, and get detailed analysis on clarity, impact, structure, storytelling, and call-to-action. You'll receive specific improvement suggestions, judge simulation questions, and expert tips to make your pitch unforgettable. Perfect for winning those hackathon presentations!";
    }
    
    if (questionLower.includes('q&a') || questionLower.includes('questions') || questionLower.includes('sage') || questionLower.includes('mentor')) {
      return "Real-time Q&A connects you with Sage, our Mentor Agent! 🧠 Ask any hackathon-related question and get context-aware, personalized responses. Whether you need debugging help, architecture advice, time management tips, or team collaboration guidance, Sage provides intelligent answers that adapt to your specific situation. It's like having an experienced mentor available 24/7!";
    }
    
    if (questionLower.includes('task') || questionLower.includes('todo') || questionLower.includes('checklist')) {
      return "Task Management helps you stay organized throughout your hackathon journey! ✅ Create tasks for any project, set priorities (high, medium, low), add due dates, and track completion. Watch your project progress update automatically as you complete tasks. Get insights on overdue items, high-priority tasks, and completion statistics. It's smart task tracking that keeps you focused on what matters most!";
    }
    
    if (questionLower.includes('agent') || questionLower.includes('ai') || questionLower.includes('multi-agent')) {
      return "InnovaAI features 5 specialized AI agents working as your intelligent team! 🤖 Nova (Innovation) evaluates ideas, Codex (Tech) suggests technologies, Tempo (Deadline) manages timelines, Pitch (Presentation) optimizes pitches, and Sage (Mentor) provides guidance. Each agent has unique expertise and they collaborate to guide you through the complete hackathon workflow with smart notifications and recommendations!";
    }
    
    if (questionLower.includes('profile') || questionLower.includes('dashboard') || questionLower.includes('stats')) {
      return "Your Profile Dashboard tracks your InnovaAI journey! 👤 View your projects, completed tasks, achievements, and activity timeline. Edit your bio, add social links (GitHub, LinkedIn), and showcase your hackathon experience. Unlock achievements like 'First Steps', 'Task Master', and 'Serial Innovator' as you use the platform. It's your personal hackathon portfolio that grows with every project!";
    }
    
    if (questionLower.includes('data') || questionLower.includes('save') || questionLower.includes('persist')) {
      return "All your data is securely saved in your browser's local storage! 💾 Your projects, tasks, progress, profile information, and achievements persist across sessions. When you log back in, everything is exactly as you left it. Your data stays private on your device - we don't store personal information on external servers. Focus on building amazing projects while InnovaAI handles the organization!";
    }
    
    if (questionLower.includes('workflow') || questionLower.includes('redirect') || questionLower.includes('guidance')) {
      return "Agent-Guided Smart Workflow Redirection is our signature feature! 🎯 Our AI agents actively analyze your progress and suggest the next logical step. Completed idea evaluation? Codex suggests moving to tech stack selection. Finished your tech stack? Tempo recommends deadline planning. It's like having an intelligent project manager guiding you through the optimal hackathon workflow for maximum success!";
    }
    
    if (questionLower.includes('notification') || questionLower.includes('alert') || questionLower.includes('reminder')) {
      return "Smart Notifications keep you on track! 🔔 Our agents send contextual alerts about approaching deadlines, suggest workflow improvements, celebrate milestones, and provide proactive guidance. See notifications in the dashboard header - they're personalized based on your project status and progress. Never miss important deadlines or optimization opportunities again!";
    }
    
    if (questionLower.includes('hackathon') || questionLower.includes('competition') || questionLower.includes('event')) {
      return "InnovaAI is specifically designed for hackathon success! 🏆 We understand the unique challenges: tight deadlines, team coordination, technical decisions under pressure, and compelling pitches. Our multi-agent system provides specialized support for every phase - from initial ideation to final presentation. Join thousands of developers who trust InnovaAI to guide their hackathon journey to victory!";
    }
    
    if (questionLower.includes('get started') || questionLower.includes('begin') || questionLower.includes('start')) {
      return "Getting started with InnovaAI is easy! 🚀 First, create your account on the landing page. Then explore the dashboard and meet your AI agent team. I recommend starting with Idea Evaluation to validate your concept, then moving to Tech Stack Suggestions for implementation guidance. Create your first project in Deadline Management and watch as our agents guide you through the complete hackathon workflow!";
    }
    
    if (questionLower.includes('feature') || questionLower.includes('what can') || questionLower.includes('capabilities')) {
      return "InnovaAI offers comprehensive hackathon support! ✨ Key features include: AI-powered idea evaluation, smart tech stack recommendations, intelligent deadline management, pitch optimization with judge simulation, real-time Q&A mentoring, task management with progress tracking, multi-agent collaboration, smart workflow redirection, achievement system, and persistent data storage. It's your complete AI-powered hackathon companion!";
    }
    
    if (questionLower.includes('help') || questionLower.includes('support') || questionLower.includes('how')) {
      return "I'm here to help! 😊 You can ask me about any InnovaAI feature, how to navigate the platform, or what our AI agents can do for you. Try asking about specific features like 'How does idea evaluation work?' or 'What is smart deadline management?' I can also explain our workflow, agents, or help you understand how to maximize your hackathon success with InnovaAI!";
    }
    
    // General responses for unmatched questions
    const generalResponses = [
      "That's a great question about InnovaAI! 🤔 Our platform is designed to be your intelligent hackathon companion. Could you be more specific about what aspect you'd like to know about? I can explain our AI agents, features, workflow, or how we help teams succeed in hackathons!",
      "I'd love to help you understand InnovaAI better! 💡 We're a comprehensive AI-powered platform with 5 specialized agents that guide you through every phase of hackathon success. What specific feature or capability would you like me to explain?",
      "Excellent question! 🚀 InnovaAI combines intelligent project management, AI-powered analysis, and expert guidance in one platform. Whether you're curious about our agents, features, or workflow, I'm here to help. What would you like to explore first?",
      "Thanks for asking! 😊 InnovaAI is built specifically for hackathon teams who want intelligent guidance and organization. Our multi-agent system provides specialized expertise for every challenge. What aspect of the platform interests you most?",
      "Great to hear from you! 🎯 InnovaAI transforms how teams approach hackathons with AI-powered coaching and smart workflow management. I can explain any feature, agent capability, or help you understand how we boost hackathon success. What's on your mind?"
    ];
    
    return generalResponses[Math.floor(Math.random() * generalResponses.length)];
  };

  const handleSendMessage = async () => {
    if (!inputText.trim()) return;

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      text: inputText,
      isUser: true,
      timestamp: new Date().toLocaleTimeString()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputText('');
    setIsTyping(true);

    // Simulate typing delay
    setTimeout(() => {
      const botResponse: ChatMessage = {
        id: (Date.now() + 1).toString(),
        text: generateResponse(inputText),
        isUser: false,
        timestamp: new Date().toLocaleTimeString()
      };

      setMessages(prev => [...prev, botResponse]);
      setIsTyping(false);
    }, 1000 + Math.random() * 1500);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const quickQuestions = [
    "What is InnovaAI?",
    "How does idea evaluation work?",
    "Tell me about the AI agents",
    "How do I get started?",
    "What features do you offer?",
    "How does smart workflow work?"
  ];

  return (
    <>
      {/* Chat Widget */}
      {isOpen && (
        <div className="fixed bottom-20 right-4 w-80 h-96 bg-white rounded-xl shadow-2xl border border-gray-200 flex flex-col z-50">
          {/* Header */}
          <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white p-4 rounded-t-xl flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Bot className="w-6 h-6" />
              <div>
                <h3 className="font-semibold">InnovaBot</h3>
                <p className="text-xs text-blue-100">Your InnovaAI Guide</p>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="text-white hover:text-blue-200 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.isUser ? 'justify-end' : 'justify-start'}`}
              >
                <div className={`flex items-start space-x-2 max-w-xs ${
                  message.isUser ? 'flex-row-reverse space-x-reverse' : ''
                }`}>
                  <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs ${
                    message.isUser 
                      ? 'bg-blue-500 text-white' 
                      : 'bg-gradient-to-r from-indigo-500 to-purple-500 text-white'
                  }`}>
                    {message.isUser ? <User className="w-3 h-3" /> : <Bot className="w-3 h-3" />}
                  </div>
                  <div className={`rounded-lg px-3 py-2 text-sm ${
                    message.isUser
                      ? 'bg-blue-500 text-white'
                      : 'bg-gray-100 text-gray-800'
                  }`}>
                    <p className="leading-relaxed">{message.text}</p>
                    <p className={`text-xs mt-1 ${
                      message.isUser ? 'text-blue-100' : 'text-gray-500'
                    }`}>
                      {message.timestamp}
                    </p>
                  </div>
                </div>
              </div>
            ))}
            
            {isTyping && (
              <div className="flex justify-start">
                <div className="flex items-start space-x-2 max-w-xs">
                  <div className="w-6 h-6 rounded-full bg-gradient-to-r from-indigo-500 to-purple-500 text-white flex items-center justify-center text-xs">
                    <Bot className="w-3 h-3" />
                  </div>
                  <div className="bg-gray-100 rounded-lg px-3 py-2">
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                    </div>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Quick Questions */}
          {messages.length <= 1 && (
            <div className="px-4 pb-2">
              <p className="text-xs text-gray-500 mb-2">Quick questions:</p>
              <div className="flex flex-wrap gap-1">
                {quickQuestions.slice(0, 3).map((question, index) => (
                  <button
                    key={index}
                    onClick={() => setInputText(question)}
                    className="text-xs bg-blue-50 text-blue-700 px-2 py-1 rounded hover:bg-blue-100 transition-colors"
                  >
                    {question}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Input */}
          <div className="border-t p-3">
            <div className="flex space-x-2">
              <input
                type="text"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Ask about InnovaAI..."
                className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                disabled={isTyping}
              />
              <button
                onClick={handleSendMessage}
                disabled={!inputText.trim() || isTyping}
                className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-3 py-2 rounded-lg hover:from-blue-700 hover:to-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
              >
                <Send className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Floating Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-4 right-4 w-14 h-14 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-full shadow-lg hover:from-blue-700 hover:to-indigo-700 transition-all transform hover:scale-110 flex items-center justify-center z-40"
      >
        {isOpen ? <X className="w-6 h-6" /> : <MessageCircle className="w-6 h-6" />}
      </button>
    </>
  );
};

export default FloatingChatWidget;
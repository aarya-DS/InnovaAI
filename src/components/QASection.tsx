import React, { useState, useRef, useEffect } from 'react';
import { ArrowLeft, MessageSquare, Send, Brain, User } from 'lucide-react';

interface QAMessage {
  id: string;
  text: string;
  isUser: boolean;
  timestamp: string;
  context?: string;
}

interface QASectionProps {
  onBack: () => void;
}

const QASection: React.FC<QASectionProps> = ({ onBack }) => {
  const [messages, setMessages] = useState<QAMessage[]>([]);
  const [inputText, setInputText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    // Initial welcome message
    const welcomeMessage: QAMessage = {
      id: Date.now().toString(),
      text: "Hello! I'm Sage, your AI mentor for this hackathon journey. I'm here to provide context-aware guidance, answer your technical questions, and help you navigate any challenges. What would you like to know?",
      isUser: false,
      timestamp: new Date().toLocaleTimeString(),
      context: 'welcome'
    };
    setMessages([welcomeMessage]);
  }, []);

  const generateContextualResponse = (question: string): string => {
    // Simulate context-aware AI responses with variability
    const responses = [
      // Technical questions
      {
        keywords: ['code', 'programming', 'debug', 'error', 'bug', 'api', 'database'],
        responses: [
          "For debugging this issue, I'd recommend using browser dev tools and console.log() statements to trace the data flow. Also, check your API endpoints are returning the expected format.",
          "This sounds like a common async/await issue. Make sure you're properly handling promises and error cases. Would you like me to walk through a specific debugging approach?",
          "Based on typical hackathon scenarios, this could be a CORS issue or authentication problem. Let's troubleshoot systematically - first, check your network tab for failed requests.",
          "I suggest breaking this down into smaller, testable functions. Unit testing individual components will help you isolate where the issue occurs. What's the specific error message you're seeing?"
        ]
      },
      // Architecture questions
      {
        keywords: ['architecture', 'design', 'structure', 'organize', 'scale', 'pattern'],
        responses: [
          "For hackathon projects, I recommend starting with a simple MVC pattern. Focus on getting a working prototype first, then refactor for better organization if time permits.",
          "Consider using a microservices approach if you have multiple team members. This allows parallel development and easier debugging. What's your current team structure?",
          "Start with a monolithic structure for rapid prototyping, but keep your components modular. This gives you flexibility to extract services later if needed.",
          "Think about your data flow first - how information moves from user input to database and back. This will guide your architectural decisions and component boundaries."
        ]
      },
      // Time management
      {
        keywords: ['time', 'deadline', 'schedule', 'rush', 'behind', 'priority'],
        responses: [
          "Time management is crucial in hackathons! Focus on your MVP first - what's the minimum that demonstrates your core idea? Everything else is enhancement.",
          "I recommend timeboxing features. Spend 80% of your time on core functionality and 20% on polish. Better to have a working simple solution than an incomplete complex one.",
          "Consider parallel development - divide tasks by functionality (frontend/backend) or features. Make sure to integrate frequently to avoid last-minute issues.",
          "If you're behind schedule, prioritize features by user impact. What will judges notice most? Focus there first, then add nice-to-haves if time allows."
        ]
      },
      // Team collaboration
      {
        keywords: ['team', 'collaborate', 'conflict', 'communication', 'git', 'merge'],
        responses: [
          "Clear communication is key! Establish regular check-ins (every 2-3 hours) to sync progress and address blockers. Use a shared task board to track who's working on what.",
          "For Git workflows, I suggest feature branches with frequent merges to main. This reduces conflict resolution complexity and keeps everyone's work visible.",
          "Define clear interfaces early - if someone's building the API and another the frontend, agree on data structures upfront. This enables parallel development.",
          "Assign a 'tech lead' role to make quick architectural decisions and resolve merge conflicts. This prevents decision paralysis and keeps momentum going."
        ]
      },
      // Pitch and presentation
      {
        keywords: ['pitch', 'presentation', 'demo', 'judges', 'showcase', 'present'],
        responses: [
          "Focus your pitch on the problem-solution fit. Judges want to see that you understand the problem deeply and have built something that actually addresses it.",
          "Practice your demo beforehand! Have a backup plan (screenshots/video) in case of technical issues. Judges prefer a smooth narrative over live debugging.",
          "Structure your pitch: Problem (30 seconds), Solution (60 seconds), Demo (90 seconds), Market/Impact (30 seconds). Keep it crisp and compelling.",
          "Tell a story that judges can relate to. Start with a scenario they might have experienced, then show how your solution makes that scenario better."
        ]
      },
      // General support
      {
        keywords: ['help', 'stuck', 'lost', 'confused', 'overwhelmed', 'advice'],
        responses: [
          "Take a deep breath! Hackathons are intense, but remember that everyone faces challenges. Break your current problem into smaller pieces - what's the very next step you can take?",
          "It's normal to feel overwhelmed. Try the 'rubber duck' method - explain your problem out loud (to me or a teammate). Often the solution becomes clearer when you verbalize it.",
          "Step away for 10 minutes if you're really stuck. Sometimes a short break gives your brain the reset it needs to see the solution that was there all along.",
          "Remember why you're here - to learn, build, and have fun! Don't let perfectionism block progress. A working solution beats an elegant incomplete one every time."
        ]
      }
    ];

    // Find matching response category
    const questionLower = question.toLowerCase();
    for (const category of responses) {
      if (category.keywords.some(keyword => questionLower.includes(keyword))) {
        // Return a random response from the matching category
        const randomIndex = Math.floor(Math.random() * category.responses.length);
        return category.responses[randomIndex];
      }
    }

    // Default responses for unmatched questions
    const defaultResponses = [
      "That's an interesting question! Based on my hackathon experience, I'd suggest starting by clearly defining the problem you're trying to solve. What specific challenge are you facing?",
      "Great question! In hackathon contexts, I usually recommend the simplest approach that works. Can you tell me more about your specific use case so I can give more targeted advice?",
      "I can help with that! To give you the most relevant guidance, could you provide a bit more context about your project and what you're trying to achieve?",
      "Excellent question! From what I've seen in successful hackathon projects, the key is balancing ambition with feasibility. What's your current setup and what specific aspect would you like guidance on?",
      "That's a common challenge in hackathons! The best approach depends on your specific constraints. Tell me more about your timeline and technical requirements, and I can suggest a focused strategy."
    ];

    return defaultResponses[Math.floor(Math.random() * defaultResponses.length)];
  };

  const handleSendMessage = async () => {
    if (!inputText.trim()) return;

    const userMessage: QAMessage = {
      id: Date.now().toString(),
      text: inputText,
      isUser: true,
      timestamp: new Date().toLocaleTimeString()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputText('');
    setIsLoading(true);

    // Simulate AI processing time
    setTimeout(() => {
      const aiResponse: QAMessage = {
        id: (Date.now() + 1).toString(),
        text: generateContextualResponse(inputText),
        isUser: false,
        timestamp: new Date().toLocaleTimeString(),
        context: 'response'
      };

      setMessages(prev => [...prev, aiResponse]);
      setIsLoading(false);
    }, 1500 + Math.random() * 1000); // Variable response time for realism
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const quickQuestions = [
    "How do I handle API errors gracefully?",
    "What's the best way to structure my project?",
    "I'm running out of time, what should I prioritize?",
    "How can I make my demo more impressive?",
    "My team is having merge conflicts, help!",
    "What makes a winning hackathon pitch?"
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-purple-50">
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center h-16">
            <button
              onClick={onBack}
              className="flex items-center text-gray-600 hover:text-indigo-600 transition-colors mr-4"
            >
              <ArrowLeft className="w-5 h-5 mr-2" />
              Back to Dashboard
            </button>
            <div className="flex items-center">
              <MessageSquare className="w-8 h-8 text-indigo-600 mr-3" />
              <h1 className="text-2xl font-bold text-gray-900">Real-time Q&A</h1>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-xl shadow-lg overflow-hidden" style={{ height: '70vh' }}>
          {/* Chat Header */}
          <div className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white p-4">
            <div className="flex items-center">
              <Brain className="w-8 h-8 mr-3" />
              <div>
                <h2 className="text-xl font-bold">Sage - AI Mentor</h2>
                <p className="text-indigo-200 text-sm">Your intelligent hackathon assistant</p>
              </div>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4" style={{ height: 'calc(70vh - 140px)' }}>
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.isUser ? 'justify-end' : 'justify-start'}`}
              >
                <div className={`flex items-start space-x-3 max-w-xs lg:max-w-md xl:max-w-lg ${
                  message.isUser ? 'flex-row-reverse space-x-reverse' : ''
                }`}>
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                    message.isUser 
                      ? 'bg-blue-500 text-white' 
                      : 'bg-gradient-to-r from-indigo-500 to-purple-500 text-white'
                  }`}>
                    {message.isUser ? <User className="w-5 h-5" /> : <Brain className="w-5 h-5" />}
                  </div>
                  <div className={`rounded-2xl px-4 py-2 ${
                    message.isUser
                      ? 'bg-blue-500 text-white'
                      : 'bg-gray-100 text-gray-800'
                  }`}>
                    <p className="text-sm leading-relaxed">{message.text}</p>
                    <p className={`text-xs mt-1 ${
                      message.isUser ? 'text-blue-100' : 'text-gray-500'
                    }`}>
                      {message.timestamp}
                    </p>
                  </div>
                </div>
              </div>
            ))}
            
            {isLoading && (
              <div className="flex justify-start">
                <div className="flex items-start space-x-3 max-w-xs lg:max-w-md">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-r from-indigo-500 to-purple-500 text-white flex items-center justify-center">
                    <Brain className="w-5 h-5" />
                  </div>
                  <div className="bg-gray-100 rounded-2xl px-4 py-2">
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

          {/* Input Area */}
          <div className="border-t bg-gray-50 p-4">
            <div className="flex space-x-3">
              <input
                type="text"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Ask me anything about your hackathon project..."
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                disabled={isLoading}
              />
              <button
                onClick={handleSendMessage}
                disabled={!inputText.trim() || isLoading}
                className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-4 py-2 rounded-lg hover:from-indigo-700 hover:to-purple-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
              >
                <Send className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>

        {/* Quick Questions */}
        {messages.length <= 1 && (
          <div className="mt-6 bg-white rounded-xl shadow-lg p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Popular Questions</h3>
            <div className="grid md:grid-cols-2 gap-3">
              {quickQuestions.map((question, index) => (
                <button
                  key={index}
                  onClick={() => setInputText(question)}
                  className="text-left p-3 bg-gray-50 rounded-lg hover:bg-indigo-50 hover:text-indigo-700 transition-colors text-sm border border-gray-200 hover:border-indigo-200"
                >
                  {question}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* AI Features Info */}
        <div className="mt-6 bg-gradient-to-r from-indigo-50 to-purple-50 rounded-xl p-6 border border-indigo-200">
          <h3 className="text-lg font-semibold text-indigo-900 mb-3">Sage's Capabilities</h3>
          <div className="grid md:grid-cols-3 gap-4 text-sm">
            <div className="flex items-start space-x-2">
              <span className="text-indigo-600">🧠</span>
              <div>
                <h4 className="font-medium text-indigo-800">Context-Aware Responses</h4>
                <p className="text-indigo-600">Tailored advice based on hackathon best practices</p>
              </div>
            </div>
            <div className="flex items-start space-x-2">
              <span className="text-purple-600">⚡</span>
              <div>
                <h4 className="font-medium text-purple-800">Technical Guidance</h4>
                <p className="text-purple-600">Debugging help and architecture suggestions</p>
              </div>
            </div>
            <div className="flex items-start space-x-2">
              <span className="text-pink-600">🎯</span>
              <div>
                <h4 className="font-medium text-pink-800">Strategic Advice</h4>
                <p className="text-pink-600">Project prioritization and pitch optimization</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QASection;
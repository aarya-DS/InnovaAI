import React, { useState } from 'react';
import { ArrowLeft, Code, Zap, Database, Globe, Smartphone, Cpu } from 'lucide-react';

interface TechStackProps {
  onBack: () => void;
}

const TechStack: React.FC<TechStackProps> = ({ onBack }) => {
  const [projectType, setProjectType] = useState('');
  const [requirements, setRequirements] = useState({
    realtime: false,
    database: false,
    mobile: false,
    ai: false,
    apis: false,
    authentication: false
  });
  const [suggestions, setSuggestions] = useState<any>(null);
  const [isGenerating, setIsGenerating] = useState(false);

  const projectTypes = [
    { id: 'web', name: 'Web Application', icon: <Globe className="w-6 h-6" /> },
    { id: 'mobile', name: 'Mobile App', icon: <Smartphone className="w-6 h-6" /> },
    { id: 'fullstack', name: 'Full Stack', icon: <Database className="w-6 h-6" /> },
    { id: 'ai', name: 'AI/ML Project', icon: <Cpu className="w-6 h-6" /> },
    { id: 'api', name: 'API/Backend', icon: <Code className="w-6 h-6" /> },
    { id: 'game', name: 'Game Development', icon: <Zap className="w-6 h-6" /> }
  ];

  const generateSuggestions = async () => {
    if (!projectType) return;
    
    setIsGenerating(true);
    
    // Simulate AI processing
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Generate contextual tech stack suggestions
    const mockSuggestions = {
      frontend: getFrontend(projectType, requirements),
      backend: getBackend(projectType, requirements),
      database: getDatabase(requirements),
      tools: getTools(requirements),
      deployment: getDeployment(projectType),
      timeline: generateTimeline(projectType, requirements),
      reasoning: generateReasoning(projectType, requirements)
    };
    
    setSuggestions(mockSuggestions);
    setIsGenerating(false);
  };

  const getFrontend = (type: string, req: any) => {
    const options = [];
    if (type === 'web' || type === 'fullstack') {
      options.push(
        { name: 'React', reason: 'Fast development, huge ecosystem', difficulty: 'Medium' },
        { name: 'Vue.js', reason: 'Gentle learning curve, great docs', difficulty: 'Easy' },
        { name: 'TypeScript', reason: 'Better code quality and debugging', difficulty: 'Medium' }
      );
    }
    if (type === 'mobile') {
      options.push(
        { name: 'React Native', reason: 'Code sharing with web', difficulty: 'Medium' },
        { name: 'Flutter', reason: 'Fast performance, single codebase', difficulty: 'Hard' }
      );
    }
    return options;
  };

  const getBackend = (type: string, req: any) => {
    const options = [];
    if (type !== 'mobile') {
      if (req.realtime) {
        options.push({ name: 'Node.js + Socket.io', reason: 'Real-time capabilities', difficulty: 'Medium' });
      }
      options.push(
        { name: 'Express.js', reason: 'Rapid API development', difficulty: 'Easy' },
        { name: 'FastAPI', reason: 'Auto-documentation, type safety', difficulty: 'Medium' }
      );
    }
    return options;
  };

  const getDatabase = (req: any) => {
    const options = [];
    if (req.database) {
      options.push(
        { name: 'PostgreSQL', reason: 'Reliable, feature-rich', difficulty: 'Medium' },
        { name: 'MongoDB', reason: 'Flexible schema, JSON-like', difficulty: 'Easy' }
      );
    }
    if (req.realtime) {
      options.push({ name: 'Redis', reason: 'Real-time data caching', difficulty: 'Medium' });
    }
    return options;
  };

  const getTools = (req: any) => {
    const tools = [
      { name: 'Git + GitHub', reason: 'Version control and collaboration', difficulty: 'Easy' },
      { name: 'Docker', reason: 'Consistent development environment', difficulty: 'Medium' }
    ];
    if (req.authentication) {
      tools.push({ name: 'Auth0', reason: 'Quick authentication setup', difficulty: 'Easy' });
    }
    if (req.ai) {
      tools.push({ name: 'OpenAI API', reason: 'Ready-to-use AI capabilities', difficulty: 'Easy' });
    }
    return tools;
  };

  const getDeployment = (type: string) => {
    const options = [];
    if (type === 'web' || type === 'fullstack') {
      options.push(
        { name: 'Vercel', reason: 'Zero-config deployment', difficulty: 'Easy' },
        { name: 'Netlify', reason: 'Great for static sites', difficulty: 'Easy' }
      );
    }
    options.push({ name: 'Heroku', reason: 'Simple backend deployment', difficulty: 'Easy' });
    return options;
  };

  const generateTimeline = (type: string, req: any) => {
    const complexity = Object.values(req).filter(Boolean).length;
    const baseHours = type === 'mobile' ? 48 : 36;
    const totalHours = baseHours + (complexity * 6);
    
    return {
      total: `${totalHours} hours`,
      breakdown: {
        planning: '4 hours',
        setup: '6 hours',
        development: `${totalHours - 16} hours`,
        testing: '4 hours',
        deployment: '2 hours'
      }
    };
  };

  const generateReasoning = (type: string, req: any) => {
    return `Based on your ${type} project with ${Object.values(req).filter(Boolean).length} advanced features, 
    Codex recommends a modern stack that balances rapid development with scalability. The suggested technologies 
    are hackathon-proven and have strong community support for quick problem-solving.`;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-cyan-50">
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center h-16">
            <button
              onClick={onBack}
              className="flex items-center text-gray-600 hover:text-blue-600 transition-colors mr-4"
            >
              <ArrowLeft className="w-5 h-5 mr-2" />
              Back to Dashboard
            </button>
            <div className="flex items-center">
              <Code className="w-8 h-8 text-blue-600 mr-3" />
              <h1 className="text-2xl font-bold text-gray-900">Tech Stack Suggestions</h1>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-xl shadow-lg p-8">
          <div className="text-center mb-8">
            <Zap className="w-16 h-16 text-blue-600 mx-auto mb-4" />
            <h2 className="text-3xl font-bold text-gray-900 mb-2">Smart Technology Recommendations</h2>
            <p className="text-gray-600">Let Codex, our Tech Agent, suggest the perfect stack for your project</p>
          </div>

          {/* Project Type Selection */}
          <div className="mb-8">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">What type of project are you building?</h3>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {projectTypes.map(type => (
                <button
                  key={type.id}
                  onClick={() => setProjectType(type.id)}
                  className={`p-4 rounded-lg border-2 transition-all ${
                    projectType === type.id
                      ? 'border-blue-500 bg-blue-50'
                      : 'border-gray-200 hover:border-blue-300'
                  }`}
                >
                  <div className="flex flex-col items-center">
                    <div className={`mb-2 ${projectType === type.id ? 'text-blue-600' : 'text-gray-600'}`}>
                      {type.icon}
                    </div>
                    <span className={`font-medium ${projectType === type.id ? 'text-blue-900' : 'text-gray-700'}`}>
                      {type.name}
                    </span>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Requirements */}
          {projectType && (
            <div className="mb-8">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">What features do you need?</h3>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {Object.entries({
                  realtime: 'Real-time Updates',
                  database: 'Database Storage',
                  mobile: 'Mobile Support',
                  ai: 'AI Integration',
                  apis: 'Third-party APIs',
                  authentication: 'User Authentication'
                }).map(([key, label]) => (
                  <label key={key} className="flex items-center space-x-3 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={requirements[key as keyof typeof requirements]}
                      onChange={(e) => setRequirements(prev => ({
                        ...prev,
                        [key]: e.target.checked
                      }))}
                      className="w-5 h-5 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                    />
                    <span className="text-gray-700">{label}</span>
                  </label>
                ))}
              </div>
            </div>
          )}

          <div className="text-center mb-8">
            <button
              onClick={generateSuggestions}
              disabled={!projectType || isGenerating}
              className="bg-gradient-to-r from-blue-600 to-cyan-600 text-white px-8 py-3 rounded-lg font-semibold hover:from-blue-700 hover:to-cyan-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all transform hover:scale-105"
            >
              {isGenerating ? 'Generating Suggestions...' : 'Get Tech Stack Recommendations'}
            </button>
          </div>

          {isGenerating && (
            <div className="text-center py-8">
              <div className="inline-flex items-center space-x-2">
                <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-600"></div>
                <span className="text-gray-600">Codex is analyzing your requirements...</span>
              </div>
            </div>
          )}

          {suggestions && (
            <div className="space-y-8">
              {/* Agent Reasoning */}
              <div className="bg-blue-50 border border-blue-200 rounded-xl p-6">
                <h3 className="text-xl font-bold text-blue-800 mb-4">Codex's Analysis</h3>
                <div className="flex items-start space-x-4">
                  <span className="text-4xl">⚡</span>
                  <div>
                    <p className="text-blue-800">{suggestions.reasoning}</p>
                  </div>
                </div>
              </div>

              {/* Tech Recommendations */}
              <div className="grid md:grid-cols-2 gap-6">
                {/* Frontend */}
                {suggestions.frontend.length > 0 && (
                  <div className="bg-white border rounded-xl p-6">
                    <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                      <Globe className="w-5 h-5 mr-2 text-green-600" />
                      Frontend
                    </h3>
                    <div className="space-y-4">
                      {suggestions.frontend.map((tech: any, index: number) => (
                        <div key={index} className="p-4 bg-green-50 rounded-lg">
                          <div className="flex justify-between items-start mb-2">
                            <h4 className="font-semibold text-green-800">{tech.name}</h4>
                            <span className={`px-2 py-1 rounded text-xs font-medium ${
                              tech.difficulty === 'Easy' ? 'bg-green-200 text-green-800' :
                              tech.difficulty === 'Medium' ? 'bg-yellow-200 text-yellow-800' :
                              'bg-red-200 text-red-800'
                            }`}>
                              {tech.difficulty}
                            </span>
                          </div>
                          <p className="text-green-700 text-sm">{tech.reason}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Backend */}
                {suggestions.backend.length > 0 && (
                  <div className="bg-white border rounded-xl p-6">
                    <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                      <Database className="w-5 h-5 mr-2 text-blue-600" />
                      Backend
                    </h3>
                    <div className="space-y-4">
                      {suggestions.backend.map((tech: any, index: number) => (
                        <div key={index} className="p-4 bg-blue-50 rounded-lg">
                          <div className="flex justify-between items-start mb-2">
                            <h4 className="font-semibold text-blue-800">{tech.name}</h4>
                            <span className={`px-2 py-1 rounded text-xs font-medium ${
                              tech.difficulty === 'Easy' ? 'bg-green-200 text-green-800' :
                              tech.difficulty === 'Medium' ? 'bg-yellow-200 text-yellow-800' :
                              'bg-red-200 text-red-800'
                            }`}>
                              {tech.difficulty}
                            </span>
                          </div>
                          <p className="text-blue-700 text-sm">{tech.reason}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Database & Tools */}
              <div className="grid md:grid-cols-2 gap-6">
                {suggestions.database.length > 0 && (
                  <div className="bg-white border rounded-xl p-6">
                    <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                      <Database className="w-5 h-5 mr-2 text-purple-600" />
                      Database
                    </h3>
                    <div className="space-y-4">
                      {suggestions.database.map((tech: any, index: number) => (
                        <div key={index} className="p-4 bg-purple-50 rounded-lg">
                          <div className="flex justify-between items-start mb-2">
                            <h4 className="font-semibold text-purple-800">{tech.name}</h4>
                            <span className={`px-2 py-1 rounded text-xs font-medium ${
                              tech.difficulty === 'Easy' ? 'bg-green-200 text-green-800' :
                              tech.difficulty === 'Medium' ? 'bg-yellow-200 text-yellow-800' :
                              'bg-red-200 text-red-800'
                            }`}>
                              {tech.difficulty}
                            </span>
                          </div>
                          <p className="text-purple-700 text-sm">{tech.reason}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                <div className="bg-white border rounded-xl p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                    <Code className="w-5 h-5 mr-2 text-orange-600" />
                    Development Tools
                  </h3>
                  <div className="space-y-4">
                    {suggestions.tools.map((tool: any, index: number) => (
                      <div key={index} className="p-4 bg-orange-50 rounded-lg">
                        <div className="flex justify-between items-start mb-2">
                          <h4 className="font-semibold text-orange-800">{tool.name}</h4>
                          <span className={`px-2 py-1 rounded text-xs font-medium ${
                            tool.difficulty === 'Easy' ? 'bg-green-200 text-green-800' :
                            tool.difficulty === 'Medium' ? 'bg-yellow-200 text-yellow-800' :
                            'bg-red-200 text-red-800'
                          }`}>
                            {tool.difficulty}
                          </span>
                        </div>
                        <p className="text-orange-700 text-sm">{tool.reason}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Timeline */}
              <div className="bg-white border rounded-xl p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-4">Estimated Timeline</h3>
                <div className="flex items-center justify-center mb-6">
                  <div className="text-center">
                    <div className="text-4xl font-bold text-blue-600 mb-2">{suggestions.timeline.total}</div>
                    <p className="text-gray-600">Total development time</p>
                  </div>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                  {Object.entries(suggestions.timeline.breakdown).map(([phase, time]) => (
                    <div key={phase} className="text-center p-3 bg-gray-50 rounded-lg">
                      <div className="font-semibold text-gray-800 capitalize">{phase}</div>
                      <div className="text-sm text-gray-600">{time as string}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Next Steps */}
              <div className="bg-blue-50 border border-blue-200 rounded-xl p-6">
                <h3 className="text-xl font-bold text-blue-800 mb-4">Next Steps</h3>
                <div className="flex items-start space-x-4">
                  <span className="text-4xl">🚀</span>
                  <div>
                    <p className="text-blue-800 mb-2">
                      Great! Now that you have your tech stack, I recommend moving to 
                      <strong> Smart Deadline Management</strong> to plan your development timeline.
                    </p>
                    <p className="text-blue-600 text-sm">
                      Let's break down your project into manageable tasks and set realistic milestones 
                      for hackathon success!
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TechStack;
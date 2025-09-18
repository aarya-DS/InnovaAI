import React, { useState, useEffect } from 'react';
import { 
  Brain, 
  Lightbulb, 
  Code, 
  Clock, 
  Target, 
  MessageSquare, 
  CheckSquare, 
  BarChart3, 
  LogOut,
  Bell,
  Zap,
  TrendingUp
} from 'lucide-react';
import { User, Project, Agent, AgentMessage } from '../types';

interface DashboardProps {
  user: User;
  projects: Project[];
  onNavigate: (view: string) => void;
  onLogout: () => void;
}

const Dashboard: React.FC<DashboardProps> = ({ user, projects, onNavigate, onLogout }) => {
  const [notifications, setNotifications] = useState<AgentMessage[]>([]);
  const [showNotifications, setShowNotifications] = useState(false);

  const agents: Agent[] = [
    { name: 'Nova', type: 'Innovation', avatar: '🚀', color: 'from-purple-500 to-pink-500' },
    { name: 'Codex', type: 'Tech', avatar: '⚡', color: 'from-blue-500 to-cyan-500' },
    { name: 'Tempo', type: 'Deadline', avatar: '⏰', color: 'from-orange-500 to-red-500' },
    { name: 'Pitch', type: 'Pitch', avatar: '🎯', color: 'from-green-500 to-emerald-500' },
    { name: 'Sage', type: 'Mentor', avatar: '🧠', color: 'from-indigo-500 to-purple-500' }
  ];

  const menuItems = [
    { id: 'idea-evaluation', title: 'Idea Evaluation', icon: <Lightbulb className="w-6 h-6" />, description: 'AI-powered idea analysis and scoring' },
    { id: 'tech-stack', title: 'Tech Stack Suggestions', icon: <Code className="w-6 h-6" />, description: 'Smart technology recommendations' },
    { id: 'deadline-management', title: 'Smart Deadline Management', icon: <Clock className="w-6 h-6" />, description: 'Project timeline optimization' },
    { id: 'pitch-optimization', title: 'Pitch Optimization', icon: <Target className="w-6 h-6" />, description: 'Perfect your presentation' },
    { id: 'qa-section', title: 'Real-time Q&A', icon: <MessageSquare className="w-6 h-6" />, description: 'Instant AI assistance' },
    { id: 'task-management', title: 'Task Management', icon: <CheckSquare className="w-6 h-6" />, description: 'Organize and track progress' }
  ];

  useEffect(() => {
    // Generate smart notifications from agents
    const generateNotifications = () => {
      const messages: AgentMessage[] = [];
      const now = new Date();

      // Check for projects with approaching deadlines
      projects.forEach(project => {
        const deadline = new Date(project.deadline);
        const daysUntilDeadline = Math.ceil((deadline.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));
        
        if (daysUntilDeadline <= 3 && daysUntilDeadline > 0) {
          messages.push({
            id: `deadline-${project.id}`,
            agent: agents.find(a => a.type === 'Deadline')!,
            message: `⚠️ Project "${project.name}" deadline is in ${daysUntilDeadline} day${daysUntilDeadline > 1 ? 's' : ''}! Time to accelerate progress.`,
            timestamp: now.toISOString(),
            type: 'notification'
          });
        }

        if (project.progress < 30 && daysUntilDeadline <= 7) {
          messages.push({
            id: `progress-${project.id}`,
            agent: agents.find(a => a.type === 'Mentor')!,
            message: `💡 "${project.name}" needs attention - only ${project.progress}% complete. Let me help you prioritize tasks.`,
            timestamp: now.toISOString(),
            type: 'suggestion'
          });
        }
      });

      // Add workflow suggestions
      if (projects.length === 0) {
        messages.push({
          id: 'welcome-workflow',
          agent: agents.find(a => a.type === 'Innovation')!,
          message: `🚀 Ready to start your hackathon journey? Let's begin with idea evaluation to validate your concept!`,
          timestamp: now.toISOString(),
          type: 'redirect'
        });
      } else if (projects.some(p => p.progress > 50)) {
        messages.push({
          id: 'pitch-ready',
          agent: agents.find(a => a.type === 'Pitch')!,
          message: `🎯 Great progress! Your projects are ready for pitch optimization. Let's make them shine!`,
          timestamp: now.toISOString(),
          type: 'redirect'
        });
      }

      setNotifications(messages);
    };

    generateNotifications();
    const interval = setInterval(generateNotifications, 60000); // Update every minute

    return () => clearInterval(interval);
  }, [projects, agents]);

  const totalProgress = projects.length > 0 
    ? Math.round(projects.reduce((sum, p) => sum + p.progress, 0) / projects.length)
    : 0;

  const urgentTasks = projects.reduce((count, project) => {
    return count + project.tasks.filter(task => 
      !task.completed && 
      task.priority === 'high' && 
      task.dueDate && 
      new Date(task.dueDate) <= new Date(Date.now() + 24 * 60 * 60 * 1000)
    ).length;
  }, 0);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <Brain className="w-8 h-8 text-blue-600 mr-3" />
              <div>
                <h1 className="text-2xl font-bold text-gray-900">InnovaAI</h1>
                <p className="text-sm text-gray-500">Welcome back, {user.name}</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="relative">
                <button
                  onClick={() => setShowNotifications(!showNotifications)}
                  className="relative p-2 text-gray-600 hover:text-blue-600 transition-colors"
                >
                  <Bell className="w-6 h-6" />
                  {notifications.length > 0 && (
                    <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                      {notifications.length}
                    </span>
                  )}
                </button>
                
                {showNotifications && (
                  <div className="absolute right-0 mt-2 w-80 bg-white rounded-xl shadow-lg border z-50">
                    <div className="p-4">
                      <h3 className="font-semibold text-gray-800 mb-3">Agent Notifications</h3>
                      <div className="space-y-3 max-h-64 overflow-y-auto">
                        {notifications.map(notification => (
                          <div key={notification.id} className="flex items-start space-x-3 p-3 bg-gray-50 rounded-lg">
                            <span className="text-2xl">{notification.agent.avatar}</span>
                            <div className="flex-1">
                              <p className="text-sm font-medium text-gray-800">{notification.agent.name}</p>
                              <p className="text-sm text-gray-600 mt-1">{notification.message}</p>
                            </div>
                          </div>
                        ))}
                        {notifications.length === 0 && (
                          <p className="text-gray-500 text-center py-4">No new notifications</p>
                        )}
                      </div>
                    </div>
                  </div>
                )}
              </div>
              <button
                onClick={() => onNavigate('profile')}
                className="flex items-center space-x-2 px-4 py-2 text-gray-600 hover:text-blue-600 transition-colors"
              >
                <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full flex items-center justify-center">
                  <span className="text-white font-semibold text-sm">
                    {user.name.charAt(0).toUpperCase()}
                  </span>
                </div>
                <span>Profile</span>
              </button>
              <button
                onClick={onLogout}
                className="flex items-center space-x-2 px-4 py-2 text-gray-600 hover:text-red-600 transition-colors"
              >
                <LogOut className="w-5 h-5" />
                <span>Logout</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Stats Overview */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-xl p-6 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Active Projects</p>
                <p className="text-2xl font-bold text-gray-900">{projects.length}</p>
              </div>
              <BarChart3 className="w-8 h-8 text-blue-600" />
            </div>
          </div>
          <div className="bg-white rounded-xl p-6 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Average Progress</p>
                <p className="text-2xl font-bold text-gray-900">{totalProgress}%</p>
              </div>
              <TrendingUp className="w-8 h-8 text-green-600" />
            </div>
          </div>
          <div className="bg-white rounded-xl p-6 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Urgent Tasks</p>
                <p className="text-2xl font-bold text-gray-900">{urgentTasks}</p>
              </div>
              <Zap className="w-8 h-8 text-orange-600" />
            </div>
          </div>
          <div className="bg-white rounded-xl p-6 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">AI Agents</p>
                <p className="text-2xl font-bold text-gray-900">{agents.length}</p>
              </div>
              <Brain className="w-8 h-8 text-purple-600" />
            </div>
          </div>
        </div>

        {/* AI Agents Section */}
        <div className="bg-white rounded-xl p-6 shadow-sm mb-8">
          <h3 className="text-xl font-bold text-gray-900 mb-6">Your AI Agent Team</h3>
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            {agents.map((agent, index) => (
              <div key={index} className="text-center">
                <div className={`w-16 h-16 rounded-full bg-gradient-to-r ${agent.color} flex items-center justify-center mx-auto mb-3`}>
                  <span className="text-2xl">{agent.avatar}</span>
                </div>
                <h4 className="font-semibold text-gray-800">{agent.name}</h4>
                <p className="text-sm text-gray-600">{agent.type} Agent</p>
              </div>
            ))}
          </div>
        </div>

        {/* Main Navigation */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {menuItems.map((item) => (
            <div
              key={item.id}
              onClick={() => onNavigate(item.id)}
              className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md cursor-pointer transition-all transform hover:scale-105 border hover:border-blue-200"
            >
              <div className="flex items-center mb-4">
                <div className="p-2 bg-blue-100 rounded-lg text-blue-600 mr-4">
                  {item.icon}
                </div>
                <h3 className="text-xl font-semibold text-gray-900">{item.title}</h3>
              </div>
              <p className="text-gray-600">{item.description}</p>
            </div>
          ))}
        </div>

        {/* Recent Projects */}
        {projects.length > 0 && (
          <div className="bg-white rounded-xl p-6 shadow-sm mt-8">
            <h3 className="text-xl font-bold text-gray-900 mb-6">Recent Projects</h3>
            <div className="space-y-4">
              {projects.slice(0, 3).map((project) => (
                <div key={project.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div>
                    <h4 className="font-semibold text-gray-800">{project.name}</h4>
                    <p className="text-sm text-gray-600 mt-1">{project.idea.substring(0, 100)}...</p>
                  </div>
                  <div className="text-right">
                    <div className="w-24 bg-gray-200 rounded-full h-2 mb-2">
                      <div 
                        className="bg-blue-600 h-2 rounded-full" 
                        style={{ width: `${project.progress}%` }}
                      ></div>
                    </div>
                    <p className="text-sm text-gray-600">{project.progress}% complete</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </section>
    </div>
  );
};

export default Dashboard;

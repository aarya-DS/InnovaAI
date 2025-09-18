import React, { useState, useEffect } from 'react';
import { Brain, Users, Clock, Target, MessageSquare, CheckSquare, BarChart3 } from 'lucide-react';
import LandingPage from './components/LandingPage';
import Dashboard from './components/Dashboard';
import IdeaEvaluation from './components/IdeaEvaluation';
import TechStack from './components/TechStack';
import DeadlineManagement from './components/DeadlineManagement';
import PitchOptimization from './components/PitchOptimization';
import QASection from './components/QASection';
import TaskManagement from './components/TaskManagement';
import ProfileDashboard from './components/ProfileDashboard';
import FloatingChatWidget from './components/FloatingChatWidget';
import { User, Project } from './types';

function App() {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [currentView, setCurrentView] = useState<string>('landing');
  const [userProjects, setUserProjects] = useState<Project[]>([]);

  useEffect(() => {
    // Load user data from localStorage on app start
    const savedUser = localStorage.getItem('innovaai_user');
    const savedProjects = localStorage.getItem('innovaai_projects');
    
    if (savedUser) {
      const user = JSON.parse(savedUser);
      setCurrentUser(user);
      setCurrentView('dashboard');
    }
    
    if (savedProjects) {
      setUserProjects(JSON.parse(savedProjects));
    }
  }, []);

  const handleLogin = (user: User) => {
    // Add default profile data for new users
    const userWithDefaults = {
      ...user,
      joinedDate: user.joinedDate || new Date().toISOString(),
      lastActive: new Date().toISOString()
    };
    
    setCurrentUser(userWithDefaults);
    localStorage.setItem('innovaai_user', JSON.stringify(userWithDefaults));
    setCurrentView('dashboard');
  };

  const handleLogout = () => {
    setCurrentUser(null);
    localStorage.removeItem('innovaai_user');
    setCurrentView('landing');
  };

  const handleUpdateUser = (updatedUser: User) => {
    const userWithLastActive = {
      ...updatedUser,
      lastActive: new Date().toISOString()
    };
    setCurrentUser(userWithLastActive);
    localStorage.setItem('innovaai_user', JSON.stringify(userWithLastActive));
  };

  const updateProjects = (projects: Project[]) => {
    setUserProjects(projects);
    localStorage.setItem('innovaai_projects', JSON.stringify(projects));
  };

  const renderCurrentView = () => {
    switch (currentView) {
      case 'landing':
        return <LandingPage onLogin={handleLogin} />;
      case 'dashboard':
        return (
          <Dashboard
            user={currentUser!}
            projects={userProjects}
            onNavigate={setCurrentView}
            onLogout={handleLogout}
          />
        );
      case 'profile':
        return (
          <ProfileDashboard
            user={currentUser!}
            projects={userProjects}
            onBack={() => setCurrentView('dashboard')}
            onUpdateUser={handleUpdateUser}
          />
        );
      case 'idea-evaluation':
        return <IdeaEvaluation onBack={() => setCurrentView('dashboard')} />;
      case 'tech-stack':
        return <TechStack onBack={() => setCurrentView('dashboard')} />;
      case 'deadline-management':
        return (
          <DeadlineManagement
            user={currentUser!}
            projects={userProjects}
            onUpdateProjects={updateProjects}
            onBack={() => setCurrentView('dashboard')}
          />
        );
      case 'pitch-optimization':
        return <PitchOptimization onBack={() => setCurrentView('dashboard')} />;
      case 'qa-section':
        return <QASection onBack={() => setCurrentView('dashboard')} />;
      case 'task-management':
        return (
          <TaskManagement
            user={currentUser!}
            projects={userProjects}
            onUpdateProjects={updateProjects}
            onBack={() => setCurrentView('dashboard')}
          />
        );
      default:
        return <LandingPage onLogin={handleLogin} />;
    }
  };

  return (
    <div className="min-h-screen">
      {renderCurrentView()}
      <FloatingChatWidget />
    </div>
  );
}

export default App;
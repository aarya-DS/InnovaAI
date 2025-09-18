import React, { useState } from 'react';
import { 
  ArrowLeft, 
  User as UserIcon, 
  Mail, 
  MapPin, 
  Globe, 
  Github, 
  Linkedin,
  Calendar,
  Clock,
  Trophy,
  Target,
  CheckSquare,
  BarChart3,
  Settings,
  Edit3,
  Save,
  X
} from 'lucide-react';
import { User, Project, UserStats, Achievement } from '../types';

interface ProfileDashboardProps {
  user: User;
  projects: Project[];
  onBack: () => void;
  onUpdateUser: (user: User) => void;
}

const ProfileDashboard: React.FC<ProfileDashboardProps> = ({ 
  user, 
  projects, 
  onBack, 
  onUpdateUser 
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedUser, setEditedUser] = useState(user);

  const calculateStats = (): UserStats => {
    const totalTasks = projects.reduce((sum, p) => sum + p.tasks.length, 0);
    const completedTasks = projects.reduce((sum, p) => sum + p.tasks.filter(t => t.completed).length, 0);
    const completedProjects = projects.filter(p => p.progress === 100).length;
    const averageProgress = projects.length > 0 
      ? Math.round(projects.reduce((sum, p) => sum + p.progress, 0) / projects.length)
      : 0;

    return {
      totalProjects: projects.length,
      completedProjects,
      totalTasks,
      completedTasks,
      averageProgress,
      hackathonsParticipated: Math.floor(projects.length / 2) + 3, // Mock data
      pitchesOptimized: Math.floor(projects.length * 1.5) + 2, // Mock data
      questionsAsked: Math.floor(totalTasks * 0.8) + 15 // Mock data
    };
  };

  const generateAchievements = (): Achievement[] => {
    const stats = calculateStats();
    const achievements: Achievement[] = [];

    if (stats.totalProjects >= 1) {
      achievements.push({
        id: 'first-project',
        title: 'First Steps',
        description: 'Created your first project',
        icon: '🚀',
        unlockedAt: projects[0]?.createdAt || new Date().toISOString(),
        category: 'projects'
      });
    }

    if (stats.completedProjects >= 1) {
      achievements.push({
        id: 'project-complete',
        title: 'Project Finisher',
        description: 'Completed your first project',
        icon: '✅',
        unlockedAt: new Date().toISOString(),
        category: 'projects'
      });
    }

    if (stats.completedTasks >= 10) {
      achievements.push({
        id: 'task-master',
        title: 'Task Master',
        description: 'Completed 10+ tasks',
        icon: '📋',
        unlockedAt: new Date().toISOString(),
        category: 'tasks'
      });
    }

    if (stats.totalProjects >= 5) {
      achievements.push({
        id: 'serial-innovator',
        title: 'Serial Innovator',
        description: 'Created 5+ projects',
        icon: '💡',
        unlockedAt: new Date().toISOString(),
        category: 'innovation'
      });
    }

    if (stats.averageProgress >= 80) {
      achievements.push({
        id: 'high-achiever',
        title: 'High Achiever',
        description: 'Maintained 80%+ average progress',
        icon: '🏆',
        unlockedAt: new Date().toISOString(),
        category: 'milestone'
      });
    }

    return achievements;
  };

  const handleSave = () => {
    onUpdateUser(editedUser);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditedUser(user);
    setIsEditing(false);
  };

  const stats = calculateStats();
  const achievements = generateAchievements();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <button
                onClick={onBack}
                className="flex items-center text-gray-600 hover:text-blue-600 transition-colors mr-4"
              >
                <ArrowLeft className="w-5 h-5 mr-2" />
                Back to Dashboard
              </button>
              <div className="flex items-center">
                <UserIcon className="w-8 h-8 text-blue-600 mr-3" />
                <h1 className="text-2xl font-bold text-gray-900">Profile</h1>
              </div>
            </div>
            <button
              onClick={() => setIsEditing(!isEditing)}
              className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              {isEditing ? <X className="w-4 h-4" /> : <Edit3 className="w-4 h-4" />}
              <span>{isEditing ? 'Cancel' : 'Edit Profile'}</span>
            </button>
          </div>
        </div>
      </header>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Profile Info */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
              <div className="text-center mb-6">
                <div className="w-24 h-24 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-3xl text-white font-bold">
                    {user.name.charAt(0).toUpperCase()}
                  </span>
                </div>
                {isEditing ? (
                  <div className="space-y-3">
                    <input
                      type="text"
                      value={editedUser.name}
                      onChange={(e) => setEditedUser(prev => ({ ...prev, name: e.target.value }))}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-center font-bold text-xl"
                    />
                    <input
                      type="email"
                      value={editedUser.email}
                      onChange={(e) => setEditedUser(prev => ({ ...prev, email: e.target.value }))}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-center text-gray-600"
                    />
                  </div>
                ) : (
                  <>
                    <h2 className="text-2xl font-bold text-gray-900">{user.name}</h2>
                    <p className="text-gray-600">{user.email}</p>
                  </>
                )}
              </div>

              {isEditing ? (
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Bio</label>
                    <textarea
                      value={editedUser.bio || ''}
                      onChange={(e) => setEditedUser(prev => ({ ...prev, bio: e.target.value }))}
                      rows={3}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                      placeholder="Tell us about yourself..."
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
                    <input
                      type="text"
                      value={editedUser.location || ''}
                      onChange={(e) => setEditedUser(prev => ({ ...prev, location: e.target.value }))}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="City, Country"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Website</label>
                    <input
                      type="url"
                      value={editedUser.website || ''}
                      onChange={(e) => setEditedUser(prev => ({ ...prev, website: e.target.value }))}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="https://yourwebsite.com"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">GitHub</label>
                    <input
                      type="text"
                      value={editedUser.github || ''}
                      onChange={(e) => setEditedUser(prev => ({ ...prev, github: e.target.value }))}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="github.com/username"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">LinkedIn</label>
                    <input
                      type="text"
                      value={editedUser.linkedin || ''}
                      onChange={(e) => setEditedUser(prev => ({ ...prev, linkedin: e.target.value }))}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="linkedin.com/in/username"
                    />
                  </div>
                  <div className="flex space-x-3 pt-4">
                    <button
                      onClick={handleSave}
                      className="flex-1 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center space-x-2"
                    >
                      <Save className="w-4 h-4" />
                      <span>Save</span>
                    </button>
                    <button
                      onClick={handleCancel}
                      className="flex-1 bg-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-400 transition-colors"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              ) : (
                <div className="space-y-4">
                  {user.bio && (
                    <div>
                      <h3 className="font-semibold text-gray-800 mb-2">Bio</h3>
                      <p className="text-gray-600 text-sm">{user.bio}</p>
                    </div>
                  )}
                  
                  <div className="space-y-3">
                    {user.location && (
                      <div className="flex items-center space-x-2 text-gray-600">
                        <MapPin className="w-4 h-4" />
                        <span className="text-sm">{user.location}</span>
                      </div>
                    )}
                    {user.website && (
                      <div className="flex items-center space-x-2 text-gray-600">
                        <Globe className="w-4 h-4" />
                        <a href={user.website} target="_blank" rel="noopener noreferrer" className="text-sm text-blue-600 hover:underline">
                          {user.website}
                        </a>
                      </div>
                    )}
                    {user.github && (
                      <div className="flex items-center space-x-2 text-gray-600">
                        <Github className="w-4 h-4" />
                        <a href={`https://${user.github}`} target="_blank" rel="noopener noreferrer" className="text-sm text-blue-600 hover:underline">
                          {user.github}
                        </a>
                      </div>
                    )}
                    {user.linkedin && (
                      <div className="flex items-center space-x-2 text-gray-600">
                        <Linkedin className="w-4 h-4" />
                        <a href={`https://${user.linkedin}`} target="_blank" rel="noopener noreferrer" className="text-sm text-blue-600 hover:underline">
                          {user.linkedin}
                        </a>
                      </div>
                    )}
                    <div className="flex items-center space-x-2 text-gray-600">
                      <Calendar className="w-4 h-4" />
                      <span className="text-sm">Joined {new Date(user.joinedDate).toLocaleDateString()}</span>
                    </div>
                    <div className="flex items-center space-x-2 text-gray-600">
                      <Clock className="w-4 h-4" />
                      <span className="text-sm">Last active {new Date(user.lastActive).toLocaleDateString()}</span>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Quick Stats */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4">Quick Stats</h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Projects</span>
                  <span className="font-semibold text-gray-900">{stats.totalProjects}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Completed</span>
                  <span className="font-semibold text-green-600">{stats.completedProjects}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Tasks Done</span>
                  <span className="font-semibold text-blue-600">{stats.completedTasks}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Avg Progress</span>
                  <span className="font-semibold text-purple-600">{stats.averageProgress}%</span>
                </div>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Statistics Overview */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-6">Activity Overview</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                <div className="text-center">
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-2">
                    <Target className="w-6 h-6 text-blue-600" />
                  </div>
                  <div className="text-2xl font-bold text-gray-900">{stats.totalProjects}</div>
                  <div className="text-sm text-gray-600">Total Projects</div>
                </div>
                <div className="text-center">
                  <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-2">
                    <CheckSquare className="w-6 h-6 text-green-600" />
                  </div>
                  <div className="text-2xl font-bold text-gray-900">{stats.completedTasks}</div>
                  <div className="text-sm text-gray-600">Tasks Completed</div>
                </div>
                <div className="text-center">
                  <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mx-auto mb-2">
                    <Trophy className="w-6 h-6 text-purple-600" />
                  </div>
                  <div className="text-2xl font-bold text-gray-900">{stats.hackathonsParticipated}</div>
                  <div className="text-sm text-gray-600">Hackathons</div>
                </div>
                <div className="text-center">
                  <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mx-auto mb-2">
                    <BarChart3 className="w-6 h-6 text-orange-600" />
                  </div>
                  <div className="text-2xl font-bold text-gray-900">{stats.pitchesOptimized}</div>
                  <div className="text-sm text-gray-600">Pitches Optimized</div>
                </div>
              </div>
            </div>

            {/* Achievements */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-6">Achievements</h3>
              {achievements.length > 0 ? (
                <div className="grid md:grid-cols-2 gap-4">
                  {achievements.map((achievement) => (
                    <div key={achievement.id} className="flex items-center space-x-4 p-4 bg-gradient-to-r from-yellow-50 to-orange-50 rounded-lg border border-yellow-200">
                      <div className="text-3xl">{achievement.icon}</div>
                      <div>
                        <h4 className="font-semibold text-gray-900">{achievement.title}</h4>
                        <p className="text-sm text-gray-600">{achievement.description}</p>
                        <p className="text-xs text-gray-500 mt-1">
                          Unlocked {new Date(achievement.unlockedAt).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8">
                  <Trophy className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                  <p className="text-gray-500">No achievements yet. Start creating projects to unlock achievements!</p>
                </div>
              )}
            </div>

            {/* Recent Projects */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-6">Recent Projects</h3>
              {projects.length > 0 ? (
                <div className="space-y-4">
                  {projects.slice(0, 5).map((project) => (
                    <div key={project.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                      <div>
                        <h4 className="font-semibold text-gray-900">{project.name}</h4>
                        <p className="text-sm text-gray-600 mt-1">{project.idea.substring(0, 80)}...</p>
                        <p className="text-xs text-gray-500 mt-2">
                          Created {new Date(project.createdAt).toLocaleDateString()}
                        </p>
                      </div>
                      <div className="text-right">
                        <div className="w-16 bg-gray-200 rounded-full h-2 mb-2">
                          <div 
                            className="bg-blue-600 h-2 rounded-full" 
                            style={{ width: `${project.progress}%` }}
                          ></div>
                        </div>
                        <p className="text-sm font-medium text-gray-900">{project.progress}%</p>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8">
                  <Target className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                  <p className="text-gray-500">No projects yet. Create your first project to get started!</p>
                </div>
              )}
            </div>

            {/* Activity Timeline */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-6">Recent Activity</h3>
              <div className="space-y-4">
                {projects.slice(0, 3).map((project, index) => (
                  <div key={project.id} className="flex items-start space-x-4">
                    <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                      <Target className="w-4 h-4 text-blue-600" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-900">
                        <span className="font-medium">Created project</span> "{project.name}"
                      </p>
                      <p className="text-xs text-gray-500">
                        {new Date(project.createdAt).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                ))}
                {projects.length === 0 && (
                  <div className="text-center py-8">
                    <Clock className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                    <p className="text-gray-500">No recent activity. Start using InnovaAI to see your activity here!</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileDashboard;
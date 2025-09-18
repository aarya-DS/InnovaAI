import React, { useState } from 'react';
import { ArrowLeft, Clock, Plus, Calendar, AlertCircle, CheckCircle, Target } from 'lucide-react';
import { User, Project, Task } from '../types';

interface DeadlineManagementProps {
  user: User;
  projects: Project[];
  onUpdateProjects: (projects: Project[]) => void;
  onBack: () => void;
}

const DeadlineManagement: React.FC<DeadlineManagementProps> = ({ 
  user, 
  projects, 
  onUpdateProjects, 
  onBack 
}) => {
  const [showCreateProject, setShowCreateProject] = useState(false);
  const [newProject, setNewProject] = useState({
    name: '',
    idea: '',
    deadline: '',
    priority: 'medium' as 'low' | 'medium' | 'high'
  });

  const handleCreateProject = () => {
    if (!newProject.name || !newProject.idea || !newProject.deadline) return;

    const project: Project = {
      id: Date.now().toString(),
      name: newProject.name,
      idea: newProject.idea,
      deadline: newProject.deadline,
      priority: newProject.priority,
      tasks: generateSmartTasks(newProject.idea, newProject.deadline),
      progress: 0,
      userId: user.id,
      createdAt: new Date().toISOString()
    };

    const updatedProjects = [...projects, project];
    onUpdateProjects(updatedProjects);
    setShowCreateProject(false);
    setNewProject({ name: '', idea: '', deadline: '', priority: 'medium' });
  };

  const generateSmartTasks = (idea: string, deadline: string): Task[] => {
    const days = Math.ceil((new Date(deadline).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24));
    
    const baseTasks: Omit<Task, 'id' | 'dueDate'>[] = [
      { title: 'Project setup and initial configuration', completed: false, priority: 'high' },
      { title: 'Design system and UI mockups', completed: false, priority: 'medium' },
      { title: 'Core functionality development', completed: false, priority: 'high' },
      { title: 'Database schema and API endpoints', completed: false, priority: 'high' },
      { title: 'Frontend component implementation', completed: false, priority: 'medium' },
      { title: 'Integration and testing', completed: false, priority: 'high' },
      { title: 'Deployment and final polish', completed: false, priority: 'medium' },
      { title: 'Pitch deck preparation', completed: false, priority: 'low' }
    ];

    // Add due dates based on timeline
    const tasksPerDay = baseTasks.length / Math.max(days, 1);
    
    return baseTasks.map((task, index) => ({
      ...task,
      id: `task-${Date.now()}-${index}`,
      dueDate: new Date(Date.now() + (index / tasksPerDay) * days * 24 * 60 * 60 * 1000).toISOString().split('T')[0]
    }));
  };

  const toggleTask = (projectId: string, taskId: string) => {
    const updatedProjects = projects.map(project => {
      if (project.id === projectId) {
        const updatedTasks = project.tasks.map(task =>
          task.id === taskId ? { ...task, completed: !task.completed } : task
        );
        
        const completedTasks = updatedTasks.filter(task => task.completed).length;
        const progress = Math.round((completedTasks / updatedTasks.length) * 100);
        
        return { ...project, tasks: updatedTasks, progress };
      }
      return project;
    });
    
    onUpdateProjects(updatedProjects);
  };

  const getDaysUntilDeadline = (deadline: string) => {
    const today = new Date();
    const deadlineDate = new Date(deadline);
    const diffTime = deadlineDate.getTime() - today.getTime();
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'text-red-600 bg-red-100';
      case 'medium': return 'text-yellow-600 bg-yellow-100';
      case 'low': return 'text-green-600 bg-green-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getProgressColor = (progress: number) => {
    if (progress >= 80) return 'bg-green-500';
    if (progress >= 50) return 'bg-blue-500';
    if (progress >= 25) return 'bg-yellow-500';
    return 'bg-red-500';
  };

  if (showCreateProject) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-orange-50 to-red-50">
        <header className="bg-white shadow-sm">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center h-16">
              <button
                onClick={() => setShowCreateProject(false)}
                className="flex items-center text-gray-600 hover:text-orange-600 transition-colors mr-4"
              >
                <ArrowLeft className="w-5 h-5 mr-2" />
                Back to Projects
              </button>
              <div className="flex items-center">
                <Plus className="w-8 h-8 text-orange-600 mr-3" />
                <h1 className="text-2xl font-bold text-gray-900">Create New Project</h1>
              </div>
            </div>
          </div>
        </header>

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="bg-white rounded-xl shadow-lg p-8">
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Project Name</label>
                <input
                  type="text"
                  value={newProject.name}
                  onChange={(e) => setNewProject(prev => ({ ...prev, name: e.target.value }))}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  placeholder="Enter your project name"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Project Idea</label>
                <textarea
                  value={newProject.idea}
                  onChange={(e) => setNewProject(prev => ({ ...prev, idea: e.target.value }))}
                  rows={4}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent resize-none"
                  placeholder="Describe your project idea in detail"
                />
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Deadline</label>
                  <input
                    type="date"
                    value={newProject.deadline}
                    onChange={(e) => setNewProject(prev => ({ ...prev, deadline: e.target.value }))}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                    min={new Date().toISOString().split('T')[0]}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Priority</label>
                  <select
                    value={newProject.priority}
                    onChange={(e) => setNewProject(prev => ({ ...prev, priority: e.target.value as any }))}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  >
                    <option value="low">Low Priority</option>
                    <option value="medium">Medium Priority</option>
                    <option value="high">High Priority</option>
                  </select>
                </div>
              </div>

              <div className="flex justify-end space-x-4 pt-6">
                <button
                  onClick={() => setShowCreateProject(false)}
                  className="px-6 py-3 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleCreateProject}
                  className="px-6 py-3 bg-gradient-to-r from-orange-600 to-red-600 text-white rounded-lg hover:from-orange-700 hover:to-red-700 transition-all transform hover:scale-105"
                >
                  Create Project
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-red-50">
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <button
                onClick={onBack}
                className="flex items-center text-gray-600 hover:text-orange-600 transition-colors mr-4"
              >
                <ArrowLeft className="w-5 h-5 mr-2" />
                Back to Dashboard
              </button>
              <div className="flex items-center">
                <Clock className="w-8 h-8 text-orange-600 mr-3" />
                <h1 className="text-2xl font-bold text-gray-900">Smart Deadline Management</h1>
              </div>
            </div>
            <button
              onClick={() => setShowCreateProject(true)}
              className="flex items-center space-x-2 bg-gradient-to-r from-orange-600 to-red-600 text-white px-4 py-2 rounded-lg hover:from-orange-700 hover:to-red-700 transition-all transform hover:scale-105"
            >
              <Plus className="w-5 h-5" />
              <span>New Project</span>
            </button>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {projects.length === 0 ? (
          <div className="bg-white rounded-xl shadow-lg p-12 text-center">
            <Clock className="w-20 h-20 text-orange-600 mx-auto mb-6" />
            <h2 className="text-2xl font-bold text-gray-900 mb-4">No Projects Yet</h2>
            <p className="text-gray-600 mb-8">Create your first project to start managing deadlines with AI assistance</p>
            <button
              onClick={() => setShowCreateProject(true)}
              className="bg-gradient-to-r from-orange-600 to-red-600 text-white px-6 py-3 rounded-lg hover:from-orange-700 hover:to-red-700 transition-all transform hover:scale-105"
            >
              Create Your First Project
            </button>
          </div>
        ) : (
          <div className="space-y-6">
            {/* Agent Insights */}
            <div className="bg-orange-50 border border-orange-200 rounded-xl p-6">
              <h3 className="text-xl font-bold text-orange-800 mb-4">Tempo's Timeline Insights</h3>
              <div className="flex items-start space-x-4">
                <span className="text-4xl">⏰</span>
                <div>
                  <p className="text-orange-800 mb-2">
                    You have {projects.length} active project{projects.length !== 1 ? 's' : ''} 
                    with an average completion rate of{' '}
                    {Math.round(projects.reduce((sum, p) => sum + p.progress, 0) / projects.length)}%.
                  </p>
                  <p className="text-orange-600 text-sm">
                    {projects.some(p => getDaysUntilDeadline(p.deadline) <= 3) 
                      ? '⚠️ Some deadlines are approaching! Focus on high-priority tasks.'
                      : '✅ Your timeline looks manageable. Keep up the great work!'}
                  </p>
                </div>
              </div>
            </div>

            {/* Projects Grid */}
            <div className="grid lg:grid-cols-2 gap-6">
              {projects.map((project) => {
                const daysLeft = getDaysUntilDeadline(project.deadline);
                const isUrgent = daysLeft <= 3;
                const completedTasks = project.tasks.filter(task => task.completed).length;

                return (
                  <div key={project.id} className="bg-white rounded-xl shadow-lg overflow-hidden">
                    <div className="p-6">
                      <div className="flex items-start justify-between mb-4">
                        <div>
                          <h3 className="text-xl font-bold text-gray-900 mb-1">{project.name}</h3>
                          <p className="text-gray-600 text-sm">{project.idea.substring(0, 120)}...</p>
                        </div>
                        <div className="flex items-center space-x-2">
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(project.priority)}`}>
                            {project.priority.toUpperCase()}
                          </span>
                          {isUrgent && <AlertCircle className="w-5 h-5 text-red-500" />}
                        </div>
                      </div>

                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center space-x-2">
                          <Calendar className="w-4 h-4 text-gray-500" />
                          <span className="text-sm text-gray-600">
                            {daysLeft > 0 ? `${daysLeft} days left` : 'Deadline passed'}
                          </span>
                        </div>
                        <div className="text-right">
                          <div className="text-sm text-gray-600">
                            {completedTasks}/{project.tasks.length} tasks completed
                          </div>
                        </div>
                      </div>

                      <div className="mb-4">
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-sm font-medium text-gray-700">Progress</span>
                          <span className="text-sm font-medium text-gray-900">{project.progress}%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div 
                            className={`h-2 rounded-full transition-all ${getProgressColor(project.progress)}`}
                            style={{ width: `${project.progress}%` }}
                          ></div>
                        </div>
                      </div>

                      <div className="space-y-2 max-h-64 overflow-y-auto">
                        {project.tasks.map((task) => (
                          <div key={task.id} className="flex items-start space-x-3 p-3 bg-gray-50 rounded-lg">
                            <button
                              onClick={() => toggleTask(project.id, task.id)}
                              className={`mt-0.5 w-5 h-5 rounded border-2 flex items-center justify-center transition-colors ${
                                task.completed
                                  ? 'bg-green-500 border-green-500 text-white'
                                  : 'border-gray-300 hover:border-green-400'
                              }`}
                            >
                              {task.completed && <CheckCircle className="w-3 h-3" />}
                            </button>
                            <div className="flex-1 min-w-0">
                              <p className={`text-sm ${task.completed ? 'line-through text-gray-500' : 'text-gray-800'}`}>
                                {task.title}
                              </p>
                              <div className="flex items-center space-x-2 mt-1">
                                <span className={`px-2 py-0.5 rounded text-xs font-medium ${getPriorityColor(task.priority)}`}>
                                  {task.priority}
                                </span>
                                {task.dueDate && (
                                  <span className="text-xs text-gray-500">
                                    Due: {new Date(task.dueDate).toLocaleDateString()}
                                  </span>
                                )}
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Smart Recommendations */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                <Target className="w-5 h-5 mr-2 text-orange-600" />
                Tempo's Smart Recommendations
              </h3>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h4 className="font-semibold text-gray-800">Focus This Week</h4>
                  {projects
                    .filter(p => getDaysUntilDeadline(p.deadline) <= 7)
                    .slice(0, 3)
                    .map(project => (
                      <div key={project.id} className="flex items-center space-x-3 p-3 bg-orange-50 rounded-lg">
                        <AlertCircle className="w-5 h-5 text-orange-600" />
                        <div>
                          <p className="font-medium text-orange-800">{project.name}</p>
                          <p className="text-sm text-orange-600">
                            {getDaysUntilDeadline(project.deadline)} days remaining
                          </p>
                        </div>
                      </div>
                    ))}
                </div>
                <div className="space-y-4">
                  <h4 className="font-semibold text-gray-800">High-Impact Tasks</h4>
                  {projects
                    .flatMap(p => p.tasks.filter(t => !t.completed && t.priority === 'high'))
                    .slice(0, 3)
                    .map((task, index) => (
                      <div key={index} className="flex items-center space-x-3 p-3 bg-red-50 rounded-lg">
                        <Target className="w-5 h-5 text-red-600" />
                        <div>
                          <p className="font-medium text-red-800">{task.title}</p>
                          <p className="text-sm text-red-600">High priority task</p>
                        </div>
                      </div>
                    ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default DeadlineManagement;
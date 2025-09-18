import React, { useState } from 'react';
import { ArrowLeft, CheckSquare, Plus, Calendar, Flag, Users, Clock } from 'lucide-react';
import { User, Project, Task } from '../types';

interface TaskManagementProps {
  user: User;
  projects: Project[];
  onUpdateProjects: (projects: Project[]) => void;
  onBack: () => void;
}

const TaskManagement: React.FC<TaskManagementProps> = ({ 
  user, 
  projects, 
  onUpdateProjects, 
  onBack 
}) => {
  const [selectedProject, setSelectedProject] = useState<string>('');
  const [showAddTask, setShowAddTask] = useState(false);
  const [newTask, setNewTask] = useState({
    title: '',
    priority: 'medium' as 'low' | 'medium' | 'high',
    dueDate: ''
  });

  const handleAddTask = () => {
    if (!newTask.title || !selectedProject) return;

    const task: Task = {
      id: `task-${Date.now()}`,
      title: newTask.title,
      completed: false,
      priority: newTask.priority,
      dueDate: newTask.dueDate || undefined
    };

    const updatedProjects = projects.map(project => {
      if (project.id === selectedProject) {
        const updatedTasks = [...project.tasks, task];
        const completedTasks = updatedTasks.filter(t => t.completed).length;
        const progress = Math.round((completedTasks / updatedTasks.length) * 100);
        
        return { ...project, tasks: updatedTasks, progress };
      }
      return project;
    });

    onUpdateProjects(updatedProjects);
    setNewTask({ title: '', priority: 'medium', dueDate: '' });
    setShowAddTask(false);
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

  const deleteTask = (projectId: string, taskId: string) => {
    const updatedProjects = projects.map(project => {
      if (project.id === projectId) {
        const updatedTasks = project.tasks.filter(task => task.id !== taskId);
        const completedTasks = updatedTasks.filter(task => task.completed).length;
        const progress = updatedTasks.length > 0 ? Math.round((completedTasks / updatedTasks.length) * 100) : 0;
        
        return { ...project, tasks: updatedTasks, progress };
      }
      return project;
    });
    
    onUpdateProjects(updatedProjects);
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'text-red-600 bg-red-100 border-red-200';
      case 'medium': return 'text-yellow-600 bg-yellow-100 border-yellow-200';
      case 'low': return 'text-green-600 bg-green-100 border-green-200';
      default: return 'text-gray-600 bg-gray-100 border-gray-200';
    }
  };

  const getPriorityIcon = (priority: string) => {
    switch (priority) {
      case 'high': return '🔥';
      case 'medium': return '⚡';
      case 'low': return '📝';
      default: return '📋';
    }
  };

  const getTasksStats = () => {
    const allTasks = projects.flatMap(p => p.tasks);
    const completed = allTasks.filter(t => t.completed).length;
    const overdue = allTasks.filter(t => 
      !t.completed && t.dueDate && new Date(t.dueDate) < new Date()
    ).length;
    const high = allTasks.filter(t => !t.completed && t.priority === 'high').length;
    
    return { total: allTasks.length, completed, overdue, high };
  };

  const stats = getTasksStats();

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-teal-50">
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <button
                onClick={onBack}
                className="flex items-center text-gray-600 hover:text-emerald-600 transition-colors mr-4"
              >
                <ArrowLeft className="w-5 h-5 mr-2" />
                Back to Dashboard
              </button>
              <div className="flex items-center">
                <CheckSquare className="w-8 h-8 text-emerald-600 mr-3" />
                <h1 className="text-2xl font-bold text-gray-900">Task Management</h1>
              </div>
            </div>
            <button
              onClick={() => setShowAddTask(true)}
              disabled={projects.length === 0}
              className="flex items-center space-x-2 bg-gradient-to-r from-emerald-600 to-teal-600 text-white px-4 py-2 rounded-lg hover:from-emerald-700 hover:to-teal-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all transform hover:scale-105"
            >
              <Plus className="w-5 h-5" />
              <span>Add Task</span>
            </button>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {projects.length === 0 ? (
          <div className="bg-white rounded-xl shadow-lg p-12 text-center">
            <CheckSquare className="w-20 h-20 text-emerald-600 mx-auto mb-6" />
            <h2 className="text-2xl font-bold text-gray-900 mb-4">No Projects Available</h2>
            <p className="text-gray-600 mb-8">Create a project first to start managing tasks</p>
            <button
              onClick={() => onBack()}
              className="bg-gradient-to-r from-emerald-600 to-teal-600 text-white px-6 py-3 rounded-lg hover:from-emerald-700 hover:to-teal-700 transition-all transform hover:scale-105"
            >
              Back to Dashboard
            </button>
          </div>
        ) : (
          <div className="space-y-8">
            {/* Stats Overview */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="bg-white rounded-xl p-6 shadow-sm">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Total Tasks</p>
                    <p className="text-2xl font-bold text-gray-900">{stats.total}</p>
                  </div>
                  <CheckSquare className="w-8 h-8 text-blue-600" />
                </div>
              </div>
              <div className="bg-white rounded-xl p-6 shadow-sm">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Completed</p>
                    <p className="text-2xl font-bold text-gray-900">{stats.completed}</p>
                  </div>
                  <div className="w-8 h-8 text-2xl">✅</div>
                </div>
              </div>
              <div className="bg-white rounded-xl p-6 shadow-sm">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">High Priority</p>
                    <p className="text-2xl font-bold text-gray-900">{stats.high}</p>
                  </div>
                  <div className="w-8 h-8 text-2xl">🔥</div>
                </div>
              </div>
              <div className="bg-white rounded-xl p-6 shadow-sm">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Overdue</p>
                    <p className="text-2xl font-bold text-gray-900">{stats.overdue}</p>
                  </div>
                  <Clock className="w-8 h-8 text-red-600" />
                </div>
              </div>
            </div>

            {/* AI Agent Insights */}
            <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-6">
              <h3 className="text-xl font-bold text-emerald-800 mb-4">Task Intelligence</h3>
              <div className="flex items-start space-x-4">
                <span className="text-4xl">✅</span>
                <div>
                  <p className="text-emerald-800 mb-2">
                    You're making great progress! {stats.completed > 0 && `${Math.round((stats.completed / stats.total) * 100)}% of tasks completed.`}
                    {stats.overdue > 0 && ` Focus on ${stats.overdue} overdue task${stats.overdue > 1 ? 's' : ''} first.`}
                  </p>
                  <p className="text-emerald-600 text-sm">
                    💡 Pro tip: Break large tasks into smaller, actionable items for better momentum and clearer progress tracking.
                  </p>
                </div>
              </div>
            </div>

            {/* Projects and Tasks */}
            <div className="space-y-6">
              {projects.map(project => {
                const completedTasks = project.tasks.filter(t => t.completed).length;
                const highPriorityTasks = project.tasks.filter(t => !t.completed && t.priority === 'high').length;
                const overdueTasks = project.tasks.filter(t => 
                  !t.completed && t.dueDate && new Date(t.dueDate) < new Date()
                ).length;

                return (
                  <div key={project.id} className="bg-white rounded-xl shadow-lg overflow-hidden">
                    <div className="bg-gradient-to-r from-emerald-500 to-teal-500 text-white p-6">
                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="text-2xl font-bold">{project.name}</h3>
                          <p className="text-emerald-100 mt-1">{project.idea.substring(0, 120)}...</p>
                        </div>
                        <div className="text-right">
                          <div className="text-3xl font-bold">{project.progress}%</div>
                          <div className="text-emerald-100 text-sm">Complete</div>
                        </div>
                      </div>
                      
                      <div className="mt-4">
                        <div className="w-full bg-emerald-400 rounded-full h-2">
                          <div 
                            className="bg-white h-2 rounded-full transition-all" 
                            style={{ width: `${project.progress}%` }}
                          ></div>
                        </div>
                      </div>

                      <div className="flex items-center space-x-6 mt-4 text-sm">
                        <div className="flex items-center space-x-1">
                          <CheckSquare className="w-4 h-4" />
                          <span>{completedTasks}/{project.tasks.length} tasks</span>
                        </div>
                        {highPriorityTasks > 0 && (
                          <div className="flex items-center space-x-1">
                            <Flag className="w-4 h-4" />
                            <span>{highPriorityTasks} high priority</span>
                          </div>
                        )}
                        {overdueTasks > 0 && (
                          <div className="flex items-center space-x-1">
                            <Clock className="w-4 h-4" />
                            <span>{overdueTasks} overdue</span>
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="p-6">
                      {project.tasks.length === 0 ? (
                        <div className="text-center py-8">
                          <CheckSquare className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                          <p className="text-gray-500">No tasks yet for this project</p>
                        </div>
                      ) : (
                        <div className="space-y-3">
                          {project.tasks.map(task => {
                            const isOverdue = task.dueDate && new Date(task.dueDate) < new Date() && !task.completed;
                            
                            return (
                              <div 
                                key={task.id} 
                                className={`flex items-center space-x-4 p-4 border rounded-lg transition-all ${
                                  task.completed 
                                    ? 'bg-gray-50 border-gray-200' 
                                    : isOverdue 
                                      ? 'bg-red-50 border-red-200' 
                                      : 'bg-white border-gray-200 hover:border-emerald-300'
                                }`}
                              >
                                <button
                                  onClick={() => toggleTask(project.id, task.id)}
                                  className={`w-6 h-6 rounded border-2 flex items-center justify-center transition-colors ${
                                    task.completed
                                      ? 'bg-emerald-500 border-emerald-500 text-white'
                                      : 'border-gray-300 hover:border-emerald-400'
                                  }`}
                                >
                                  {task.completed && <CheckSquare className="w-4 h-4" />}
                                </button>

                                <div className="flex-1 min-w-0">
                                  <div className="flex items-center space-x-3 mb-1">
                                    <p className={`font-medium ${
                                      task.completed ? 'line-through text-gray-500' : 'text-gray-800'
                                    }`}>
                                      {task.title}
                                    </p>
                                    <span className="text-lg">{getPriorityIcon(task.priority)}</span>
                                  </div>
                                  
                                  <div className="flex items-center space-x-3 text-sm">
                                    <span className={`px-2 py-1 rounded border text-xs font-medium ${getPriorityColor(task.priority)}`}>
                                      {task.priority.toUpperCase()}
                                    </span>
                                    {task.dueDate && (
                                      <div className="flex items-center space-x-1">
                                        <Calendar className="w-3 h-3 text-gray-500" />
                                        <span className={`text-xs ${
                                          isOverdue ? 'text-red-600 font-medium' : 'text-gray-500'
                                        }`}>
                                          {isOverdue ? 'OVERDUE - ' : ''}
                                          {new Date(task.dueDate).toLocaleDateString()}
                                        </span>
                                      </div>
                                    )}
                                  </div>
                                </div>

                                <button
                                  onClick={() => deleteTask(project.id, task.id)}
                                  className="text-red-500 hover:text-red-700 p-1 rounded transition-colors"
                                >
                                  ✕
                                </button>
                              </div>
                            );
                          })}
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Add Task Modal */}
        {showAddTask && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-xl shadow-2xl p-8 w-full max-w-md">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Add New Task</h3>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Project</label>
                  <select
                    value={selectedProject}
                    onChange={(e) => setSelectedProject(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                  >
                    <option value="">Select a project</option>
                    {projects.map(project => (
                      <option key={project.id} value={project.id}>{project.name}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Task Title</label>
                  <input
                    type="text"
                    value={newTask.title}
                    onChange={(e) => setNewTask(prev => ({ ...prev, title: e.target.value }))}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                    placeholder="Enter task description"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Priority</label>
                    <select
                      value={newTask.priority}
                      onChange={(e) => setNewTask(prev => ({ ...prev, priority: e.target.value as any }))}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                    >
                      <option value="low">Low</option>
                      <option value="medium">Medium</option>
                      <option value="high">High</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Due Date</label>
                    <input
                      type="date"
                      value={newTask.dueDate}
                      onChange={(e) => setNewTask(prev => ({ ...prev, dueDate: e.target.value }))}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                      min={new Date().toISOString().split('T')[0]}
                    />
                  </div>
                </div>
              </div>

              <div className="flex justify-end space-x-4 mt-8">
                <button
                  onClick={() => setShowAddTask(false)}
                  className="px-6 py-3 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleAddTask}
                  className="px-6 py-3 bg-gradient-to-r from-emerald-600 to-teal-600 text-white rounded-lg hover:from-emerald-700 hover:to-teal-700 transition-all transform hover:scale-105"
                >
                  Add Task
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default TaskManagement;
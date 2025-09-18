export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  bio?: string;
  location?: string;
  website?: string;
  github?: string;
  linkedin?: string;
  joinedDate: string;
  lastActive: string;
}

export interface Task {
  id: string;
  title: string;
  completed: boolean;
  priority: 'low' | 'medium' | 'high';
  dueDate?: string;
}

export interface Project {
  id: string;
  name: string;
  idea: string;
  deadline: string;
  priority: 'low' | 'medium' | 'high';
  tasks: Task[];
  progress: number;
  userId: string;
  createdAt: string;
}

export interface Agent {
  name: string;
  type: 'Innovation' | 'Tech' | 'Deadline' | 'Pitch' | 'Mentor';
  avatar: string;
  color: string;
}

export interface AgentMessage {
  id: string;
  agent: Agent;
  message: string;
  timestamp: string;
  type: 'suggestion' | 'redirect' | 'notification';
}

export interface UserStats {
  totalProjects: number;
  completedProjects: number;
  totalTasks: number;
  completedTasks: number;
  averageProgress: number;
  hackathonsParticipated: number;
  pitchesOptimized: number;
  questionsAsked: number;
}

export interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  unlockedAt: string;
  category: 'projects' | 'tasks' | 'collaboration' | 'innovation' | 'milestone';
}
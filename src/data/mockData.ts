
import { Task, User, Notification, TaskStatus, TaskPriority } from '@/types';

// Mock users
export const users: User[] = [
  {
    id: '1',
    name: 'John Doe',
    email: 'john@example.com',
    avatar: ''
  },
  {
    id: '2',
    name: 'Jane Smith',
    email: 'jane@example.com',
    avatar: ''
  },
  {
    id: '3',
    name: 'Bob Johnson',
    email: 'bob@example.com',
    avatar: ''
  },
  {
    id: '4',
    name: 'Sarah Williams',
    email: 'sarah@example.com',
    avatar: ''
  }
];

// Helper function to get random date within last 30 days
const getRandomDate = (daysOffset = 30) => {
  const date = new Date();
  const randomDays = Math.floor(Math.random() * daysOffset);
  date.setDate(date.getDate() - randomDays);
  return date.toISOString();
};

// Helper function to get random date in the future (for due dates)
const getFutureDueDate = () => {
  const date = new Date();
  const randomDays = Math.floor(Math.random() * 14) + 1; // 1-14 days in future
  date.setDate(date.getDate() + randomDays);
  return date.toISOString();
};

// Mock tasks
export const tasks: Task[] = [
  {
    id: '1',
    title: 'Design new dashboard layout',
    description: 'Create wireframes for the new analytics dashboard. Focus on user flow and key metrics.',
    dueDate: getFutureDueDate(),
    priority: 'high' as TaskPriority,
    status: 'todo' as TaskStatus,
    assignedTo: users[1],
    createdBy: users[0],
    createdAt: getRandomDate(),
    updatedAt: getRandomDate(7)
  },
  {
    id: '2',
    title: 'Fix login page validation',
    description: 'Users are reporting issues with email validation on the login page.',
    dueDate: getFutureDueDate(),
    priority: 'medium' as TaskPriority,
    status: 'in-progress' as TaskStatus,
    assignedTo: users[0],
    createdBy: users[0],
    createdAt: getRandomDate(),
    updatedAt: getRandomDate(7)
  },
  {
    id: '3',
    title: 'Implement dark mode support',
    description: 'Add dark mode support to all pages. Remember to update all SVG icons.',
    dueDate: getFutureDueDate(),
    priority: 'low' as TaskPriority,
    status: 'in-review' as TaskStatus,
    assignedTo: users[2],
    createdBy: users[1],
    createdAt: getRandomDate(),
    updatedAt: getRandomDate(7)
  },
  {
    id: '4',
    title: 'API documentation updates',
    description: 'Update API docs with new endpoints and authentication requirements.',
    dueDate: getFutureDueDate(),
    priority: 'medium' as TaskPriority,
    status: 'todo' as TaskStatus,
    assignedTo: users[3],
    createdBy: users[0],
    createdAt: getRandomDate(),
    updatedAt: getRandomDate(7)
  },
  {
    id: '5',
    title: 'Fix mobile navigation',
    description: 'Mobile menu doesn\'t close when clicking outside of it. Fix event listeners.',
    dueDate: getFutureDueDate(),
    priority: 'high' as TaskPriority,
    status: 'completed' as TaskStatus,
    assignedTo: users[0],
    createdBy: users[1],
    createdAt: getRandomDate(),
    updatedAt: getRandomDate(7)
  },
  {
    id: '6',
    title: 'Update user permissions',
    description: 'Review and update user permission models for team collaboration features.',
    dueDate: getFutureDueDate(),
    priority: 'high' as TaskPriority,
    status: 'in-progress' as TaskStatus,
    assignedTo: users[0],
    createdBy: users[2],
    createdAt: getRandomDate(),
    updatedAt: getRandomDate(7)
  },
  {
    id: '7', 
    title: 'Performance optimization for dashboard',
    description: 'Investigate performance bottlenecks in the dashboard and optimize queries.',
    dueDate: getFutureDueDate(),
    priority: 'medium' as TaskPriority,
    status: 'todo' as TaskStatus,
    assignedTo: users[1],
    createdBy: users[0],
    createdAt: getRandomDate(),
    updatedAt: getRandomDate(7)
  },
  {
    id: '8',
    title: 'Prepare client presentation',
    description: 'Create slides for the upcoming client presentation about the new features.',
    dueDate: getFutureDueDate(),
    priority: 'high' as TaskPriority,
    status: 'todo' as TaskStatus,
    assignedTo: users[0],
    createdBy: users[3],
    createdAt: getRandomDate(),
    updatedAt: getRandomDate(7)
  }
];

// Mock notifications
export const notifications: Notification[] = [
  {
    id: '1',
    type: 'task-assigned',
    taskId: '2',
    message: 'Jane Smith assigned you a task: Fix login page validation',
    read: false,
    createdAt: getRandomDate(2)
  },
  {
    id: '2',
    type: 'task-updated',
    taskId: '6',
    message: 'Bob Johnson updated: Update user permissions',
    read: true,
    createdAt: getRandomDate(5)
  },
  {
    id: '3',
    type: 'task-completed',
    taskId: '5',
    message: 'Task "Fix mobile navigation" was marked as completed',
    read: false,
    createdAt: getRandomDate(1)
  },
  {
    id: '4',
    type: 'task-comment',
    taskId: '3',
    message: 'Sarah Williams commented on: Implement dark mode support',
    read: false,
    createdAt: getRandomDate(3)
  },
];

// Current user for demo purposes
export const currentUser = users[0];

// Function to simulate API calls with random delay
export function delay<T>(data: T): Promise<T> {
  const ms = Math.random() * 800 + 200; // 200-1000ms delay
  return new Promise(resolve => {
    setTimeout(() => resolve(data), ms);
  });
}

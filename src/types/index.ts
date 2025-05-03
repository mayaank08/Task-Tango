
export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
}

export type TaskPriority = 'low' | 'medium' | 'high';

export type TaskStatus = 'todo' | 'in-progress' | 'in-review' | 'completed';

export interface Task {
  id: string;
  title: string;
  description: string;
  dueDate: string;
  priority: TaskPriority;
  status: TaskStatus;
  assignedTo: User | null;
  createdBy: User;
  createdAt: string;
  updatedAt: string;
}

export interface Notification {
  id: string;
  type: 'task-assigned' | 'task-updated' | 'task-completed' | 'task-comment';
  taskId: string;
  message: string;
  read: boolean;
  createdAt: string;
}

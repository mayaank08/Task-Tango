
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { NotificationDropdown } from '@/components/notifications/NotificationDropdown';
import { Plus, Search } from 'lucide-react';
import { Notification, Task, TaskPriority, TaskStatus } from '@/types';
import { TaskModal } from '@/components/tasks/TaskModal';
import { notifications as initialNotifications, currentUser } from '@/data/mockData';

export function Header() {
  const [notifications, setNotifications] = useState<Notification[]>(initialNotifications);
  const [isTaskModalOpen, setIsTaskModalOpen] = useState(false);
  
  const handleMarkAsRead = (id: string) => {
    setNotifications(prev => 
      prev.map(notif => 
        notif.id === id ? { ...notif, read: true } : notif
      )
    );
  };

  const handleMarkAllAsRead = () => {
    setNotifications(prev => 
      prev.map(notif => ({ ...notif, read: true }))
    );
  };

  const emptyTask: Task = {
    id: `new-${Date.now()}`,
    title: '',
    description: '',
    status: 'todo' as TaskStatus,
    priority: 'medium' as TaskPriority,
    dueDate: new Date().toISOString(),
    assignedTo: null,
    createdBy: currentUser,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };

  return (
    <header className="sticky top-0 z-10 bg-white border-b px-4 py-2.5 flex items-center justify-between">
      <div className="flex-1">
        <h1 className="text-xl font-bold bg-gradient-to-r from-task-purple-400 to-task-purple-600 bg-clip-text text-transparent">
          <Link to="/">TaskTango</Link>
        </h1>
      </div>
      
      <div className="flex items-center space-x-2">
        <Link to="/search">
          <Button variant="ghost" size="icon">
            <Search className="h-5 w-5" />
          </Button>
        </Link>
        
        <NotificationDropdown 
          notifications={notifications}
          onMarkAsRead={handleMarkAsRead}
          onMarkAllAsRead={handleMarkAllAsRead}
        />
        
        <Button onClick={() => setIsTaskModalOpen(true)}>
          <Plus className="h-5 w-5 mr-1" /> New Task
        </Button>
      </div>
      
      {isTaskModalOpen && (
        <TaskModal
          task={emptyTask}
          isOpen={isTaskModalOpen}
          onClose={() => setIsTaskModalOpen(false)}
        />
      )}
    </header>
  );
}

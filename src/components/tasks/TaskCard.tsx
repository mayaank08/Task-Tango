
import { Task } from '@/types';
import { formatDistanceToNow } from 'date-fns';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { Calendar, Clock, User } from 'lucide-react';

interface TaskCardProps {
  task: Task;
  onClick?: () => void;
}

export function TaskCard({ task, onClick }: TaskCardProps) {
  const statusColors = {
    'todo': 'bg-gray-100 text-gray-800',
    'in-progress': 'bg-blue-100 text-blue-800',
    'in-review': 'bg-purple-100 text-purple-800',
    'completed': 'bg-green-100 text-green-800',
  };

  const priorityClasses = {
    'low': 'task-priority-low',
    'medium': 'task-priority-medium',
    'high': 'task-priority-high',
  };

  // Format dates
  const formattedDueDate = new Date(task.dueDate).toLocaleDateString();
  const timeAgo = formatDistanceToNow(new Date(task.updatedAt), { addSuffix: true });

  return (
    <Card 
      className="hover-elevate cursor-pointer overflow-hidden border rounded-lg bg-white animate-in"
      onClick={onClick}
    >
      <div className="p-4">
        <div className="flex justify-between items-start mb-2">
          <h3 className="font-medium text-gray-900 line-clamp-1">{task.title}</h3>
          <Badge className={cn(statusColors[task.status])}>
            {task.status.replace('-', ' ')}
          </Badge>
        </div>
        
        <p className="text-gray-500 text-sm mb-4 line-clamp-2">{task.description}</p>
        
        <div className="grid grid-cols-2 gap-2 text-sm mb-3">
          <div className="flex items-center text-gray-600 gap-1">
            <Calendar size={14} />
            <span>{formattedDueDate}</span>
          </div>
          <div className="flex items-center text-gray-600 gap-1">
            <Clock size={14} />
            <span>Updated {timeAgo}</span>
          </div>
        </div>
        
        <div className="flex items-center justify-between">
          <Badge 
            variant="outline" 
            className={cn("border px-2 py-0.5", priorityClasses[task.priority])}
          >
            {task.priority}
          </Badge>
          
          {task.assignedTo && (
            <div className="flex items-center gap-1 text-sm text-gray-600">
              <User size={14} />
              <span>{task.assignedTo.name}</span>
            </div>
          )}
        </div>
      </div>
    </Card>
  );
}

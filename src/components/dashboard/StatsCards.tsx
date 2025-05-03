
import { Task } from '@/types';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ListTodo, Check, Clock, AlertCircle } from 'lucide-react';

interface StatsCardsProps {
  tasks: Task[];
}

export function StatsCards({ tasks }: StatsCardsProps) {
  // Calculate statistics
  const totalTasks = tasks.length;
  const completedTasks = tasks.filter(t => t.status === 'completed').length;
  const incompleteTasks = totalTasks - completedTasks;
  
  // Calculate overdue tasks (due date in the past and not completed)
  const now = new Date();
  const overdueTasks = tasks.filter(t => {
    const dueDate = new Date(t.dueDate);
    return dueDate < now && t.status !== 'completed';
  }).length;
  
  // Calculate completion rate
  const completionRate = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;

  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
      <Card className="hover-elevate">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total Tasks</CardTitle>
          <ListTodo className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{totalTasks}</div>
          <p className="text-xs text-muted-foreground">
            {incompleteTasks} remaining
          </p>
        </CardContent>
      </Card>
      
      <Card className="hover-elevate">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Completed</CardTitle>
          <Check className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{completedTasks}</div>
          <p className="text-xs text-muted-foreground">
            {completionRate}% completion rate
          </p>
        </CardContent>
      </Card>
      
      <Card className="hover-elevate">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Overdue</CardTitle>
          <Clock className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{overdueTasks}</div>
          <p className="text-xs text-muted-foreground">
            {overdueTasks > 0 ? 'Needs attention' : 'Up to date'}
          </p>
        </CardContent>
      </Card>
      
      <Card className="hover-elevate">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">High Priority</CardTitle>
          <AlertCircle className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">
            {tasks.filter(t => t.priority === 'high').length}
          </div>
          <p className="text-xs text-muted-foreground">
            {tasks.filter(t => t.priority === 'high' && t.status !== 'completed').length} remaining
          </p>
        </CardContent>
      </Card>
    </div>
  );
}

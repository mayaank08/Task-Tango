
import { useState, useEffect, useMemo } from 'react';
import { useToast } from '@/hooks/use-toast';
import { Task } from '@/types';
import { StatsCards } from '@/components/dashboard/StatsCards';
import { TasksOverviewChart } from '@/components/dashboard/TasksOverviewChart';
import { TaskList } from '@/components/tasks/TaskList';
import { Button } from '@/components/ui/button';
import { Plus, Clock } from 'lucide-react';
import { tasks as mockTasks, delay } from '@/data/mockData';

export default function Dashboard() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  // Fetch tasks on mount
  useEffect(() => {
    const fetchTasks = async () => {
      try {
        // Simulate API call with delay
        const data = await delay(mockTasks);
        setTasks(data);
      } catch (error) {
        toast({
          title: "Error",
          description: "Failed to fetch tasks. Please try again.",
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    };

    fetchTasks();
  }, [toast]);

  const handleTaskUpdate = (updatedTask: Task) => {
    setTasks(prev => prev.map(task => 
      task.id === updatedTask.id ? updatedTask : task
    ));
    
    toast({
      title: "Success",
      description: "Task updated successfully!",
    });
  };

  const handleTaskDelete = (taskId: string) => {
    setTasks(prev => prev.filter(task => task.id !== taskId));
    
    toast({
      title: "Success",
      description: "Task deleted successfully!",
    });
  };

  // Filter tasks for different sections
  const assignedToMe = useMemo(() => 
    tasks.filter(task => 
      task.assignedTo?.id === '1' && task.status !== 'completed'
    ), 
    [tasks]
  );

  const overdueTask = useMemo(() => {
    const now = new Date();
    return tasks.filter(task => {
      const dueDate = new Date(task.dueDate);
      return dueDate < now && task.status !== 'completed';
    });
  }, [tasks]);

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold">Dashboard</h1>
          <p className="text-muted-foreground">Welcome back! Here's an overview of your tasks.</p>
        </div>
        <Button>
          <Plus className="h-4 w-4 mr-2" /> Create New Task
        </Button>
      </div>

      {loading ? (
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
          {[...Array(4)].map((_, i) => (
            <div 
              key={i} 
              className="h-28 rounded-lg bg-gray-100 animate-pulse" 
            />
          ))}
        </div>
      ) : (
        <StatsCards tasks={tasks} />
      )}

      <div className="space-y-4">
        <h2 className="text-xl font-semibold">Task Analytics</h2>
        {loading ? (
          <div className="h-64 rounded-lg bg-gray-100 animate-pulse" />
        ) : (
          <TasksOverviewChart tasks={tasks} />
        )}
      </div>

      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <Clock className="h-5 w-5 text-amber-500" />
          <h2 className="text-xl font-semibold">Overdue Tasks</h2>
        </div>
        {loading ? (
          <div className="h-32 rounded-lg bg-gray-100 animate-pulse" />
        ) : (
          <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
            {overdueTask.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {overdueTask.map(task => (
                  <div 
                    key={task.id}
                    className="p-3 bg-white rounded border border-amber-200 flex justify-between items-center hover-elevate"
                  >
                    <div>
                      <h4 className="font-medium">{task.title}</h4>
                      <p className="text-sm text-muted-foreground">
                        Due: {new Date(task.dueDate).toLocaleDateString()}
                      </p>
                    </div>
                    <Button size="sm" variant="outline" onClick={() => console.log('Handle task')}>
                      View
                    </Button>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-center py-4 text-amber-800">
                No overdue tasks. Great job!
              </p>
            )}
          </div>
        )}
      </div>

      <div className="space-y-4">
        <h2 className="text-xl font-semibold">Your Tasks</h2>
        {loading ? (
          <div className="h-64 rounded-lg bg-gray-100 animate-pulse" />
        ) : (
          <TaskList 
            tasks={assignedToMe} 
            onTaskUpdate={handleTaskUpdate}
            onTaskDelete={handleTaskDelete}
          />
        )}
      </div>
    </div>
  );
}


import { useState, useEffect, useMemo } from 'react';
import { TaskFilters } from '@/components/tasks/TaskFilters';
import { TaskList } from '@/components/tasks/TaskList';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import { Task, TaskStatus, TaskPriority } from '@/types';
import { tasks as mockTasks, currentUser, delay } from '@/data/mockData';
import { useToast } from '@/hooks/use-toast';
import { TaskModal } from '@/components/tasks/TaskModal';

export default function MyTasks() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFilters] = useState({
    status: 'all' as TaskStatus | 'all',
    priority: 'all' as TaskPriority | 'all',
    dueDate: null as Date | null,
  });
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
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

  const filteredTasks = useMemo(() => {
    return tasks.filter(task => {
      // Search query filter
      const matchesSearch = 
        searchQuery === '' || 
        task.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        task.description.toLowerCase().includes(searchQuery.toLowerCase());

      // Status filter
      const matchesStatus = 
        filters.status === 'all' || task.status === filters.status;

      // Priority filter
      const matchesPriority = 
        filters.priority === 'all' || task.priority === filters.priority;

      // Due date filter
      const matchesDueDate = !filters.dueDate || 
        new Date(task.dueDate).toDateString() === filters.dueDate.toDateString();

      return matchesSearch && matchesStatus && matchesPriority && matchesDueDate;
    });
  }, [tasks, searchQuery, filters]);

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

  const handleCreateTask = (newTask: Task) => {
    // Generate a real ID for the task
    const taskWithId = {
      ...newTask,
      id: `task-${Date.now()}`,
      createdBy: currentUser,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    
    setTasks(prev => [taskWithId, ...prev]);
    setIsCreateModalOpen(false);
    
    toast({
      title: "Success",
      description: "Task created successfully!",
    });
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
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold">My Tasks</h1>
          <p className="text-muted-foreground">
            Manage and organize your tasks efficiently
          </p>
        </div>
        <Button onClick={() => setIsCreateModalOpen(true)}>
          <Plus className="h-4 w-4 mr-2" /> Create Task
        </Button>
      </div>

      <TaskFilters
        onSearchChange={setSearchQuery}
        onFilterChange={setFilters}
      />

      {loading ? (
        <div className="h-64 rounded-lg bg-gray-100 animate-pulse" />
      ) : filteredTasks.length > 0 ? (
        <TaskList 
          tasks={filteredTasks} 
          onTaskUpdate={handleTaskUpdate}
          onTaskDelete={handleTaskDelete}
        />
      ) : (
        <div className="text-center py-16 bg-gray-50 rounded-lg border-2 border-dashed border-gray-200">
          <h3 className="text-lg font-medium text-gray-900">No tasks found</h3>
          <p className="text-gray-500 mt-1">
            {searchQuery || filters.status !== 'all' || filters.priority !== 'all' || filters.dueDate 
              ? "Try adjusting your filters to find what you're looking for."
              : "Create your first task to get started."}
          </p>
          <Button 
            className="mt-4" 
            onClick={() => setIsCreateModalOpen(true)}
          >
            <Plus className="h-4 w-4 mr-2" /> Create New Task
          </Button>
        </div>
      )}

      {isCreateModalOpen && (
        <TaskModal
          task={emptyTask}
          isOpen={isCreateModalOpen}
          onClose={() => setIsCreateModalOpen(false)}
          onUpdate={handleCreateTask}
        />
      )}
    </div>
  );
}

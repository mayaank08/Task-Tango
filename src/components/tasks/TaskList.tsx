
import { useState } from 'react';
import { Task, TaskPriority, TaskStatus } from '@/types';
import { TaskCard } from './TaskCard';
import { TaskModal } from './TaskModal';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

interface TaskListProps {
  tasks: Task[];
  onTaskUpdate?: (task: Task) => void;
  onTaskDelete?: (taskId: string) => void;
}

export function TaskList({ tasks, onTaskUpdate, onTaskDelete }: TaskListProps) {
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openTaskModal = (task: Task) => {
    setSelectedTask(task);
    setIsModalOpen(true);
  };

  const closeTaskModal = () => {
    setIsModalOpen(false);
    setSelectedTask(null);
  };

  // Group tasks by status
  const todoTasks = tasks.filter(task => task.status === 'todo');
  const inProgressTasks = tasks.filter(task => task.status === 'in-progress');
  const inReviewTasks = tasks.filter(task => task.status === 'in-review');
  const completedTasks = tasks.filter(task => task.status === 'completed');

  const tasksByStatus = {
    'todo': todoTasks,
    'in-progress': inProgressTasks,
    'in-review': inReviewTasks,
    'completed': completedTasks
  };

  return (
    <div className="space-y-6">
      <Tabs defaultValue="todo" className="w-full">
        <TabsList className="grid grid-cols-4 mb-4">
          <TabsTrigger value="todo" className="data-[state=active]:bg-task-purple-200">
            To Do ({todoTasks.length})
          </TabsTrigger>
          <TabsTrigger value="in-progress" className="data-[state=active]:bg-task-purple-200">
            In Progress ({inProgressTasks.length})
          </TabsTrigger>
          <TabsTrigger value="in-review" className="data-[state=active]:bg-task-purple-200">
            In Review ({inReviewTasks.length})
          </TabsTrigger>
          <TabsTrigger value="completed" className="data-[state=active]:bg-task-purple-200">
            Completed ({completedTasks.length})
          </TabsTrigger>
        </TabsList>

        {(Object.entries(tasksByStatus) as [TaskStatus, Task[]][]).map(([status, taskList]) => (
          <TabsContent key={status} value={status} className="mt-0">
            {taskList.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {taskList.map(task => (
                  <TaskCard 
                    key={task.id} 
                    task={task} 
                    onClick={() => openTaskModal(task)} 
                  />
                ))}
              </div>
            ) : (
              <div className="text-center py-12 bg-gray-50 rounded-lg border-2 border-dashed border-gray-200">
                <p className="text-gray-500">No tasks in this category</p>
                <Button 
                  variant="outline" 
                  className="mt-2"
                  onClick={() => {
                    // Create a new blank task with this status
                    const newTask: Task = {
                      id: `temp-${Math.random().toString(36).substring(7)}`,
                      title: '',
                      description: '',
                      status: status as TaskStatus,
                      priority: 'medium' as TaskPriority,
                      dueDate: new Date().toISOString(),
                      assignedTo: null,
                      createdBy: {
                        id: '1',
                        name: 'John Doe',
                        email: 'john@example.com',
                      },
                      createdAt: new Date().toISOString(),
                      updatedAt: new Date().toISOString(),
                    };
                    setSelectedTask(newTask);
                    setIsModalOpen(true);
                  }}
                >
                  Create new task
                </Button>
              </div>
            )}
          </TabsContent>
        ))}
      </Tabs>

      {isModalOpen && selectedTask && (
        <TaskModal 
          task={selectedTask}
          isOpen={isModalOpen} 
          onClose={closeTaskModal}
          onUpdate={onTaskUpdate}
          onDelete={onTaskDelete}
        />
      )}
    </div>
  );
}

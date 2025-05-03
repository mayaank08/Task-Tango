
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Badge } from '@/components/ui/badge';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Calendar } from '@/components/ui/calendar';
import { format } from 'date-fns';
import { CalendarIcon, Filter, X, Search } from 'lucide-react';
import { cn } from '@/lib/utils';
import { TaskPriority, TaskStatus } from '@/types';

interface TaskFiltersProps {
  onSearchChange: (search: string) => void;
  onFilterChange: (filters: {
    status: TaskStatus | 'all';
    priority: TaskPriority | 'all';
    dueDate: Date | null;
  }) => void;
}

export function TaskFilters({ onSearchChange, onFilterChange }: TaskFiltersProps) {
  const [search, setSearch] = useState('');
  const [status, setStatus] = useState<TaskStatus | 'all'>('all');
  const [priority, setPriority] = useState<TaskPriority | 'all'>('all');
  const [dueDate, setDueDate] = useState<Date | null>(null);
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const handleSearchChange = (value: string) => {
    setSearch(value);
    onSearchChange(value);
  };

  const applyFilters = () => {
    onFilterChange({ status, priority, dueDate });
    setIsFilterOpen(false);
  };

  const clearFilters = () => {
    setStatus('all');
    setPriority('all');
    setDueDate(null);
    onFilterChange({ status: 'all', priority: 'all', dueDate: null });
    setIsFilterOpen(false);
  };

  const hasActiveFilters = status !== 'all' || priority !== 'all' || dueDate !== null;

  return (
    <div className="flex flex-col sm:flex-row gap-3 mb-6">
      <div className="relative flex-1">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
        <Input
          placeholder="Search tasks..."
          className="pl-9"
          value={search}
          onChange={(e) => handleSearchChange(e.target.value)}
        />
        {search && (
          <Button 
            variant="ghost" 
            size="icon" 
            className="absolute right-1 top-1/2 transform -translate-y-1/2 h-7 w-7" 
            onClick={() => handleSearchChange('')}
          >
            <X className="h-3 w-3" />
          </Button>
        )}
      </div>
      
      <Popover open={isFilterOpen} onOpenChange={setIsFilterOpen}>
        <PopoverTrigger asChild>
          <Button variant="outline" className="relative">
            <Filter className="h-4 w-4 mr-2" />
            Filter
            {hasActiveFilters && (
              <Badge className="absolute -top-2 -right-2 h-5 w-5 p-0 flex items-center justify-center bg-task-purple-400 text-white">
                !
              </Badge>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-80" align="end">
          <div className="space-y-4">
            <h4 className="font-medium">Filters</h4>
            
            <div className="space-y-2">
              <label className="text-sm font-medium">Status</label>
              <Select value={status} onValueChange={(value) => setStatus(value as TaskStatus | 'all')}>
                <SelectTrigger>
                  <SelectValue placeholder="Filter by status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Statuses</SelectItem>
                  <SelectItem value="todo">To Do</SelectItem>
                  <SelectItem value="in-progress">In Progress</SelectItem>
                  <SelectItem value="in-review">In Review</SelectItem>
                  <SelectItem value="completed">Completed</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-medium">Priority</label>
              <Select value={priority} onValueChange={(value) => setPriority(value as TaskPriority | 'all')}>
                <SelectTrigger>
                  <SelectValue placeholder="Filter by priority" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Priorities</SelectItem>
                  <SelectItem value="low">Low</SelectItem>
                  <SelectItem value="medium">Medium</SelectItem>
                  <SelectItem value="high">High</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-medium">Due Date</label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant={"outline"}
                    className={cn(
                      "w-full justify-start text-left font-normal",
                      !dueDate && "text-muted-foreground"
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {dueDate ? format(dueDate, "PPP") : <span>Pick a date</span>}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={dueDate || undefined}
                    onSelect={setDueDate}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>
            
            <div className="flex justify-between">
              <Button variant="outline" size="sm" onClick={clearFilters}>
                Clear filters
              </Button>
              <Button size="sm" onClick={applyFilters}>
                Apply filters
              </Button>
            </div>
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
}


import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Task } from '@/types';

interface TasksOverviewChartProps {
  tasks: Task[];
}

export function TasksOverviewChart({ tasks }: TasksOverviewChartProps) {
  // Count tasks by status
  const statusCounts = tasks.reduce((acc, task) => {
    const status = task.status;
    acc[status] = (acc[status] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  // Count tasks by priority
  const priorityCounts = tasks.reduce((acc, task) => {
    const priority = task.priority;
    acc[priority] = (acc[priority] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const statusData = [
    { name: 'To Do', value: statusCounts['todo'] || 0, color: '#94a3b8' },
    { name: 'In Progress', value: statusCounts['in-progress'] || 0, color: '#60a5fa' },
    { name: 'In Review', value: statusCounts['in-review'] || 0, color: '#9b87f5' },
    { name: 'Completed', value: statusCounts['completed'] || 0, color: '#4ade80' },
  ];

  const priorityData = [
    { name: 'Low', value: priorityCounts['low'] || 0, color: '#93c5fd' },
    { name: 'Medium', value: priorityCounts['medium'] || 0, color: '#fde047' },
    { name: 'High', value: priorityCounts['high'] || 0, color: '#fca5a5' },
  ];

  // Filter out zero values for better visuals
  const filteredStatusData = statusData.filter(item => item.value > 0);
  const filteredPriorityData = priorityData.filter(item => item.value > 0);

  const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent }: any) => {
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * Math.PI / 180);
    const y = cy + radius * Math.sin(-midAngle * Math.PI / 180);

    return (
      <text x={x} y={y} fill="white" textAnchor="middle" dominantBaseline="central">
        {`${(percent * 100).toFixed(0)}%`}
      </text>
    );
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <Card className="hover-elevate">
        <CardHeader>
          <CardTitle>Task Status</CardTitle>
        </CardHeader>
        <CardContent className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={filteredStatusData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={renderCustomizedLabel}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
              >
                {filteredStatusData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Legend verticalAlign="bottom" height={36} />
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
      
      <Card className="hover-elevate">
        <CardHeader>
          <CardTitle>Task Priority</CardTitle>
        </CardHeader>
        <CardContent className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={filteredPriorityData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={renderCustomizedLabel}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
              >
                {filteredPriorityData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Legend verticalAlign="bottom" height={36} />
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  );
}

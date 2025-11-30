import { Todo } from '@/types/todo';

interface TodoStatsProps {
  todos: Todo[];
}

export default function TodoStats({ todos }: TodoStatsProps) {
  const totalTasks = todos.length;
  const activeTasks = todos.filter(todo => !todo.completed).length;
  const completedTasks = todos.filter(todo => todo.completed).length;

  return (
    <div className="flex flex-wrap gap-3 justify-center mb-6">
      <div className="bg-gradient-to-br from-blue-500 to-blue-600 text-white px-4 py-2 rounded-lg shadow-md">
        <div className="text-xs opacity-90">Total</div>
        <div className="text-2xl font-bold">{totalTasks}</div>
      </div>
      <div className="bg-gradient-to-br from-amber-500 to-orange-600 text-white px-4 py-2 rounded-lg shadow-md">
        <div className="text-xs opacity-90">Active</div>
        <div className="text-2xl font-bold">{activeTasks}</div>
      </div>
      <div className="bg-gradient-to-br from-green-500 to-emerald-600 text-white px-4 py-2 rounded-lg shadow-md">
        <div className="text-xs opacity-90">Completed</div>
        <div className="text-2xl font-bold">{completedTasks}</div>
      </div>
    </div>
  );
}
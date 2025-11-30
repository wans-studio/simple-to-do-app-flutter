import { useState, useEffect } from 'react';
import { Todo, FilterType } from '@/types/todo';
import { loadTodos, saveTodos } from '@/lib/localStorage';
import AddTodo from '@/components/AddTodo';
import TodoList from '@/components/TodoList';
import TodoFilters from '@/components/TodoFilters';
import TodoStats from '@/components/TodoStats';
import { CheckCircle2 } from 'lucide-react';

export default function Index() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [filter, setFilter] = useState<FilterType>('all');

  useEffect(() => {
    const loadedTodos = loadTodos();
    setTodos(loadedTodos);
  }, []);

  useEffect(() => {
    saveTodos(todos);
  }, [todos]);

  const addTodo = (text: string) => {
    const newTodo: Todo = {
      id: Date.now().toString(),
      text,
      completed: false,
      createdAt: Date.now(),
    };
    setTodos([newTodo, ...todos]);
  };

  const toggleTodo = (id: string) => {
    setTodos(todos.map(todo =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ));
  };

  const deleteTodo = (id: string) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  const getFilteredTodos = () => {
    switch (filter) {
      case 'active':
        return todos.filter(todo => !todo.completed);
      case 'completed':
        return todos.filter(todo => todo.completed);
      default:
        return todos;
    }
  };

  const filteredTodos = getFilteredTodos();

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-pink-50 dark:from-gray-900 dark:via-purple-900 dark:to-blue-900 py-8 px-4">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-8 animate-in fade-in slide-in-from-top duration-700">
          <div className="flex items-center justify-center gap-3 mb-2">
            <CheckCircle2 className="h-10 w-10 text-purple-600 dark:text-purple-400" />
            <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
              Flutter To-Do
            </h1>
          </div>
          <p className="text-gray-600 dark:text-gray-400">Stay organized, get things done</p>
        </div>

        <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-lg rounded-2xl shadow-2xl p-6 md:p-8 animate-in fade-in slide-in-from-bottom duration-700">
          <TodoStats todos={todos} />
          
          <AddTodo onAdd={addTodo} />
          
          <TodoFilters currentFilter={filter} onFilterChange={setFilter} />
          
          <TodoList
            todos={filteredTodos}
            onToggle={toggleTodo}
            onDelete={deleteTodo}
          />
        </div>

        <div className="text-center mt-6 text-sm text-gray-500 dark:text-gray-400">
          
        </div>
      </div>
    </div>
  );
}
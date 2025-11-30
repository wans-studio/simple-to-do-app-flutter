import { FilterType } from '@/types/todo';
import { Button } from '@/components/ui/button';

interface TodoFiltersProps {
  currentFilter: FilterType;
  onFilterChange: (filter: FilterType) => void;
}

export default function TodoFilters({ currentFilter, onFilterChange }: TodoFiltersProps) {
  const filters: { label: string; value: FilterType }[] = [
    { label: 'All', value: 'all' },
    { label: 'Active', value: 'active' },
    { label: 'Completed', value: 'completed' },
  ];

  return (
    <div className="flex gap-2 justify-center mb-6 flex-wrap">
      {filters.map(filter => (
        <Button
          key={filter.value}
          onClick={() => onFilterChange(filter.value)}
          variant={currentFilter === filter.value ? 'default' : 'outline'}
          className={`min-w-[100px] transition-all ${
            currentFilter === filter.value
              ? 'bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700'
              : ''
          }`}
        >
          {filter.label}
        </Button>
      ))}
    </div>
  );
}
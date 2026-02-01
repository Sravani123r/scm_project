import { Button } from '@heroui/react';
import { useTheme } from '../context/ThemeContext';

const ThemeToggle = ({ compact = false }: { compact?: boolean }) => {
  const { theme, toggleTheme } = useTheme();

  return (
    <Button
      onPress={toggleTheme}
      variant="light"
      className={`
        w-full flex items-center justify-start gap-3
        px-2 py-2 rounded-lg
        text-gray-900 dark:text-white
        hover:bg-gray-100 dark:hover:bg-gray-700
      `}
    >
      <i className={`fa-solid ${theme === 'light' ? 'fa-moon' : 'fa-sun'} w-5`} />
      {!compact && <span className="text-sm font-medium">{theme === 'light' ? 'Dark Mode' : 'Light Mode'}</span>}
    </Button>
  );
};

export default ThemeToggle;

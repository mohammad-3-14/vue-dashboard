// composables/useTheme.ts
import { onMounted } from 'vue';

const THEME_KEY = 'theme';

export function useTheme() {
  const setTheme = (theme: 'light' | 'dark') => {
    const classList = document.documentElement.classList;
    if (theme === 'dark') {
      classList.add('dark');
    } else {
      classList.remove('dark');
    }
    localStorage.setItem(THEME_KEY, theme);
  };

  const toggleTheme = () => {
    const isDark = document.documentElement.classList.contains('dark');
    setTheme(isDark ? 'light' : 'dark');
  };

  const initializeTheme = () => {
    const saved = localStorage.getItem(THEME_KEY);
    if (saved === 'light' || saved === 'dark') {
      setTheme(saved);
    }
  };

  onMounted(initializeTheme);

  return {
    toggleTheme,
    setTheme,
  };
}

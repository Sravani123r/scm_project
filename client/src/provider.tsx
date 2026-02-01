import { HeroUIProvider } from '@heroui/system';
import { useEffect } from 'react';
import type { NavigateOptions } from 'react-router-dom';
import { useHref, useNavigate } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';

declare module '@react-types/shared' {
  interface RouterConfig {
    routerOptions: NavigateOptions;
  }
}

export function Provider({ children }: { children: React.ReactNode }) {
  const navigate = useNavigate();

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    const html = document.documentElement;

    html.classList.remove('light', 'dark');

    if (savedTheme) {
      html.classList.add(savedTheme);
    } else if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
      html.classList.add('dark');
    } else {
      html.classList.add('light');
    }
  }, []);

  return (
    <ThemeProvider>
      <HeroUIProvider navigate={navigate} useHref={useHref}>
        {children}
      </HeroUIProvider>
    </ThemeProvider>
  );
}

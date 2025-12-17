import { HeroUIProvider } from "@heroui/system";
import type { NavigateOptions } from "react-router-dom";
import { useHref, useNavigate } from "react-router-dom";
import { ThemeProvider } from "./context/ThemeContext";

declare module "@react-types/shared" {
  interface RouterConfig {
    routerOptions: NavigateOptions;
  }
}

export function Provider({ children }: { children: React.ReactNode }) {
  const navigate = useNavigate();

  // Apply theme class to html element on initial load
  if (typeof document !== 'undefined') {
    const savedTheme = localStorage.getItem('theme');
    const html = document.documentElement;

    // Remove any existing theme classes
    html.classList.remove('light', 'dark');

    // Apply saved theme or default to system preference
    if (savedTheme) {
      html.classList.add(savedTheme);
    } else if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      html.classList.add('dark');
    } else {
      html.classList.add('light');
    }
  }

  return (
    <ThemeProvider>
      <HeroUIProvider navigate={navigate} useHref={useHref}>
        {children}
      </HeroUIProvider>
    </ThemeProvider>
  );
}

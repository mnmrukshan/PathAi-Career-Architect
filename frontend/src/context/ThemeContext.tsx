"use client";

import React, { createContext, useContext, useState, useEffect } from 'react';

type Theme = 'dark-void' | 'high-contrast' | 'neon-pulse';

interface ThemeContextType {
  theme: Theme;
  setTheme: (theme: Theme) => void;
  instantAnalysis: boolean;
  setInstantAnalysis: (val: boolean) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setThemeState] = useState<Theme>('neon-pulse');
  const [instantAnalysis, setInstantAnalysis] = useState(true);

  useEffect(() => {
    const savedTheme = localStorage.getItem('pathai-theme') as Theme;
    const savedAnalysis = localStorage.getItem('pathai-instant-analysis');
    
    if (savedTheme) {
      setThemeState(savedTheme);
      document.body.className = '';
      document.body.classList.add(`theme-${savedTheme}`);
    }
    if (savedAnalysis !== null) setInstantAnalysis(savedAnalysis === 'true');
  }, []);

  const setTheme = (newTheme: Theme) => {
    setThemeState(newTheme);
    localStorage.setItem('pathai-theme', newTheme);
    
    // Apply theme class to body immediately
    document.body.className = '';
    document.body.classList.add(`theme-${newTheme}`);
  };

  const updateInstantAnalysis = (val: boolean) => {
    setInstantAnalysis(val);
    localStorage.setItem('pathai-instant-analysis', String(val));
  };

  return (
    <ThemeContext.Provider value={{ theme, setTheme, instantAnalysis, setInstantAnalysis: updateInstantAnalysis }}>
      <div className={`theme-${theme} min-h-screen transition-colors duration-500`}>
        {children}
      </div>
    </ThemeContext.Provider>
  );
}

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) throw new Error('useTheme must be used within ThemeProvider');
  return context;
};

'use client';

import React, { useEffect, useState } from 'react';
import { SunIcon, MoonIcon } from '@/components/ui/Icons';

/**
 * Accessible Theme Toggle supporting light and dark modes.
 * Avoids hydration flashes and respects system preference by default.
 */
export function ThemeToggle() {
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const savedTheme = localStorage.getItem('portfolio-theme') as 'light' | 'dark' | null;
    const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

    if (savedTheme) {
      setTheme(savedTheme);
      document.documentElement.classList.toggle('dark', savedTheme === 'dark');
    } else if (systemPrefersDark) {
      setTheme('dark');
      document.documentElement.classList.add('dark');
    }
  }, []);

  const toggleTheme = () => {
    const nextTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(nextTheme);
    localStorage.setItem('portfolio-theme', nextTheme);
    document.documentElement.classList.toggle('dark', nextTheme === 'dark');
  };

  if (!mounted) {
    return (
      <div
        className="w-9 h-9 rounded-full glass-surface flex items-center justify-center opacity-70"
        aria-hidden="true"
      />
    );
  }

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
      className="apple-press w-9 h-9 rounded-full glass-surface flex items-center justify-center text-slate-700 dark:text-slate-200 hover:text-sky-600 dark:hover:text-sky-400 transition-colors focus-visible:ring-2 focus-visible:ring-sky-500 shadow-glass-sm"
    >
      {theme === 'light' ? (
        <MoonIcon className="w-4 h-4" />
      ) : (
        <SunIcon className="w-4 h-4" />
      )}
    </button>
  );
}

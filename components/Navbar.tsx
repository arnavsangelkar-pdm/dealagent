'use client';

import { useState, useEffect } from 'react';
import { Cloud, Moon, Sun } from 'lucide-react';
import { Button } from '@/components/ui/button';

const BRAND_NAME = 'Deal Agent';

export default function Navbar({ account, connected }: { account?: string; connected: boolean }) {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const shouldBeDark = stored === 'dark' || (!stored && prefersDark);
    setIsDark(shouldBeDark);
    if (shouldBeDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, []);

  const toggleTheme = () => {
    const newIsDark = !isDark;
    setIsDark(newIsDark);
    document.documentElement.classList.toggle('dark', newIsDark);
    localStorage.setItem('theme', newIsDark ? 'dark' : 'light');
  };

  return (
    <nav className="border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="px-6 h-16 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <h1 className="text-xl font-semibold text-foreground">{BRAND_NAME}</h1>
        </div>
        <div className="flex items-center gap-3">
          {connected && account && (
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-full border border-border bg-card text-sm text-foreground">
              <Cloud size={16} />
              <span>Connected to Google Drive</span>
              <span className="text-muted-foreground">•</span>
              <span className="text-muted-foreground">{account}</span>
            </div>
          )}
          <Button variant="ghost" size="icon" onClick={toggleTheme}>
            {isDark ? <Sun size={18} /> : <Moon size={18} />}
          </Button>
        </div>
      </div>
    </nav>
  );
}

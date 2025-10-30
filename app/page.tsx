'use client';

import { useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import DriveSidebar from '@/components/DriveSidebar';
import ChatPanel from '@/components/ChatPanel';

export default function Home() {
  const [connected, setConnected] = useState(false);
  const [account, setAccount] = useState<string>('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/connect')
      .then(res => res.json())
      .then(data => {
        setAccount(data.account);
        setConnected(data.status === 'connected');
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
      });
  }, []);

  return (
    <div className="h-screen flex flex-col overflow-hidden">
      <Navbar account={account} connected={connected} />
      <div className="flex-1 flex overflow-hidden">
        {/* Left Column: Drive Workspace */}
        <div className="hidden lg:flex lg:flex-col lg:w-3/12 border-r border-border bg-background">
          <DriveSidebar />
        </div>

        {/* Mobile/Tablet: Single column for Drive */}
        <div className="lg:hidden flex flex-col w-full border-r border-border bg-background">
          <div className="flex-1 overflow-hidden">
            <DriveSidebar />
          </div>
        </div>

        {/* Right Column: Chat */}
        <div className="flex-1 lg:w-9/12 flex flex-col bg-background">
          <ChatPanel />
        </div>
      </div>
    </div>
  );
}
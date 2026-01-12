'use client';

import { useState, useEffect } from 'react';
import DealList from '@/app/components/DealList';
import Filters from '@/app/components/Filters';
import Chat from '@/app/components/Chat';
import Navbar from '@/components/Navbar';
import type { FilterOptions } from '@/lib/retrieval';

export default function Home() {
  const [filters, setFilters] = useState<FilterOptions>({});
  const [selectedDealId, setSelectedDealId] = useState<string | undefined>();
  const [connected, setConnected] = useState(false);
  const [account, setAccount] = useState<string | undefined>();
  
  useEffect(() => {
    // Check connection status
    fetch('/api/connect')
      .then(res => res.json())
      .then(data => {
        if (data.status === 'connected') {
          setConnected(true);
          setAccount(data.account);
        }
      })
      .catch(() => {
        setConnected(false);
      });
  }, []);
  
  const handleDealSelect = (dealId: string) => {
    setSelectedDealId(dealId);
    // Auto-fill chat with a question about the selected deal
    // This will be handled by the Chat component when selectedDealId changes
  };
  
  return (
    <div className="h-screen flex flex-col overflow-hidden bg-background">
      <Navbar account={account} connected={connected} />
      
      {/* Main Content */}
      <div className="flex-1 flex overflow-hidden">
        {/* Left Panel: Filters + Deal List */}
        <div className="w-1/3 border-r border-border bg-card flex flex-col overflow-hidden">
          <Filters filters={filters} onFiltersChange={setFilters} />
          <div className="flex-1 overflow-hidden">
            <DealList
              onDealSelect={handleDealSelect}
              selectedDealId={selectedDealId}
              filters={filters}
            />
          </div>
        </div>
        
        {/* Right Panel: Chat */}
        <div className="flex-1 flex flex-col overflow-hidden bg-background">
          <Chat filters={filters} selectedDealId={selectedDealId} />
        </div>
      </div>
    </div>
  );
}

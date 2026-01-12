'use client';

import { useState } from 'react';
import { deals, type Deal } from '@/data/deals';
import { getCurrentStage, getContractValueMidpoint } from '@/lib/retrieval';
import type { FilterOptions } from '@/lib/retrieval';

interface DealListProps {
  onDealSelect: (dealId: string) => void;
  selectedDealId?: string;
  filters?: FilterOptions;
  searchQuery?: string;
}

export default function DealList({ onDealSelect, selectedDealId, filters, searchQuery }: DealListProps) {
  const [localSearch, setLocalSearch] = useState('');
  
  const search = searchQuery || localSearch;
  
  // Filter deals
  let filteredDeals = deals;
  
  if (filters) {
    if (filters.industry) {
      filteredDeals = filteredDeals.filter(d => 
        d.industry.toLowerCase().includes(filters.industry!.toLowerCase()) ||
        d.subIndustry.toLowerCase().includes(filters.industry!.toLowerCase()) ||
        d.tags.some(tag => tag.toLowerCase().includes(filters.industry!.toLowerCase()))
      );
    }
    if (filters.region) {
      filteredDeals = filteredDeals.filter(d => d.region === filters.region);
    }
    if (filters.channel) {
      filteredDeals = filteredDeals.filter(d => d.channels.includes(filters.channel!));
    }
    if (filters.renewalLikelihood) {
      filteredDeals = filteredDeals.filter(d => d.renewalLikelihood === filters.renewalLikelihood);
    }
    if (filters.stage) {
      filteredDeals = filteredDeals.filter(d => getCurrentStage(d).toLowerCase() === filters.stage!.toLowerCase());
    }
  }
  
  // Search filter
  if (search) {
    const searchLower = search.toLowerCase();
    filteredDeals = filteredDeals.filter(d =>
      d.clientName.toLowerCase().includes(searchLower) ||
      d.clientAlias?.toLowerCase().includes(searchLower) ||
      d.industry.toLowerCase().includes(searchLower) ||
      d.tags.some(tag => tag.toLowerCase().includes(searchLower))
    );
  }
  
  // Sort by most recent
  filteredDeals = [...filteredDeals].sort((a, b) => {
    const dateA = new Date(a.dealStageHistory[a.dealStageHistory.length - 1]?.date || '');
    const dateB = new Date(b.dealStageHistory[b.dealStageHistory.length - 1]?.date || '');
    return dateB.getTime() - dateA.getTime();
  });
  
  const handleDealClick = (deal: Deal) => {
    onDealSelect(deal.id);
  };
  
  const getValueDisplay = (deal: Deal) => {
    const mid = getContractValueMidpoint(deal.contractValueRange);
    if (mid >= 1000000) {
      return `$${(mid / 1000000).toFixed(1)}M`;
    }
    return `$${(mid / 1000).toFixed(0)}K`;
  };
  
  const getRenewalColor = (likelihood: string) => {
    switch (likelihood) {
      case 'High': return 'text-green-600 bg-green-50';
      case 'Med': return 'text-yellow-600 bg-yellow-50';
      case 'Low': return 'text-red-600 bg-red-50';
      default: return 'text-gray-600 bg-gray-50';
    }
  };
  
  return (
    <div className="flex flex-col h-full bg-card">
      <div className="p-4 border-b border-border">
        <input
          type="text"
          placeholder="Search deals..."
          value={localSearch}
          onChange={(e) => setLocalSearch(e.target.value)}
          className="w-full px-3 py-2 border border-input rounded-md bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
        />
      </div>
      
      <div className="flex-1 overflow-y-auto">
        {filteredDeals.length === 0 ? (
          <div className="p-4 text-center text-muted-foreground">
            No deals found matching your criteria.
          </div>
        ) : (
          <div className="divide-y divide-border">
            {filteredDeals.map((deal) => {
              const currentStage = getCurrentStage(deal);
              const isSelected = selectedDealId === deal.id;
              
              return (
                <button
                  key={deal.id}
                  onClick={() => handleDealClick(deal)}
                  className={`w-full text-left p-4 hover:bg-accent transition-colors ${
                    isSelected ? 'bg-accent border-l-4 border-l-primary' : ''
                  }`}
                >
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="font-semibold text-foreground">{deal.clientName}</h3>
                    <span className={`text-xs px-2 py-1 rounded ${getRenewalColor(deal.renewalLikelihood)}`}>
                      {deal.renewalLikelihood}
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground mb-1">{deal.industry}</p>
                  <div className="flex items-center gap-3 text-xs text-muted-foreground">
                    <span>{currentStage}</span>
                    <span>•</span>
                    <span>{getValueDisplay(deal)}</span>
                    <span>•</span>
                    <span>{deal.region}</span>
                  </div>
                </button>
              );
            })}
          </div>
        )}
      </div>
      
      <div className="p-4 border-t border-border text-xs text-muted-foreground">
        {filteredDeals.length} deal{filteredDeals.length !== 1 ? 's' : ''} shown
      </div>
    </div>
  );
}

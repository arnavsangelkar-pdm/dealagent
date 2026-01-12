'use client';

import { deals } from '@/data/deals';
import type { FilterOptions } from '@/lib/retrieval';

interface FiltersProps {
  filters: FilterOptions;
  onFiltersChange: (filters: FilterOptions) => void;
}

export default function Filters({ filters, onFiltersChange }: FiltersProps) {
  // Get unique values for filters
  const industries = Array.from(new Set(deals.map(d => d.industry))).sort();
  const regions = Array.from(new Set(deals.map(d => d.region))).sort();
  const channels = Array.from(new Set(deals.flatMap(d => d.channels))).sort();
  const stages = Array.from(new Set(deals.map(d => d.dealStageHistory[d.dealStageHistory.length - 1]?.stage).filter(Boolean))).sort();
  const renewalLikelihoods: Array<'Low' | 'Med' | 'High'> = ['Low', 'Med', 'High'];
  
  const handleFilterChange = (key: keyof FilterOptions, value: string | undefined) => {
    const newFilters = { ...filters };
    if (value && value !== 'all') {
      newFilters[key] = value;
    } else {
      delete newFilters[key];
    }
    onFiltersChange(newFilters);
  };
  
  const clearFilters = () => {
    onFiltersChange({});
  };
  
  const hasActiveFilters = Object.keys(filters).length > 0;
  
  return (
    <div className="p-4 border-b border-border bg-card">
      <div className="flex items-center justify-between mb-4">
        <h2 className="font-semibold text-foreground">Filters</h2>
        {hasActiveFilters && (
          <button
            onClick={clearFilters}
            className="text-xs text-primary hover:text-primary/80 transition-colors"
          >
            Clear all
          </button>
        )}
      </div>
      
      <div className="space-y-3">
        <div>
          <label className="block text-xs font-medium text-foreground mb-1">
            Industry
          </label>
          <select
            value={filters.industry || 'all'}
            onChange={(e) => handleFilterChange('industry', e.target.value)}
            className="w-full px-2 py-1.5 text-sm border border-input rounded-md bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
          >
            <option value="all">All Industries</option>
            {industries.map(ind => (
              <option key={ind} value={ind}>{ind}</option>
            ))}
          </select>
        </div>
        
        <div>
          <label className="block text-xs font-medium text-foreground mb-1">
            Region
          </label>
          <select
            value={filters.region || 'all'}
            onChange={(e) => handleFilterChange('region', e.target.value)}
            className="w-full px-2 py-1.5 text-sm border border-input rounded-md bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
          >
            <option value="all">All Regions</option>
            {regions.map(reg => (
              <option key={reg} value={reg}>{reg}</option>
            ))}
          </select>
        </div>
        
        <div>
          <label className="block text-xs font-medium text-foreground mb-1">
            Channel
          </label>
          <select
            value={filters.channel || 'all'}
            onChange={(e) => handleFilterChange('channel', e.target.value)}
            className="w-full px-2 py-1.5 text-sm border border-input rounded-md bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
          >
            <option value="all">All Channels</option>
            {channels.map(ch => (
              <option key={ch} value={ch}>{ch}</option>
            ))}
          </select>
        </div>
        
        <div>
          <label className="block text-xs font-medium text-foreground mb-1">
            Stage
          </label>
          <select
            value={filters.stage || 'all'}
            onChange={(e) => handleFilterChange('stage', e.target.value)}
            className="w-full px-2 py-1.5 text-sm border border-input rounded-md bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
          >
            <option value="all">All Stages</option>
            {stages.map(stage => (
              <option key={stage} value={stage}>{stage}</option>
            ))}
          </select>
        </div>
        
        <div>
          <label className="block text-xs font-medium text-foreground mb-1">
            Renewal Risk
          </label>
          <select
            value={filters.renewalLikelihood || 'all'}
            onChange={(e) => handleFilterChange('renewalLikelihood', e.target.value)}
            className="w-full px-2 py-1.5 text-sm border border-input rounded-md bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
          >
            <option value="all">All</option>
            {renewalLikelihoods.map(risk => (
              <option key={risk} value={risk}>{risk}</option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
}

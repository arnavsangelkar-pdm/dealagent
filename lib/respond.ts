import { retrieveDeals, getContractValueMidpoint, getCurrentStage, getMostRecentDate, type ScoredDeal, type FilterOptions } from './retrieval';
import type { Deal } from '@/data/deals';

export interface ChatResponse {
  reply: string;
  sources: Array<{ id: string; clientName: string }>;
  suggestions: string[];
}

/**
 * Detect user intent from message
 */
function detectIntent(message: string): {
  type: 'list' | 'detail' | 'compare' | 'aggregate' | 'largest' | 'smallest' | 'recent' | 'renewal' | 'objections' | 'competitors' | 'channels' | 'general';
  entities: string[];
} {
  const lower = message.toLowerCase();
  
  if (lower.includes('compare') || lower.includes('vs') || lower.includes('versus') || lower.includes('difference')) {
    return { type: 'compare', entities: [] };
  }
  if (lower.includes('largest') || lower.includes('biggest') || lower.includes('highest value') || lower.includes('high value')) {
    return { type: 'largest', entities: [] };
  }
  if (lower.includes('smallest') || lower.includes('lowest value') || lower.includes('small')) {
    return { type: 'smallest', entities: [] };
  }
  if (lower.includes('most recent') || lower.includes('latest') || lower.includes('newest')) {
    return { type: 'recent', entities: [] };
  }
  if (lower.includes('renewal') || lower.includes('renew')) {
    return { type: 'renewal', entities: [] };
  }
  if (lower.includes('objection')) {
    return { type: 'objections', entities: [] };
  }
  if (lower.includes('competitor')) {
    return { type: 'competitors', entities: [] };
  }
  if (lower.includes('channel')) {
    return { type: 'channels', entities: [] };
  }
  if (lower.includes('list') || lower.includes('show all') || lower.includes('all deals') || lower.includes('deals in')) {
    return { type: 'list', entities: [] };
  }
  if (lower.includes('tell me about') || lower.includes('details about') || lower.includes('rundown on') || lower.includes('summary of')) {
    return { type: 'detail', entities: [] };
  }
  
  return { type: 'general', entities: [] };
}

/**
 * Format deal list response
 */
function formatListResponse(scoredDeals: ScoredDeal[]): string {
  if (scoredDeals.length === 0) {
    return "I couldn't find any deals matching your criteria. Try adjusting your filters or asking about a specific industry, region, or client name.";
  }

  let response = `I found ${scoredDeals.length} deal${scoredDeals.length > 1 ? 's' : ''}:\n\n`;
  
  for (const { deal } of scoredDeals) {
    const currentStage = getCurrentStage(deal);
    const valueMid = getContractValueMidpoint(deal.contractValueRange);
    const valueStr = valueMid >= 1000000 
      ? `$${(valueMid / 1000000).toFixed(1)}M`
      : `$${(valueMid / 1000).toFixed(0)}K`;
    
    response += `**${deal.clientName}** (${deal.industry})\n`;
    response += `- Stage: ${currentStage}\n`;
    response += `- Contract Value: ${deal.contractValueRange}\n`;
    response += `- Region: ${deal.region}\n`;
    response += `- Renewal Risk: ${deal.renewalLikelihood}\n`;
    if (deal.results.length > 0) {
      const topResult = deal.results[0];
      response += `- Key Result: ${topResult.name} ${topResult.lift ? `(${topResult.lift})` : ''}\n`;
    }
    response += `\n`;
  }
  
  return response;
}

/**
 * Format detailed deal response
 */
function formatDetailResponse(deal: Deal): string {
  const currentStage = getCurrentStage(deal);
  const valueMid = getContractValueMidpoint(deal.contractValueRange);
  
  let response = `## ${deal.clientName}${deal.clientAlias ? ` (${deal.clientAlias})` : ''}\n\n`;
  
  response += `**Overview**\n`;
  response += `- Industry: ${deal.industry} (${deal.subIndustry})\n`;
  response += `- Region: ${deal.region}\n`;
  response += `- Company Size: ${deal.companySize}\n`;
  response += `- Annual Revenue: ${deal.annualRevenueRange}\n`;
  response += `- Current Stage: ${currentStage}\n`;
  response += `- Contract Value: ${deal.contractValueRange} (${deal.contractTermMonths} months)\n`;
  response += `- Renewal Likelihood: ${deal.renewalLikelihood}\n\n`;
  
  response += `**Services & Tech**\n`;
  response += `- Services: ${deal.services.join(', ')}\n`;
  response += `- Channels: ${deal.channels.join(', ')}\n`;
  response += `- Tech Stack: ${deal.techStack.join(', ')}\n\n`;
  
  response += `**Objectives**\n`;
  deal.objectives.forEach(obj => {
    response += `- ${obj}\n`;
  });
  response += `\n`;
  
  response += `**Challenges**\n`;
  deal.challenges.forEach(ch => {
    response += `- ${ch}\n`;
  });
  response += `\n`;
  
  if (deal.objections.length > 0) {
    response += `**Objections Overcome**\n`;
    deal.objections.forEach(obj => {
      response += `- ${obj}\n`;
    });
    response += `\n`;
  }
  
  if (deal.competitors.length > 0) {
    response += `**Competitors**\n`;
    response += `- Faced: ${deal.competitors.join(', ')}\n`;
    response += `- Differentiators: ${deal.differentiators.join(', ')}\n\n`;
  }
  
  response += `**Key Stakeholders**\n`;
  deal.keyStakeholders.forEach(sh => {
    response += `- ${sh.name} (${sh.title}) - ${sh.role}\n`;
  });
  response += `\n`;
  
  if (deal.results.length > 0) {
    response += `**Results & Metrics**\n`;
    deal.results.forEach(metric => {
      response += `- **${metric.name}**: `;
      if (metric.before && metric.after) {
        response += `${metric.before} → ${metric.after}`;
      } else if (metric.after) {
        response += `${metric.after}`;
      }
      if (metric.lift) {
        response += ` (${metric.lift})`;
      }
      if (metric.description) {
        response += ` - ${metric.description}`;
      }
      response += `\n`;
    });
    response += `\n`;
  }
  
  response += `**Renewal Outlook**\n`;
  response += `${deal.renewalRationale}\n\n`;
  
  if (deal.timelineNotes) {
    response += `**Timeline Notes**\n`;
    response += `${deal.timelineNotes}\n\n`;
  }
  
  return response;
}

/**
 * Format comparison response
 */
function formatCompareResponse(deals: Deal[]): string {
  if (deals.length < 2) {
    return "I need at least 2 deals to compare. Please specify which deals you'd like to compare.";
  }
  
  const [deal1, deal2] = deals.slice(0, 2);
  
  let response = `## Comparison: ${deal1.clientName} vs ${deal2.clientName}\n\n`;
  response += `| Aspect | ${deal1.clientName} | ${deal2.clientName} |\n`;
  response += `|--------|${'-'.repeat(deal1.clientName.length + 2)}|${'-'.repeat(deal2.clientName.length + 2)}|\n`;
  response += `| Industry | ${deal1.industry} | ${deal2.industry} |\n`;
  response += `| Region | ${deal1.region} | ${deal2.region} |\n`;
  response += `| Company Size | ${deal1.companySize} | ${deal2.companySize} |\n`;
  response += `| Contract Value | ${deal1.contractValueRange} | ${deal2.contractValueRange} |\n`;
  response += `| Contract Term | ${deal1.contractTermMonths} months | ${deal2.contractTermMonths} months |\n`;
  response += `| Current Stage | ${getCurrentStage(deal1)} | ${getCurrentStage(deal2)} |\n`;
  response += `| Renewal Likelihood | ${deal1.renewalLikelihood} | ${deal2.renewalLikelihood} |\n`;
  response += `| Channels | ${deal1.channels.join(', ')} | ${deal2.channels.join(', ')} |\n`;
  response += `| Services | ${deal1.services.length} services | ${deal2.services.length} services |\n`;
  
  if (deal1.results.length > 0 && deal2.results.length > 0) {
    response += `\n**Key Results Comparison**\n\n`;
    const maxResults = Math.max(deal1.results.length, deal2.results.length);
    for (let i = 0; i < maxResults; i++) {
      const r1 = deal1.results[i];
      const r2 = deal2.results[i];
      if (r1 || r2) {
        response += `- **${r1?.name || r2?.name}**: `;
        if (r1) {
          response += `${r1.lift || 'N/A'}`;
        } else {
          response += 'N/A';
        }
        response += ` vs `;
        if (r2) {
          response += `${r2.lift || 'N/A'}`;
        } else {
          response += 'N/A';
        }
        response += `\n`;
      }
    }
  }
  
  return response;
}

/**
 * Format aggregate response (objections, competitors, channels)
 */
function formatAggregateResponse(scoredDeals: ScoredDeal[], type: 'objections' | 'competitors' | 'channels'): string {
  if (scoredDeals.length === 0) {
    return "I couldn't find any deals matching your criteria.";
  }
  
  const counts: Record<string, number> = {};
  
  for (const { deal } of scoredDeals) {
    if (type === 'objections') {
      deal.objections.forEach(obj => {
        counts[obj] = (counts[obj] || 0) + 1;
      });
    } else if (type === 'competitors') {
      deal.competitors.forEach(comp => {
        counts[comp] = (counts[comp] || 0) + 1;
      });
    } else if (type === 'channels') {
      deal.channels.forEach(ch => {
        counts[ch] = (counts[ch] || 0) + 1;
      });
    }
  }
  
  const sorted = Object.entries(counts).sort((a, b) => b[1] - a[1]);
  
  let response = `Based on ${scoredDeals.length} deal${scoredDeals.length > 1 ? 's' : ''}, here's what I found:\n\n`;
  
  if (type === 'objections') {
    response += `**Common Objections** (frequency across deals):\n\n`;
  } else if (type === 'competitors') {
    response += `**Competitors Encountered** (frequency):\n\n`;
  } else {
    response += `**Channels Used** (frequency):\n\n`;
  }
  
  for (const [item, count] of sorted) {
    response += `- ${item}: ${count} deal${count > 1 ? 's' : ''}\n`;
  }
  
  return response;
}

/**
 * Format largest/smallest/recent response
 */
function formatRankingResponse(scoredDeals: ScoredDeal[], type: 'largest' | 'smallest' | 'recent'): string {
  if (scoredDeals.length === 0) {
    return "I couldn't find any deals matching your criteria.";
  }
  
  let sorted: ScoredDeal[];
  
  if (type === 'largest' || type === 'smallest') {
    sorted = [...scoredDeals].sort((a, b) => {
      const valA = getContractValueMidpoint(a.deal.contractValueRange);
      const valB = getContractValueMidpoint(b.deal.contractValueRange);
      return type === 'largest' ? valB - valA : valA - valB;
    });
  } else {
    sorted = [...scoredDeals].sort((a, b) => {
      const dateA = getMostRecentDate(a.deal);
      const dateB = getMostRecentDate(b.deal);
      return dateB.getTime() - dateA.getTime();
    });
  }
  
  const top = sorted[0];
  const valueMid = getContractValueMidpoint(top.deal.contractValueRange);
  const valueStr = valueMid >= 1000000 
    ? `$${(valueMid / 1000000).toFixed(1)}M`
    : `$${(valueMid / 1000).toFixed(0)}K`;
  
  let response = `The ${type === 'largest' ? 'largest' : type === 'smallest' ? 'smallest' : 'most recent'} deal is **${top.deal.clientName}**.\n\n`;
  
  if (type === 'largest' || type === 'smallest') {
    response += `- Contract Value: ${top.deal.contractValueRange} (midpoint: ~${valueStr})\n`;
    response += `- Note: I'm using the midpoint of the range for comparison.\n\n`;
  } else {
    const latestDate = getMostRecentDate(top.deal);
    response += `- Most Recent Activity: ${latestDate.toLocaleDateString()}\n`;
    response += `- Current Stage: ${getCurrentStage(top.deal)}\n\n`;
  }
  
  response += formatDetailResponse(top.deal);
  
  return response;
}

/**
 * Format renewal risk response
 */
function formatRenewalResponse(scoredDeals: ScoredDeal[]): string {
  if (scoredDeals.length === 0) {
    return "I couldn't find any deals matching your criteria.";
  }
  
  // Group by renewal likelihood
  const grouped: Record<string, Deal[]> = { High: [], Med: [], Low: [] };
  
  for (const { deal } of scoredDeals) {
    grouped[deal.renewalLikelihood].push(deal);
  }
  
  let response = `## Renewal Risk Analysis\n\n`;
  response += `Based on ${scoredDeals.length} deal${scoredDeals.length > 1 ? 's' : ''}:\n\n`;
  
  for (const risk of ['High', 'Med', 'Low'] as const) {
    const deals = grouped[risk];
    if (deals.length > 0) {
      response += `**${risk} Renewal Risk** (${deals.length} deal${deals.length > 1 ? 's' : ''}):\n\n`;
      for (const deal of deals) {
        response += `- **${deal.clientName}**: ${deal.renewalRationale}\n`;
      }
      response += `\n`;
    }
  }
  
  return response;
}

/**
 * Generate suggested questions
 */
function generateSuggestions(intent: ReturnType<typeof detectIntent>, deals: ScoredDeal[]): string[] {
  const suggestions: string[] = [];
  
  if (intent.type === 'list' || intent.type === 'general') {
    if (deals.length > 0) {
      const firstDeal = deals[0].deal;
      suggestions.push(`Tell me about ${firstDeal.clientName}`);
      suggestions.push(`Compare ${firstDeal.clientName} with another deal`);
    }
    suggestions.push('Show me deals with high renewal risk');
    suggestions.push('What are the most common objections?');
  } else if (intent.type === 'detail') {
    if (deals.length > 1) {
      suggestions.push(`Compare ${deals[0].deal.clientName} with ${deals[1].deal.clientName}`);
    }
    suggestions.push('Show me all deals in this industry');
    suggestions.push('What competitors did we face?');
  } else if (intent.type === 'compare') {
    suggestions.push('Show me the largest deal');
    suggestions.push('What are common objections?');
    suggestions.push('Show renewal risk analysis');
  } else {
    suggestions.push('Show me all deals');
    suggestions.push('What is the largest deal?');
    suggestions.push('Show me recent deals');
  }
  
  return suggestions.slice(0, 3);
}

/**
 * Main response generator
 */
export function generateResponse(message: string, filters?: FilterOptions, selectedDealId?: string): ChatResponse {
  const intent = detectIntent(message);
  let scoredDeals: ScoredDeal[];
  
  // If a specific deal is selected, prioritize it
  if (selectedDealId) {
    const selectedDeal = retrieveDeals('', filters, 100).find(sd => sd.deal.id === selectedDealId);
    if (selectedDeal) {
      scoredDeals = [selectedDeal];
    } else {
      scoredDeals = retrieveDeals(message, filters);
    }
  } else {
    scoredDeals = retrieveDeals(message, filters);
  }
  
  const deals = scoredDeals.map(sd => sd.deal);
  let reply = '';
  
  // Handle vague questions
  if (intent.type === 'general' && scoredDeals.length === 0 && !message.toLowerCase().includes('deal')) {
    reply = "I can help you explore our deal portfolio. Here are 5 recent deals:\n\n";
    const allDeals = retrieveDeals('most recent', filters, 5);
    reply += formatListResponse(allDeals);
    reply += "\n\nWant to dive deeper? Try asking about a specific industry (like 'healthcare' or 'SaaS'), client name, or use filters on the left.";
  } else if (intent.type === 'list') {
    reply = formatListResponse(scoredDeals);
  } else if (intent.type === 'detail') {
    if (deals.length === 0) {
      reply = "I couldn't find a specific deal matching your request. Try asking about a client name or use the deal list on the left.";
    } else if (deals.length === 1) {
      reply = formatDetailResponse(deals[0]);
    } else {
      reply = `I found multiple deals. Here's the most relevant one:\n\n`;
      reply += formatDetailResponse(deals[0]);
      if (deals.length > 1) {
        reply += `\n\nI also found ${deals.length - 1} other matching deal${deals.length > 1 ? 's' : ''}. Ask about them specifically or use filters to narrow down.`;
      }
    }
  } else if (intent.type === 'compare') {
    if (deals.length < 2) {
      reply = "I need at least 2 deals to compare. Please specify which deals (e.g., 'Compare ApexCommerce with CloudSync Solutions') or select deals from the list.";
    } else {
      reply = formatCompareResponse(deals);
    }
  } else if (intent.type === 'largest' || intent.type === 'smallest' || intent.type === 'recent') {
    reply = formatRankingResponse(scoredDeals, intent.type);
  } else if (intent.type === 'renewal') {
    reply = formatRenewalResponse(scoredDeals);
  } else if (intent.type === 'objections' || intent.type === 'competitors' || intent.type === 'channels') {
    reply = formatAggregateResponse(scoredDeals, intent.type);
  } else {
    // General fallback
    if (scoredDeals.length > 0) {
      reply = formatListResponse(scoredDeals);
    } else {
      reply = "I couldn't find deals matching your query. Try:\n- Asking about a specific client name\n- Using industry filters (e.g., 'healthcare', 'SaaS')\n- Asking about 'largest deal', 'renewal risk', or 'objections'\n- Selecting a deal from the list on the left";
    }
  }
  
  // Add sources
  const sources = deals.map(d => ({ id: d.id, clientName: d.clientName }));
  
  // Generate suggestions
  const suggestions = generateSuggestions(intent, scoredDeals);
  
  return { reply, sources, suggestions };
}

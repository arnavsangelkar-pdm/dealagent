import { deals, type Deal } from '@/data/deals';

export interface FilterOptions {
  industry?: string;
  region?: string;
  stage?: string;
  channel?: string;
  renewalLikelihood?: string;
}

export interface ScoredDeal {
  deal: Deal;
  score: number;
  matchReasons: string[];
}

/**
 * Extract entities from user message for matching
 */
export function extractEntities(message: string): {
  clientName?: string;
  industries: string[];
  regions: string[];
  channels: string[];
  services: string[];
  keywords: string[];
} {
  const lower = message.toLowerCase();
  const entities = {
    industries: [] as string[],
    regions: [] as string[],
    channels: [] as string[],
    services: [] as string[],
    keywords: [] as string[]
  };

  // Extract client names (check against all deals)
  const clientNames = deals.map(d => [d.clientName.toLowerCase(), d.clientAlias?.toLowerCase()].filter(Boolean));
  for (const [name, alias] of deals.map(d => [d.clientName.toLowerCase(), d.clientAlias?.toLowerCase()])) {
    if (name && lower.includes(name)) {
      entities.keywords.push(name);
    }
    if (alias && lower.includes(alias)) {
      entities.keywords.push(alias);
    }
  }

  // Industry keywords
  const industryKeywords: Record<string, string[]> = {
    'ecommerce': ['ecommerce', 'e-commerce', 'retail', 'dtc', 'direct-to-consumer', 'fashion', 'apparel'],
    'saas': ['saas', 'software', 'productivity', 'b2b saas', 'cloud'],
    'healthcare': ['healthcare', 'health', 'medical', 'hospital', 'hipaa', 'patient', 'clinical'],
    'fintech': ['fintech', 'financial', 'payment', 'banking', 'fraud', 'pci', 'transaction'],
    'field-service': ['field service', 'home service', 'plumbing', 'hvac', 'electrical', 'technician'],
    'marketplace': ['marketplace', 'b2b marketplace', 'seller', 'buyer', 'gmv'],
    'consumer-app': ['consumer app', 'mobile app', 'fitness', 'health app', 'consumer'],
    'manufacturing': ['manufacturing', 'industrial', 'iot', 'factory', 'equipment', 'predictive maintenance'],
    'education': ['education', 'lms', 'learning', 'student', 'academy', 'school'],
    'hospitality': ['hospitality', 'hotel', 'property management', 'pms', 'guest', 'revpar']
  };

  for (const [industry, keywords] of Object.entries(industryKeywords)) {
    if (keywords.some(kw => lower.includes(kw))) {
      entities.industries.push(industry);
    }
  }

  // Region keywords
  const regionKeywords: Record<string, string[]> = {
    'North America': ['north america', 'usa', 'us', 'united states', 'canada', 'na'],
    'Europe': ['europe', 'eu', 'european', 'uk', 'germany', 'france'],
    'Global': ['global', 'worldwide', 'international']
  };

  for (const [region, keywords] of Object.entries(regionKeywords)) {
    if (keywords.some(kw => lower.includes(kw))) {
      entities.regions.push(region);
    }
  }

  // Channel keywords
  const channelKeywords: Record<string, string[]> = {
    'Direct Sales': ['direct sales', 'direct'],
    'Partner Referral': ['partner', 'referral'],
    'Self-Service': ['self-service', 'self service'],
    'Inside Sales': ['inside sales', 'inside'],
    'Enterprise Sales': ['enterprise sales', 'enterprise'],
    'RFP Process': ['rfp', 'request for proposal']
  };

  for (const [channel, keywords] of Object.entries(channelKeywords)) {
    if (keywords.some(kw => lower.includes(kw))) {
      entities.channels.push(channel);
    }
  }

  // Service keywords
  const serviceKeywords = [
    'platform', 'analytics', 'integration', 'mobile', 'api', 'payment', 'fraud',
    'compliance', 'iot', 'lms', 'pms', 'marketplace', 'ecommerce', 'scheduling'
  ];

  for (const keyword of serviceKeywords) {
    if (lower.includes(keyword)) {
      entities.services.push(keyword);
    }
  }

  // Special keywords
  if (lower.includes('largest') || lower.includes('biggest') || lower.includes('highest value') || lower.includes('high value')) {
    entities.keywords.push('largest');
  }
  if (lower.includes('smallest') || lower.includes('lowest value') || lower.includes('small')) {
    entities.keywords.push('smallest');
  }
  if (lower.includes('most recent') || lower.includes('latest') || lower.includes('newest')) {
    entities.keywords.push('most_recent');
  }
  if (lower.includes('renewal') || lower.includes('renew')) {
    entities.keywords.push('renewal');
  }
  if (lower.includes('lost') || lower.includes('lose')) {
    entities.keywords.push('lost');
  }
  if (lower.includes('stalled') || lower.includes('stall')) {
    entities.keywords.push('stalled');
  }
  if (lower.includes('pilot') || lower.includes('poc')) {
    entities.keywords.push('pilot');
  }
  if (lower.includes('enterprise')) {
    entities.keywords.push('enterprise');
  }
  if (lower.includes('compliance') || lower.includes('hipaa') || lower.includes('pci')) {
    entities.keywords.push('compliance');
  }

  return entities;
}

/**
 * Score a deal based on entity matching
 */
function scoreDeal(deal: Deal, entities: ReturnType<typeof extractEntities>, filters?: FilterOptions): ScoredDeal {
  let score = 0;
  const matchReasons: string[] = [];

  // Apply filters first (if no match, return 0)
  if (filters) {
    if (filters.industry && deal.industry.toLowerCase() !== filters.industry.toLowerCase() && 
        deal.subIndustry.toLowerCase() !== filters.industry.toLowerCase()) {
      // Check if industry tag matches
      const industryMatch = deal.tags.some(tag => tag.toLowerCase().includes(filters.industry!.toLowerCase()));
      if (!industryMatch) return { deal, score: 0, matchReasons: [] };
    }
    if (filters.region && deal.region !== filters.region) {
      return { deal, score: 0, matchReasons: [] };
    }
    if (filters.channel && !deal.channels.includes(filters.channel)) {
      return { deal, score: 0, matchReasons: [] };
    }
    if (filters.renewalLikelihood && deal.renewalLikelihood !== filters.renewalLikelihood) {
      return { deal, score: 0, matchReasons: [] };
    }
    if (filters.stage) {
      const currentStage = deal.dealStageHistory[deal.dealStageHistory.length - 1]?.stage;
      if (currentStage?.toLowerCase() !== filters.stage.toLowerCase()) {
        return { deal, score: 0, matchReasons: [] };
      }
    }
  }

  // Exact client name match (highest priority)
  const clientNameLower = deal.clientName.toLowerCase();
  const clientAliasLower = deal.clientAlias?.toLowerCase() || '';
  if (entities.keywords.some(kw => clientNameLower === kw || clientAliasLower === kw)) {
    score += 100;
    matchReasons.push(`Exact client name match: ${deal.clientName}`);
  } else if (entities.keywords.some(kw => clientNameLower.includes(kw) || clientAliasLower.includes(kw))) {
    score += 50;
    matchReasons.push(`Partial client name match: ${deal.clientName}`);
  }

  // Industry match
  const dealIndustryLower = deal.industry.toLowerCase();
  const dealSubIndustryLower = deal.subIndustry.toLowerCase();
  if (entities.industries.some(ind => dealIndustryLower.includes(ind) || dealSubIndustryLower.includes(ind))) {
    score += 30;
    matchReasons.push(`Industry match: ${deal.industry}`);
  }

  // Tag match
  for (const tag of deal.tags) {
    if (entities.keywords.some(kw => tag.toLowerCase().includes(kw))) {
      score += 20;
      matchReasons.push(`Tag match: ${tag}`);
    }
  }

  // Region match
  if (entities.regions.includes(deal.region)) {
    score += 15;
    matchReasons.push(`Region match: ${deal.region}`);
  }

  // Channel match
  if (entities.channels.some(ch => deal.channels.includes(ch))) {
    score += 10;
    matchReasons.push(`Channel match: ${deal.channels.join(', ')}`);
  }

  // Service match
  for (const service of deal.services) {
    if (entities.services.some(sv => service.toLowerCase().includes(sv))) {
      score += 10;
      matchReasons.push(`Service match: ${service}`);
    }
  }

  // Special keyword matches
  if (entities.keywords.includes('largest')) {
    const valueMid = getContractValueMidpoint(deal.contractValueRange);
    if (valueMid > 1500000) {
      score += 25;
      matchReasons.push('High contract value');
    }
  }
  if (entities.keywords.includes('smallest')) {
    const valueMid = getContractValueMidpoint(deal.contractValueRange);
    if (valueMid < 200000) {
      score += 25;
      matchReasons.push('Low contract value');
    }
  }
  if (entities.keywords.includes('most_recent')) {
    const latestDate = new Date(deal.dealStageHistory[deal.dealStageHistory.length - 1]?.date || '');
    const sixMonthsAgo = new Date();
    sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 6);
    if (latestDate > sixMonthsAgo) {
      score += 20;
      matchReasons.push('Recent deal');
    }
  }
  if (entities.keywords.includes('renewal')) {
    score += 15;
    matchReasons.push(`Renewal likelihood: ${deal.renewalLikelihood}`);
  }
  if (entities.keywords.includes('lost')) {
    const currentStage = deal.dealStageHistory[deal.dealStageHistory.length - 1]?.stage;
    if (currentStage?.toLowerCase().includes('lost')) {
      score += 30;
      matchReasons.push('Lost deal');
    }
  }
  if (entities.keywords.includes('stalled')) {
    if (deal.dealStageHistory.some(s => s.stage.toLowerCase() === 'stalled')) {
      score += 25;
      matchReasons.push('Stalled deal');
    }
  }
  if (entities.keywords.includes('pilot')) {
    if (deal.dealStageHistory.some(s => s.stage.toLowerCase() === 'pilot' || s.stage.toLowerCase() === 'poc')) {
      score += 20;
      matchReasons.push('Pilot/POC deal');
    }
  }
  if (entities.keywords.includes('enterprise')) {
    if (deal.companySize.toLowerCase().includes('enterprise')) {
      score += 20;
      matchReasons.push('Enterprise deal');
    }
  }
  if (entities.keywords.includes('compliance')) {
    if (deal.services.some(s => s.toLowerCase().includes('compliance')) || 
        deal.tags.some(t => t.toLowerCase().includes('compliance'))) {
      score += 20;
      matchReasons.push('Compliance-focused deal');
    }
  }

  return { deal, score, matchReasons };
}

/**
 * Get midpoint of contract value range for comparison
 */
export function getContractValueMidpoint(range: string): number {
  const match = range.match(/\$?([\d.]+)[KMB]?\s*-\s*\$?([\d.]+)[KMB]?/i);
  if (!match) return 0;
  
  let min = parseFloat(match[1]);
  let max = parseFloat(match[2]);
  
  // Handle K, M, B suffixes
  if (range.toLowerCase().includes('k')) {
    min *= 1000;
    max *= 1000;
  } else if (range.toLowerCase().includes('m')) {
    min *= 1000000;
    max *= 1000000;
  } else if (range.toLowerCase().includes('b')) {
    min *= 1000000000;
    max *= 1000000000;
  }
  
  return (min + max) / 2;
}

/**
 * Retrieve deals based on message and filters
 */
export function retrieveDeals(
  message: string,
  filters?: FilterOptions,
  limit: number = 10
): ScoredDeal[] {
  const entities = extractEntities(message);
  const scored = deals.map(deal => scoreDeal(deal, entities, filters));
  
  // Filter out zero scores and sort by score descending
  const filtered = scored
    .filter(s => s.score > 0)
    .sort((a, b) => b.score - a.score);
  
  // If no matches, return all deals (for "list all" type queries)
  if (filtered.length === 0 && (message.toLowerCase().includes('list') || message.toLowerCase().includes('all') || message.toLowerCase().includes('show'))) {
    return deals.map(deal => ({ deal, score: 1, matchReasons: ['All deals'] }));
  }
  
  return filtered.slice(0, limit);
}

/**
 * Get deal by ID
 */
export function getDealById(id: string): Deal | undefined {
  return deals.find(d => d.id === id);
}

/**
 * Get current stage of a deal
 */
export function getCurrentStage(deal: Deal): string {
  return deal.dealStageHistory[deal.dealStageHistory.length - 1]?.stage || 'Unknown';
}

/**
 * Get most recent deal date
 */
export function getMostRecentDate(deal: Deal): Date {
  const dates = deal.dealStageHistory.map(s => new Date(s.date));
  return new Date(Math.max(...dates.map(d => d.getTime())));
}

import { NextRequest, NextResponse } from 'next/server';
import { generateResponse } from '@/lib/respond';
import { findAnswer } from '@/lib/qa';
import type { FilterOptions } from '@/lib/retrieval';

export async function POST(req: NextRequest) {
  try {
    const { message, filters, selectedDealId } = await req.json();
    
    if (!message || typeof message !== 'string') {
      return NextResponse.json(
        { error: 'Message is required' },
        { status: 400 }
      );
    }
    
    // Simulate a small delay for realism (optional)
    await new Promise(resolve => setTimeout(resolve, 300));
    
    // Check if this is a deal-related question first
    const messageLower = message.toLowerCase();
    const dealKeywords = [
      'deal', 'deals', 'client', 'renewal', 'contract', 'largest', 'smallest',
      'compare', 'competitor', 'objection', 'channel', 'industry', 'region',
      'stage', 'stakeholder', 'apexcommerce', 'cloudsync', 'medicare', 'payflow',
      'homeservice', 'marketplace', 'fittrack', 'precision', 'edulearn', 'grandstay'
    ];
    
    const isDealQuestion = dealKeywords.some(keyword => messageLower.includes(keyword));
    
    // Only check Q&A if it's clearly NOT a deal question
    // Also check Q&A for policy/HR questions (PTO, benefits, etc.)
    const policyKeywords = ['pto', 'policy', 'benefit', 'vacation', 'holiday', 'sick leave'];
    const isPolicyQuestion = policyKeywords.some(keyword => messageLower.includes(keyword));
    
    if (!isDealQuestion || isPolicyQuestion) {
      const qaAnswer = await findAnswer(message);
      
      if (qaAnswer) {
        // Return Q&A response
        return NextResponse.json({
          reply: qaAnswer.answer,
          sources: qaAnswer.citations.map(citation => ({ id: citation, clientName: citation })),
          suggestions: [
            'Show me all deals',
            'What is the largest deal?',
            'Show renewal risk analysis'
          ]
        });
      }
    }
    
    // Use deal retrieval system for deal-related questions
    const filterOptions: FilterOptions | undefined = filters ? {
      industry: filters.industry,
      region: filters.region,
      stage: filters.stage,
      channel: filters.channel,
      renewalLikelihood: filters.renewalLikelihood
    } : undefined;
    
    const response = generateResponse(message, filterOptions, selectedDealId);
    
    return NextResponse.json(response);
  } catch (error) {
    console.error('Chat API error:', error);
    return NextResponse.json(
      { error: 'Internal server error', reply: "I encountered an error processing your request. Please try again.", sources: [], suggestions: [] },
      { status: 500 }
    );
  }
}

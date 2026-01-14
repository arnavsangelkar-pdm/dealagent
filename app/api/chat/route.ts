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
    
    // First, check if this is a general Q&A question (not deal-specific)
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
    
    // If not a Q&A match, use deal retrieval system
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

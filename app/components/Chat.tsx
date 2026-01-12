'use client';

import { useState, useRef, useEffect } from 'react';
import type { FilterOptions } from '@/lib/retrieval';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  sources?: Array<{ id: string; clientName: string }>;
  suggestions?: string[];
}

interface ChatProps {
  filters?: FilterOptions;
  selectedDealId?: string;
}

export default function Chat({ filters, selectedDealId }: ChatProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      role: 'assistant',
      content: "Hi! I'm your Deal Intel Agent. I can help you explore our deal portfolio, compare deals, analyze renewal risks, and answer questions about clients, industries, and deal metrics.\n\nTry asking:\n- \"Show me all deals\"\n- \"What's the largest deal?\"\n- \"Tell me about ApexCommerce\"\n- \"Compare two deals\"\n- \"What are common objections?\"",
      suggestions: [
        'Show me all deals',
        'What is the largest deal?',
        'Show renewal risk analysis'
      ]
    }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [lastSelectedDealId, setLastSelectedDealId] = useState<string | undefined>();
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  
  const handleSendMessage = async (messageText?: string) => {
    const textToSend = messageText || input.trim();
    if (!textToSend || isLoading) return;
    
    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: textToSend
    };
    
    setMessages(prev => [...prev, userMessage]);
    if (!messageText) {
      setInput('');
    }
    setIsLoading(true);
    
    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          message: textToSend,
          filters,
          selectedDealId
        })
      });
      
      const data = await response.json();
      
      // Simulate typing delay
      await new Promise(resolve => setTimeout(resolve, 500));
      
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: data.reply || "I couldn't process that request. Please try again.",
        sources: data.sources || [],
        suggestions: data.suggestions || []
      };
      
      setMessages(prev => [...prev, assistantMessage]);
    } catch (error) {
      console.error('Chat error:', error);
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: "Sorry, I encountered an error. Please try again.",
        suggestions: ['Show me all deals', 'What is the largest deal?', 'Show recent deals']
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };
  
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };
  
  useEffect(() => {
    scrollToBottom();
  }, [messages]);
  
  const handleSuggestionClick = (suggestion: string) => {
    setInput(suggestion);
    inputRef.current?.focus();
  };
  
  // Auto-query when deal is selected
  useEffect(() => {
    if (selectedDealId && selectedDealId !== lastSelectedDealId && !isLoading) {
      setLastSelectedDealId(selectedDealId);
      import('@/data/deals').then(({ deals }) => {
        const deal = deals.find((d) => d.id === selectedDealId);
        if (deal) {
          const query = `Give me the full rundown on ${deal.clientName}`;
          setInput(query);
          // Auto-send after a brief delay
          setTimeout(() => {
            handleSendMessage(query);
          }, 100);
        }
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedDealId]);
  
  const handleSend = async () => {
    await handleSendMessage();
  };
  
  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };
  
  const formatMessage = (content: string) => {
    // Simple markdown-like formatting
    const lines = content.split('\n');
    let inTable = false;
    let tableRows: React.ReactElement[] = [];
    const result: React.ReactElement[] = [];
    
    lines.forEach((line, i) => {
      // Detect table start
      if (line.includes('|') && line.split('|').length > 2 && !line.includes('---')) {
        if (!inTable) {
          inTable = true;
          tableRows = [];
        }
        const cells = line.split('|').filter(c => c.trim()).map(c => c.trim());
        const isHeader = i < lines.length - 1 && lines[i + 1]?.includes('---');
        const CellTag = isHeader ? 'th' : 'td';
        tableRows.push(
          <tr key={i}>
            {cells.map((cell, j) => (
              <CellTag key={j} className={`px-3 py-2 border border-border ${isHeader ? 'font-semibold bg-muted' : 'bg-background'}`}>
                {cell}
              </CellTag>
            ))}
          </tr>
        );
        return;
      }
      
      // Detect table end (separator line or non-table line)
      if (inTable && (line.includes('---') || !line.includes('|'))) {
        if (line.includes('---')) {
          // Skip separator line
          return;
        } else {
          // Close table and process this line normally
          result.push(
            <table key={`table-${i}`} className="my-4 border-collapse border border-border w-full">
              <tbody>{tableRows}</tbody>
            </table>
          );
          inTable = false;
          // Continue to process this line
        }
      }
      
      if (inTable) {
        return;
      }
      
      // Headers
      if (line.startsWith('## ')) {
        result.push(<h2 key={i} className="text-xl font-bold mt-4 mb-2 text-foreground">{line.substring(3)}</h2>);
        return;
      }
      if (line.startsWith('**') && line.endsWith('**')) {
        result.push(<p key={i} className="font-semibold my-2 text-foreground">{line.substring(2, line.length - 2)}</p>);
        return;
      }
      
      // Bold text
      const boldRegex = /\*\*(.*?)\*\*/g;
      let parts = [];
      let lastIndex = 0;
      let match;
      let key = 0;
      
      while ((match = boldRegex.exec(line)) !== null) {
        if (match.index > lastIndex) {
          parts.push(<span key={key++}>{line.substring(lastIndex, match.index)}</span>);
        }
        parts.push(<strong key={key++}>{match[1]}</strong>);
        lastIndex = match.index + match[0].length;
      }
      if (lastIndex < line.length) {
        parts.push(<span key={key++}>{line.substring(lastIndex)}</span>);
      }
      
      if (parts.length > 0) {
        result.push(<p key={i} className="my-1 text-foreground">{parts}</p>);
        return;
      }
      
      // Bullet points
      if (line.trim().startsWith('- ')) {
        result.push(<li key={i} className="ml-4 my-1 text-foreground">{line.substring(2)}</li>);
        return;
      }
      
      // Empty lines
      if (line.trim() === '') {
        result.push(<br key={i} />);
        return;
      }
      
      result.push(<p key={i} className="my-1 text-foreground">{line}</p>);
    });
    
    // Close any remaining table
    if (inTable && tableRows.length > 0) {
      result.push(
        <table key="table-final" className="my-4 border-collapse border border-border w-full">
          <tbody>{tableRows}</tbody>
        </table>
      );
    }
    
    return result;
  };
  
  return (
    <div className="flex flex-col h-full bg-background">
      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`max-w-[80%] rounded-lg px-4 py-2 ${
                message.role === 'user'
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-muted text-foreground'
              }`}
            >
              <div className="prose prose-sm dark:prose-invert max-w-none">
                {message.role === 'assistant' ? (
                  <div>
                    {formatMessage(message.content)}
                    {message.sources && message.sources.length > 0 && (
                      <div className="mt-3 pt-3 border-t border-border">
                        <p className="text-xs font-semibold mb-1">Sources:</p>
                        <ul className="text-xs space-y-1">
                          {message.sources.map((source, i) => (
                            <li key={i}>• {source.clientName} ({source.id})</li>
                          ))}
                        </ul>
                      </div>
                    )}
                    {message.suggestions && message.suggestions.length > 0 && (
                      <div className="mt-3 pt-3 border-t border-border">
                        <p className="text-xs font-semibold mb-2">Next suggestions:</p>
                        <div className="flex flex-wrap gap-2">
                          {message.suggestions.map((suggestion, i) => (
                            <button
                              key={i}
                              onClick={() => handleSuggestionClick(suggestion)}
                              className="text-xs px-3 py-1 bg-accent text-accent-foreground rounded-full hover:bg-accent/80 transition-colors"
                            >
                              {suggestion}
                            </button>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                ) : (
                  <p className="whitespace-pre-wrap">{message.content}</p>
                )}
              </div>
            </div>
          </div>
        ))}
        
        {isLoading && (
          <div className="flex justify-start">
            <div className="bg-muted rounded-lg px-4 py-2">
              <div className="flex space-x-1">
                <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
              </div>
            </div>
          </div>
        )}
        
        <div ref={messagesEndRef} />
      </div>
      
      {/* Input */}
      <div className="border-t border-border p-4 bg-background">
        <div className="flex gap-2">
          <textarea
            ref={inputRef}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Ask about deals, clients, industries, metrics..."
            className="flex-1 px-4 py-2 border border-input rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-ring resize-none disabled:opacity-50"
            rows={2}
            disabled={isLoading}
          />
          <button
            onClick={handleSend}
            disabled={!input.trim() || isLoading}
            className="px-6 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
}

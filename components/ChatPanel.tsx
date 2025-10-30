'use client';

import { useState, useEffect } from 'react';
import { Send } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { motion, AnimatePresence } from 'framer-motion';
import type { DriveNode } from '@/lib/googleDrive';

interface Message {
  role: 'user' | 'assistant';
  text: string;
  citations?: DriveNode[];
}

export default function ChatPanel() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [suggestedQuestions, setSuggestedQuestions] = useState<string[]>([]);
  const [typingMessageId, setTypingMessageId] = useState<string | null>(null);

  useEffect(() => {
    // Load suggested questions from API
    fetch('/api/questions')
      .then(res => res.json())
      .then(data => setSuggestedQuestions(data))
      .catch(() => {
        // Fallback to hardcoded questions if API fails
        setSuggestedQuestions([
          "What's the latest status of the ACME renewal?",
          "Summarize the decision makers at Globex.",
          "What are the top risks for the Initech deal?",
          "Draft a next-step email to the Umbrella CFO.",
          "What files mention pricing for Waystar?",
          "Show me a timeline of the BetaCo activities."
        ]);
      });
  }, []);

  async function send(msg?: string) {
    const text = (msg ?? input).trim();
    if (!text || loading) return;

    setInput('');
    const userMessage: Message = { role: 'user', text };
    setMessages(m => [...m, userMessage]);
    setLoading(true);

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: text })
      });

      const { chunks, citations } = await res.json();
      const messageId = `msg-${Date.now()}`;
      setTypingMessageId(messageId);

      // Create initial assistant message
      const assistantMessage: Message = {
        role: 'assistant',
        text: '',
        citations
      };
      setMessages(m => [...m, assistantMessage]);

      // Simulate streaming
      let accumulatedText = '';
      for (let i = 0; i < chunks.length; i++) {
        await new Promise(r => setTimeout(r, 260));
        accumulatedText += (accumulatedText ? ' ' : '') + chunks[i];
        
        setMessages(m => {
          const updated = [...m];
          const lastIndex = updated.length - 1;
          if (updated[lastIndex]?.role === 'assistant') {
            updated[lastIndex] = {
              ...updated[lastIndex],
              text: accumulatedText,
              citations
            };
          }
          return updated;
        });
      }

      setTypingMessageId(null);
    } catch (error) {
      setMessages(m => [...m, {
        role: 'assistant',
        text: 'Sorry, I encountered an error. Please try again.',
        citations: []
      }]);
    } finally {
      setLoading(false);
      setTypingMessageId(null);
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      send();
    }
  };

  const formatMessage = (text: string) => {
    // Convert markdown-style bold (**text**) to HTML
    return text
      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
      .replace(/\n/g, '<br/>');
  };

  return (
    <div className="h-full flex flex-col">
      <div className="p-4 border-b border-border">
        <h2 className="text-lg font-semibold mb-3">Suggested Questions</h2>
        <div className="flex flex-wrap gap-2">
          {suggestedQuestions.map((q, i) => (
            <button
              key={i}
              onClick={() => send(q)}
              disabled={loading}
              className="px-3 py-1.5 rounded-full border border-border bg-card hover:bg-accent text-sm transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {q}
            </button>
          ))}
        </div>
      </div>

      <div className="flex-1 overflow-auto p-4 space-y-4">
        <AnimatePresence>
          {messages.map((m, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-[80%] rounded-2xl px-4 py-3 ${
                  m.role === 'user'
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-muted'
                }`}
              >
                <div
                  className="prose prose-sm dark:prose-invert max-w-none"
                  dangerouslySetInnerHTML={{ __html: formatMessage(m.text) }}
                />
                {m.citations && m.citations.length > 0 && (
                  <div className="mt-3 pt-3 border-t border-border/50">
                    <div className="text-xs font-medium mb-2 opacity-80">Cited files:</div>
                    <div className="flex flex-wrap gap-2">
                      {m.citations.map((citation) => (
                        <span
                          key={citation.id}
                          className={`text-xs border rounded-lg px-2 py-1 ${
                            m.role === 'user'
                              ? 'border-primary-foreground/30'
                              : 'border-border'
                          }`}
                        >
                          {citation.name}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
                {typingMessageId && i === messages.length - 1 && m.role === 'assistant' && !m.text && (
                  <div className="flex gap-1 mt-2">
                    <div className="w-2 h-2 bg-current rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                    <div className="w-2 h-2 bg-current rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                    <div className="w-2 h-2 bg-current rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                  </div>
                )}
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
        {loading && messages[messages.length - 1]?.role === 'user' && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex justify-start"
          >
            <div className="max-w-[80%] rounded-2xl px-4 py-3 bg-muted">
              <div className="flex gap-1">
                <div className="w-2 h-2 bg-current rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                <div className="w-2 h-2 bg-current rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                <div className="w-2 h-2 bg-current rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
              </div>
            </div>
          </motion.div>
        )}
      </div>

      <div className="p-4 border-t border-border">
        <div className="flex gap-2">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Ask about a deal…"
            disabled={loading}
            className="flex-1 border border-border rounded-xl px-4 py-2 bg-background focus:outline-none focus:ring-2 focus:ring-primary disabled:opacity-50"
          />
          <Button onClick={() => send()} disabled={loading || !input.trim()}>
            <Send size={16} className="mr-2" />
            Send
          </Button>
        </div>
      </div>
    </div>
  );
}

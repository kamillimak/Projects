/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useRef, useEffect } from 'react';
import { MessageSquare, X, Send, Sparkles, AlertCircle, Bot, Zap } from 'lucide-react';

interface ChatbotProps {
  setTab: (tab: string) => void;
}

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

export default function Chatbot({ setTab }: ChatbotProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'assistant',
      content: 'Witaj! Jestem Doradcą Technicznym Teurgium. Pomagam w bezbłędnym doborze płyt gresowych, wsporników regulowanych oraz kruszyw pod Twój wymarzony taras lub podjazd. O co chciałbyś zapytać?',
    }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [errorStatus, setErrorStatus] = useState<string>('');

  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Auto scroll to bottom
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isOpen]);

  const quickQuestions = [
    'Dlaczego taras wentylowany?',
    'Jaka płyta lepsza: Marazzi czy Opoczno?',
    'Płyty 2cm vs 4cm',
    'Jak obliczyć liczbę wsporników?'
  ];

  const handleSendMessage = async (textToSend: string) => {
    if (!textToSend.trim() || isLoading) return;

    setErrorStatus('');
    const userMessage: Message = { role: 'user', content: textToSend };
    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: [...messages, userMessage],
        }),
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.details || 'Problem komunikacji z serwerem.');
      }

      setMessages((prev) => [...prev, { role: 'assistant', content: data.reply }]);
    } catch (err: any) {
      console.error(err);
      setErrorStatus(err.message || 'Wystąpił nieoczekiwany błąd. Spróbuj ponownie.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 text-left font-sans">
      
      {/* FLOATING SPARKLE CHAT TRIGGER BUBBLE */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          aria-label="Open Chatbot Support"
          className="relative h-14 w-14 rounded-full bg-gradient-to-r from-amber-600 to-amber-500 hover:from-amber-500 hover:to-amber-400 text-zinc-950 flex items-center justify-center shadow-2xl transition-all duration-300 transform hover:scale-105"
        >
          <MessageSquare className="h-6 w-6 stroke-[2.5px]" />
          <span className="absolute -top-1 -right-1 flex h-4 w-4">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-4 w-4 bg-amber-500 border border-zinc-950"></span>
          </span>
        </button>
      )}

      {/* CHAT WINDOW INTERFACE */}
      {isOpen && (
        <div className="w-[360px] sm:w-[410px] h-[550px] bg-zinc-950 rounded-2xl border border-zinc-800 shadow-2xl flex flex-col justify-between overflow-hidden animate-in fade-in slide-in-from-bottom-5 duration-300">
          
          {/* Header Block */}
          <div className="bg-zinc-900 px-5 py-4 border-b border-zinc-805 flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="h-9 w-9 bg-amber-500/10 border border-amber-500/30 text-amber-500 rounded-lg flex items-center justify-center">
                <Bot className="h-5 w-5" />
              </div>
              <div>
                <h4 className="font-bold text-sm text-zinc-100 flex items-center">
                  <span>Doradca Teurgium AI</span>
                  <span className="ml-1.5 inline-flex items-center px-1.5 py-0.5 rounded text-[9px] font-mono font-bold bg-amber-500/20 text-amber-400">
                    <Sparkles className="h-2 w-2 mr-0.5" /> LIVE
                  </span>
                </h4>
                <p className="text-[10px] text-zinc-405 font-medium">Asystent Paving & Landscaping</p>
              </div>
            </div>
            
            <button
              onClick={() => setIsOpen(false)}
              className="text-zinc-500 hover:text-white p-1 hover:bg-zinc-800 rounded-md transition-colors"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* Conversation Timeline & History */}
          <div className="flex-grow overflow-y-auto p-4 space-y-4 bg-zinc-950/40">
            {messages.map((msg, i) => (
              <div
                key={i}
                className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[85%] rounded-2xl px-4 py-3 text-xs leading-relaxed whitespace-pre-line ${
                    msg.role === 'user'
                      ? 'bg-amber-600 text-white font-medium rounded-tr-none'
                      : 'bg-zinc-900 border border-zinc-800 text-zinc-200 rounded-tl-none font-light'
                  }`}
                >
                  {msg.content}
                </div>
              </div>
            ))}

            {/* Error alerts indicator */}
            {errorStatus && (
              <div className="flex justify-center">
                <div className="bg-red-500/10 border border-red-500/30 rounded-xl p-3 text-[11px] text-red-400 flex items-start space-x-2 w-full">
                  <AlertCircle className="h-4 w-4 shrink-0" />
                  <span>{errorStatus}</span>
                </div>
              </div>
            )}

            {/* AI waiting loader block */}
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-zinc-900 border border-zinc-800 text-zinc-400 rounded-2xl rounded-tl-none px-4 py-3 text-xs flex items-center space-x-2">
                  <div className="flex space-x-1">
                    <div className="h-1.5 w-1.5 bg-amber-400 rounded-full animate-bounce"></div>
                    <div className="h-1.5 w-1.5 bg-amber-400 rounded-full animate-bounce delay-100"></div>
                    <div className="h-1.5 w-1.5 bg-amber-400 rounded-full animate-bounce delay-200"></div>
                  </div>
                  <span>Inżynier redaguje odpowiedź...</span>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Bottom Area: Quick suggestions & query typing panel */}
          <div className="p-4 bg-zinc-900/50 border-t border-zinc-850 space-y-3">
            
            {/* Quick Suggestions Chips */}
            {messages.length < 3 && (
              <div className="space-y-1">
                <p className="text-[9px] font-mono uppercase tracking-widest text-zinc-500">Szybkie pytania:</p>
                <div className="flex flex-wrap gap-1.5">
                  {quickQuestions.map((q, idx) => (
                    <button
                      key={idx}
                      onClick={() => handleSendMessage(q)}
                      disabled={isLoading}
                      className="text-[10px] bg-zinc-900 hover:bg-zinc-850 text-amber-400 font-semibold px-2 py-1 rounded-md border border-zinc-800 whitespace-nowrap transition-all duration-150 cursor-pointer disabled:opacity-50"
                    >
                      {q}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Typing input */}
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSendMessage(input);
              }}
              className="flex items-center space-x-2"
            >
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                disabled={isLoading}
                placeholder="Zadaj pytanie techniczne o gres lub taras..."
                className="bg-zinc-800 text-zinc-100 text-xs rounded-xl px-3 py-3 flex-grow border border-zinc-700/80 focus:outline-none focus:border-amber-500/85 disabled:opacity-50 font-light"
              />
              <button
                type="submit"
                disabled={isLoading || !input.trim()}
                className="h-10 w-10 bg-amber-500 hover:bg-amber-400 disabled:opacity-50 rounded-xl flex items-center justify-center text-zinc-950 transition-colors"
              >
                <Send className="h-4 w-4" />
              </button>
            </form>

            <span className="text-[9px] text-zinc-500 block text-center">
              Wiedza dostarczana przez silnik Gemini 3.5.
            </span>
          </div>

        </div>
      )}

    </div>
  );
}

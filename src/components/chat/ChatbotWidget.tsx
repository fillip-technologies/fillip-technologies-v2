"use client";

import React, { useState, useRef, useEffect } from "react";
import { MessageSquare, X, Send, Bot, User, Loader2 } from "lucide-react";

type Message = {
  role: "user" | "assistant";
  content: string;
};

const QUICK_PROMPTS = [
  "What services do you offer?",
  "Where is Fillip Technologies located?",
];

export default function ChatbotWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content: "Hello! I am Fillip AI. How can I help you with our IT & Web Development services today?",
    },
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  const handleSend = async (text: string) => {
    if (!text.trim()) return;

    const userMessage: Message = { role: "user", content: text };
    const updatedMessages = [...messages, userMessage];
    setMessages(updatedMessages);
    setInput("");
    setIsLoading(true);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: updatedMessages }),
      });

      if (!response.ok) {
        throw new Error("Failed to get response");
      }

      const data = await response.json();
      setMessages((prev) => [...prev, { role: "assistant", content: data.content }]);
    } catch (error) {
      console.error("Chat error:", error);
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: "Sorry, I am experiencing connection issues. Please try again in a moment.",
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-[9999] font-sans">
      {/* Chat Bubble Button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="relative flex h-14 w-14 items-center justify-center rounded-full bg-[var(--primary)] text-white shadow-xl hover:scale-105 active:scale-95 transition-all duration-300 cursor-pointer group"
          aria-label="Open support chat"
        >
          {/* Pulsing Outer Ring */}
          <span className="absolute inset-0 rounded-full bg-[var(--primary)]/30 animate-ping group-hover:animate-none opacity-75"></span>
          <MessageSquare className="h-6 w-6 relative z-10" />
        </button>
      )}

      {/* Chat Window */}
      {isOpen && (
        <div className="relative flex flex-col w-[360px] sm:w-[400px] h-[550px] max-h-[85vh] rounded-3xl border border-slate-150 bg-white/95 dark:bg-slate-900/95 dark:border-slate-800 shadow-[0_20px_50px_rgba(0,0,0,0.15)] backdrop-blur-md overflow-hidden animate-in slide-in-from-bottom-6 duration-300">
          {/* Header */}
          <div className="flex items-center justify-between p-5 bg-[var(--primary)] text-white">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 border border-white/20">
                <Bot className="h-5 w-5" />
              </div>
              <div>
                <h4 className="font-bold text-sm">Fillip AI Support</h4>
                <div className="flex items-center gap-1.5 mt-0.5">
                  <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse"></span>
                  <span className="text-[10px] text-blue-100 font-medium">Online</span>
                </div>
              </div>
            </div>

            <button
              onClick={() => setIsOpen(false)}
              className="p-1.5 rounded-full hover:bg-white/10 transition cursor-pointer"
              aria-label="Close support chat"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* Messages Area */}
          <div className="flex-1 overflow-y-auto p-5 space-y-4 bg-slate-50/50 dark:bg-slate-955/20">
            {messages.map((msg, idx) => {
              const isUser = msg.role === "user";
              return (
                <div key={idx} className={`flex items-start gap-2.5 ${isUser ? "justify-end" : "justify-start"}`}>
                  {!isUser && (
                    <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-slate-100 dark:bg-slate-800 border border-slate-200/50 dark:border-slate-700 text-slate-500">
                      <Bot className="h-4 w-4" />
                    </div>
                  )}

                  <div
                    className={`max-w-[75%] p-3.5 rounded-2xl text-sm leading-relaxed ${isUser
                      ? "bg-[var(--primary)] text-white rounded-tr-none"
                      : "bg-white dark:bg-slate-900 border border-slate-150 dark:border-slate-800 text-slate-800 dark:text-slate-200 rounded-tl-none shadow-2xs"
                      }`}
                  >
                    {msg.content}
                  </div>

                  {isUser && (
                    <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[var(--primary)]/10 text-[var(--primary)]">
                      <User className="h-4 w-4" />
                    </div>
                  )}
                </div>
              );
            })}

            {/* Loading Indicator */}
            {isLoading && (
              <div className="flex items-start gap-2.5">
                <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-slate-100 dark:bg-slate-800 border border-slate-200/50 dark:border-slate-700 text-slate-500">
                  <Bot className="h-4 w-4" />
                </div>
                <div className="bg-white dark:bg-slate-900 border border-slate-150 dark:border-slate-800 p-3.5 rounded-2xl rounded-tl-none shadow-2xs flex items-center gap-2">
                  <Loader2 className="h-4 w-4 animate-spin text-[var(--primary)]" />
                  <span className="text-xs text-slate-400">Fillip AI is typing...</span>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Quick Prompts */}
          {messages.length === 1 && !isLoading && (
            <div className="px-5 py-3 border-t border-slate-100 dark:border-slate-850 bg-white dark:bg-slate-900 flex flex-col gap-2">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Common Questions</span>
              <div className="flex flex-col gap-1.5">
                {QUICK_PROMPTS.map((prompt) => (
                  <button
                    key={prompt}
                    onClick={() => handleSend(prompt)}
                    className="text-left text-xs p-2 rounded-lg border border-slate-100 hover:border-blue-500/30 hover:bg-blue-50/10 dark:border-slate-800 dark:hover:border-blue-500/30 dark:hover:bg-blue-955/10 text-slate-600 dark:text-slate-400 transition cursor-pointer select-none"
                  >
                    {prompt}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Input Panel */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSend(input);
            }}
            className="p-4 bg-white dark:bg-slate-900 border-t border-slate-100 dark:border-slate-850 flex items-center gap-2"
          >
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask anything about our IT services..."
              disabled={isLoading}
              className="flex-1 px-4 py-2.5 rounded-xl border border-slate-150 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-sm text-slate-800 dark:text-slate-200 placeholder-slate-400 focus:outline-hidden focus:border-blue-500/50"
            />
            <button
              type="submit"
              disabled={isLoading || !input.trim()}
              className="h-10 w-10 shrink-0 flex items-center justify-center rounded-xl bg-[var(--primary)] text-white hover:opacity-90 active:scale-95 disabled:opacity-50 disabled:scale-100 transition duration-300 cursor-pointer"
              aria-label="Send message"
            >
              <Send className="h-4.5 w-4.5" />
            </button>
          </form>
        </div>
      )}
    </div>
  );
}

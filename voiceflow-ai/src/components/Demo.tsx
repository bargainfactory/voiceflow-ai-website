"use client";

import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { Phone, PhoneOff, Send, Mic } from "lucide-react";

const initialMessages = [
  { role: "ai" as const, text: "Hi! I\u2019m the VoiceFlow AI assistant. How can I help you today?" },
  { role: "user" as const, text: "I want to reduce my customer support costs" },
  { role: "ai" as const, text: "Great question! Our AI agents typically reduce support costs by 70%+. What industry are you in?" },
];

export default function Demo() {
  const [calling, setCalling] = useState(false);
  const [callTime, setCallTime] = useState(0);
  const [messages, setMessages] = useState(initialMessages);
  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);
  const chatRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!calling) { setCallTime(0); return; }
    const interval = setInterval(() => setCallTime((t) => t + 1), 1000);
    return () => clearInterval(interval);
  }, [calling]);

  useEffect(() => {
    chatRef.current?.scrollTo({ top: chatRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, typing]);

  const fmt = (s: number) => {
    const m = Math.floor(s / 60).toString().padStart(2, "0");
    const sec = (s % 60).toString().padStart(2, "0");
    return m + ":" + sec;
  };

  const handleSend = () => {
    if (!input.trim()) return;
    setMessages((m) => [...m, { role: "user" as const, text: input.trim() }]);
    setInput("");
    setTyping(true);
    setTimeout(() => {
      setTyping(false);
      setMessages((m) => [
        ...m,
        {
          role: "ai" as const,
          text: "Thanks for your interest! Based on what you\u2019ve shared, I\u2019d recommend our Professional package. Would you like to see a custom demo?",
        },
      ]);
    }, 1500);
  };

  return (
    <section id="demo" className="py-24 grid-bg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            Experience the AI Agent <span className="gradient-text">Live</span>
          </h2>
          <p className="text-slate-400 max-w-2xl mx-auto text-lg">
            Try our voice and chat agents right now &mdash; no signup required.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="glass-card rounded-2xl p-8"
          >
            <h3 className="text-xl font-semibold text-white mb-6 flex items-center gap-2">
              <Mic className="w-5 h-5 text-emerald-400" />
              Voice Agent Demo
            </h3>

            <div className="bg-slate-900/80 rounded-2xl p-8 text-center">
              {!calling ? (
                <>
                  <div className="w-20 h-20 rounded-full bg-emerald-500/20 flex items-center justify-center mx-auto mb-6">
                    <Phone className="w-8 h-8 text-emerald-400" />
                  </div>
                  <p className="text-slate-300 mb-6">Click to start a conversation with our AI voice agent</p>
                  <button
                    onClick={() => setCalling(true)}
                    className="animate-pulse-glow px-8 py-4 bg-emerald-600 hover:bg-emerald-500 text-white font-semibold rounded-xl transition-all hover:scale-105"
                  >
                    Call Our AI Agent
                  </button>
                </>
              ) : (
                <>
                  <div className="flex items-center justify-center gap-1 h-12 mb-4">
                    {[0,1,2,3,4].map((i) => (
                      <div
                        key={i}
                        className="w-1.5 bg-emerald-400 rounded-full"
                        style={{
                          animation: "pulse-glow 0.8s ease-in-out " + String(i * 0.15) + "s infinite alternate",
                          height: String(12 + i * 5) + "px",
                        }}
                      />
                    ))}
                  </div>
                  <p className="text-emerald-400 font-medium mb-1">Connected &mdash; AI Agent Speaking...</p>
                  <p className="text-slate-500 text-sm mb-6">{fmt(callTime)}</p>
                  <button
                    onClick={() => setCalling(false)}
                    className="px-8 py-3 bg-red-600 hover:bg-red-500 text-white font-semibold rounded-xl transition-all"
                  >
                    <PhoneOff className="w-4 h-4 inline mr-2" />
                    End Call
                  </button>
                </>
              )}
            </div>

            <p className="text-slate-500 text-sm mt-4 text-center">
              Powered by Twilio + ElevenLabs voice synthesis
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="glass-card rounded-2xl p-8 flex flex-col"
          >
            <h3 className="text-xl font-semibold text-white mb-6 flex items-center gap-2">
              <Send className="w-5 h-5 text-emerald-400" />
              Chat Agent Demo
            </h3>

            <div
              ref={chatRef}
              className="flex-1 bg-slate-900/80 rounded-2xl p-4 space-y-4 overflow-y-auto min-h-[300px] max-h-[400px]"
            >
              {messages.map((msg, i) => (
                <div
                  key={i}
                  className={"flex " + (msg.role === "user" ? "justify-end" : "justify-start")}
                >
                  <div
                    className={"max-w-[80%] px-4 py-3 rounded-2xl text-sm " + (
                      msg.role === "user"
                        ? "bg-emerald-600 text-white rounded-br-md"
                        : "bg-slate-700 text-slate-200 rounded-bl-md"
                    )}
                  >
                    {msg.text}
                  </div>
                </div>
              ))}
              {typing && (
                <div className="flex justify-start">
                  <div className="bg-slate-700 text-slate-400 px-4 py-3 rounded-2xl rounded-bl-md text-sm">
                    <span className="inline-flex gap-1">
                      <span className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce" />
                      <span className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: "0.15s" }} />
                      <span className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: "0.3s" }} />
                    </span>
                  </div>
                </div>
              )}
            </div>

            <div className="flex gap-2 mt-4">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSend()}
                placeholder="Type a message..."
                className="flex-1 bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 text-sm text-white placeholder:text-slate-500 focus:outline-none focus:border-emerald-500 transition-colors"
              />
              <button
                onClick={handleSend}
                className="px-4 py-3 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl transition-colors"
              >
                <Send className="w-4 h-4" />
              </button>
            </div>

            <p className="text-slate-500 text-sm mt-4 text-center">
              Powered by Voiceflow conversational AI
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

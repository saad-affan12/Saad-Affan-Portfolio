"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageSquare, X, Send, Bot, User, CornerDownLeft } from "lucide-react";

interface Message {
  sender: "user" | "bot";
  text: string;
  isHtml?: boolean;
}

const PRESETS = [
  { label: "Tell me about SuperCX", query: "supercx" },
  { label: "Show AI projects", query: "ai" },
  { label: "Show full stack projects", query: "stack" },
  { label: "What technologies do you know?", query: "tech" },
  { label: "Show roadmap", query: "roadmap" },
  { label: "Download resume", query: "resume" },
  { label: "Contact Saad", query: "contact" }
];

export default function AIAssistant() {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<Message[]>([
    {
      sender: "bot",
      text: "Hi! I am Saad's AI Assistant. Ask me anything about his engineering work, stack, or timeline. Or select a question below:"
    }
  ]);
  const [isTyping, setIsTyping] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  const handleSend = (text: string) => {
    if (!text.trim()) return;

    // Add user message
    setMessages((prev) => [...prev, { sender: "user", text }]);
    setInput("");
    setIsTyping(true);

    // Simulate smart bot response delay
    setTimeout(() => {
      const response = getBotResponse(text);
      setMessages((prev) => [...prev, response]);
      setIsTyping(false);
    }, 800);
  };

  const getBotResponse = (query: string): Message => {
    const q = query.toLowerCase();

    if (q.includes("supercx")) {
      return {
        sender: "bot",
        text: "Saad is currently working as a <strong>Full Stack Developer Intern</strong> at <strong>SuperCX Technologies Pvt Ltd</strong> since May 2026. He collaborates on modular frontend widgets and API endpoints using React, Next.js, Node.js, and MongoDB.",
        isHtml: true
      };
    }
    if (q.includes("ai") || q.includes("ml") || q.includes("machine learning")) {
      return {
        sender: "bot",
        text: "Saad has developed key AI/ML systems:\n\n1. <a href='/projects/smart-ai-attendance-system' class='text-accent hover:underline font-semibold'>Smart AI Attendance System</a>: Face recognition and anti-spoofing terminal with ESP32-CAM and Flask.\n2. <a href='/projects/student-stress-prediction' class='text-accent hover:underline font-semibold'>Student Stress Prediction</a>: Machine learning classification with SVM, PCA, and XGBoost.",
        isHtml: true
      };
    }
    if (q.includes("stack") || q.includes("full stack") || q.includes("project") || q.includes("frontend") || q.includes("backend")) {
      return {
        sender: "bot",
        text: "Saad builds modular, responsive web projects:\n\n1. <a href='/projects/secure-vote-system' class='text-accent hover:underline font-semibold'>Secure Vote System</a>: Next.js platform with RBAC, JWT verification, and MongoDB duplicate prevention.\n2. <a href='/projects/neuroadaptive-ux' class='text-accent hover:underline font-semibold'>NeuroAdaptive UX</a>: Client-side fatigue tracking and layout transitions built with React and Framer Motion.",
        isHtml: true
      };
    }
    if (q.includes("resume") || q.includes("cv") || q.includes("download")) {
      return {
        sender: "bot",
        text: "You can download Saad's software engineering resume here: <a href='/resume.pdf' target='_blank' class='inline-flex items-center gap-1 text-accent hover:underline font-bold'>Download Resume PDF (opens in new tab)</a>",
        isHtml: true
      };
    }
    if (q.includes("tech") || q.includes("skill") || q.includes("tool") || q.includes("languages")) {
      return {
        sender: "bot",
        text: "Saad's toolset includes:\n\n• <strong>Languages</strong>: Python, Java, C++, JavaScript, TypeScript.\n• <strong>Frameworks</strong>: React, Next.js, Express, Flask, Tailwind CSS.\n• <strong>Databases</strong>: MongoDB, MySQL, Firebase.\n• <strong>AI/ML</strong>: TensorFlow, OpenCV, Scikit-learn, XGBoost.",
        isHtml: true
      };
    }
    if (q.includes("roadmap") || q.includes("journey") || q.includes("history")) {
      return {
        sender: "bot",
        text: "Here are some core timeline milestones:\n\n• <strong>May 2026</strong>: Joined SuperCX Technologies as a Full Stack Intern.\n• <strong>Mar 2026</strong>: Developed ML Student Stress Classifier.\n• <strong>2025</strong>: Created SecureVote and Smart AI Attendance IoT Systems.",
        isHtml: true
      };
    }
    if (q.includes("contact") || q.includes("email") || q.includes("hire") || q.includes("linkedin") || q.includes("github")) {
      return {
        sender: "bot",
        text: "Connect with Saad:\n\n• Email: <a href='mailto:saadaffan129@gmail.com' class='text-accent hover:underline'>saadaffan129@gmail.com</a>\n• LinkedIn: <a href='https://www.linkedin.com/in/saad-affan-566553319' target='_blank' class='text-accent hover:underline'>saad-affan-566553319</a>\n• GitHub: <a href='https://github.com/saad-affan12' target='_blank' class='text-accent hover:underline'>saad-affan12</a>",
        isHtml: true
      };
    }

    return {
      sender: "bot",
      text: "I am not completely sure about that query, but feel free to select one of my quick questions below to find what you need!"
    };
  };

  return (
    <>
      {/* Minimized Trigger Bubble */}
      <motion.button
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.5 }}
        onClick={() => setIsOpen(true)}
        className="fixed bottom-32 sm:bottom-20 right-4 sm:right-6 z-50 flex items-center justify-center size-11 sm:size-12 rounded-full border border-border/80 bg-card/90 shadow-xl backdrop-blur-md text-accent hover:border-accent/30 hover:scale-105 active:scale-95 transition-all"
        aria-label="AI Assistant"
      >
        <MessageSquare size={20} />
        <span className="absolute -top-1 -right-1 flex size-3">
          <span className="animate-ping absolute inline-flex size-full rounded-full bg-accent/40 opacity-75" />
          <span className="relative inline-flex size-3 rounded-full bg-accent" />
        </span>
      </motion.button>

      {/* Chat Window Panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 30, scale: 0.95 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="fixed bottom-4 sm:bottom-8 right-4 sm:right-6 z-[999] w-[90vw] max-w-[360px] h-[500px] flex flex-col rounded-2xl border border-border/60 bg-card/95 shadow-2xl backdrop-blur-xl overflow-hidden"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-4 py-3 border-b border-border/40 bg-black/[0.1]">
              <div className="flex items-center gap-2">
                <div className="size-2 rounded-full bg-accent animate-pulse" />
                <span className="text-xs font-bold font-mono tracking-wide uppercase text-foreground">
                  Ask Saad (AI Assistant)
                </span>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="rounded-lg p-1 text-muted-foreground hover:text-foreground hover:bg-white/5 transition-colors"
              >
                <X size={16} />
              </button>
            </div>

            {/* Messages Scroll Area */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.map((msg, i) => (
                <div
                  key={i}
                  className={`flex gap-2.5 max-w-[85%] ${
                    msg.sender === "user" ? "ml-auto flex-row-reverse" : "mr-auto"
                  }`}
                >
                  <div
                    className={`size-6 rounded-md flex items-center justify-center shrink-0 border ${
                      msg.sender === "user"
                        ? "bg-accent/10 border-accent/20 text-accent"
                        : "bg-white/[0.03] border-white/[0.08] text-muted-foreground"
                    }`}
                  >
                    {msg.sender === "user" ? <User size={12} /> : <Bot size={12} />}
                  </div>
                  <div
                    className={`rounded-xl px-3 py-2 text-xs leading-relaxed ${
                      msg.sender === "user"
                        ? "bg-accent text-white"
                        : "bg-white/[0.03] border border-white/[0.05] text-muted-foreground"
                    }`}
                  >
                    {msg.isHtml ? (
                      <div
                        dangerouslySetInnerHTML={{ __html: msg.text }}
                        className="space-y-1.5 [&_a]:underline [&_a]:text-accent hover:[&_a]:brightness-110"
                      />
                    ) : (
                      <p className="whitespace-pre-line">{msg.text}</p>
                    )}
                  </div>
                </div>
              ))}

              {isTyping && (
                <div className="flex gap-2.5 max-w-[85%] mr-auto">
                  <div className="size-6 rounded-md flex items-center justify-center shrink-0 border bg-white/[0.03] border-white/[0.08] text-muted-foreground">
                    <Bot size={12} />
                  </div>
                  <div className="rounded-xl px-3 py-2 text-xs bg-white/[0.03] border border-white/[0.05] text-muted-foreground flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-muted-foreground/40 animate-bounce" style={{ animationDelay: "0ms" }} />
                    <span className="w-1.5 h-1.5 rounded-full bg-muted-foreground/40 animate-bounce" style={{ animationDelay: "150ms" }} />
                    <span className="w-1.5 h-1.5 rounded-full bg-muted-foreground/40 animate-bounce" style={{ animationDelay: "300ms" }} />
                  </div>
                </div>
              )}
              <div ref={chatEndRef} />
            </div>

            {/* Quick Presets Section */}
            <div className="px-4 py-2 border-t border-border/40 bg-black/[0.05] flex gap-1.5 overflow-x-auto scrollbar-none shrink-0">
              {PRESETS.map((preset) => (
                <button
                  key={preset.label}
                  onClick={() => handleSend(preset.label)}
                  className="rounded-full border border-border/80 bg-card px-2.5 py-1 text-[10px] text-muted-foreground hover:text-foreground hover:border-accent/40 whitespace-nowrap transition-colors"
                >
                  {preset.label}
                </button>
              ))}
            </div>

            {/* Custom Input Bar */}
            <div className="p-3 border-t border-border/40 bg-black/[0.1] flex items-center gap-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") handleSend(input);
                }}
                placeholder="Ask custom question..."
                className="flex-1 bg-transparent text-xs text-foreground outline-none placeholder:text-muted-foreground/50 border border-white/[0.06] rounded-lg px-2.5 py-1.5 focus:border-accent/35 transition-colors"
              />
              <button
                onClick={() => handleSend(input)}
                className="rounded-lg bg-accent p-1.5 text-white hover:brightness-110 active:scale-95 transition-all"
                aria-label="Send message"
              >
                <Send size={12} />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

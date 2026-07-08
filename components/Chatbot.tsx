"use client";

import { FormEvent, useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Bot, Loader, MessageCircle, Mic, MicOff, Send, Sparkles, Trash2, X } from "lucide-react";
import { callOpenRouterChatbot, type ChatMessage } from "@/lib/openrouter";
import { useConversationStorage } from "@/hooks/useConversationStorage";
import { useRateLimit } from "@/hooks/useRateLimit";

interface UIMessage {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: number;
}

type SpeechRecognitionResultLike = {
  0: { transcript: string };
};

type SpeechRecognitionEventLike = {
  results: Iterable<SpeechRecognitionResultLike>;
};

type SpeechRecognitionErrorEventLike = {
  error: string;
};

type SpeechRecognitionLike = {
  continuous: boolean;
  interimResults: boolean;
  lang: string;
  onresult: ((event: SpeechRecognitionEventLike) => void) | null;
  onerror: ((event: SpeechRecognitionErrorEventLike) => void) | null;
  onend: (() => void) | null;
  start: () => void;
  stop: () => void;
};

type SpeechRecognitionConstructor = new () => SpeechRecognitionLike;

type SpeechWindow = Window & {
  SpeechRecognition?: SpeechRecognitionConstructor;
  webkitSpeechRecognition?: SpeechRecognitionConstructor;
};

const STARTERS = [
  "What is Ayush strongest project?",
  "Summarize his AI/ML skills",
  "Is he open to internships?",
];

function createMessage(role: UIMessage["role"], content: string): UIMessage {
  return {
    id: `msg-${Date.now()}-${Math.random().toString(16).slice(2)}`,
    role,
    content,
    timestamp: Date.now(),
  };
}

export function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [uiMessages, setUiMessages] = useState<UIMessage[]>([]);
  const [isListening, setIsListening] = useState(false);
  const [showClearPreview, setShowClearPreview] = useState(false);
  const [unreadCount, setUnreadCount] = useState(0);
  const [inlineError, setInlineError] = useState<string | null>(null);

  const { canSendMessage, getStatus, reset } = useRateLimit(500);
  const {
    history,
    addMessage,
    clearHistory,
    getHistoryForAPI,
    isLoading: storageLoading,
  } = useConversationStorage();

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const recognitionRef = useRef<SpeechRecognitionLike | null>(null);
  const chatbotRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  const rateLimitStatus = getStatus();
  const speechSupported = Boolean(recognitionRef.current);
  const hasMessages = uiMessages.length > 0;

  const introMessage = useMemo(
    () =>
      "Ask about Ayush's projects, AI engineering focus, stack, education, or fit for internships. I answer from the portfolio context.",
    [],
  );

  useEffect(() => {
    if (!storageLoading) {
      setUiMessages(history);
    }
  }, [history, storageLoading]);

  useEffect(() => {
    if (isOpen) {
      setUnreadCount(0);
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
      window.setTimeout(() => inputRef.current?.focus(), 120);
    }
  }, [isOpen, uiMessages]);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      const target = event.target as Node;
      if (
        isOpen &&
        chatbotRef.current &&
        !chatbotRef.current.contains(target) &&
        buttonRef.current &&
        !buttonRef.current.contains(target)
      ) {
        setIsOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen]);

  useEffect(() => {
    const SpeechRecognition =
      (window as SpeechWindow).webkitSpeechRecognition ||
      (window as SpeechWindow).SpeechRecognition;

    if (!SpeechRecognition || recognitionRef.current) {
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.continuous = false;
    recognition.interimResults = false;
    recognition.lang = "en-US";
    recognition.onresult = (event) => {
      const transcript = Array.from(event.results)
        .map((result) => result[0].transcript)
        .join("");
      setInputValue((prev) => `${prev}${prev ? " " : ""}${transcript}`);
      setIsListening(false);
    };
    recognition.onerror = (event) => {
      setInlineError(`Speech input stopped: ${event.error}`);
      setIsListening(false);
    };
    recognition.onend = () => setIsListening(false);
    recognitionRef.current = recognition;
  }, []);

  async function sendMessage(content: string) {
    const userMessage = content.trim();
    if (!userMessage || isLoading) {
      return;
    }

    if (!canSendMessage()) {
      setInlineError(`Wait ${getStatus().secondsUntilNext}s before sending again.`);
      return;
    }

    setInputValue("");
    setInlineError(null);
    setIsLoading(true);

    const userMessageObj = createMessage("user", userMessage);
    setUiMessages((prev) => [...prev, userMessageObj]);
    addMessage("user", userMessage);

    try {
      const apiHistory: ChatMessage[] = [
        ...getHistoryForAPI(),
        { role: "user", content: userMessage },
      ];
      const response = await callOpenRouterChatbot(apiHistory);
      const assistantText = response.success && response.message
        ? response.message
        : `I could not reach the AI backend right now. Quick fallback: Ayush builds AI/ML products around RAG, agentic systems, FastAPI, and production-oriented ML workflows.`;

      const assistantMessageObj = createMessage("assistant", assistantText);
      setUiMessages((prev) => [...prev, assistantMessageObj]);
      addMessage("assistant", assistantText);

      if (!isOpen) {
        setUnreadCount((prev) => prev + 1);
      }
    } catch {
      const fallback = createMessage(
        "assistant",
        "Something went wrong while contacting the assistant. You can still explore the project and skills sections for the strongest portfolio signals.",
      );
      setUiMessages((prev) => [...prev, fallback]);
      setInlineError("Assistant backend unavailable.");
    } finally {
      setIsLoading(false);
    }
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    void sendMessage(inputValue);
  }

  function handleToggleSpeech() {
    if (!recognitionRef.current) {
      setInlineError("Speech recognition is not supported in this browser.");
      return;
    }

    if (isListening) {
      recognitionRef.current.stop();
      setIsListening(false);
      return;
    }

    setInlineError(null);
    setIsListening(true);
    recognitionRef.current.start();
  }

  function handleConfirmClear() {
    clearHistory();
    reset();
    setUiMessages([]);
    setShowClearPreview(false);
    setInlineError(null);
  }

  return (
    <>
      <AnimatePresence>
        {!isOpen && (
          <motion.div
            className="fixed bottom-4 right-4 z-50 flex flex-col items-end gap-2"
            initial={{ opacity: 0, scale: 0.9, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 16 }}
          >
            <div className="hidden rounded-full border border-zinc-800 bg-zinc-900/90 px-3 py-1.5 text-xs text-zinc-300 shadow-lg shadow-black/30 backdrop-blur sm:block">
              Ask the portfolio assistant
            </div>
            <motion.button
              ref={buttonRef}
              onClick={() => setIsOpen(true)}
              className="relative flex h-14 w-14 items-center justify-center rounded-full border border-indigo-400/40 bg-indigo-500 text-white shadow-lg shadow-indigo-950/50 transition-colors hover:bg-indigo-400"
              aria-label="Open portfolio assistant"
              whileHover={{ scale: 1.06 }}
              whileTap={{ scale: 0.96 }}
            >
              <MessageCircle size={23} />
              {unreadCount > 0 && (
                <span className="absolute -right-1 -top-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-rose-500 px-1 text-[10px] font-bold">
                  {unreadCount > 9 ? "9+" : unreadCount}
                </span>
              )}
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            ref={chatbotRef}
            className="fixed inset-x-3 bottom-3 z-50 flex h-[min(620px,calc(100vh-24px))] flex-col overflow-hidden rounded-lg border border-zinc-800 bg-zinc-950 shadow-2xl shadow-black/70 sm:inset-x-auto sm:right-4 sm:h-[580px] sm:w-[420px]"
            initial={{ opacity: 0, scale: 0.94, y: 24 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.94, y: 24 }}
            transition={{ duration: 0.2 }}
          >
            <div className="flex items-center justify-between border-b border-zinc-800 bg-zinc-950/95 p-4">
              <div className="flex items-center gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-lg border border-indigo-500/40 bg-indigo-500/10 text-indigo-300">
                  <Bot size={18} />
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-zinc-100">Ayush Assistant</h3>
                  <p className="text-xs text-zinc-500">Portfolio context, projects, skills</p>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="rounded-md p-2 text-zinc-400 transition-colors hover:bg-zinc-900 hover:text-zinc-100"
                aria-label="Close portfolio assistant"
              >
                <X size={18} />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-4">
              {!hasMessages && !storageLoading ? (
                <div className="space-y-4">
                  <div className="rounded-lg border border-zinc-800 bg-zinc-900/50 p-4">
                    <div className="mb-3 flex items-center gap-2 text-indigo-300">
                      <Sparkles size={16} />
                      <span className="text-xs font-semibold uppercase tracking-widest" style={{ fontFamily: "var(--font-jetbrains-mono)" }}>
                        Recruiter mode
                      </span>
                    </div>
                    <p className="text-sm leading-relaxed text-zinc-300">{introMessage}</p>
                  </div>

                  <div className="space-y-2">
                    {STARTERS.map((starter) => (
                      <button
                        key={starter}
                        onClick={() => void sendMessage(starter)}
                        className="w-full rounded-md border border-zinc-800 bg-zinc-900/50 px-3 py-2 text-left text-sm text-zinc-300 transition-colors hover:border-indigo-500/50 hover:text-zinc-100"
                      >
                        {starter}
                      </button>
                    ))}
                  </div>
                </div>
              ) : (
                <div className="space-y-3">
                  {uiMessages.map((message) => (
                    <div
                      key={message.id}
                      className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}
                    >
                      <div
                        className={`max-w-[86%] rounded-lg px-3.5 py-2.5 text-sm leading-relaxed ${
                          message.role === "user"
                            ? "bg-indigo-500 text-white"
                            : "border border-zinc-800 bg-zinc-900 text-zinc-200"
                        }`}
                      >
                        <div className="whitespace-pre-wrap break-words">{message.content}</div>
                      </div>
                    </div>
                  ))}

                  {isLoading && (
                    <div className="flex justify-start">
                      <div className="flex items-center gap-2 rounded-lg border border-zinc-800 bg-zinc-900 px-3 py-2 text-sm text-zinc-400">
                        <Loader size={15} className="animate-spin" />
                        Thinking through the portfolio...
                      </div>
                    </div>
                  )}

                  <div ref={messagesEndRef} />
                </div>
              )}
            </div>

            <div className="border-t border-zinc-800 bg-zinc-950 p-3">
              {inlineError && (
                <p className="mb-2 rounded-md border border-amber-500/20 bg-amber-500/10 px-3 py-2 text-xs text-amber-200">
                  {inlineError}
                </p>
              )}

              {showClearPreview && (
                <div className="mb-3 rounded-md border border-zinc-800 bg-zinc-900 p-3">
                  <p className="text-xs text-zinc-300">Clear this conversation?</p>
                  <div className="mt-3 flex gap-2">
                    <button
                      onClick={() => setShowClearPreview(false)}
                      className="flex-1 rounded-md bg-zinc-800 px-3 py-1.5 text-xs text-zinc-300 hover:bg-zinc-700"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={handleConfirmClear}
                      className="flex-1 rounded-md bg-rose-600 px-3 py-1.5 text-xs text-white hover:bg-rose-500"
                    >
                      Clear
                    </button>
                  </div>
                </div>
              )}

              {!rateLimitStatus.allowed && (
                <p className="mb-2 text-xs text-zinc-500">Wait {rateLimitStatus.secondsUntilNext}s before the next message.</p>
              )}

              <form onSubmit={handleSubmit} className="flex items-center gap-2">
                <input
                  ref={inputRef}
                  value={inputValue}
                  onChange={(event) => setInputValue(event.target.value)}
                  placeholder="Ask about projects, RAG, skills..."
                  disabled={isLoading || !rateLimitStatus.allowed}
                  className="min-w-0 flex-1 rounded-md border border-zinc-800 bg-zinc-900 px-3 py-2 text-sm text-zinc-100 outline-none transition-colors placeholder:text-zinc-500 focus:border-indigo-500 disabled:cursor-not-allowed disabled:opacity-60"
                />
                <button
                  type="button"
                  onClick={handleToggleSpeech}
                  disabled={isLoading || !rateLimitStatus.allowed || !speechSupported}
                  className={`rounded-md border px-3 py-2 transition-colors ${
                    isListening
                      ? "border-rose-400/50 bg-rose-500/20 text-rose-200"
                      : "border-zinc-800 bg-zinc-900 text-zinc-300 hover:border-zinc-700 hover:text-zinc-100"
                  } disabled:cursor-not-allowed disabled:opacity-45`}
                  aria-label={isListening ? "Stop speech input" : "Start speech input"}
                >
                  {isListening ? <MicOff size={17} /> : <Mic size={17} />}
                </button>
                <button
                  type="submit"
                  disabled={isLoading || !inputValue.trim() || !rateLimitStatus.allowed}
                  className="rounded-md bg-indigo-500 px-3 py-2 text-white transition-colors hover:bg-indigo-400 disabled:cursor-not-allowed disabled:bg-zinc-800 disabled:text-zinc-500"
                  aria-label="Send message"
                >
                  {isLoading ? <Loader size={17} className="animate-spin" /> : <Send size={17} />}
                </button>
              </form>

              {hasMessages && (
                <button
                  onClick={() => setShowClearPreview(true)}
                  className="mt-2 inline-flex items-center gap-1.5 rounded-md px-2 py-1 text-xs text-zinc-500 transition-colors hover:bg-zinc-900 hover:text-zinc-300"
                >
                  <Trash2 size={13} />
                  Clear conversation
                </button>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

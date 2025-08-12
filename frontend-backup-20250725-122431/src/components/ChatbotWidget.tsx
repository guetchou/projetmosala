import React, { useState, useRef, useEffect } from "react";
import ChatbotAvatar from "./ChatbotAvatar";
import faqMosala from "../faq-mosala.json";
import { motion, AnimatePresence } from "framer-motion";
import { Send, MessageCircle, X, Minimize2, Maximize2, Phone, Mail, ExternalLink } from "lucide-react";

const initialMessages = [
  {
    from: "bot",
    text: "Bonjour ! Je suis MosalaBot, votre assistant virtuel. Je peux vous aider avec des questions sur le projet Mosala, l'emploi, l'accompagnement, ou vous connecter directement à un conseiller humain. Que puis-je faire pour vous ?",
    timestamp: new Date()
  }
];

const ChatbotWidget = () => {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState(initialMessages);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [chatMode, setChatMode] = useState<"bot" | "human">("bot");
  const [isMinimized, setIsMinimized] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [showFAQ, setShowFAQ] = useState(true);
  const [unreadCount, setUnreadCount] = useState(0);

  useEffect(() => {
    if (open && messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, open]);

  // Permettre l'ouverture via un événement custom
  useEffect(() => {
    const handler = () => setOpen(true);
    window.addEventListener("open-mosala-chatbot", handler);
    return () => window.removeEventListener("open-mosala-chatbot", handler);
  }, []);

  // Simuler des notifications si le chat est fermé
  useEffect(() => {
    if (!open && messages.length > 1) {
      setUnreadCount(prev => prev + 1);
    } else if (open) {
      setUnreadCount(0);
    }
  }, [messages, open]);

  // 1. Ajout de la persistance d'état (open) via localStorage
  useEffect(() => {
    const persisted = localStorage.getItem('mosala-chatbot-open');
    if (persisted === 'true') setOpen(true);
  }, []);
  useEffect(() => {
    localStorage.setItem('mosala-chatbot-open', open ? 'true' : 'false');
  }, [open]);

  const simulateTyping = () => {
    setIsTyping(true);
    setTimeout(() => setIsTyping(false), 1500);
  };

  const handleSend = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!input.trim()) return;

    const userMessage = { from: "user", text: input, timestamp: new Date() };
    setMessages((msgs) => [...msgs, userMessage]);
    
    simulateTyping();
    
    // Simule une réponse intelligente du bot
    setTimeout(() => {
      let botResponse = "";
      
      const lowerInput = input.toLowerCase();
      if (lowerInput.includes("emploi") || lowerInput.includes("travail") || lowerInput.includes("job")) {
        botResponse = "Je peux vous aider à trouver des opportunités d'emploi ! Consultez notre section 'Emplois' ou je peux vous connecter à un conseiller spécialisé en insertion professionnelle.";
      } else if (lowerInput.includes("formation") || lowerInput.includes("apprendre") || lowerInput.includes("étudier")) {
        botResponse = "Excellent ! Nous proposons de nombreuses formations. Voulez-vous découvrir nos programmes de formation ou parler à un conseiller en orientation ?";
      } else if (lowerInput.includes("caravane") || lowerInput.includes("événement")) {
        botResponse = "La Caravane Mosala visite 6 villes du Congo ! Je peux vous informer sur les prochaines dates et vous aider à vous inscrire aux événements.";
      } else if (lowerInput.includes("humain") || lowerInput.includes("conseiller") || lowerInput.includes("agent")) {
        botResponse = "Parfait ! Je vais vous connecter à un conseiller humain. En attendant, voici nos contacts directs : WhatsApp +242 06 123 45 67 ou email contact@mosala.org";
        setChatMode("human");
      } else {
        botResponse = "Merci pour votre question ! Je peux vous aider avec l'emploi, les formations, la Caravane Mosala, ou vous connecter à un conseiller humain. Que souhaitez-vous savoir ?";
      }
      
      setMessages((msgs) => [
        ...msgs,
        { from: "bot", text: botResponse, timestamp: new Date() }
      ]);
    }, 1500);
    
    setInput("");
  };

  const handleFAQClick = (q: string, a: string) => {
    setMessages((msgs) => [
      ...msgs,
      { from: "user", text: q, timestamp: new Date() },
      { from: "bot", text: a, timestamp: new Date() }
    ]);
    setShowFAQ(false);
  };

  const switchToHumanChat = () => {
    setChatMode("human");
    setMessages((msgs) => [
      ...msgs,
      { from: "bot", text: "Je vous connecte à un conseiller humain. Un agent Mosala va vous répondre dans les plus brefs délais !", timestamp: new Date() }
    ]);
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <>
      {/* Bulle flottante avec notification */}
      <motion.button
        className="fixed z-[1000] bottom-4 right-4 md:bottom-6 md:right-6 bg-gradient-to-br from-[var(--color-mosala-green-400)] to-[var(--color-mosala-green-600)] rounded-full shadow-lg p-2 flex items-center justify-center hover:scale-105 transition-all focus:outline-none border-2 border-[var(--color-mosala-green-200)] md:w-16 md:h-16 w-12 h-12"
        style={{ boxShadow: '0 4px 24px rgba(100, 118, 243, 0.18)' }}
        aria-label={open ? "Fermer le chat Mosala" : "Ouvrir le chat Mosala"}
        onClick={() => setOpen((v) => !v)}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <ChatbotAvatar size={open ? 44 : 32} isTyping={isTyping} />
        
        {/* Badge notification */}
        <AnimatePresence>
          {unreadCount > 0 && (
            <motion.div
              className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full w-6 h-6 flex items-center justify-center"
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0, opacity: 0 }}
            >
              {unreadCount > 9 ? "9+" : unreadCount}
            </motion.div>
          )}
        </AnimatePresence>
      </motion.button>

      {/* Fenêtre de chat */}
      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed z-[1001] bottom-20 right-2 md:bottom-24 md:right-6 w-full max-w-xs md:max-w-md bg-white/90 rounded-2xl border-2 border-[var(--color-mosala-green-200)] shadow-2xl glassmorphism-depth overflow-hidden backdrop-blur-lg"
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            style={{ boxShadow: '0 8px 32px rgba(100, 118, 243, 0.18)' }}
          >
            {/* Header Argon style */}
            <div className="flex items-center gap-3 px-4 py-3 bg-gradient-to-r from-[var(--color-mosala-green-500)] to-[var(--color-mosala-green-700)] rounded-t-2xl border-b-2 border-[var(--color-mosala-green-200)]">
              <ChatbotAvatar size={32} isTyping={isTyping} />
              <div className="flex-1">
                <div className="font-bold text-white text-lg">MosalaBot</div>
                <div className="text-xs text-green-100">
                  {chatMode === "bot" ? "Assistant virtuel" : "Conseiller humain"}
                </div>
              </div>
              <div className="flex items-center gap-1">
                <button
                  className="text-green-100 hover:text-white p-1 rounded transition-colors"
                  onClick={() => setIsMinimized(!isMinimized)}
                  aria-label={isMinimized ? "Agrandir" : "Réduire"}
                >
                  {isMinimized ? <Maximize2 size={16} /> : <Minimize2 size={16} />}
                </button>
                <button
                  className="text-green-100 hover:text-white text-xl font-bold px-2 focus:outline-none"
                  onClick={() => setOpen(false)}
                  aria-label="Fermer le chat"
                >
                  ×
                </button>
              </div>
            </div>
            {/* Contenu principal */}
            {!isMinimized && (
              <>
                {/* Messages */}
                <div className="flex-1 overflow-y-auto px-2 py-2 md:px-4 md:py-3 space-y-3 bg-white/80" style={{ maxHeight: 400 }}>
                  {messages.map((msg, i) => (
                    <motion.div
                      key={i}
                      className={`flex ${msg.from === "bot" ? "items-start" : "justify-end"}`}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.1 }}
                    >
                      {msg.from === "bot" && <ChatbotAvatar size={28} isTyping={isTyping} />}
                      <div className="flex flex-col max-w-[80%]">
                        <div
                          className={`px-3 py-2 rounded-xl text-sm shadow-sm ${
                            msg.from === "bot"
                              ? "bg-white text-gray-800 border border-gray-200"
                              : "bg-gradient-to-r from-gray-600 to-gray-700 text-white"
                          }`}
                        >
                          {msg.text}
                        </div>
                        <div className={`text-xs text-gray-500 mt-1 ${msg.from === "bot" ? "text-left" : "text-right"}`}>
                          {formatTime(msg.timestamp)}
                        </div>
                      </div>
                    </motion.div>
                  ))}
                  
                  {/* Indicateur de frappe */}
                  {isTyping && (
                    <motion.div
                      className="flex items-start"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                    >
                      <ChatbotAvatar size={28} isTyping={true} />
                      <div className="ml-2 px-3 py-2 rounded-xl bg-white border border-gray-200">
                        <div className="flex space-x-1">
                          <motion.div
                            className="w-2 h-2 bg-gray-400 rounded-full"
                            animate={{ scale: [1, 1.5, 1] }}
                            transition={{ duration: 0.6, repeat: Infinity, delay: 0 }}
                          />
                          <motion.div
                            className="w-2 h-2 bg-gray-400 rounded-full"
                            animate={{ scale: [1, 1.5, 1] }}
                            transition={{ duration: 0.6, repeat: Infinity, delay: 0.2 }}
                          />
                          <motion.div
                            className="w-2 h-2 bg-gray-400 rounded-full"
                            animate={{ scale: [1, 1.5, 1] }}
                            transition={{ duration: 0.6, repeat: Infinity, delay: 0.4 }}
                          />
                        </div>
                      </div>
                    </motion.div>
                  )}
                  
                  <div ref={messagesEndRef} />
                  
                  {/* FAQ et contacts */}
                  {showFAQ && (
                    <motion.div
                      className="mt-4"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                    >
                      <div className="font-semibold text-gray-800 mb-3">Questions fréquentes :</div>
                      <div className="flex flex-col gap-2 mb-4">
                        {faqMosala.slice(0, 3).map((item, idx) => (
                          <button
                            key={idx}
                            className="text-left px-3 py-2 rounded-lg bg-white hover:bg-gray-50 text-gray-700 text-sm font-medium border border-gray-200 transition-all"
                            onClick={() => handleFAQClick(item.question, item.answer)}
                          >
                            {item.question}
                          </button>
                        ))}
                      </div>
                      
                      <div className="border-t pt-3">
                        <div className="text-xs text-gray-600 mb-3">Besoin d'aide humaine ?</div>
                        <div className="flex flex-wrap gap-2">
                          <button
                            onClick={switchToHumanChat}
                            className="bg-orange-500 hover:bg-orange-600 text-white px-3 py-2 rounded-lg text-xs font-bold transition-all flex items-center gap-1"
                          >
                            <MessageCircle size={12} />
                            Agent humain
                          </button>
                          <a
                            href="https://wa.me/242061234567"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="bg-green-500 hover:bg-green-600 text-white px-3 py-2 rounded-lg text-xs font-bold transition-all flex items-center gap-1"
                          >
                            <Phone size={12} />
                            WhatsApp
                          </a>
                          <a
                            href="mailto:contact@mosala.org"
                            className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-2 rounded-lg text-xs font-bold transition-all flex items-center gap-1"
                          >
                            <Mail size={12} />
                            Email
                          </a>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </div>

                {/* Input Argon style */}
                <form onSubmit={handleSend} className="flex items-center gap-2 px-2 py-2 md:px-4 md:py-3 border-t bg-white/90 rounded-b-2xl">
                  <input
                    type="text"
                    className="flex-1 px-3 py-2 rounded-lg border-2 border-[var(--color-mosala-green-200)] focus:ring-2 focus:ring-[var(--color-mosala-green-400)] focus:border-transparent outline-none text-sm bg-white/80"
                    placeholder="Écrivez votre message..."
                    value={input}
                    onChange={e => setInput(e.target.value)}
                    aria-label="Message au chatbot Mosala"
                    autoFocus
                  />
                  <motion.button
                    type="submit"
                    className="bg-gradient-to-r from-[var(--color-mosala-green-500)] to-[var(--color-mosala-green-700)] text-white p-2 rounded-lg font-bold shadow hover:scale-105 transition-all disabled:opacity-50 border-2 border-[var(--color-mosala-green-200)]"
                    disabled={!input.trim()}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    aria-label="Envoyer"
                  >
                    <Send size={16} />
                  </motion.button>
                </form>
              </>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default ChatbotWidget; 
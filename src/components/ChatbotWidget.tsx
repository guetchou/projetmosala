import React, { useState, useRef, useEffect } from "react";
import ChatbotAvatar from "./ChatbotAvatar";
import faqMosala from "../faq-mosala.json";

const initialMessages = [
  {
    from: "bot",
    text: "Bonjour, je suis MosalaBot ! Pose-moi toutes tes questions sur la plateforme Mosala, l’emploi, l’accompagnement, ou demande à parler à un conseiller humain."
  }
];

const ChatbotWidget = () => {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState(initialMessages);
  const [input, setInput] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [showFAQ, setShowFAQ] = useState(true);

  useEffect(() => {
    if (open && messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, open]);

  const handleSend = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!input.trim()) return;
    setMessages((msgs) => [
      ...msgs,
      { from: "user", text: input }
    ]);
    // Simule une réponse du bot (à remplacer par appel API plus tard)
    setTimeout(() => {
      setMessages((msgs) => [
        ...msgs,
        { from: "bot", text: "Merci pour ta question ! Un conseiller Mosala va te répondre ou consulte la FAQ ci-dessous." }
      ]);
    }, 900);
    setInput("");
  };

  const handleFAQClick = (q: string, a: string) => {
    setMessages((msgs) => [
      ...msgs,
      { from: "user", text: q },
      { from: "bot", text: a }
    ]);
    setShowFAQ(false);
  };

  return (
    <>
      {/* Bulle flottante */}
      <button
        className="fixed z-50 bottom-6 right-6 bg-gradient-to-br from-[#6E45E2] to-[#00FFFF] rounded-full shadow-lg p-2 flex items-center justify-center hover:scale-105 transition-all focus:outline-none"
        style={{ width: 64, height: 64 }}
        aria-label={open ? "Fermer le chat Mosala" : "Ouvrir le chat Mosala"}
        onClick={() => setOpen((v) => !v)}
      >
        <ChatbotAvatar size={44} />
      </button>

      {/* Fenêtre de chat */}
      {open && (
        <div className="fixed z-50 bottom-24 right-6 w-80 max-w-[95vw] bg-white rounded-2xl shadow-2xl border border-[#6E45E2]/30 flex flex-col animate-fade-in">
          {/* Header */}
          <div className="flex items-center gap-3 px-4 py-3 bg-gradient-to-r from-[#6E45E2] to-[#00FFFF] rounded-t-2xl">
            <ChatbotAvatar size={32} />
            <div className="flex-1">
              <div className="font-bold text-white text-lg">MosalaBot</div>
              <div className="text-xs text-white/80">Coach virtuel Mosala</div>
            </div>
            <button
              className="text-white/80 hover:text-white text-xl font-bold px-2 focus:outline-none"
              onClick={() => setOpen(false)}
              aria-label="Fermer le chat"
            >
              ×
            </button>
          </div>
          {/* Messages */}
          <div className="flex-1 overflow-y-auto px-4 py-3 space-y-3 bg-[var(--color-mosala-dark-50)]" style={{ maxHeight: 320 }}>
            {messages.map((msg, i) => (
              <div key={i} className={`flex ${msg.from === "bot" ? "items-start" : "justify-end"}`}>
                {msg.from === "bot" && <ChatbotAvatar size={28} />}
                <div
                  className={`ml-2 px-3 py-2 rounded-xl text-sm max-w-[80%] shadow-sm ${
                    msg.from === "bot"
                      ? "bg-[var(--color-mosala-white)] text-[var(--color-mosala-dark-900)] border border-[var(--color-mosala-green-200)]/10"
                      : "bg-gradient-to-r from-[var(--color-mosala-green-600)] to-[var(--color-mosala-green-200)] text-[var(--color-mosala-white)]"
                  }`}
                >
                  {msg.text}
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
            {showFAQ && (
              <div className="mt-4">
                <div className="font-semibold text-[#6E45E2] mb-2">Questions fréquentes :</div>
                <div className="flex flex-col gap-2">
                  {faqMosala.map((item, idx) => (
                    <button
                      key={idx}
                      className="text-left px-3 py-2 rounded-lg bg-[#6E45E2]/10 hover:bg-[#6E45E2]/20 text-[#18182f] text-sm font-medium border border-[#6E45E2]/10 transition-all"
                      onClick={() => handleFAQClick(item.question, item.answer)}
                    >
                      {item.question}
                    </button>
                  ))}
                </div>
                <div className="mt-4 flex flex-col gap-2">
                  <div className="text-xs text-[#18182f]/70">Besoin d'aide humaine ou d'un contact direct ?</div>
                  <div className="flex gap-2">
                    <a href="https://wa.me/242061234567" target="_blank" rel="noopener noreferrer" className="bg-[#25D366]/90 hover:bg-[#25D366] text-white px-3 py-2 rounded-lg text-xs font-bold flex items-center gap-1 transition-all"><span>WhatsApp</span></a>
                    <a href="https://m.me/mosala" target="_blank" rel="noopener noreferrer" className="bg-[#006AFF]/90 hover:bg-[#006AFF] text-white px-3 py-2 rounded-lg text-xs font-bold flex items-center gap-1 transition-all"><span>Messenger</span></a>
                    <button onClick={() => setMessages(msgs => [...msgs, { from: "user", text: "Je veux parler à un conseiller humain." }, { from: "bot", text: "Un conseiller Mosala va vous répondre rapidement !" }])} className="bg-[#F9D923]/90 hover:bg-[#F9D923] text-[#18182f] px-3 py-2 rounded-lg text-xs font-bold transition-all">Agent humain</button>
                  </div>
                </div>
              </div>
            )}
          </div>
          {/* Input */}
          <form onSubmit={handleSend} className="flex items-center gap-2 px-4 py-3 border-t bg-white rounded-b-2xl">
            <input
              type="text"
              className="flex-1 px-3 py-2 rounded-lg border border-[#6E45E2]/20 focus:ring-2 focus:ring-[#6E45E2] outline-none text-sm"
              placeholder="Écris ta question..."
              value={input}
              onChange={e => setInput(e.target.value)}
              aria-label="Message au chatbot Mosala"
              autoFocus
            />
            <button
              type="submit"
              className="bg-gradient-to-r from-[#6E45E2] to-[#00FFFF] text-white px-4 py-2 rounded-lg font-bold shadow hover:scale-105 transition-all"
              aria-label="Envoyer"
            >
              ➤
            </button>
          </form>
        </div>
      )}
    </>
  );
};

export default ChatbotWidget; 
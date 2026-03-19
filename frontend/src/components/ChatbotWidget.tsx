import { useEffect, useMemo, useRef, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { MessageCircle, Minimize2, Send, X } from 'lucide-react';
import ChatbotAvatar from './ChatbotAvatar';
import faqMosala from '../faq-mosala.json';

type ChatMessage = {
  from: 'bot' | 'user';
  text: string;
  timestamp: Date;
};

const initialMessages: ChatMessage[] = [
  {
    from: 'bot',
    text: "Bonjour ! Je suis MosalaBot. Je peux répondre aux questions fréquentes et vous orienter vers l'équipe Mosala.",
    timestamp: new Date(),
  },
];

const ChatbotWidget = () => {
  const location = useLocation();
  const messagesEndRef = useRef<HTMLDivElement | null>(null);
  const [open, setOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>(initialMessages);

  const isAdminPage = useMemo(
    () =>
      location.pathname.startsWith('/superadmin') ||
      location.pathname.startsWith('/admin-content') ||
      location.pathname.startsWith('/admin'),
    [location.pathname]
  );

  useEffect(() => {
    const persisted = localStorage.getItem('mosala-chatbot-open');
    if (persisted === 'true') {
      setOpen(true);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('mosala-chatbot-open', open ? 'true' : 'false');
  }, [open]);

  useEffect(() => {
    if (open && messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, open]);

  useEffect(() => {
    const handler = () => setOpen(true);
    window.addEventListener('open-mosala-chatbot', handler);
    return () => window.removeEventListener('open-mosala-chatbot', handler);
  }, []);

  const faqItems = useMemo(() => {
    if (!Array.isArray(faqMosala)) {
      return [];
    }

    return faqMosala
      .filter(
        (item): item is { question: string; answer: string } =>
          !!item && typeof item.question === 'string' && typeof item.answer === 'string'
      )
      .slice(0, 4);
  }, []);

  const handleSend = (event?: React.FormEvent) => {
    event?.preventDefault();
    const trimmedInput = input.trim();
    if (!trimmedInput) {
      return;
    }

    setMessages((current) => [
      ...current,
      { from: 'user', text: trimmedInput, timestamp: new Date() },
    ]);
    setInput('');
    setIsTyping(true);

    window.setTimeout(() => {
      setMessages((current) => [
        ...current,
        {
          from: 'bot',
          text: "Merci. Pour une demande précise, utilisez la page de contact ou les rubriques emploi et formation.",
          timestamp: new Date(),
        },
      ]);
      setIsTyping(false);
    }, 900);
  };

  const handleFaqClick = (question: string, answer: string) => {
    setOpen(true);
    setMessages((current) => [
      ...current,
      { from: 'user', text: question, timestamp: new Date() },
      { from: 'bot', text: answer, timestamp: new Date() },
    ]);
  };

  if (isAdminPage) {
    return null;
  }

  return (
    <>
      <button
        type="button"
        aria-label={open ? 'Fermer le chat Mosala' : 'Ouvrir le chat Mosala'}
        className="fixed bottom-4 right-4 z-[1000] flex h-14 w-14 items-center justify-center rounded-full bg-[var(--color-mosala-green-600)] text-white shadow-lg"
        onClick={() => setOpen((current) => !current)}
      >
        {open ? <X className="h-5 w-5" /> : <MessageCircle className="h-5 w-5" />}
      </button>

      <AnimatePresence>
        {open ? (
          <motion.div
            initial={{ opacity: 0, y: 16, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.96 }}
            className="fixed bottom-20 right-4 z-[1001] w-[calc(100vw-2rem)] max-w-md overflow-hidden rounded-2xl border border-[var(--color-mosala-green-200)] bg-white shadow-2xl"
          >
            <div className="flex items-center gap-3 bg-[var(--color-mosala-green-600)] px-4 py-3 text-white">
              <ChatbotAvatar size={32} isTyping={isTyping} />
              <div className="flex-1">
                <div className="font-semibold">MosalaBot</div>
                <div className="text-xs text-green-100">Assistant Mosala</div>
              </div>
              <button
                type="button"
                className="rounded p-1 text-white/90 hover:bg-white/10"
                onClick={() => setIsMinimized((current) => !current)}
                aria-label={isMinimized ? 'Afficher le chat' : 'Réduire le chat'}
              >
                <Minimize2 className="h-4 w-4" />
              </button>
            </div>

            {!isMinimized ? (
              <>
                <div className="max-h-80 space-y-3 overflow-y-auto bg-gray-50 px-4 py-4">
                  {messages.map((message, index) => (
                    <div
                      key={`${message.from}-${message.timestamp.toISOString()}-${index}`}
                      className={message.from === 'bot' ? 'pr-8' : 'pl-8'}
                    >
                      <div
                        className={
                          message.from === 'bot'
                            ? 'rounded-2xl rounded-tl-md bg-white px-3 py-2 text-sm text-gray-700 shadow-sm'
                            : 'rounded-2xl rounded-tr-md bg-[var(--color-mosala-green-600)] px-3 py-2 text-sm text-white'
                        }
                      >
                        {message.text}
                      </div>
                    </div>
                  ))}

                  {isTyping ? (
                    <div className="pr-8 text-sm text-gray-500">MosalaBot est en train d’écrire…</div>
                  ) : null}

                  <div ref={messagesEndRef} />
                </div>

                {faqItems.length ? (
                  <div className="border-t border-gray-100 px-4 py-3">
                    <div className="mb-2 text-xs font-medium uppercase tracking-wide text-gray-500">
                      Questions fréquentes
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {faqItems.map((item) => (
                        <button
                          key={item.question}
                          type="button"
                          className="rounded-full border border-[var(--color-mosala-green-200)] px-3 py-1 text-xs text-[var(--color-mosala-green-700)]"
                          onClick={() => handleFaqClick(item.question, item.answer)}
                        >
                          {item.question}
                        </button>
                      ))}
                    </div>
                  </div>
                ) : null}

                <form onSubmit={handleSend} className="flex gap-2 border-t border-gray-100 px-4 py-3">
                  <input
                    value={input}
                    onChange={(event) => setInput(event.target.value)}
                    placeholder="Écrire un message..."
                    className="flex-1 rounded-xl border border-gray-200 px-3 py-2 text-sm outline-none"
                  />
                  <button
                    type="submit"
                    className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-[var(--color-mosala-green-600)] text-white"
                    aria-label="Envoyer"
                  >
                    <Send className="h-4 w-4" />
                  </button>
                </form>
              </>
            ) : null}
          </motion.div>
        ) : null}
      </AnimatePresence>
    </>
  );
};

export default ChatbotWidget;

import React from "react";

export default function ChatbotAvatar({ size = 44, isTyping = false }: { size?: number, isTyping?: boolean }) {
  return (
    <div
      className="flex items-center justify-center rounded-full bg-white shadow-lg"
      style={{ width: size, height: size, boxShadow: '0 4px 24px rgba(100, 118, 243, 0.18)' }}
    >
      <img
        src="/topcenter-uploads/avatars/chatbot.png"
        alt="ChatBot Mosala"
        className="rounded-full"
        style={{ width: size * 0.75, height: size * 0.75, filter: isTyping ? 'brightness(1.2) drop-shadow(0 0 8px #7ED9A7)' : undefined }}
      />
      {/* Indicateur de typing (optionnel) */}
      {isTyping && (
        <span className="absolute bottom-1 right-1 w-2 h-2 rounded-full bg-green-400 animate-pulse border-2 border-white" />
      )}
    </div>
  );
} 
import React from "react";

// Mascotte coach Mosala : visage stylisé, sourire, couleurs Mosala
const ChatbotAvatar = ({ size = 48 }: { size?: number }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 64 64"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    aria-label="Avatar du coach Mosala"
  >
    {/* Visage */}
    <circle cx="32" cy="32" r="30" fill="#18182f" stroke="#6E45E2" strokeWidth="3" />
    {/* Cheveux stylisés */}
    <path d="M16 24 Q32 8 48 24" stroke="#6E45E2" strokeWidth="4" fill="none" />
    {/* Oreilles */}
    <ellipse cx="12" cy="32" rx="3" ry="6" fill="#F9D923" />
    <ellipse cx="52" cy="32" rx="3" ry="6" fill="#F9D923" />
    {/* Visage */}
    <ellipse cx="32" cy="36" rx="16" ry="18" fill="#fff" />
    {/* Yeux */}
    <ellipse cx="25" cy="36" rx="3" ry="4" fill="#18182f" />
    <ellipse cx="39" cy="36" rx="3" ry="4" fill="#18182f" />
    {/* Sourcils */}
    <path d="M22 32 Q25 30 28 32" stroke="#6E45E2" strokeWidth="2" fill="none" />
    <path d="M36 32 Q39 30 42 32" stroke="#6E45E2" strokeWidth="2" fill="none" />
    {/* Bouche sourire */}
    <path d="M26 44 Q32 50 38 44" stroke="#00FFFF" strokeWidth="2.5" fill="none" strokeLinecap="round" />
    {/* Accessoire : cravate jaune */}
    <rect x="29" y="52" width="6" height="8" rx="2" fill="#F9D923" />
    {/* Halo néon */}
    <ellipse cx="32" cy="60" rx="18" ry="4" fill="#00FFFF" fillOpacity="0.15" />
  </svg>
);

export default ChatbotAvatar; 
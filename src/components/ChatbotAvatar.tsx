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
    {/* Halo néon Mosala */}
    <ellipse cx="32" cy="60" rx="20" ry="6" fill="#FFD500" fillOpacity="0.18" filter="url(#glow)" />
    <defs>
      <filter id="glow" x="0" y="50" width="64" height="20" filterUnits="userSpaceOnUse">
        <feGaussianBlur stdDeviation="4" result="blur" />
        <feMerge>
          <feMergeNode in="blur" />
          <feMergeNode in="SourceGraphic" />
        </feMerge>
      </filter>
      <radialGradient id="faceGradient" cx="50%" cy="50%" r="50%" fx="50%" fy="40%">
        <stop offset="0%" stopColor="#fff" />
        <stop offset="100%" stopColor="#E6F9F0" />
      </radialGradient>
    </defs>
    {/* Visage */}
    <circle cx="32" cy="32" r="30" fill="#222" stroke="#009640" strokeWidth="3" filter="url(#glow)" />
    {/* Cheveux stylisés */}
    <path d="M16 24 Q32 8 48 24" stroke="#009640" strokeWidth="4" fill="none" />
    {/* Oreilles Mosala jaune */}
    <ellipse cx="12" cy="32" rx="3" ry="6" fill="#FFD500" />
    <ellipse cx="52" cy="32" rx="3" ry="6" fill="#FFD500" />
    {/* Visage (dégradé) */}
    <ellipse cx="32" cy="36" rx="16" ry="18" fill="url(#faceGradient)" />
    {/* Yeux */}
    <ellipse cx="25" cy="36" rx="3" ry="4" fill="#222" />
    <ellipse cx="39" cy="36" rx="3" ry="4" fill="#222" />
    {/* Sourcils */}
    <path d="M22 32 Q25 30 28 32" stroke="#009640" strokeWidth="2" fill="none" />
    <path d="M36 32 Q39 30 42 32" stroke="#009640" strokeWidth="2" fill="none" />
    {/* Bouche sourire Mosala orange */}
    <path d="M26 44 Q32 50 38 44" stroke="#F39200" strokeWidth="2.5" fill="none" strokeLinecap="round" />
    {/* Accessoire : cravate jaune */}
    <rect x="29" y="52" width="6" height="8" rx="2" fill="#FFD500" />
  </svg>
);

export default ChatbotAvatar; 
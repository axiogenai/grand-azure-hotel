import React from 'react';

/**
 * Authentic 6-petaled Michelin Guide Rosette Star & Haute Gastronomy Insignia
 */
export function MichelinRosette({ size = 16, color = 'var(--gold-600)', className = '' }) {
  return (
    <svg 
      width={size} 
      height={size} 
      viewBox="0 0 24 24" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      style={{ verticalAlign: 'middle', flexShrink: 0 }}
    >
      <circle cx="12" cy="12" r="3.5" fill={color} />
      <path 
        d="M12 2C12.8 5 15 7.2 18 8C15 8.8 12.8 11 12 14C11.2 11 9 8.8 6 8C9 7.2 11.2 5 12 2Z" 
        fill={color} 
        opacity="0.9"
      />
      <path 
        d="M12 10C12.8 13 15 15.2 18 16C15 16.8 12.8 19 12 22C11.2 19 9 16.8 6 16C9 15.2 11.2 13 12 10Z" 
        fill={color} 
        opacity="0.9"
      />
      <circle cx="12" cy="12" r="1.5" fill="#FFFFFF" />
    </svg>
  );
}

/**
 * Haute Gastronomy Heraldic Gold Shield Crest
 */
export function LuxuryCrest({ size = 16, color = 'var(--gold-600)', className = '' }) {
  return (
    <svg 
      width={size} 
      height={size} 
      viewBox="0 0 24 24" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      style={{ verticalAlign: 'middle', flexShrink: 0 }}
    >
      <path 
        d="M12 2.5L19 5.8V11.2C19 16.2 16 20.4 12 21.8C8 20.4 5 16.2 5 11.2V5.8L12 2.5Z" 
        stroke={color} 
        strokeWidth="1.6" 
        strokeLinecap="round" 
        strokeLinejoin="round" 
        fill={color} 
        fillOpacity="0.15"
      />
      <path d="M12 7.5L14 11.5H10L12 7.5Z" fill={color} />
      <circle cx="12" cy="14" r="1.8" fill={color} />
      <path d="M9 17.2H15" stroke={color} strokeWidth="1.2" strokeLinecap="round" />
    </svg>
  );
}

/**
 * Official French Culinary Grand Seal / Monogram Emblem
 */
export function GrandSeal({ size = 20, color = 'var(--gold-600)', className = '' }) {
  return (
    <svg 
      width={size} 
      height={size} 
      viewBox="0 0 24 24" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      style={{ verticalAlign: 'middle', flexShrink: 0 }}
    >
      <circle cx="12" cy="12" r="9.5" stroke={color} strokeWidth="1.4" strokeDasharray="2 2" />
      <circle cx="12" cy="12" r="7.5" stroke={color} strokeWidth="1.2" />
      <path d="M9 15L12 8L15 15M10 13H14" stroke={color} strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

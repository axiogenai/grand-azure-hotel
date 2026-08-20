import React, { useState, useRef, useEffect } from 'react';
import { ChevronDown, Check } from 'lucide-react';
import { soundEffects } from '../utils/soundEffects';

export function CustomLuxurySelect({ 
  value, 
  onChange, 
  options = [], 
  icon: Icon,
  placeholder = 'Select option',
  label
}) {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef(null);

  // Close when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (containerRef.current && !containerRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const selectedOption = options.find((opt) => opt.value === value) || options[0];

  const handleSelect = (val) => {
    soundEffects.playClickSound();
    onChange(val);
    setIsOpen(false);
  };

  const toggleOpen = () => {
    soundEffects.playClickSound();
    setIsOpen(!isOpen);
  };

  return (
    <div ref={containerRef} style={{ position: 'relative', width: '100%' }}>
      {label && (
        <label style={{ display: 'block', fontSize: '0.72rem', textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--gold-800)', marginBottom: '0.35rem', fontWeight: 700 }}>
          {Icon && <Icon size={13} style={{ display: 'inline', marginRight: '4px', verticalAlign: '-1px' }} />}
          {label}
        </label>
      )}

      {/* Select Trigger Box */}
      <button
        type="button"
        onClick={toggleOpen}
        style={{
          width: '100%',
          background: '#FAF8F5',
          border: isOpen ? '1.5px solid var(--gold-500)' : '1px solid rgba(168, 124, 20, 0.3)',
          borderRadius: '0.65rem',
          padding: '0.65rem 0.85rem',
          color: 'var(--text-main)',
          fontSize: '0.85rem',
          fontWeight: 600,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '0.5rem',
          cursor: 'pointer',
          outline: 'none',
          boxShadow: isOpen ? '0 0 0 3px rgba(184, 138, 27, 0.15)' : 'none',
          transition: 'all 0.2s ease',
          textAlign: 'left'
        }}
      >
        <span style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
          {selectedOption ? selectedOption.label : placeholder}
        </span>
        <ChevronDown 
          size={15} 
          color="var(--gold-700)" 
          style={{
            transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)',
            transition: 'transform 0.25s ease',
            flexShrink: 0
          }} 
        />
      </button>

      {/* Custom Luxury Dropdown Popover */}
      {isOpen && (
        <div
          className="luxury-scrollbar"
          style={{
            position: 'absolute',
            top: 'calc(100% + 6px)',
            left: 0,
            right: 0,
            background: '#FFFFFF',
            border: '1.5px solid rgba(168, 124, 20, 0.4)',
            borderRadius: '0.85rem',
            padding: '0.4rem',
            boxShadow: '0 15px 35px rgba(20, 24, 33, 0.18), 0 0 15px rgba(184, 138, 27, 0.15)',
            zIndex: 150,
            animation: 'scaleUp 0.18s cubic-bezier(0.16, 1, 0.3, 1)',
            maxHeight: '300px',
            overflowY: 'auto'
          }}
        >
          {options.map((opt) => {
            const isSelected = opt.value === value;
            return (
              <div
                key={opt.value}
                onClick={() => handleSelect(opt.value)}
                style={{
                  padding: '0.55rem 0.75rem',
                  borderRadius: '0.5rem',
                  fontSize: '0.84rem',
                  color: isSelected ? 'var(--gold-800)' : 'var(--text-main)',
                  fontWeight: isSelected ? 700 : 500,
                  background: isSelected ? 'var(--gold-100)' : 'transparent',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  cursor: 'pointer',
                  transition: 'background 0.15s ease'
                }}
                onMouseEnter={(e) => {
                  if (!isSelected) e.currentTarget.style.background = '#FAF8F5';
                }}
                onMouseLeave={(e) => {
                  if (!isSelected) e.currentTarget.style.background = 'transparent';
                }}
              >
                <span>{opt.label}</span>
                {isSelected && <Check size={14} color="var(--gold-800)" />}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

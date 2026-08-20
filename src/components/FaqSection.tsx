import React, { useState } from 'react';
import { ChevronDown, Sparkles, HelpCircle } from 'lucide-react';
import { soundEffects } from '../utils/soundEffects';

export function FaqSection() {
  const [openIndex, setOpenIndex] = useState(0);

  const faqs = [
    {
      q: 'How does the interactive Scratch Card Coupon system work?',
      a: 'Every prospective guest and member can scratch a daily interactive card to reveal exclusive rewards, including 50% Grand Jackpots, $250 Instant Resort Credits, or complimentary Michelin dining. Once scratched past 45%, a unique serial code (e.g. AURA-GOLD-XXXX) is automatically saved to your wallet and can be directly applied at checkout for instant price deduction.'
    },
    {
      q: 'What are the check-in and checkout times, and can I request late checkout?',
      a: 'Standard check-in begins at 3:00 PM and check-out is at 12:00 PM. Guests with Gold or Black Diamond membership, or those who unlock the VIP Welcome scratch reward, enjoy complimentary guaranteed early check-in at 11:00 AM and late checkout until 4:00 PM.'
    },
    {
      q: 'Are Rolls-Royce airport transfers and private helipad landings complimentary?',
      a: 'Round-trip Rolls-Royce Ghost or Phantom transfers are included complimentary with all Imperial Penthouse bookings and can be added as a curated bespoke option for all other suites. For helicopter arrivals, our private promontory helipad accommodates twin-engine executive helicopters with 24/7 ATC clearance.'
    },
    {
      q: 'What is your cancellation and modification policy?',
      a: 'We offer 100% complimentary 24-hour cancellation on all direct reservations. Flexible modifications can be made seamlessly through your personal VIP dashboard up to 48 hours prior to your scheduled check-in date.'
    },
    {
      q: 'Can Michelin dining and spa treatments be reserved prior to arrival?',
      a: 'Yes, our digital concierge allows you to pre-reserve tables at L’Aura, Saffron & Jade, and Celeste Rooftop, as well as private couples thermal hydrotherapy circuits, directly through our Gastronomy & Wellness sections.'
    }
  ];

  const toggleFaq = (index) => {
    soundEffects.playClickSound();
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faq" style={{ padding: '5rem 1.5rem', background: 'rgba(7, 11, 24, 0.5)', position: 'relative' }}>
      <div className="container-luxury" style={{ maxWidth: '820px' }}>
        {/* Section Header */}
        <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
          <span 
            style={{
              fontSize: '0.75rem',
              letterSpacing: '0.2em',
              textTransform: 'uppercase',
              color: 'var(--gold-400)',
              fontWeight: 700
            }}
          >
            Guest Inquiries & Concierge
          </span>
          <h2 
            style={{
              fontSize: 'clamp(1.9rem, 3vw, 2.5rem)',
              marginTop: '0.5rem',
              marginBottom: '0.8rem',
              color: '#FFFFFF'
            }}
          >
            Frequently Answered <span className="gold-gradient-text">Questions</span>
          </h2>
          <p style={{ color: 'var(--sand-200)', fontSize: '0.9rem' }}>
            Everything you need to know about reservations, coupons, amenities, and VIP guest privileges.
          </p>
        </div>

        {/* Accordion List */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
          {faqs.map((faq, i) => {
            const isOpen = openIndex === i;
            return (
              <div 
                key={i}
                className="luxury-glass"
                style={{
                  border: isOpen ? '1px solid var(--gold-500)' : '1px solid var(--glass-border)',
                  borderRadius: '0.85rem',
                  overflow: 'hidden',
                  transition: 'all 0.2s'
                }}
              >
                <button
                  onClick={() => toggleFaq(i)}
                  style={{
                    width: '100%',
                    padding: '1.25rem 1.5rem',
                    background: 'transparent',
                    border: 'none',
                    textAlign: 'left',
                    color: isOpen ? 'var(--gold-300)' : '#FFFFFF',
                    fontSize: '1rem',
                    fontWeight: 600,
                    cursor: 'pointer',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    gap: '1rem'
                  }}
                >
                  <span>{faq.q}</span>
                  <ChevronDown 
                    size={18} 
                    style={{
                      transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)',
                      transition: 'transform 0.3s ease',
                      flexShrink: 0,
                      color: isOpen ? 'var(--gold-400)' : 'var(--sand-200)'
                    }} 
                  />
                </button>

                {isOpen && (
                  <div 
                    style={{
                      padding: '0 1.5rem 1.25rem',
                      color: 'var(--sand-200)',
                      fontSize: '0.86rem',
                      lineHeight: 1.7,
                      borderTop: '1px solid rgba(212, 175, 55, 0.12)',
                      paddingTop: '0.85rem'
                    }}
                  >
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

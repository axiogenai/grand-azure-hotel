import React, { useState } from 'react';
import { Star, CheckCircle2, Quote, ChevronDown } from 'lucide-react';
import { soundEffects } from '../utils/soundEffects';

export function ReviewsAndFaq() {
  const [openFaq, setOpenFaq] = useState(0);

  const reviews = [
    {
      author: 'Michelin Guide Inspector Evaluation',
      role: 'Official 3-Star Award Review',
      date: '2026 Edition',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
      text: 'Chef Laurent Mercier reaches the pinnacle of culinary art. The Blue Brittany Lobster and Miyazaki Wagyu Rossini are executed with supernatural precision. An essential pilgrimage for worldwide gastronomes.'
    },
    {
      author: 'Charles & Genevieve Sterling',
      role: '25th Wedding Anniversary',
      date: 'August 2026',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80',
      text: 'We spun the lucky wheel, scratched a 50% discount voucher, and reserved the Oceanfront Window Table. The tasting menu paired with Grand Crus made this the most memorable evening of our lives.'
    },
    {
      author: 'Food & Wine International',
      role: 'Top 10 Global Dining Destinations',
      date: 'July 2026',
      avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=200&q=80',
      text: 'Flawless tableside service, an extraordinary 4,500-bottle wine cellar, and breathtaking oceanfront architecture. L’Aura Grand sets the global standard for modern luxury dining.'
    }
  ];

  const faqs = [
    {
      q: 'How do I redeem my Spin & Scratch discount for table reservations?',
      a: 'Click "SPIN THE WHEEL" in the lucky draw section, fill in your guest details, and let the wheel spin. Once you scratch your golden ticket, click "Apply to Table Booking". Your unique discount code (e.g. DINE-50OF-XXXX) and guest details are automatically applied at checkout.'
    },
    {
      q: 'What is the dress code at L’Aura Grand?',
      a: 'We embrace an Elegant / Smart Casual dress code. Jackets are recommended for gentlemen during dinner service. Athletic wear, swimwear, and beach flip-flops are strictly prohibited in the main dining room.'
    },
    {
      q: 'Do you accommodate dietary restrictions and allergies?',
      a: 'Yes, our kitchen accommodates vegetarian, vegan, gluten-free, dairy-free, and kosher-style dining. Please mention any allergies in the special notes box during your online reservation.'
    },
    {
      q: 'Is valet parking available?',
      a: 'Complimentary white-glove valet parking is provided at the main restaurant promenade entrance for all dining guests.'
    }
  ];

  const toggleFaq = (index) => {
    soundEffects.playClickSound();
    setOpenFaq(openFaq === index ? null : index);
  };

  return (
    <section id="reviews" style={{ padding: '6rem 1.5rem', background: 'var(--bg-primary)', position: 'relative' }}>
      <div className="container-luxury">
        {/* Reviews */}
        <div style={{ textAlign: 'center', maxWidth: '750px', margin: '0 auto 3.5rem' }}>
          <span style={{ fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.22em', color: 'var(--gold-700)', fontWeight: 800 }}>
            Press & Critic Accolades
          </span>
          <h2 style={{ fontSize: 'clamp(2.2rem, 4vw, 3.2rem)', color: 'var(--text-main)', marginTop: '0.3rem' }}>
            Praised by <span className="gold-gradient-text">World Critics</span>
          </h2>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '2.25rem', marginBottom: '5.5rem' }}>
          {reviews.map((rev, i) => (
            <div key={i} className="luxury-card" style={{ padding: '2.25rem', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
              <div>
                <div style={{ display: 'flex', gap: '0.25rem', marginBottom: '1.2rem' }}>
                  {[...Array(5)].map((_, idx) => (
                    <Star key={idx} size={16} fill="#C29320" color="#C29320" />
                  ))}
                </div>
                <p style={{ fontSize: '0.92rem', color: 'var(--text-sub)', lineHeight: 1.75, fontStyle: 'italic', marginBottom: '1.75rem' }}>
                  "{rev.text}"
                </p>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '0.95rem', borderTop: '1px solid rgba(0,0,0,0.06)', paddingTop: '1.25rem' }}>
                <img src={rev.avatar} alt={rev.author} style={{ width: '48px', height: '48px', borderRadius: '50%', objectFit: 'cover', border: '1.5px solid var(--gold-500)' }} />
                <div>
                  <div style={{ fontSize: '0.92rem', fontWeight: 800, color: 'var(--text-main)', display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                    {rev.author} <CheckCircle2 size={14} color="var(--emerald-600)" />
                  </div>
                  <div style={{ fontSize: '0.74rem', color: 'var(--gold-700)', fontWeight: 600 }}>{rev.role} • {rev.date}</div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* FAQs */}
        <div style={{ maxWidth: '840px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '2.75rem' }}>
            <span style={{ fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.2em', color: 'var(--gold-700)', fontWeight: 800 }}>
              Dining Concierge
            </span>
            <h3 style={{ fontSize: '2rem', color: 'var(--text-main)', marginTop: '0.3rem' }}>
              Frequently Asked Questions
            </h3>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
            {faqs.map((faq, i) => {
              const isOpen = openFaq === i;
              return (
                <div key={i} className="luxury-glass" style={{ background: '#FFFFFF', border: isOpen ? '1.5px solid var(--gold-500)' : '1px solid var(--border-light)', borderRadius: '0.75rem', overflow: 'hidden' }}>
                  <button
                    onClick={() => toggleFaq(i)}
                    style={{
                      width: '100%',
                      padding: '1.25rem 1.75rem',
                      background: 'transparent',
                      border: 'none',
                      textAlign: 'left',
                      color: isOpen ? 'var(--gold-800)' : 'var(--text-main)',
                      fontSize: '0.96rem',
                      fontWeight: 700,
                      cursor: 'pointer',
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      gap: '1rem'
                    }}
                  >
                    <span>{faq.q}</span>
                    <ChevronDown size={18} style={{ transform: isOpen ? 'rotate(180deg)' : 'rotate(0)', transition: 'transform 0.3s ease', color: 'var(--gold-600)', flexShrink: 0 }} />
                  </button>
                  {isOpen && (
                    <div style={{ padding: '0 1.75rem 1.25rem', color: 'var(--text-sub)', fontSize: '0.88rem', lineHeight: 1.7, borderTop: '1px solid rgba(0,0,0,0.05)', paddingTop: '0.85rem' }}>
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

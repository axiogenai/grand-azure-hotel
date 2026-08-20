import React from 'react';
import { 
  CheckCircle2, 
  Printer, 
  Download, 
  Calendar, 
  MapPin, 
  Wine, 
  UtensilsCrossed 
} from 'lucide-react';
import { soundEffects } from '../utils/soundEffects';

export function ReservationConfirmationModal({
  isOpen,
  onClose,
  reservation
}) {
  if (!isOpen || !reservation) return null;

  const handlePrint = () => {
    soundEffects.playClickSound();
    window.print();
  };

  const handleDownloadCalendar = () => {
    soundEffects.playClickSound();
    const icsData = `BEGIN:VCALENDAR
VERSION:2.0
PRODID:-//L'Aura Grand Restaurant//EN
BEGIN:VEVENT
UID:${reservation.id}@lauragrand.luxury
DTSTAMP:${new Date().toISOString().replace(/[-:]/g, '').split('.')[0]}Z
DTSTART:${reservation.date.replace(/-/g, '')}T193000Z
DTEND:${reservation.date.replace(/-/g, '')}T223000Z
SUMMARY:3-Michelin Dinner at L'Aura Grand (${reservation.zoneName})
DESCRIPTION:Reservation Ref: ${reservation.id}\\nDiner: ${reservation.dinerName}\\nPhone: ${reservation.dinerPhone}\\nAddress: ${reservation.dinerAddress}\\nParty: ${reservation.guests} Guests
LOCATION:L'Aura Grand Restaurant, 1000 Azure Way, CA
STATUS:CONFIRMED
END:VEVENT
END:VCALENDAR`;

    const blob = new Blob([icsData], { type: 'text/calendar;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `LAuraGrand-Reservation-${reservation.id}.ics`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div 
        className="modal-content luxury-glass"
        style={{
          maxWidth: '640px',
          width: '100%',
          padding: '2.5rem 2rem',
          background: '#FFFFFF',
          border: '1.5px solid var(--gold-500)',
          position: 'relative',
          boxShadow: 'var(--shadow-hover)'
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Icon */}
        <div style={{ textAlign: 'center', marginBottom: '1.5rem' }}>
          <div 
            style={{
              width: '64px',
              height: '64px',
              borderRadius: '50%',
              background: 'var(--emerald-50)',
              border: '2px solid var(--emerald-600)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 1rem',
              color: 'var(--emerald-600)',
              boxShadow: '0 4px 15px rgba(5, 150, 105, 0.15)'
            }}
          >
            <CheckCircle2 size={36} />
          </div>
          <span style={{ fontSize: '0.74rem', textTransform: 'uppercase', letterSpacing: '0.2em', color: 'var(--gold-700)', fontWeight: 800 }}>
            Table Guaranteed & Confirmed
          </span>
          <h2 style={{ fontSize: '1.75rem', color: 'var(--text-main)', marginTop: '0.2rem', fontWeight: 600 }}>
            We Look Forward To Serving You
          </h2>
          <p style={{ fontSize: '0.84rem', color: 'var(--text-sub)' }}>
            Confirmation sent to <strong style={{ color: 'var(--text-main)' }}>{reservation.dinerEmail}</strong>
          </p>
        </div>

        {/* Printable Voucher Card */}
        <div 
          style={{
            background: 'linear-gradient(135deg, #FAF8F5 0%, #F3EFEA 100%)',
            border: '1.5px solid var(--gold-500)',
            borderRadius: '1rem',
            padding: '1.5rem',
            marginBottom: '1.5rem',
            boxShadow: 'var(--shadow-soft)'
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', borderBottom: '1px dashed rgba(168, 124, 20, 0.3)', paddingBottom: '1rem', marginBottom: '1rem' }}>
            <div>
              <div style={{ fontFamily: 'var(--font-brand)', fontSize: '1.15rem', letterSpacing: '0.15em', color: 'var(--gold-800)', fontWeight: 800 }}>
                L'AURA GRAND
              </div>
              <div style={{ fontSize: '0.72rem', color: 'var(--text-sub)' }}>
                Official Table Reservation Voucher
              </div>
              <div style={{ marginTop: '0.4rem', fontSize: '0.95rem', fontWeight: 800, color: 'var(--text-main)' }}>
                Ref: <span style={{ color: 'var(--gold-700)', fontFamily: 'monospace' }}>{reservation.id}</span>
              </div>
            </div>

            {/* QR Mock */}
            <div style={{ textAlign: 'center' }}>
              <div style={{ width: '64px', height: '64px', background: '#FFFFFF', padding: '4px', borderRadius: '6px', border: '1px solid rgba(0,0,0,0.1)' }}>
                <svg viewBox="0 0 100 100" width="100%" height="100%">
                  <rect width="100" height="100" fill="white" />
                  <rect x="10" y="10" width="25" height="25" fill="#14171F" />
                  <rect x="15" y="15" width="15" height="15" fill="white" />
                  <rect x="18" y="18" width="9" height="9" fill="#14171F" />
                  <rect x="65" y="10" width="25" height="25" fill="#14171F" />
                  <rect x="70" y="15" width="15" height="15" fill="white" />
                  <rect x="73" y="18" width="9" height="9" fill="#14171F" />
                  <rect x="10" y="65" width="25" height="25" fill="#14171F" />
                  <rect x="15" y="70" width="15" height="15" fill="white" />
                  <rect x="18" y="73" width="9" height="9" fill="#14171F" />
                  <rect x="45" y="20" width="10" height="10" fill="#14171F" />
                  <rect x="45" y="45" width="10" height="10" fill="#14171F" />
                  <rect x="65" y="65" width="10" height="10" fill="#14171F" />
                  <rect x="80" y="75" width="10" height="15" fill="#14171F" />
                </svg>
              </div>
              <span style={{ fontSize: '0.55rem', color: 'var(--text-muted)', marginTop: '2px', display: 'block' }}>VIP Pass</span>
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem', fontSize: '0.84rem', marginBottom: '1rem' }}>
            <div>
              <span style={{ color: 'var(--text-muted)', fontSize: '0.72rem' }}>Date & Time:</span>
              <strong style={{ display: 'block', color: 'var(--text-main)' }}>{reservation.date} at {reservation.time}</strong>
            </div>
            <div>
              <span style={{ color: 'var(--text-muted)', fontSize: '0.72rem' }}>Party Size:</span>
              <strong style={{ display: 'block', color: 'var(--text-main)' }}>{reservation.guests} Guests</strong>
            </div>
            <div>
              <span style={{ color: 'var(--text-muted)', fontSize: '0.72rem' }}>Seating Location:</span>
              <strong style={{ display: 'block', color: 'var(--gold-800)' }}>{reservation.zoneName}</strong>
            </div>
            <div>
              <span style={{ color: 'var(--text-muted)', fontSize: '0.72rem' }}>Primary Guest:</span>
              <strong style={{ display: 'block', color: 'var(--text-main)' }}>{reservation.dinerName}</strong>
            </div>
            <div style={{ gridColumn: 'span 2' }}>
              <span style={{ color: 'var(--text-muted)', fontSize: '0.72rem' }}>Guest Phone & Address:</span>
              <div style={{ color: 'var(--text-sub)', fontSize: '0.82rem' }}>{reservation.dinerPhone} • {reservation.dinerAddress}</div>
            </div>
          </div>

          {reservation.discountAmount > 0 && (
            <div style={{ background: 'var(--emerald-50)', border: '1px solid var(--emerald-600)', borderRadius: '0.5rem', padding: '0.45rem 0.75rem', fontSize: '0.76rem', color: 'var(--emerald-700)', display: 'flex', justifyContent: 'space-between', marginBottom: '0.75rem' }}>
              <span>🎁 Coupon Discount Applied ({reservation.couponCode}):</span>
              <strong>-${reservation.discountAmount}</strong>
            </div>
          )}

          <div style={{ borderTop: '1px solid rgba(0,0,0,0.08)', paddingTop: '0.75rem', display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
            <span style={{ fontSize: '0.84rem', color: 'var(--text-sub)' }}>Total ({reservation.paymentMethod}):</span>
            <span style={{ fontSize: '1.4rem', fontWeight: 900, color: 'var(--gold-700)', fontFamily: 'var(--font-serif)' }}>
              ${reservation.totalPaid.toLocaleString()}
            </span>
          </div>
        </div>

        {/* Buttons */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem', justifyContent: 'center' }}>
          <button onClick={handlePrint} className="btn-secondary" style={{ padding: '0.65rem 1.2rem', fontSize: '0.8rem' }}>
            <Printer size={15} />
            <span>Print Dining Voucher</span>
          </button>
          <button onClick={handleDownloadCalendar} className="btn-secondary" style={{ padding: '0.65rem 1.2rem', fontSize: '0.8rem' }}>
            <Download size={15} />
            <span>Add to Calendar (.ics)</span>
          </button>
          <button onClick={onClose} className="btn-gold" style={{ padding: '0.65rem 1.4rem', fontSize: '0.8rem' }}>
            <span>Done</span>
          </button>
        </div>
      </div>
    </div>
  );
}

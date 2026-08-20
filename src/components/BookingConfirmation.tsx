import React from 'react';
import { 
  CheckCircle2, 
  Printer, 
  Download, 
  Calendar, 
  MapPin, 
  ShieldCheck, 
  User, 
  Sparkles, 
  ArrowRight 
} from 'lucide-react';
import { soundEffects } from '../utils/soundEffects';

export function BookingConfirmation({
  isOpen,
  onClose,
  booking,
  onViewDashboard
}) {
  if (!isOpen || !booking) return null;

  const handlePrint = () => {
    soundEffects.playClickSound();
    window.print();
  };

  const handleDownloadCalendar = () => {
    soundEffects.playClickSound();
    const icsData = `BEGIN:VCALENDAR
VERSION:2.0
PRODID:-//Aura Grand Azure Resort//EN
BEGIN:VEVENT
UID:${booking.id}@auragrandazure.luxury
DTSTAMP:${new Date().toISOString().replace(/[-:]/g, '').split('.')[0]}Z
DTSTART:${booking.checkIn.replace(/-/g, '')}T150000Z
DTEND:${booking.checkOut.replace(/-/g, '')}T110000Z
SUMMARY:Luxury Stay at Aura Grand Azure (${booking.roomName})
DESCRIPTION:Booking Reference: ${booking.id}\\nSanctuary: ${booking.roomName}\\nGuests: ${booking.guests}
LOCATION:Aura Grand Azure Resort & Spa, 1000 Azure Way, CA
STATUS:CONFIRMED
END:VEVENT
END:VCALENDAR`;

    const blob = new Blob([icsData], { type: 'text/calendar;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `AuraGrandAzure-${booking.id}.ics`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div 
        className="modal-content luxury-glass"
        style={{
          maxWidth: '680px',
          width: '100%',
          padding: '2.5rem',
          position: 'relative',
          boxShadow: '0 25px 60px -15px rgba(0, 0, 0, 0.95), 0 0 40px rgba(212, 175, 55, 0.25)'
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Emblem */}
        <div style={{ textAlign: 'center', marginBottom: '1.5rem' }}>
          <div 
            style={{
              width: '64px',
              height: '64px',
              borderRadius: '50%',
              background: 'rgba(16, 185, 129, 0.15)',
              border: '2px solid var(--emerald-400)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 1rem',
              color: 'var(--emerald-400)',
              boxShadow: '0 0 25px rgba(16, 185, 129, 0.3)'
            }}
          >
            <CheckCircle2 size={36} />
          </div>
          <span style={{ fontSize: '0.74rem', textTransform: 'uppercase', letterSpacing: '0.2em', color: 'var(--gold-400)', fontWeight: 800 }}>
            Payment Approved & Guaranteed
          </span>
          <h2 style={{ fontSize: '1.85rem', color: '#FFFFFF', marginTop: '0.2rem' }}>
            We Look Forward to Welcoming You
          </h2>
          <p style={{ fontSize: '0.84rem', color: 'var(--sand-200)', marginTop: '0.2rem' }}>
            Confirmation details sent to <strong style={{ color: '#FFFFFF' }}>{booking.guestEmail || 'your email'}</strong>
          </p>
        </div>

        {/* Printable Luxury Voucher Card */}
        <div 
          style={{
            background: 'linear-gradient(135deg, rgba(16,27,60,0.9) 0%, rgba(7,11,24,0.95) 100%)',
            border: '2px solid var(--gold-500)',
            borderRadius: '1rem',
            padding: '1.5rem',
            marginBottom: '1.5rem',
            position: 'relative'
          }}
        >
          {/* Voucher Header with Booking ID and QR Mock */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', borderBottom: '1px dashed rgba(212, 175, 55, 0.3)', paddingBottom: '1rem', marginBottom: '1rem' }}>
            <div>
              <div style={{ fontFamily: 'var(--font-brand)', fontSize: '1.1rem', letterSpacing: '0.15em', color: 'var(--gold-400)', fontWeight: 800 }}>
                AURA GRAND AZURE
              </div>
              <div style={{ fontSize: '0.7rem', color: 'var(--sand-200)' }}>
                Official Guest Reservation Voucher
              </div>
              <div style={{ marginTop: '0.4rem', fontSize: '0.95rem', fontWeight: 800, color: '#FFFFFF' }}>
                Ref: <span style={{ color: 'var(--gold-300)', fontFamily: 'monospace' }}>{booking.id}</span>
              </div>
            </div>

            {/* Touchless Check-in QR Mock */}
            <div style={{ textAlign: 'center' }}>
              <div 
                style={{
                  width: '68px',
                  height: '68px',
                  background: '#FFFFFF',
                  padding: '4px',
                  borderRadius: '6px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
              >
                {/* SVG QR Code Simulation */}
                <svg viewBox="0 0 100 100" width="100%" height="100%">
                  <rect width="100" height="100" fill="white" />
                  <rect x="10" y="10" width="25" height="25" fill="#070B18" />
                  <rect x="15" y="15" width="15" height="15" fill="white" />
                  <rect x="18" y="18" width="9" height="9" fill="#070B18" />
                  <rect x="65" y="10" width="25" height="25" fill="#070B18" />
                  <rect x="70" y="15" width="15" height="15" fill="white" />
                  <rect x="73" y="18" width="9" height="9" fill="#070B18" />
                  <rect x="10" y="65" width="25" height="25" fill="#070B18" />
                  <rect x="15" y="70" width="15" height="15" fill="white" />
                  <rect x="18" y="73" width="9" height="9" fill="#070B18" />
                  <rect x="45" y="20" width="10" height="10" fill="#070B18" />
                  <rect x="45" y="45" width="10" height="10" fill="#070B18" />
                  <rect x="65" y="65" width="10" height="10" fill="#070B18" />
                  <rect x="80" y="75" width="10" height="15" fill="#070B18" />
                </svg>
              </div>
              <span style={{ fontSize: '0.58rem', color: 'var(--sand-300)', marginTop: '2px', display: 'block' }}>
                VIP QR Pass
              </span>
            </div>
          </div>

          {/* Key Details Breakdown */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '0.85rem', fontSize: '0.82rem', marginBottom: '1rem' }}>
            <div>
              <span style={{ color: 'var(--sand-300)', fontSize: '0.72rem', display: 'block' }}>Sanctuary Suite:</span>
              <strong style={{ color: '#FFFFFF' }}>{booking.roomName}</strong>
            </div>

            <div>
              <span style={{ color: 'var(--sand-300)', fontSize: '0.72rem', display: 'block' }}>Dates of Stay:</span>
              <strong style={{ color: '#FFFFFF' }}>{booking.checkIn} → {booking.checkOut} ({booking.nights}N)</strong>
            </div>

            <div>
              <span style={{ color: 'var(--sand-300)', fontSize: '0.72rem', display: 'block' }}>Primary Guest:</span>
              <strong style={{ color: '#FFFFFF' }}>{booking.guestName || 'Valued Guest'} ({booking.guests} Guests)</strong>
            </div>

            <div>
              <span style={{ color: 'var(--sand-300)', fontSize: '0.72rem', display: 'block' }}>Payment Method:</span>
              <strong style={{ color: '#FFFFFF' }}>{booking.paymentMethod}</strong>
            </div>
          </div>

          {/* Add-ons & Coupon Applied */}
          {booking.discountAmount > 0 && (
            <div style={{ background: 'rgba(16, 185, 129, 0.12)', border: '1px solid var(--emerald-400)', borderRadius: '0.5rem', padding: '0.4rem 0.75rem', fontSize: '0.75rem', color: 'var(--emerald-400)', display: 'flex', justifyContent: 'space-between', marginBottom: '0.75rem' }}>
              <span>🎁 Scratch Coupon Redeemed ({booking.couponCode}):</span>
              <strong>-${booking.discountAmount.toLocaleString()}</strong>
            </div>
          )}

          {/* Grand Total */}
          <div style={{ borderTop: '1px solid rgba(255,255,255,0.08)', paddingTop: '0.75rem', display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
            <span style={{ fontSize: '0.85rem', color: 'var(--sand-200)' }}>Total Amount Paid (All Taxes Included):</span>
            <span style={{ fontSize: '1.4rem', fontWeight: 800, color: 'var(--gold-400)', fontFamily: 'var(--font-brand)' }}>
              ${booking.totalPaid.toLocaleString()}
            </span>
          </div>
        </div>

        {/* Action Buttons */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem', justifyContent: 'center' }}>
          <button
            onClick={handlePrint}
            className="btn-secondary"
            style={{ padding: '0.65rem 1.1rem', fontSize: '0.8rem' }}
          >
            <Printer size={15} />
            <span>Print Invoice Voucher</span>
          </button>

          <button
            onClick={handleDownloadCalendar}
            className="btn-secondary"
            style={{ padding: '0.65rem 1.1rem', fontSize: '0.8rem' }}
          >
            <Download size={15} />
            <span>Add to Apple / Google Calendar (.ics)</span>
          </button>

          <button
            onClick={() => {
              onClose();
              if (onViewDashboard) onViewDashboard();
            }}
            className="btn-gold"
            style={{ padding: '0.65rem 1.25rem', fontSize: '0.8rem' }}
          >
            <span>View in My Dashboard</span>
            <ArrowRight size={15} />
          </button>
        </div>
      </div>
    </div>
  );
}

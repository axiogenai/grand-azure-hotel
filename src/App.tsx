import React, { useState, useEffect } from 'react';
import { Sparkles, UtensilsCrossed, ArrowUp, Calendar, Ticket } from 'lucide-react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { SpinAndScratchSection } from './components/SpinAndScratchSection';
import { MenuSection } from './components/MenuSection';
import { TableReservationSection } from './components/TableReservationSection';
import { AboutSection } from './components/AboutSection';
import { ChefAndAmbiance } from './components/ChefAndAmbiance';
import { ReviewsAndFaq } from './components/ReviewsAndFaq';
import { Footer } from './components/Footer';
import { CheckoutPaymentModal } from './components/CheckoutPaymentModal';
import { ReservationConfirmationModal } from './components/ReservationConfirmationModal';

import { soundEffects } from './utils/soundEffects';

export function App() {
  // Coupon and Reservation State (No account/login needed)
  const [activeCoupon, setActiveCoupon] = useState(null);
  const [guestDetails, setGuestDetails] = useState(null);
  const [quickReservationParams, setQuickReservationParams] = useState(null);
  const [selectedDishForBooking, setSelectedDishForBooking] = useState(null);
  
  // Checkout & Confirmation Modals
  const [currentReservationPayload, setCurrentReservationPayload] = useState(null);
  const [isCheckoutModalOpen, setIsCheckoutModalOpen] = useState(false);
  const [confirmedReservation, setConfirmedReservation] = useState(null);
  const [isConfirmationModalOpen, setIsConfirmationModalOpen] = useState(false);

  // Scroll to top button visibility
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const checkScroll = () => {
      setShowScrollTop(window.scrollY > 400);
    };
    window.addEventListener('scroll', checkScroll);
    return () => window.removeEventListener('scroll', checkScroll);
  }, []);

  // Handlers
  const handleGuestDetailsCaptured = (details) => {
    setGuestDetails(details);
  };

  const handleQuickReserveFromHero = (params) => {
    setQuickReservationParams(params);
    const el = document.getElementById('reserve');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSelectDishForReservation = (dish) => {
    setSelectedDishForBooking(dish);
    const el = document.getElementById('reserve');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const handleApplyCouponToBooking = (coupon) => {
    setActiveCoupon(coupon);
  };

  const handleProceedToPayment = (payload) => {
    setCurrentReservationPayload(payload);
    setIsCheckoutModalOpen(true);
  };

  const handlePaymentSuccess = (confirmedObj) => {
    setIsCheckoutModalOpen(false);
    setConfirmedReservation(confirmedObj);
    setIsConfirmationModalOpen(true);
  };

  const handleScrollToReserve = () => {
    soundEffects.playClickSound();
    const el = document.getElementById('reserve');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const handleScrollToScratch = () => {
    soundEffects.playClickSound();
    const el = document.getElementById('scratch-discounts');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToTop = () => {
    soundEffects.playClickSound();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen relative" style={{ backgroundColor: 'var(--bg-primary)' }}>
      {/* 1. Header Navigation */}
      <Navbar 
        onOpenReserve={handleScrollToReserve}
        onOpenScratch={handleScrollToScratch}
        activeCoupon={activeCoupon}
      />

      {/* 2. Restaurant Hero Section with Quick Booking Engine */}
      <Hero 
        onQuickReserve={handleQuickReserveFromHero}
        onOpenScratch={handleScrollToScratch}
      />

      {/* 2nd Page: About Hotel & Oceanfront Estate in Short Detail with Floating Bridge Console */}
      <AboutSection 
        onQuickReserve={handleQuickReserveFromHero}
        onOpenReserve={handleScrollToReserve}
      />

      {/* 3rd Page: Pure Scratch & Win Card Section (Click -> Fill Details -> Scratch 10% or Next Time) */}
      <SpinAndScratchSection 
        onApplyCouponToBooking={handleApplyCouponToBooking}
        onGuestDetailsCaptured={handleGuestDetailsCaptured}
      />

      {/* 4. Culinary Repertoire & Menu */}
      <MenuSection 
        onSelectDishForReservation={handleSelectDishForReservation}
      />

      {/* 5. Direct Table Reservation Engine with Live Coupon Deduction & Auto-Filled Details */}
      <TableReservationSection 
        activeCoupon={activeCoupon}
        guestDetails={guestDetails}
        prefilledParams={quickReservationParams}
        selectedDish={selectedDishForBooking}
        onProceedToPayment={handleProceedToPayment}
        onOpenScratch={handleScrollToScratch}
      />

      {/* 7. Master Chef Laurent Mercier & Ambiance Sanctuaries */}
      <ChefAndAmbiance />

      {/* 8. Critic Reviews & Dining FAQs */}
      <ReviewsAndFaq />

      {/* 9. Restaurant Footer */}
      <Footer 
        onOpenScratch={handleScrollToScratch}
        onOpenReserve={handleScrollToReserve}
      />

      {/* Floating Action Buttons */}
      <div 
        style={{
          position: 'fixed',
          bottom: '1.5rem',
          right: '1.5rem',
          zIndex: 90,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-end',
          gap: '0.75rem'
        }}
      >

        {/* Scroll To Top */}
        {showScrollTop && (
          <button
            onClick={scrollToTop}
            style={{
              width: '44px',
              height: '44px',
              borderRadius: '50%',
              background: '#FFFFFF',
              border: '1px solid var(--gold-hairline)',
              color: 'var(--gold-700)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              boxShadow: '0 4px 15px rgba(0,0,0,0.08)'
            }}
            title="Return to top"
          >
            <ArrowUp size={18} />
          </button>
        )}
      </div>

      {/* MODALS */}
      {/* 1. Dining Reservation Checkout Modal */}
      <CheckoutPaymentModal 
        isOpen={isCheckoutModalOpen}
        onClose={() => setIsCheckoutModalOpen(false)}
        reservationData={currentReservationPayload}
        onPaymentSuccess={handlePaymentSuccess}
      />

      {/* 2. Confirmed Table Voucher & QR Pass */}
      <ReservationConfirmationModal 
        isOpen={isConfirmationModalOpen}
        onClose={() => setIsConfirmationModalOpen(false)}
        reservation={confirmedReservation}
      />
    </div>
  );
}

export default App;

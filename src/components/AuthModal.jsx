import React, { useState } from 'react';
import { 
  User, 
  Lock, 
  Mail, 
  Phone, 
  Sparkles, 
  Award, 
  Check, 
  Eye, 
  EyeOff, 
  ArrowRight 
} from 'lucide-react';
import { DEMO_USERS, storage } from '../utils/storage';
import { soundEffects } from '../utils/soundEffects';

export function AuthModal({
  isOpen,
  onClose,
  onLoginSuccess
}) {
  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');

  if (!isOpen) return null;

  const handleDemoLogin = (demoUser) => {
    soundEffects.playWinChime();
    storage.setUser(demoUser);
    onLoginSuccess(demoUser);
    onClose();
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    if (!email || !password) {
      setError('Please fill in all required credentials.');
      return;
    }

    if (isSignUp) {
      if (!fullName) {
        setError('Please enter your full name for VIP member registration.');
        return;
      }

      const newUser = {
        id: `user-${Date.now()}`,
        name: fullName,
        email: email,
        password: password,
        phone: phone || '+1 (555) 000-0000',
        tier: 'Silver Elite Member',
        tierLevel: 'silver',
        points: 1000,
        memberSince: '2026',
        avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=200&q=80'
      };

      soundEffects.playWinChime();
      storage.setUser(newUser);
      onLoginSuccess(newUser);
      onClose();
    } else {
      // Sign in logic
      const matchedDemo = DEMO_USERS.find(u => u.email.toLowerCase() === email.toLowerCase());
      const userObj = matchedDemo || {
        id: `user-${Date.now()}`,
        name: email.split('@')[0].toUpperCase(),
        email: email,
        phone: '+1 (555) 123-4567',
        tier: 'Gold Ambassador',
        tierLevel: 'gold',
        points: 3200,
        memberSince: '2025',
        avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80'
      };

      soundEffects.playWinChime();
      storage.setUser(userObj);
      onLoginSuccess(userObj);
      onClose();
    }
  };

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div 
        className="modal-content luxury-glass"
        style={{
          maxWidth: '480px',
          width: '100%',
          padding: '2.25rem',
          position: 'relative',
          boxShadow: '0 25px 60px -15px rgba(0, 0, 0, 0.95), 0 0 35px rgba(212, 175, 55, 0.2)'
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          style={{
            position: 'absolute',
            top: '1.25rem',
            right: '1.25rem',
            background: 'transparent',
            border: 'none',
            color: 'var(--sand-200)',
            fontSize: '1.5rem',
            cursor: 'pointer'
          }}
        >
          ✕
        </button>

        {/* Modal Header */}
        <div style={{ textAlign: 'center', marginBottom: '1.5rem' }}>
          <div 
            style={{
              width: '48px',
              height: '48px',
              borderRadius: '50%',
              background: 'linear-gradient(135deg, #DEB54C, #937119)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 0.75rem',
              color: 'var(--navy-950)'
            }}
          >
            <Award size={24} />
          </div>
          <span style={{ fontSize: '0.72rem', textTransform: 'uppercase', letterSpacing: '0.15em', color: 'var(--gold-400)', fontWeight: 800 }}>
            Azure Society Rewards & Portal
          </span>
          <h3 style={{ fontSize: '1.5rem', color: '#FFFFFF', marginTop: '0.2rem' }}>
            {isSignUp ? 'Join Azure Privilege Club' : 'Sign In To VIP Account'}
          </h3>
          <p style={{ fontSize: '0.82rem', color: 'var(--sand-200)' }}>
            Access exclusive member rates, scratch card coupon wallet, and concierge history.
          </p>
        </div>

        {/* 1-Click Quick Demo Login Shortcuts */}
        <div style={{ background: 'rgba(7, 11, 24, 0.7)', border: '1px solid var(--glass-border)', borderRadius: '0.75rem', padding: '0.85rem', marginBottom: '1.25rem' }}>
          <div style={{ fontSize: '0.68rem', color: 'var(--gold-300)', textTransform: 'uppercase', letterSpacing: '0.1em', fontWeight: 700, marginBottom: '0.45rem', textAlign: 'center' }}>
            ⚡ Instant 1-Click Demo Profiles:
          </div>
          <div style={{ display: 'flex', gap: '0.5rem' }}>
            <button
              type="button"
              onClick={() => handleDemoLogin(DEMO_USERS[0])}
              style={{
                flex: 1,
                background: 'rgba(212, 175, 55, 0.15)',
                border: '1px solid var(--gold-500)',
                color: 'var(--gold-300)',
                borderRadius: '0.5rem',
                padding: '0.45rem',
                fontSize: '0.72rem',
                fontWeight: 700,
                cursor: 'pointer',
                textAlign: 'center'
              }}
            >
              💎 Eleanor (Diamond)
            </button>
            <button
              type="button"
              onClick={() => handleDemoLogin(DEMO_USERS[1])}
              style={{
                flex: 1,
                background: 'rgba(255, 255, 255, 0.08)',
                border: '1px solid rgba(255, 255, 255, 0.2)',
                color: 'var(--sand-100)',
                borderRadius: '0.5rem',
                padding: '0.45rem',
                fontSize: '0.72rem',
                fontWeight: 700,
                cursor: 'pointer',
                textAlign: 'center'
              }}
            >
              🥇 Alexander (Gold)
            </button>
          </div>
        </div>

        {/* Custom Auth Form */}
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
          {isSignUp && (
            <div>
              <label style={{ display: 'block', fontSize: '0.74rem', color: 'var(--gold-300)', marginBottom: '0.3rem', fontWeight: 600 }}>
                Full Name & Title
              </label>
              <div style={{ position: 'relative' }}>
                <User size={15} color="var(--gold-400)" style={{ position: 'absolute', left: '0.75rem', top: '50%', transform: 'translateY(-50%)' }} />
                <input 
                  type="text"
                  placeholder="e.g. Lord Harrington"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  style={{
                    width: '100%',
                    background: 'rgba(7, 11, 24, 0.7)',
                    border: '1px solid rgba(212, 175, 55, 0.3)',
                    borderRadius: '0.6rem',
                    padding: '0.65rem 0.85rem 0.65rem 2.2rem',
                    color: '#FFFFFF',
                    fontSize: '0.85rem',
                    outline: 'none'
                  }}
                  required
                />
              </div>
            </div>
          )}

          <div>
            <label style={{ display: 'block', fontSize: '0.74rem', color: 'var(--gold-300)', marginBottom: '0.3rem', fontWeight: 600 }}>
              Email Address
            </label>
            <div style={{ position: 'relative' }}>
              <Mail size={15} color="var(--gold-400)" style={{ position: 'absolute', left: '0.75rem', top: '50%', transform: 'translateY(-50%)' }} />
              <input 
                type="email"
                placeholder="guest@luxury.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                style={{
                  width: '100%',
                  background: 'rgba(7, 11, 24, 0.7)',
                  border: '1px solid rgba(212, 175, 55, 0.3)',
                  borderRadius: '0.6rem',
                  padding: '0.65rem 0.85rem 0.65rem 2.2rem',
                  color: '#FFFFFF',
                  fontSize: '0.85rem',
                  outline: 'none'
                }}
                required
              />
            </div>
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '0.74rem', color: 'var(--gold-300)', marginBottom: '0.3rem', fontWeight: 600 }}>
              Password
            </label>
            <div style={{ position: 'relative' }}>
              <Lock size={15} color="var(--gold-400)" style={{ position: 'absolute', left: '0.75rem', top: '50%', transform: 'translateY(-50%)' }} />
              <input 
                type={showPassword ? 'text' : 'password'}
                placeholder="••••••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                style={{
                  width: '100%',
                  background: 'rgba(7, 11, 24, 0.7)',
                  border: '1px solid rgba(212, 175, 55, 0.3)',
                  borderRadius: '0.6rem',
                  padding: '0.65rem 2.2rem 0.65rem 2.2rem',
                  color: '#FFFFFF',
                  fontSize: '0.85rem',
                  outline: 'none'
                }}
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                style={{ position: 'absolute', right: '0.75rem', top: '50%', transform: 'translateY(-50%)', background: 'transparent', border: 'none', color: 'var(--sand-300)', cursor: 'pointer' }}
              >
                {showPassword ? <EyeOff size={15} /> : <Eye size={15} />}
              </button>
            </div>
          </div>

          {error && (
            <div style={{ fontSize: '0.74rem', color: 'var(--ruby-500)', textAlign: 'center' }}>
              {error}
            </div>
          )}

          <button
            type="submit"
            className="btn-gold"
            style={{ width: '100%', padding: '0.85rem', marginTop: '0.5rem' }}
          >
            <span>{isSignUp ? 'Create VIP Membership' : 'Sign In To Account'}</span>
            <ArrowRight size={16} />
          </button>
        </form>

        {/* Toggle Sign Up / Sign In */}
        <div style={{ textAlign: 'center', marginTop: '1.25rem', fontSize: '0.8rem', color: 'var(--sand-200)' }}>
          {isSignUp ? 'Already a member?' : "Don't have an Azure VIP account yet?"}{' '}
          <button
            type="button"
            onClick={() => {
              setError('');
              setIsSignUp(!isSignUp);
            }}
            style={{ background: 'transparent', border: 'none', color: 'var(--gold-400)', fontWeight: 700, cursor: 'pointer', textDecoration: 'underline' }}
          >
            {isSignUp ? 'Sign In' : 'Join Now'}
          </button>
        </div>
      </div>
    </div>
  );
}

import React, { useState, useEffect, useRef } from 'react';
import { useAdminAuth } from '../context/AdminAuthContext';
import {
  ShieldCheck,
  Lock,
  KeyRound,
  ArrowRight,
  RefreshCw,
  AlertCircle,
  CheckCircle2,
  Sprout,
  Mail,
  Phone,
  Clock,
  Key,
  ChevronLeft,
} from 'lucide-react';

export const AdminLoginPage: React.FC = () => {
  const { requestOtp, verifyOtp, error, clearError } = useAdminAuth();

  const [step, setStep] = useState<'identifier' | 'otp'>('identifier');
  const [identifier, setIdentifier] = useState('admin@talukdarnursery.com');
  const [otpDigits, setOtpDigits] = useState(['', '', '', '', '', '']);
  const [devCodeBanner, setDevCodeBanner] = useState<string | null>(null);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [validationError, setValidationError] = useState<string | null>(null);
  const [timerSeconds, setTimerSeconds] = useState(300);
  const [canResend, setCanResend] = useState(false);

  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  // Timer effect for OTP countdown
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (step === 'otp' && timerSeconds > 0) {
      interval = setInterval(() => {
        setTimerSeconds((prev) => prev - 1);
      }, 1000);
    } else if (timerSeconds === 0) {
      setCanResend(true);
    }
    return () => clearInterval(interval);
  }, [step, timerSeconds]);

  // Client-side Input Validation
  const validateInput = (val: string) => {
    const clean = val.trim().toLowerCase();
    if (!clean) {
      return 'Please enter your administrator email or registered phone number.';
    }
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    const phoneRegex = /^\+?[0-9]{10,15}$/;

    if (!emailRegex.test(clean) && !phoneRegex.test(clean.replace(/[^0-9+]/g, ''))) {
      return 'Please enter a valid email address (e.g., admin@talukdarnursery.com) or 10-digit mobile number.';
    }
    return null;
  };

  const handleRequestOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    clearError();
    setValidationError(null);

    const err = validateInput(identifier);
    if (err) {
      setValidationError(err);
      return;
    }

    setIsSubmitting(true);
    const res = await requestOtp(identifier.trim());
    setIsSubmitting(false);

    if (res.success) {
      if (res.devOtpCode) {
        setDevCodeBanner(res.devOtpCode);
        // Pre-fill for convenience in test environment
        const digits = res.devOtpCode.split('');
        if (digits.length === 6) {
          setOtpDigits(digits);
        }
      }
      setStep('otp');
      setTimerSeconds(300);
      setCanResend(false);
    }
  };

  const handleVerifyOtp = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    clearError();
    setValidationError(null);

    const code = otpDigits.join('');
    if (code.length !== 6 || !/^\d{6}$/.test(code)) {
      setValidationError('Please enter all 6 digits of the OTP verification code.');
      return;
    }

    setIsSubmitting(true);
    const res = await verifyOtp(identifier.trim(), code);
    setIsSubmitting(false);

    if (!res.success) {
      // Clear OTP digits on failure so user can retry cleanly
      setOtpDigits(['', '', '', '', '', '']);
      if (inputRefs.current[0]) inputRefs.current[0].focus();
    }
  };

  const handleDigitChange = (index: number, value: string) => {
    if (!/^\d*$/.test(value)) return;

    const newDigits = [...otpDigits];
    newDigits[index] = value.slice(-1);
    setOtpDigits(newDigits);

    // Auto-advance focus to next input box
    if (value && index < 5 && inputRefs.current[index + 1]) {
      inputRefs.current[index + 1]?.focus();
    }

    // Auto-submit if all 6 digits entered
    if (newDigits.every((d) => d !== '') && index === 5) {
      setTimeout(() => handleVerifyOtp(), 100);
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace' && !otpDigits[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handlePaste = (e: React.ClipboardEvent) => {
    e.preventDefault();
    const pasted = e.clipboardData.getData('text').trim();
    if (/^\d{6}$/.test(pasted)) {
      const digits = pasted.split('');
      setOtpDigits(digits);
      if (inputRefs.current[5]) inputRefs.current[5].focus();
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#122414] via-[#1E3A20] to-[#0D180E] text-stone-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-stone-900/90 border border-emerald-500/20 rounded-3xl shadow-2xl backdrop-blur-md overflow-hidden">
        {/* Header Header Banner */}
        <div className="p-6 bg-[#172D19] border-b border-emerald-900/60 text-center space-y-2 relative">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-emerald-600 to-emerald-400 text-white flex items-center justify-center mx-auto shadow-lg border border-emerald-300/30">
            <Sprout size={32} />
          </div>

          <div>
            <span className="text-[10px] font-black uppercase text-emerald-400 tracking-widest bg-emerald-950/80 px-3 py-1 rounded-full border border-emerald-800/60 inline-flex items-center gap-1.5">
              <ShieldCheck size={12} className="text-amber-400" /> Authorized Portal Access
            </span>
            <h1 className="text-2xl font-serif font-black text-white mt-2 tracking-tight">
              Talukdar Nursery Admin
            </h1>
            <p className="text-xs text-emerald-200/80 mt-1">
              {step === 'identifier'
                ? 'Enter your administrator credentials to receive an OTP'
                : `Enter the 6-digit code sent to ${identifier}`}
            </p>
          </div>
        </div>

        {/* Content Body */}
        <div className="p-6 space-y-5">
          {/* Global Error Alerts */}
          {(error || validationError) && (
            <div className="p-3.5 bg-rose-950/80 border border-rose-500/50 rounded-2xl text-rose-200 text-xs flex items-start gap-2.5 animate-shake">
              <AlertCircle size={16} className="text-rose-400 shrink-0 mt-0.5" />
              <div className="flex-1 font-medium">{error || validationError}</div>
            </div>
          )}

          {/* STEP 1: IDENTIFIER INPUT */}
          {step === 'identifier' && (
            <form onSubmit={handleRequestOtp} className="space-y-4">
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-stone-300 flex items-center justify-between">
                  <span>Admin Identifier (Email / Phone)</span>
                  <span className="text-[10px] text-emerald-400 font-normal">JWT Role Protected</span>
                </label>
                <div className="relative">
                  <input
                    type="text"
                    value={identifier}
                    onChange={(e) => {
                      setIdentifier(e.target.value);
                      if (validationError) setValidationError(null);
                    }}
                    placeholder="e.g. admin@talukdarnursery.com or +91 70027 65701"
                    className="w-full bg-stone-950 border border-stone-800 rounded-xl px-3.5 py-3 text-xs font-medium text-white placeholder-stone-500 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition"
                  />
                  <div className="absolute right-3 top-3 text-stone-500">
                    {identifier.includes('@') ? <Mail size={16} /> : <Phone size={16} />}
                  </div>
                </div>
              </div>

              {/* Demo Hint Helper */}
              <div className="p-3 bg-emerald-950/40 border border-emerald-800/40 rounded-xl text-[11px] text-emerald-200/90 space-y-1">
                <span className="font-bold text-amber-300 block flex items-center gap-1">
                  <KeyRound size={12} /> Pre-Authorized Admin Accounts:
                </span>
                <p>• Email: <code className="text-white font-mono bg-stone-950 px-1 py-0.5 rounded">admin@talukdarnursery.com</code></p>
                <p>• Mobile: <code className="text-white font-mono bg-stone-950 px-1 py-0.5 rounded">+91 70027 65701</code></p>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3 bg-gradient-to-r from-emerald-600 to-emerald-700 hover:from-emerald-500 hover:to-emerald-600 text-white font-bold text-xs rounded-xl shadow-lg transition flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
              >
                {isSubmitting ? (
                  <>
                    <RefreshCw size={16} className="animate-spin" />
                    <span>Requesting Secure OTP...</span>
                  </>
                ) : (
                  <>
                    <span>Send Verification OTP</span>
                    <ArrowRight size={16} />
                  </>
                )}
              </button>
            </form>
          )}

          {/* STEP 2: OTP VERIFICATION */}
          {step === 'otp' && (
            <form onSubmit={handleVerifyOtp} className="space-y-5">
              {/* Dev Code Banner */}
              {devCodeBanner && (
                <div className="p-3 bg-amber-500/10 border border-amber-500/30 rounded-xl text-xs text-amber-200 flex items-center justify-between">
                  <div>
                    <span className="font-bold block text-amber-400">Demo Verification Code:</span>
                    <span className="font-mono text-lg font-black tracking-widest text-white">
                      {devCodeBanner}
                    </span>
                  </div>
                  <button
                    type="button"
                    onClick={() => {
                      const digits = devCodeBanner.split('');
                      setOtpDigits(digits);
                    }}
                    className="px-2.5 py-1 bg-amber-500 text-stone-950 font-extrabold rounded text-[10px] hover:bg-amber-400 cursor-pointer"
                  >
                    Auto-Fill OTP
                  </button>
                </div>
              )}

              {/* 6-Digit OTP Inputs */}
              <div className="space-y-2">
                <label className="text-xs font-bold text-stone-300 block text-center">
                  Enter 6-Digit Verification Code
                </label>
                <div className="flex items-center justify-between gap-1.5" onPaste={handlePaste}>
                  {otpDigits.map((digit, idx) => (
                    <input
                      key={idx}
                      ref={(el) => (inputRefs.current[idx] = el)}
                      type="text"
                      maxLength={1}
                      value={digit}
                      onChange={(e) => handleDigitChange(idx, e.target.value)}
                      onKeyDown={(e) => handleKeyDown(idx, e)}
                      className="w-11 h-12 text-center text-lg font-mono font-black bg-stone-950 border border-stone-800 rounded-xl text-emerald-400 focus:outline-none focus:border-emerald-400 focus:ring-2 focus:ring-emerald-400/30 transition"
                    />
                  ))}
                </div>
              </div>

              {/* Timer & Resend Controls */}
              <div className="flex items-center justify-between text-xs text-stone-400">
                <span className="flex items-center gap-1">
                  <Clock size={14} className="text-emerald-400" />
                  Expires in: <strong className="font-mono text-white">{formatTime(timerSeconds)}</strong>
                </span>

                <button
                  type="button"
                  onClick={handleRequestOtp}
                  disabled={!canResend || isSubmitting}
                  className="text-emerald-400 hover:underline disabled:opacity-40 disabled:no-underline font-bold text-xs cursor-pointer"
                >
                  Resend OTP Code
                </button>
              </div>

              {/* Submit & Back Controls */}
              <div className="space-y-2 pt-1">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3 bg-gradient-to-r from-emerald-600 to-emerald-700 hover:from-emerald-500 hover:to-emerald-600 text-white font-bold text-xs rounded-xl shadow-lg transition flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                >
                  {isSubmitting ? (
                    <>
                      <RefreshCw size={16} className="animate-spin" />
                      <span>Verifying JWT Session...</span>
                    </>
                  ) : (
                    <>
                      <ShieldCheck size={16} />
                      <span>Verify & Grant Admin Access</span>
                    </>
                  )}
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setStep('identifier');
                    clearError();
                    setValidationError(null);
                  }}
                  className="w-full py-2 text-stone-400 hover:text-white text-xs font-semibold flex items-center justify-center gap-1 transition cursor-pointer"
                >
                  <ChevronLeft size={14} /> Change Email or Phone Number
                </button>
              </div>
            </form>
          )}

          {/* Security Spec Badges */}
          <div className="pt-4 border-t border-stone-800/80 grid grid-cols-3 gap-2 text-[10px] text-stone-400 text-center font-medium">
            <div className="p-2 bg-stone-950/60 rounded-xl border border-stone-800">
              <Key size={14} className="mx-auto mb-1 text-emerald-400" />
              <span>JWT Signed</span>
            </div>
            <div className="p-2 bg-stone-950/60 rounded-xl border border-stone-800">
              <ShieldCheck size={14} className="mx-auto mb-1 text-amber-400" />
              <span>OTP 2FA Verified</span>
            </div>
            <div className="p-2 bg-stone-950/60 rounded-xl border border-stone-800">
              <Lock size={14} className="mx-auto mb-1 text-emerald-400" />
              <span>Role Authorization</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
